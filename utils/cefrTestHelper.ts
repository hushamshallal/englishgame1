import { CefrLevel, CefrWord, CefrQuestion, QuestionType, SentenceFormationData, ReadingComprehensionData } from '../types';

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

export const QUESTIONS_PER_LEVEL = 10;

/**
 * Generates a single question of a specific type.
 * This function encapsulates the logic for creating one question and managing used indices.
 * @returns A CefrQuestion object or null if generation fails.
 */
const generateSingleQuestion = (
    questionType: QuestionType,
    wordBank: CefrWord[],
    sentenceBank: SentenceFormationData[],
    readingBank: ReadingComprehensionData[],
    usedWordIndices: Set<number>,
    usedSentenceIndices: Set<number>,
    usedReadingIndices: Set<number>
): CefrQuestion | null => {
    switch (questionType) {
        case 'meaning':
        case 'usage':
        case 'synonym':
        case 'antonym':
        case 'matching': {
            const availableWords = wordBank
                .map((word, index) => ({ word, index }))
                .filter(({ index }) => !usedWordIndices.has(index));

            if (availableWords.length < 4) return null; // Need enough words for options
            
            let selectedWordInfo: { word: CefrWord, index: number } | undefined;

            if (questionType === 'synonym') {
                selectedWordInfo = shuffleArray(availableWords).find(w => w.word.synonyms && w.word.synonyms.length > 0);
            } else if (questionType === 'antonym') {
                selectedWordInfo = shuffleArray(availableWords).find(w => w.word.antonyms && w.word.antonyms.length > 0);
            } else {
                selectedWordInfo = availableWords[Math.floor(Math.random() * availableWords.length)];
            }
            
            if (!selectedWordInfo) return null;

            const { word: wordInfo, index: wordIndex } = selectedWordInfo;

            let questionText = '';
            let correctAnswer = '';
            let options: string[] = [];
            
            if (questionType === 'meaning') {
                questionText = `ما معنى كلمة "${wordInfo.word}"؟`;
                correctAnswer = wordInfo.ar;
                const wrongOptions = shuffleArray(wordBank.filter(w => w.word !== wordInfo.word)).slice(0, 3).map(w => w.ar);
                options = shuffleArray([correctAnswer, ...wrongOptions]);
            } else if (questionType === 'usage') {
                    questionText = `أكمل الجملة: <br/> <p class="font-mono ltr my-2 text-xl">${wordInfo.example.sentence.replace('____', '<span class="font-bold text-sky-500">____</span>')}</p>`;
                    correctAnswer = wordInfo.word;
                    const wrongOptions = shuffleArray(wordBank.filter(w => w.pos === wordInfo.pos && w.word !== wordInfo.word)).slice(0, 3).map(w => w.word);
                    options = shuffleArray([correctAnswer, ...wrongOptions]);
            } else if (questionType === 'synonym') {
                    questionText = `اختر المرادف لكلمة "${wordInfo.word}":`;
                    correctAnswer = wordInfo.synonyms![0];
                    const wrongOptions = shuffleArray(wordBank.filter(w => w.word !== wordInfo.word && !wordInfo.synonyms?.includes(w.word))).slice(0, 3).map(w => w.word);
                    options = shuffleArray([correctAnswer, ...wrongOptions]);
            } else if (questionType === 'antonym') {
                    questionText = `اختر الضد لكلمة "${wordInfo.word}":`;
                    correctAnswer = wordInfo.antonyms![0];
                    const wrongOptions = shuffleArray(wordBank.filter(w => w.word !== wordInfo.word && !wordInfo.antonyms?.includes(w.word))).slice(0, 3).map(w => w.word);
                    options = shuffleArray([correctAnswer, ...wrongOptions]);
            } else if (questionType === 'matching') {
                questionText = `أي من الأزواج التالية صحيح؟`;
                correctAnswer = `${wordInfo.word} - ${wordInfo.ar}`;
                const wrongWords = shuffleArray(wordBank.filter(w => w.word !== wordInfo.word)).slice(0, 3);
                const wrongOptions = wrongWords.map(w => `${w.word} - ${shuffleArray(wordBank.filter(innerW => innerW.ar !== w.ar))[0].ar}`);
                options = shuffleArray([correctAnswer, ...wrongOptions]);
            }

            if (options.length > 3) {
                usedWordIndices.add(wordIndex);
                return { questionType, questionText, options, correctAnswer };
            }
            return null;
        }
        case 'sentence_formation': {
            const availableSentences = sentenceBank
                .map((sentence, index) => ({ sentence, index }))
                .filter(({ index }) => !usedSentenceIndices.has(index));
            
            if (availableSentences.length === 0) return null;

            const { sentence: sentenceInfo, index: sentenceIndex } = availableSentences[Math.floor(Math.random() * availableSentences.length)];
            usedSentenceIndices.add(sentenceIndex);
            return {
                questionType,
                questionText: `رتب الكلمات لتكوين جملة صحيحة: <br/> <p class="font-mono text-xl my-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">${shuffleArray(sentenceInfo.jumbled).join(' / ')}</p>`,
                options: shuffleArray([sentenceInfo.correct, ...sentenceInfo.distractors]),
                correctAnswer: sentenceInfo.correct
            };
        }
        case 'reading_comprehension': {
            const availableReadings = readingBank
                .map((reading, index) => ({ reading, index }))
                .filter(({ index }) => !usedReadingIndices.has(index));
            
            if (availableReadings.length === 0) return null;

            const { reading: readingInfo, index: readingIndex } = availableReadings[Math.floor(Math.random() * availableReadings.length)];
            usedReadingIndices.add(readingIndex);
            return {
                questionType,
                questionText: `اقرأ النص وأجب عن السؤال:<div class="text-left my-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-700/50">${readingInfo.passage}</div><p class="font-bold">${readingInfo.question}</p>`,
                options: shuffleArray(readingInfo.options),
                correctAnswer: readingInfo.correctAnswer
            };
        }
        default:
            return null;
    }
};

