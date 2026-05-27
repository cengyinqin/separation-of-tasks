import { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { cards } from '@sot/shared';
import { CardFlip } from '../../components/CardFlip';
import { EmptyState } from '../../components/EmptyState';
import { AppContext } from './_layout';

export default function FavoritesScreen() {
  const ctx = useContext(AppContext)!;
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const favoriteCards = cards.filter((c) => ctx.data.favorites.includes(c.id));

  if (selectedCard !== null) {
    const card = cards.find((c) => c.id === selectedCard)!;
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setSelectedCard(null)}>
          <Text style={styles.backBtnText}>← 返回列表</Text>
        </TouchableOpacity>
        <CardFlip
          card={card}
          isFavorite
          onToggleFavorite={ctx.toggleFavorite}
        />
      </View>
    );
  }

  if (favoriteCards.length === 0) {
    return (
      <View style={styles.root}>
        <EmptyState
          icon="☆"
          title="还没有收藏卡牌"
          description="在浏览或抽取时点击星标，把触动你的卡牌收藏到这里"
        />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        <Text style={styles.count}>{favoriteCards.length} 张收藏</Text>
        {favoriteCards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.cardItem}
            onPress={() => setSelectedCard(card.id)}
            activeOpacity={0.8}
          >
            <View style={styles.cardItemLeft}>
              <Text style={styles.cardItemId}>#{card.id}</Text>
            </View>
            <View style={styles.cardItemBody}>
              <Text style={styles.cardItemTitle}>{card.title}</Text>
              <Text style={styles.cardItemSituation} numberOfLines={2}>
                {card.situation}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => ctx.toggleFavorite(card.id)}
            >
              <Text style={styles.removeIcon}>★</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9F8F6' },
  backBtn: { paddingHorizontal: 24, paddingTop: 16 },
  backBtnText: { fontSize: 13, color: '#6C6863', letterSpacing: 2 },

  list: { flex: 1 },
  listContent: { padding: 16, paddingBottom: 40 },
  count: { fontSize: 11, color: '#9CA3AF', marginBottom: 12, letterSpacing: 1 },

  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(26,26,26,0.05)',
  },
  cardItemLeft: { marginRight: 12 },
  cardItemId: { fontSize: 11, color: '#9CA3AF', letterSpacing: 1 },
  cardItemBody: { flex: 1 },
  cardItemTitle: { fontSize: 16, fontFamily: 'serif', fontWeight: '600', color: '#1A1A1A', marginBottom: 4 },
  cardItemSituation: { fontSize: 13, color: '#6C6863', lineHeight: 20 },
  removeBtn: { padding: 8 },
  removeIcon: { fontSize: 18, color: '#D4AF37' },
});
