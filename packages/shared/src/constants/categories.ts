import type { Category } from '../types/card';

export interface CategoryMeta {
  key: Category;
  label: string;
  description: string;
  range: [number, number];
  icon: string;
  color: string;
}

export const categories: CategoryMeta[] = [
  {
    key: 'awareness',
    label: '识别与觉察',
    description: '认识课题混淆的时刻',
    range: [1, 24],
    icon: 'eye',
    color: '#6B7280',
  },
  {
    key: 'boundary',
    label: '建立边界',
    description: '构建健康人际边界的工具',
    range: [25, 48],
    icon: 'shield',
    color: '#3B82F6',
  },
  {
    key: 'scenario',
    label: '场景练习',
    description: '高频生活场景的专项练习',
    range: [49, 72],
    icon: 'chat-bubble',
    color: '#10B981',
  },
  {
    key: 'belief',
    label: '信念重塑',
    description: '阿德勒心理学的哲学根基',
    range: [73, 96],
    icon: 'lightbulb',
    color: '#D4AF37',
  },
  {
    key: 'action',
    label: '每日行动',
    description: '可执行的微小日常练习',
    range: [97, 120],
    icon: 'zap',
    color: '#EF4444',
  },
];

export function getCategoryMeta(key: Category): CategoryMeta {
  return categories.find((c) => c.key === key)!;
}

export function getCategoryById(cardId: number): CategoryMeta {
  return categories.find(
    (c) => cardId >= c.range[0] && cardId <= c.range[1]
  )!;
}