/**
 * Defines the target distribution of question types for each CEFR level.
 * This ensures a balanced and varied test experience.
 */
const getTargetDistribution = (level: CefrLevel): QuestionType[] => {
    const prioritizedVocab: QuestionType[] = ['meaning', 'usage', 'matching'];
    const advancedVocab: QuestionType[] = ['synonym', 'antonym'];
    
    let structureCount: number;
    switch (level) {
        case 'A1':
        case 'A2':
            structureCount = 2; // Results in 2 reading, 2 sentence questions
            break;
        case 'B1':
        case 'B2':
            structureCount = 3; // Results in 3 reading, 3 sentence questions
            break;
        case 'C1':
        case 'C2':
            structureCount = 4; // Results in 4 reading, 4 sentence questions
            break;
        default:
            structureCount = 2; // Fallback
    }

    const distribution: QuestionType[] = [];
    // Add equal numbers of reading and sentence formation questions
    for (let i = 0; i < structureCount; i++) {
        distribution.push('reading_comprehension');
        distribution.push('sentence_formation');
    }

    // Fill the rest with varied vocabulary questions
    const remainingVocabCount = QUESTIONS_PER_LEVEL - distribution.length;
    if (level === 'A1' || level === 'A2') {
        for (let i = 0; i < remainingVocabCount; i++) {
            distribution.push(prioritizedVocab[i % prioritizedVocab.length]);
        }
    } else { // For B1+, include synonyms/antonyms
        const allVocab = [...prioritizedVocab, ...advancedVocab];
        for (let i = 0; i < remainingVocabCount; i++) {
            distribution.push(allVocab[i % allVocab.length]);
        }
    }
    
    return distribution;
};

export const generateQuestionsForLevel = (
    level: CefrLevel,
    wordBank: CefrWord[],
    sentenceBank: SentenceFormationData[],
    readingBank: ReadingComprehensionData[]
): CefrQuestion[] => {
    const questions: CefrQuestion[] = [];
    const usedWordIndices = new Set<number>();
    const usedSentenceIndices = new Set<number>();
    const usedReadingIndices = new Set<number>();

    // Determine which question types are possible with the given data
    const availableTypes: QuestionType[] = [];
    if (wordBank.length > 3) { // Need at least 4 words for a question with 3 wrong options
        availableTypes.push('meaning', 'usage', 'matching');
        if (wordBank.some(w => w.synonyms && w.synonyms.length > 0)) availableTypes.push('synonym');
        if (wordBank.some(w => w.antonyms && w.antonyms.length > 0)) availableTypes.push('antonym');
    }
    if (sentenceBank.length > 0) availableTypes.push('sentence_formation');
    if (readingBank.length > 0) availableTypes.push('reading_comprehension');
    
    if (availableTypes.length === 0) return [];

    // Get the ideal distribution and shuffle it to randomize question order
    const targetDistribution = shuffleArray(getTargetDistribution(level));
    const fallbackTypes: QuestionType[] = ['usage', 'meaning', 'matching'];

    for (const desiredType of targetDistribution) {
        if (questions.length >= QUESTIONS_PER_LEVEL) break;

        let generatedQuestion: CefrQuestion | null = null;
        
        // Create a prioritized list of types to try, starting with the desired one
        const typesToTry = Array.from(new Set([desiredType, ...fallbackTypes]))
                               .filter(type => availableTypes.includes(type));

        for (const type of typesToTry) {
            generatedQuestion = generateSingleQuestion(
                type,
                wordBank, sentenceBank, readingBank,
                usedWordIndices, usedSentenceIndices, usedReadingIndices
            );
            
            if (generatedQuestion) {
                questions.push(generatedQuestion);
                break; // Success, move to the next desired type in the distribution
            }
        }
    }
    
    // Final safety net: if the test is still not full, fill with basic questions
    while(questions.length < QUESTIONS_PER_LEVEL && wordBank.length > usedWordIndices.size + 3) {
        const question = generateSingleQuestion('meaning', wordBank, sentenceBank, readingBank, usedWordIndices, usedSentenceIndices, usedReadingIndices);
        if (question) {
            questions.push(question);
        } else {
            break; // Stop if we can't even generate basic questions
        }
    }

    return questions.slice(0, QUESTIONS_PER_LEVEL);
};
