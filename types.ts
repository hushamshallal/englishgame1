
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'time' | 'training' | 'category';

export const CATEGORIES = ['jobs', 'animals', 'tech', 'transport', 'places', 'family', 'verbs', 'education', 'food', 'internet', 'general', 'life'] as const;
export type Category = typeof CATEGORIES[number];

export type WordItem = {
  id: string;
  ar: string;
  en: string;
  difficulty: Difficulty;
  category: Category;
};

export interface GameOptions {
    mode: GameMode;
    difficulty?: Difficulty;
    category?: Category;
}

export interface CardState {
    id: string; // unique id for the card instance
    wordId: string; // id from WordItem
    lang: 'ar' | 'en';
    text: string;
    difficulty: Difficulty;
    isFlipped: boolean;
    isMatched: boolean;
}

export interface SessionStats {
    mode: GameMode;
    score: number;
    matches: number;
    level?: Difficulty;
    round?: number;
    timeTaken?: number;
}