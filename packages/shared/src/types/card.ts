export type Category = 'awareness' | 'boundary' | 'scenario' | 'belief' | 'action';

export interface Card {
  id: number;
  category: Category;
  title: string;
  situation: string;
  solution: string;
  action?: string;
}
