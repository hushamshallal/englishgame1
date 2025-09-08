// FIX: Removed a circular import. This file was importing a type from itself,
// causing a conflict with the type declaration below.

export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'time' | 'training' | 'category' | 'grammar' | 'listening' | 'cefr-test';

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
    'emotions_feelings',
    'travel'
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
    subMode?: 'timed' | 'lives';
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
    grammarLevel?: number;
    listeningLevel?: number;
    cefrResult?: CefrResult;
}

export interface GrammarQuestion {
    sentence_with_blank: string;
    options: string[];
    correct_answer: string;
    explanation_ar: string;
    grammar_topic: string; // e.g., "Present Simple", "Passive Voice"
}

export interface GrammarStats {
  totalPoints: number;
  totalCorrect: number;
  totalIncorrect: number;
  topicStats: Record<string, { correct: number; incorrect: number }>;
}

export interface ListeningQuestion {
    id: string;
    level: number;
    correct_answer: string;
    options: string[];
    pronunciation_hint_ar?: string;
}

export interface ListeningStats {
  totalPoints: number;
  totalCorrect: number;
  totalIncorrect: number;
}

// CEFR Test Types
export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export const CEFR_LEVELS_ORDER: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export interface CefrWord {
  word: string;
  ar: string;
  pos: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase';
  example: {
    sentence: string;
    ar: string;
  };
  synonyms?: string[];
  antonyms?: string[];
}

export type QuestionType = 'meaning' | 'usage' | 'synonym' | 'antonym' | 'sentence_formation' | 'reading_comprehension' | 'matching';

// FIX: Added missing CefrQuestion interface.
export interface CefrQuestion {
  questionType: QuestionType;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface CefrResult {
    finalLevel: CefrLevel | 'Beginner';
    failedLevel?: CefrLevel;
    estimatedVocab: string;
    strengths: string[];
    weaknesses: string[];
    advice: string[];
    levelPerformance: Record<string, { 
        score: number, 
        total: number,
        typePerformance: Partial<Record<QuestionType, { correct: number, total: number }>>
    }>;
}

// New data structures for CEFR question banks
export interface SentenceFormationData {
  jumbled: string[]; // e.g., ['is', 'my', 'This', 'brother']
  correct: string; // e.g., 'This is my brother.'
  distractors: string[]; // e.g., ['My is This brother.', 'Brother my is This.']
}

export interface ReadingComprehensionData {
    passage: string;
    question: string;
    options: string[]; // should include correct answer
    correctAnswer: string;
}
