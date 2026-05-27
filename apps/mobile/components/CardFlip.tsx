import { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import type { Card } from '@sot/shared';

interface Props {
  card: Card;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function CardFlip({ card, isFavorite, onToggleFavorite }: Props) {
  const [flipped, setFlipped] = useState(false);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const elevation = useSharedValue(0);

  const triggerHaptic = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, []);

  const handleFlip = useCallback(() => {
    triggerHaptic();
    const next = flipped ? 0 : 1;
    rotation.value = withSpring(next, {
      damping: 15,
      stiffness: 120,
      mass: 0.8,
    });
    elevation.value = withSpring(next, { damping: 15, stiffness: 120 });
    setFlipped(!flipped);
  }, [flipped, triggerHaptic]);

  const handleFavorite = useCallback(() => {
    if (!isFavorite && Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    onToggleFavorite(card.id);
  }, [card.id, onToggleFavorite, isFavorite]);

  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      runOnJS(handleFlip)();
    });

  // Press-in scale feedback (non-web only due to reanimated constraints)
  const pressGesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.97, { damping: 20, stiffness: 200 });
    })
    .onFinalize(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    });

  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` },
      { scale: scale.value },
    ],
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${interpolate(rotation.value, [0, 1], [180, 360])}deg` },
      { scale: scale.value },
    ],
  }));

  const shadowStyle = useAnimatedStyle(() => ({
    shadowOpacity: interpolate(elevation.value, [0, 1], [0.1, 0.25]),
    shadowRadius: interpolate(elevation.value, [0, 1], [4, 16]),
    elevation: interpolate(elevation.value, [0, 1], [2, 10]),
  }));

  const composed = Gesture.Simultaneous(tapGesture, pressGesture);

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.cardWrapper, shadowStyle]}>
          <Animated.View style={[styles.face, styles.front, frontStyle]}>
            <Text style={styles.idLabel}>NO. {card.id}</Text>
            <Text style={styles.frontTitle}>{card.title}</Text>
            <Text style={styles.frontText}>{card.situation}</Text>
            <Text style={styles.hint}>点击翻转</Text>
          </Animated.View>
          <Animated.View style={[styles.face, styles.back, backStyle]}>
            <Text style={styles.backTitle}>核心解法</Text>
            <Text style={styles.backText}>{card.solution}</Text>
            {card.action && (
              <View style={styles.actionBox}>
                <Text style={styles.actionLabel}>今日行动</Text>
                <Text style={styles.actionText}>{card.action}</Text>
              </View>
            )}
            <Text style={styles.hint}>点击翻回</Text>
          </Animated.View>
        </Animated.View>
      </GestureDetector>

      <TouchableOpacity
        style={styles.favBtn}
        onPress={handleFavorite}
        activeOpacity={0.7}
      >
        <Text style={[styles.favIcon, isFavorite && styles.favActive]}>
          {isFavorite ? '★' : '☆'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  cardWrapper: {
    width: 300,
    height: 400,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: 'transparent',
  },
  face: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(26,26,26,0.08)',
  },
  front: { backgroundColor: '#FFFFFF' },
  back: {
    backgroundColor: '#F9F8F6',
    borderColor: '#1A1A1A',
  },
  idLabel: {
    position: 'absolute',
    top: 16,
    left: 16,
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: 2,
  },
  frontTitle: {
    fontFamily: 'serif',
    fontSize: 28,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  frontText: {
    fontSize: 15,
    color: '#6C6863',
    lineHeight: 24,
    textAlign: 'center',
  },
  backTitle: {
    fontSize: 13,
    color: '#D4AF37',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 28,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  actionBox: {
    marginTop: 20,
    alignSelf: 'stretch',
    borderLeftWidth: 2,
    borderLeftColor: '#D4AF37',
    paddingLeft: 12,
  },
  actionLabel: {
    fontSize: 11,
    color: '#D4AF37',
    letterSpacing: 2,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#6C6863',
    lineHeight: 22,
  },
  hint: {
    position: 'absolute',
    bottom: 16,
    fontSize: 11,
    color: '#9CA3AF',
  },
  favBtn: {
    marginTop: 16,
    padding: 8,
  },
  favIcon: {
    fontSize: 28,
    color: '#9CA3AF',
  },
  favActive: {
    color: '#D4AF37',
  },
});
