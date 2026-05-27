import { createContext } from 'react';
import { Tabs } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { useStorage } from '../../hooks/useStorage';
import { usePractice } from '../../hooks/usePractice';
import { useFavorite } from '../../hooks/useFavorite';
import { useCards } from '../../hooks/useCards';

export const AppContext = createContext<ReturnType<typeof useAppState> | null>(null);

function useAppState() {
  const { data, ready, persist } = useStorage();
  const { recordPractice } = usePractice(data, persist);
  const { toggleFavorite, isFavorite } = useFavorite(data, persist);
  const { currentCard, shuffling, drawCard } = useCards();

  return {
    ready,
    data,
    currentCard,
    shuffling,
    drawCard,
    recordPractice,
    toggleFavorite,
    isFavorite,
  };
}

export default function TabLayout() {
  const state = useAppState();

  if (!state.ready) {
    return null;
  }

  return (
    <AppContext.Provider value={state}>
      <Tabs
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#D4AF37',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: '首页',
            headerTitle: '课题分离',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>◇</Text>,
          }}
        />
        <Tabs.Screen
          name="draw"
          options={{
            title: '抽取',
            headerTitle: '随机抽取',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>◎</Text>,
          }}
        />
        <Tabs.Screen
          name="browse"
          options={{
            title: '浏览',
            headerTitle: '全部卡牌',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>☰</Text>,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: '收藏',
            headerTitle: '我的收藏',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>★</Text>,
          }}
        />
      </Tabs>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F9F8F6',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(26,26,26,0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(26,26,26,0.1)',
    paddingTop: 4,
    height: 60,
  },
  tabLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
});
