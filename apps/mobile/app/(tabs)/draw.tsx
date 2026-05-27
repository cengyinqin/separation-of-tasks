import { useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { CardFlip } from '../../components/CardFlip';
import { Toast } from '../../components/Toast';
import { EmptyState } from '../../components/EmptyState';
import { AppContext } from './_layout';

export default function DrawScreen() {
  const ctx = useContext(AppContext)!;
  const [showToast, setShowToast] = useState(false);
  const [realized, setRealized] = useState(false);

  const handlePractice = useCallback(async () => {
    await ctx.recordPractice();
    setRealized(true);
    setShowToast(true);
  }, [ctx.recordPractice]);

  const handleDrawAgain = useCallback(() => {
    setRealized(false);
    ctx.drawCard();
  }, [ctx.drawCard]);

  if (!ctx.currentCard) {
    return (
      <View style={styles.root}>
        <EmptyState
          icon="◎"
          title="点击抽取一张卡牌"
          description="让课题分离的智慧在随机中与你相遇"
        />
        <TouchableOpacity style={styles.drawBtn} onPress={ctx.drawCard} activeOpacity={0.9}>
          <Text style={styles.drawBtnText}>开始抽取</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {ctx.shuffling ? (
        <View style={styles.shuffleContainer}>
          <Text style={styles.shuffleText}>{ctx.currentCard.title}</Text>
          <ActivityIndicator style={{ marginTop: 24 }} color="#D4AF37" />
          <Text style={styles.shuffleHint}>正在为你抽取…</Text>
        </View>
      ) : (
        <>
          <CardFlip
            card={ctx.currentCard}
            isFavorite={ctx.isFavorite(ctx.currentCard.id)}
            onToggleFavorite={ctx.toggleFavorite}
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.primaryAction, realized && styles.actionDone]}
              onPress={handlePractice}
              disabled={realized}
              activeOpacity={0.9}
            >
              <Text style={[styles.actionBtnText, styles.primaryActionText]}>
                {realized ? '已完成' : '我已觉察'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.secondaryAction]}
              onPress={handleDrawAgain}
              activeOpacity={0.9}
            >
              <Text style={styles.secondaryActionText}>再抽一张</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Toast visible={showToast} onHide={() => setShowToast(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9F8F6',
    justifyContent: 'center',
  },
  shuffleContainer: {
    alignItems: 'center',
    padding: 40,
  },
  shuffleText: {
    fontSize: 24,
    fontFamily: 'serif',
    color: '#1A1A1A',
    textAlign: 'center',
    opacity: 0.6,
  },
  shuffleHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
  drawBtn: {
    marginHorizontal: 60,
    backgroundColor: '#1A1A1A',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryAction: {
    backgroundColor: '#1A1A1A',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    letterSpacing: 2,
  },
  actionDone: {
    backgroundColor: '#D4AF37',
  },
  secondaryAction: {
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  secondaryActionText: {
    color: '#1A1A1A',
    fontSize: 13,
    letterSpacing: 2,
  },
  actionBtnText: {},
});
