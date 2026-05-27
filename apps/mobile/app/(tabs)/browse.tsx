import { useContext, useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { cards, categories, getCardsByCategory } from '@sot/shared';
import { CardFlip } from '../../components/CardFlip';
import { AppContext } from './_layout';

export default function BrowseScreen() {
  const ctx = useContext(AppContext)!;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const filteredCards = useMemo(
    () => (activeCategory === 'all' ? cards : getCardsByCategory(activeCategory)),
    [activeCategory],
  );

  if (selectedCard !== null) {
    const card = cards.find((c) => c.id === selectedCard)!;
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setSelectedCard(null)}>
          <Text style={styles.backBtnText}>← 返回列表</Text>
        </TouchableOpacity>
        <CardFlip
          card={card}
          isFavorite={ctx.isFavorite(card.id)}
          onToggleFavorite={ctx.toggleFavorite}
        />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* Category Tabs */}
      <ScrollView horizontal style={styles.tabRow} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.tab, activeCategory === 'all' && styles.tabActive]}
          onPress={() => setActiveCategory('all')}
        >
          <Text style={[styles.tabText, activeCategory === 'all' && styles.tabTextActive]}>
            全部
          </Text>
        </TouchableOpacity>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.tab, activeCategory === cat.key && styles.tabActive]}
            onPress={() => setActiveCategory(cat.key)}
          >
            <Text style={[styles.tabText, activeCategory === cat.key && styles.tabTextActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Card List */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        <Text style={styles.count}>{filteredCards.length} 张卡牌</Text>
        {filteredCards.map((card) => (
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
            <View style={styles.cardItemRight}>
              <Text style={styles.favIcon}>
                {ctx.isFavorite(card.id) ? '★' : '☆'}
              </Text>
              <Text style={styles.cardChevron}>›</Text>
            </View>
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

  tabRow: {
    maxHeight: 44,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(26,26,26,0.08)',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#D4AF37',
  },
  tabText: { fontSize: 13, color: '#6C6863' },
  tabTextActive: { color: '#D4AF37', fontWeight: '600' },

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
  cardItemRight: { alignItems: 'center', marginLeft: 8 },
  favIcon: { fontSize: 16, color: '#9CA3AF' },
  cardChevron: { fontSize: 20, color: '#9CA3AF', marginTop: 2 },
});
