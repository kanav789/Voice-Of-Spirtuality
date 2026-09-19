import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../theme/theme';

interface PracticeScreenProps {
  onStartReading?: () => void;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({ onStartReading }) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      setTimerSeconds(60);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Rotate breath phase every 4 seconds while running
  useEffect(() => {
    let phaseInterval: any;
    if (isTimerRunning) {
      const phases: ('Inhale' | 'Hold' | 'Exhale' | 'Rest')[] = [
        'Inhale',
        'Hold',
        'Exhale',
        'Rest',
      ];
      let idx = 0;
      phaseInterval = setInterval(() => {
        idx = (idx + 1) % phases.length;
        setBreathPhase(phases[idx]);
      }, 4000);
    }
    return () => clearInterval(phaseInterval);
  }, [isTimerRunning]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>DAILY SANCTUARY</Text>
          <Text style={styles.headerTitle}>Daily Practice</Text>
          <Text style={styles.headerTagline}>Build a calmer mind and a brighter spirit.</Text>
        </View>

        {/* 1. Pranayama / Breathwork Card */}
        <View style={styles.practiceCard}>
          <Text style={styles.cardSectionLabel}>MINDFUL BREATHWORK</Text>
          <Text style={styles.cardHeading}>Box Breathing (4-4-4-4)</Text>
          <Text style={styles.cardDesc}>
            Centering breath to calm the nervous system and steady the intellect before
            scriptural contemplation.
          </Text>

          {/* Glowing Breath Center */}
          <View style={styles.breathCircleWrapper}>
            <View
              style={[
                styles.breathCircle,
                isTimerRunning && styles.breathCircleActive,
              ]}
            >
              <Text style={styles.breathOmText}>ॐ</Text>
              <Text style={styles.breathPhaseText}>
                {isTimerRunning ? breathPhase : 'Ready'}
              </Text>
              <Text style={styles.timerCountdown}>
                {isTimerRunning ? `${timerSeconds}s` : '1 Min'}
              </Text>
            </View>
          </View>

          {/* Start/Stop Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            style={[styles.actionBtn, isTimerRunning && styles.actionBtnActive]}
            onPress={() => {
              if (isTimerRunning) {
                setIsTimerRunning(false);
                setTimerSeconds(60);
              } else {
                setIsTimerRunning(true);
              }
            }}
          >
            <Text style={styles.actionBtnText}>
              {isTimerRunning ? 'Pause Practice' : 'Begin 1-Minute Centering'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2. Today's Contemplation */}
        <View style={styles.practiceCard}>
          <Text style={styles.cardSectionLabel}>TODAY'S CONTEMPLATION</Text>
          <Text style={styles.cardHeading}>Dhyana: Stillness in Action</Text>
          <Text style={styles.contemplationQuote}>
            "When meditation is mastered, the mind is unwavering like the flame of a lamp in a
            windless place."
          </Text>
          <Text style={styles.contemplationSource}>— Bhagavad Gita 6.19</Text>

          <View style={styles.guidanceBox}>
            <Text style={styles.guidanceBullet}>✦ Close your eyes gently for a few moments.</Text>
            <Text style={styles.guidanceBullet}>
              ✦ Observe your thoughts without attachment or judgment.
            </Text>
            <Text style={styles.guidanceBullet}>
              ✦ Return your awareness to the sacred stillness within.
            </Text>
          </View>
        </View>

        {/* 3. Shanti Peace Chant */}
        <View style={styles.peaceCard}>
          <Text style={styles.shantiSanskrit}>
            ॐ शान्तिः शान्तिः शान्तिः ॥
          </Text>
          <Text style={styles.shantiMeaning}>
            Om Peace, Peace, Peace. May peace prevail within and without.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF7F0',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 36,
  },
  header: {
    marginBottom: 16,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#855E24',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 4,
  },
  headerTagline: {
    fontSize: 13,
    color: '#736E66',
  },
  practiceCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8DEC7',
    borderWidth: 1.2,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: 'rgba(140, 99, 38, 0.08)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardSectionLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#855E24',
    letterSpacing: 1.1,
    marginBottom: 4,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: '#6E6960',
    lineHeight: 19,
    marginBottom: 14,
  },
  breathCircleWrapper: {
    alignItems: 'center',
    marginVertical: 14,
  },
  breathCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FAF5EA',
    borderWidth: 2,
    borderColor: '#E7D7B8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A07335',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  breathCircleActive: {
    borderColor: '#9E7238',
    backgroundColor: '#F8F1DF',
  },
  breathOmText: {
    fontSize: 32,
    color: '#855E24',
    fontWeight: '600',
    marginBottom: 2,
  },
  breathPhaseText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1A17',
    letterSpacing: 0.4,
  },
  timerCountdown: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#7D5F31',
    marginTop: 2,
  },
  actionBtn: {
    backgroundColor: '#9E7238',
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#9E7238',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  actionBtnActive: {
    backgroundColor: '#7A5523',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  contemplationQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#38332B',
    lineHeight: 22,
    marginBottom: 4,
  },
  contemplationSource: {
    fontSize: 12,
    fontWeight: '600',
    color: '#855E24',
    marginBottom: 12,
  },
  guidanceBox: {
    backgroundColor: '#FAF7F0',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFE6D2',
    gap: 6,
  },
  guidanceBullet: {
    fontSize: 12.5,
    color: '#575249',
    lineHeight: 18,
  },
  peaceCard: {
    backgroundColor: '#FAF5EA',
    borderColor: '#E8D7B8',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  shantiSanskrit: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 6,
    textAlign: 'center',
  },
  shantiMeaning: {
    fontSize: 12.5,
    color: '#736A5B',
    textAlign: 'center',
    lineHeight: 18,
  },
});
