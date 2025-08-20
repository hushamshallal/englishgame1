export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'time' | 'training' | 'category';

export const CATEGORIES = [
    'colors', 
    'numbers', 
    'week_days', 
    'months_seasons', 
    'family', 
    'body_parts', 
    'clothes', 
    'food_drink', 
    'animals', 
    'school_supplies', 
    'home_furniture', 
    'jobs', 
    'city_places', 
    'transport', 
    'weather', 
    'basic_verbs', 
    'adjectives', 
    'pronouns', 
    'prepositions', 
    'tools', 
    'sports_hobbies', 
    'tech_internet', 
    'nature', 
    'holidays_occasions', 
    'emotions_feelings'
] as const;

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
    incorrectAttempts?: number;
    level?: Difficulty;
    round?: number;
    timeTaken?: number;
    win?: boolean;
}