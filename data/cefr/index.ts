import { CefrLevel, CefrWord, SentenceFormationData, ReadingComprehensionData, CEFR_LEVELS_ORDER as cefrLevelsOrder } from '../../types';
import { A1_WORDS, A1_SENTENCES, A1_READING } from './a1';
import { A2_WORDS, A2_SENTENCES, A2_READING } from './a2';
import { B1_WORDS, B1_SENTENCES, B1_READING } from './b1';
import { B2_WORDS, B2_SENTENCES, B2_READING } from './b2';
import { C1_WORDS, C1_SENTENCES, C1_READING } from './c1';
import { C2_WORDS, C2_SENTENCES, C2_READING } from './c2';


export const CEFR_LEVELS_ORDER: CefrLevel[] = cefrLevelsOrder;

export const VOCAB_ESTIMATES: Record<CefrLevel, string> = {
    A1: '≈ 500 كلمة',
    A2: '≈ 1,000 كلمة',
    B1: '≈ 2,000 كلمة',
    B2: '≈ 4,000 كلمة',
    C1: '≈ 8,000 كلمة',
    C2: '≈ 16,000+ كلمة',
};

export const CEFR_WORD_BANK: Record<CefrLevel, CefrWord[]> = {
    A1: A1_WORDS,
    A2: A2_WORDS,
    B1: B1_WORDS,
    B2: B2_WORDS, 
    C1: C1_WORDS, 
    C2: C2_WORDS,
};

export const CEFR_SENTENCE_BANK: Record<CefrLevel, SentenceFormationData[]> = {
    A1: A1_SENTENCES,
    A2: A2_SENTENCES,
    B1: B1_SENTENCES,
    B2: B2_SENTENCES,
    C1: C1_SENTENCES,
    C2: C2_SENTENCES,
};

export const CEFR_READING_BANK: Record<CefrLevel, ReadingComprehensionData[]> = {
    A1: A1_READING,
    A2: A2_READING,
    B1: B1_READING,
    B2: B2_READING,
    C1: C1_READING,
    C2: C2_READING,
};
