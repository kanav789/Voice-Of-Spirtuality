import { useEffect, useState, useCallback, useRef } from 'react';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';
import {
  chapter1AudioData,
  getActiveVerseFromTime,
  getVerseAudioPhase,
  VerseAudioPhase,
} from '../data/audio/chapter1Audio';

export interface UseChapterAudioReturn {
  hasAudio: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  loadingVerseNumber: number | null;
  isLoaded: boolean;
  currentTime: number;
  duration: number;
  activeVerseNumber: number | null;
  versePhase: { verse: number | null; phase: VerseAudioPhase };
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seekTo: (seconds: number) => void;
  seekToVerse: (verseNumber: number) => void;
  toggleVersePlay: (verseNumber: number) => void;
}

export function useChapterAudio(chapterNumber: number): UseChapterAudioReturn {
  const hasAudio = chapterNumber === 1;
  const audioSource = hasAudio ? chapter1AudioData.audioSource : null;

  const [isPendingPlay, setIsPendingPlay] = useState<boolean>(false);
  const [pendingVerseNumber, setPendingVerseNumber] = useState<number | null>(null);

  const player = useAudioPlayer(audioSource, {
    updateInterval: 150,
  });
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    // Configure audio mode for background playback and silent mode compatibility
    try {
      setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
        interruptionMode: 'doNotMix',
      }).catch(() => {});
    } catch {
      // Ignored if platform doesn't support
    }
  }, []);

  const currentTime = status?.currentTime ?? 0;
  const isPlaying = !!status?.playing;
  const isBuffering = !!status?.isBuffering;
  const isLoaded = !!status?.isLoaded;
  const duration =
    status?.duration && status.duration > 0
      ? status.duration
      : hasAudio
      ? chapter1AudioData.totalDuration
      : 0;

  // Audio is considered loading if user requested playback but it hasn't started yet,
  // or if the player is actively buffering/loading data
  const isLoading = (isPendingPlay && !isPlaying) || (isPlaying && isBuffering);

  // Clear pending state once playback is actively running and not buffering
  useEffect(() => {
    if (isPlaying && !isBuffering) {
      setIsPendingPlay(false);
      setPendingVerseNumber(null);
    }
  }, [isPlaying, isBuffering]);

  const activeVerseNumber = hasAudio ? getActiveVerseFromTime(currentTime) : null;
  const loadingVerseNumber = isLoading
    ? pendingVerseNumber ?? activeVerseNumber
    : null;

  const versePhase = hasAudio
    ? getVerseAudioPhase(currentTime)
    : { verse: null, phase: 'ended' as VerseAudioPhase };

  // Stop/reset playback when audio completes after Verse 47 (805.88s)
  useEffect(() => {
    if (hasAudio && isPlaying) {
      if (currentTime >= chapter1AudioData.totalDuration || status?.didJustFinish) {
        player.pause();
        player.seekTo(0);
        setIsPendingPlay(false);
        setPendingVerseNumber(null);
      }
    }
  }, [hasAudio, isPlaying, currentTime, status?.didJustFinish, player]);

  const play = useCallback(() => {
    if (!hasAudio) return;
    setIsPendingPlay(true);
    player.play();
  }, [hasAudio, player]);

  const pause = useCallback(() => {
    if (!hasAudio) return;
    setIsPendingPlay(false);
    setPendingVerseNumber(null);
    player.pause();
  }, [hasAudio, player]);

  const togglePlay = useCallback(() => {
    if (!hasAudio) return;
    if (isPlaying) {
      setIsPendingPlay(false);
      setPendingVerseNumber(null);
      player.pause();
    } else {
      setIsPendingPlay(true);
      player.play();
    }
  }, [hasAudio, isPlaying, player]);

  const seekTo = useCallback(
    (seconds: number) => {
      if (!hasAudio) return;
      const targetTime = Math.max(0, Math.min(seconds, chapter1AudioData.totalDuration));
      player.seekTo(targetTime);
    },
    [hasAudio, player]
  );

  const seekToVerse = useCallback(
    (verseNumber: number) => {
      if (!hasAudio) return;
      const timing = chapter1AudioData.verses.find((v) => v.verse === verseNumber);
      if (timing) {
        setIsPendingPlay(true);
        setPendingVerseNumber(verseNumber);
        player.seekTo(timing.sanskritStart);
        player.play();
      }
    },
    [hasAudio, player]
  );

  const toggleVersePlay = useCallback(
    (verseNumber: number) => {
      if (!hasAudio) return;
      if (activeVerseNumber === verseNumber && isPlaying) {
        setIsPendingPlay(false);
        setPendingVerseNumber(null);
        player.pause();
      } else {
        const timing = chapter1AudioData.verses.find((v) => v.verse === verseNumber);
        if (timing) {
          setIsPendingPlay(true);
          setPendingVerseNumber(verseNumber);
          player.seekTo(timing.sanskritStart);
          player.play();
        }
      }
    },
    [hasAudio, activeVerseNumber, isPlaying, player]
  );

  return {
    hasAudio,
    isPlaying,
    isLoading,
    loadingVerseNumber,
    isLoaded,
    currentTime,
    duration,
    activeVerseNumber,
    versePhase,
    play,
    pause,
    togglePlay,
    seekTo,
    seekToVerse,
    toggleVersePlay,
  };
}

