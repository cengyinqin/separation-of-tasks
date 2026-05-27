import { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { encouragements } from '@sot/shared';

interface Props {
  visible: boolean;
  onHide: () => void;
}

export function Toast({ visible, onHide }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 20,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const msg = encouragements[Math.floor(Math.random() * encouragements.length)];

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.text}>{msg}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 32,
    right: 32,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
    zIndex: 100,
    elevation: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
