import { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { cards } from '@sot/shared';
import { AppContext } from './_layout';

export default function HomeScreen() {
  const ctx = useContext(AppContext)!;
  const router = useRouter();

  const dailyQuote = cards[Math.floor(Math.random() * cards.length)];

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>厘清边界{'\n'}拒绝内耗</Text>
        <Text style={styles.heroSub}>
          做自己人生的主人，从分清"谁的课题"开始。
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{ctx.data.totalPracticeCount}</Text>
          <Text style={styles.statLabel}>累计练习</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{ctx.data.streakDays}</Text>
          <Text style={styles.statLabel}>连续天数</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{ctx.data.favorites.length}</Text>
          <Text style={styles.statLabel}>收藏卡牌</Text>
        </View>
      </View>

      {/* Daily Quote */}
      <View style={styles.quoteBox}>
        <Text style={styles.quoteLabel}>每日一语</Text>
        <Text style={styles.quoteText}>"{dailyQuote.solution.slice(0, 80)}…"</Text>
        <Text style={styles.quoteAttr}>—— 卡牌 #{dailyQuote.id}</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push('/draw')}
          activeOpacity={0.9}
        >
          <Text style={styles.primaryBtnText}>随机抽取一张</Text>
          <Text style={styles.primaryBtnArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push('/browse')}
          activeOpacity={0.9}
        >
          <Text style={styles.secondaryBtnText}>浏览全部卡牌</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9F8F6' },
  content: { padding: 24, paddingTop: 16, paddingBottom: 40 },

  hero: { marginBottom: 32 },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'serif',
    fontWeight: '600',
    color: '#1A1A1A',
    lineHeight: 42,
  },
  heroSub: {
    fontSize: 14,
    color: '#6C6863',
    marginTop: 8,
    lineHeight: 22,
  },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(26,26,26,0.08)',
  },
  statBox: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 22, fontFamily: 'serif', fontWeight: '700', color: '#D4AF37' },
  statLabel: { fontSize: 11, color: '#6C6863', marginTop: 4, letterSpacing: 1 },
  divider: { width: 1, backgroundColor: 'rgba(26,26,26,0.08)' },

  quoteBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 32,
    borderLeftWidth: 3,
    borderLeftColor: '#D4AF37',
  },
  quoteLabel: { fontSize: 11, color: '#D4AF37', letterSpacing: 3, marginBottom: 8, textTransform: 'uppercase' },
  quoteText: { fontSize: 15, fontStyle: 'italic', color: '#1A1A1A', lineHeight: 24 },
  quoteAttr: { fontSize: 11, color: '#9CA3AF', marginTop: 8 },

  actions: { gap: 12 },
  primaryBtn: {
    backgroundColor: '#1A1A1A',
    height: 54,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  primaryBtnArrow: { color: '#FFFFFF', fontSize: 16 },
  secondaryBtn: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  secondaryBtnText: {
    color: '#1A1A1A',
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});
