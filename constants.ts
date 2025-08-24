import { Difficulty } from './types';

export const POINTS: Record<Difficulty, number> = {
  easy: 10,
  medium: 15,
  hard: 20,
};

export const MISTAKE_PENALTY = -10;

export const TIME_CHALLENGE_SECONDS = 90;
export const TIME_BONUS_CORRECT = 1;
export const TIME_PENALTY_INCORRECT = -2;

export const ROUND_REQUIREMENTS: Record<Difficulty, number> = {
  easy: 6,
  medium: 6,
  hard: 6,
};

export const TOTAL_ROUNDS_PER_LEVEL = 3;

export const STREAK_BONUS_THRESHOLD = 3;
export const STREAK_BONUS_POINTS = 10;

// New constants for Grammar Quiz mode
export const GRAMMAR_POINTS_CORRECT = 10;
export const GRAMMAR_POINTS_INCORRECT = -5;
export const GRAMMAR_TIMER_SECONDS = 15;
export const GRAMMAR_INITIAL_LIVES = 3;
export const GRAMMAR_LEVEL_UP_THRESHOLD = 5; // Correct answers to level up

// New constants for Listening Quiz mode
export const LISTENING_POINTS_CORRECT = 15;
export const LISTENING_POINTS_INCORRECT = -5;
export const LISTENING_LEVEL_UP_THRESHOLD = 5; // Correct answers to level up
export const LISTENING_INITIAL_LIVES = 5;