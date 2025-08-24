import { ListeningQuestion } from '../types';

// This data source with embedded audio is deprecated due to loading issues.
// The game now uses `data/listeningWords.ts` and the browser's Text-to-Speech API.
export const LISTENING_QUESTIONS: Record<number, ListeningQuestion[]> = {};
