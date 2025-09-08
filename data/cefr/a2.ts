import { CefrWord, SentenceFormationData, ReadingComprehensionData } from '../../types';

export const A2_WORDS: CefrWord[] = [
    { word: 'usually', ar: 'عادةً', pos: 'adverb', example: { sentence: 'I ____ wake up at 7 AM.', ar: 'أنا عادةً أستيقظ في السابعة صباحًا.' } },
    { word: 'because', ar: 'لأن', pos: 'phrase', example: { sentence: 'I am tired ____ I did not sleep well.', ar: 'أنا متعب لأنني لم أنم جيدًا.' } },
    { word: 'job', ar: 'وظيفة', pos: 'noun', example: { sentence: 'She is looking for a new ____.', ar: 'هي تبحث عن وظيفة جديدة.' }, synonyms: ['occupation', 'profession'] },
    { word: 'visit', ar: 'يزور', pos: 'verb', example: { sentence: 'We will ____ our grandparents this weekend.', ar: 'سنزور أجدادنا في نهاية هذا الأسبوع.' } },
    { word: 'beautiful', ar: 'جميل', pos: 'adjective', example: { sentence: 'The sunset was ____.', ar: 'كان غروب الشمس جميلاً.' }, synonyms: ['lovely', 'pretty'], antonyms: ['ugly'] },
    { word: 'often', ar: 'غالباً', pos: 'adverb', example: { sentence: 'He ____ goes to the gym after work.', ar: 'هو غالباً يذهب إلى النادي الرياضي بعد العمل.' }, synonyms: ['frequently'], antonyms: ['rarely', 'seldom'] },
    { word: 'wait', ar: 'ينتظر', pos: 'verb', example: { sentence: 'Please ____ for me.', ar: 'من فضلك انتظرني.' } },
    { word: 'delicious', ar: 'لذيذ', pos: 'adjective', example: { sentence: 'This cake is ____.', ar: 'هذه الكعكة لذيذة.' }, synonyms: ['tasty', 'yummy'], antonyms: ['disgusting'] },
    { word: 'money', ar: 'نقود', pos: 'noun', example: { sentence: 'I need to save more ____.', ar: 'أحتاج أن أوفر المزيد من النقود.' } },
    { word: 'forget', ar: 'ينسى', pos: 'verb', example: { sentence: 'Don\'t ____ to lock the door.', ar: 'لا تنسى أن تقفل الباب.' }, antonyms: ['remember'] },
    { word: 'important', ar: 'مهم', pos: 'adjective', example: { sentence: 'It is ____ to study for the exam.', ar: 'من المهم أن تدرس للامتحان.' }, synonyms: ['significant', 'vital'], antonyms: ['unimportant'] },
    { word: 'sometimes', ar: 'أحياناً', pos: 'adverb', example: { sentence: '____ I go for a walk in the evening.', ar: 'أحياناً أذهب للمشي في المساء.' } },
    { word: 'buy', ar: 'يشتري', pos: 'verb', example: { sentence: 'I need to ____ some milk from the store.', ar: 'أحتاج أن أشتري بعض الحليب من المتجر.' }, synonyms: ['purchase'], antonyms: ['sell'] },
    { word: 'easy', ar: 'سهل', pos: 'adjective', example: { sentence: 'The test was very ____.', ar: 'كان الاختبار سهلاً جداً.' }, synonyms: ['simple'], antonyms: ['difficult', 'hard'] },
    { word: 'family', ar: 'عائلة', pos: 'noun', example: { sentence: 'I love spending time with my ____.', ar: 'أحب قضاء الوقت مع عائلتي.' } },
    { word: 'listen', ar: 'يستمع', pos: 'verb', example: { sentence: 'She likes to ____ to music.', ar: 'هي تحب أن تستمع إلى الموسيقى.' } },
    { word: 'expensive', ar: 'غالي', pos: 'adjective', example: { sentence: 'That watch is too ____.', ar: 'تلك الساعة غالية جداً.' }, synonyms: ['costly'], antonyms: ['cheap'] },
    { word: 'weather', ar: 'طقس', pos: 'noun', example: { sentence: 'The ____ is nice today.', ar: 'الطقس جميل اليوم.' } },
    { word: 'help', ar: 'يساعد', pos: 'verb', example: { sentence: 'Can you ____ me with this box?', ar: 'هل يمكنك مساعدتي بهذا الصندوق؟' }, synonyms: ['assist'] },
    { word: 'different', ar: 'مختلف', pos: 'adjective', example: { sentence: 'They have very ____ opinions.', ar: 'لديهم آراء مختلفة جداً.' }, synonyms: ['various'], antonyms: ['similar'] },
    { word: 'arrive', ar: 'يصل', pos: 'verb', example: { sentence: 'What time did you ____ at the station?', ar: 'في أي وقت وصلت إلى المحطة؟' }, antonyms: ['depart', 'leave'] },
    { word: 'dangerous', ar: 'خطير', pos: 'adjective', example: { sentence: 'Swimming in this river is ____.', ar: 'السباحة في هذا النهر خطيرة.' }, synonyms: ['hazardous'], antonyms: ['safe'] },
    { word: 'explain', ar: 'يشرح', pos: 'verb', example: { sentence: 'Can you ____ the rules of the game to me?', ar: 'هل يمكنك أن تشرح لي قواعد اللعبة؟' } },
    { word: 'famous', ar: 'مشهور', pos: 'adjective', example: { sentence: 'He is a ____ actor.', ar: 'هو ممثل مشهور.' }, synonyms: ['well-known'], antonyms: ['unknown'] },
];

export const A2_SENTENCES: SentenceFormationData[] = [
    
  {
    jumbled: ['at', 'seven', 'o’clock', 'up', 'gets', 'She'],
    correct: 'She gets up at seven o’clock.',
    distractors: ['Gets she up at seven o’clock.', 'She up gets at seven o’clock.']
  },
  {
    jumbled: ['the', 'bus', 'school', 'takes', 'to', 'Ali'],
    correct: 'Ali takes the bus to school.',
    distractors: ['Takes Ali school the bus to.', 'Ali school to takes the bus.']
  },
  {
    jumbled: ['homework', 'evening', 'her', 'does', 'Leila', 'every'],
    correct: 'Leila does her homework every evening.',
    distractors: ['Her does Leila homework every evening.', 'Does Leila every homework evening her.']
  },
  {
    jumbled: ['goes', 'weekends', 'on', 'shopping', 'She'],
    correct: 'She goes shopping on weekends.',
    distractors: ['Shopping on weekends she goes.', 'She on weekends shopping goes.']
  },
  {
    jumbled: ['football', 'friends', 'with', 'plays', 'his', 'Omar'],
    correct: 'Omar plays football with his friends.',
    distractors: ['Omar football with his friends plays.', 'With Omar his friends plays football.']
  },
  {
    jumbled: ['zoo', 'to', 'went', 'They', 'the', 'yesterday'],
    correct: 'They went to the zoo yesterday.',
    distractors: ['Went to they the zoo yesterday.', 'They the zoo went to yesterday.']
  },
  {
    jumbled: ['a', 'book', 'is', 'reading', 'Rania'],
    correct: 'Rania is reading a book.',
    distractors: ['Is a Rania reading book.', 'Rania a is book reading.']
  },
  {
    jumbled: ['dinner', 'always', 'family', 'with', 'has', 'He'],
    correct: 'He always has dinner with family.',
    distractors: ['Dinner has he always with family.', 'He has always with family dinner.']
  },
  {
    jumbled: ['last', 'visited', 'grandparents', 'their', 'They', 'month'],
    correct: 'They visited their grandparents last month.',
    distractors: ['They last visited month their grandparents.', 'Grandparents last month they visited their.']
  },
  {
    jumbled: ['English', 'is', 'favorite', 'Her', 'subject'],
    correct: 'Her favorite subject is English.',
    distractors: ['English favorite is her subject.', 'Her is subject favorite English.']
  },
  {
    jumbled: ['is', 'What', 'your', 'favorite', 'color'],
    correct: 'What is your favorite color?',
    distractors: ['Your favorite color is what?', 'What color favorite is your?']
  },
  {
    jumbled: ['is', 'She', 'music', 'listening', 'to'],
    correct: 'She is listening to music.',
    distractors: ['Music is listening to she.', 'She listening to is music.']
  }
];

export const A2_READING: ReadingComprehensionData[] = [
  {
    passage: 'Last Friday, Mariam and her friends went to the zoo. They saw many animals, like elephants, monkeys, and giraffes. Mariam liked the monkeys because they were funny and made everyone laugh.',
    question: 'Why did Mariam like the monkeys?',
    options: ['Because they were big', 'Because they were funny', 'Because they were quiet'],
    correctAnswer: 'Because they were funny'
  },
  {
    passage: 'Every morning, Ahmed takes the bus to his university. The bus is usually crowded, so sometimes he has to stand. During the ride, he often reads the news on his phone or listens to music.',
    question: 'What does Ahmed usually do during the bus ride?',
    options: ['Sleep', 'Read the news or listen to music', 'Talk to his friends'],
    correctAnswer: 'Read the news or listen to music'
  },
  {
    passage: 'Fatima went to the supermarket yesterday. She bought rice, chicken, and vegetables because her family wanted to have a special dinner. She paid with her credit card and carried two heavy bags home.',
    question: 'How did Fatima pay at the supermarket?',
    options: ['With cash', 'With her credit card', 'With a check'],
    correctAnswer: 'With her credit card'
  },
  {
    passage: 'Omar loves sports. He usually plays football on weekends, but last weekend it rained a lot, so he stayed at home. Instead, he watched a football match on TV with his brother.',
    question: 'Why didn’t Omar play football last weekend?',
    options: ['He was sick', 'It rained a lot', 'He had no friends to play with'],
    correctAnswer: 'It rained a lot'
  },
  {
    passage: 'Layla enjoys learning English. She goes to a language center three times a week. In class, she practices speaking with her classmates and does listening exercises. She also watches English movies at home to improve.',
    question: 'How many times a week does Layla go to the language center?',
    options: ['Two', 'Three', 'Four'],
    correctAnswer: 'Three'
  },
  {
    passage: 'Ali and his family traveled to Baghdad last month to visit his grandparents. They stayed for three days, visited museums, and went shopping in the city center. Ali’s grandmother cooked delicious food for them every evening.',
    question: 'What did Ali’s family do in Baghdad?',
    options: ['Visited museums and went shopping', 'Went swimming', 'Worked in the fields'],
    correctAnswer: 'Visited museums and went shopping'
  },
  {
    passage: 'Nour’s school organized a sports day last week. Students competed in running, swimming, and basketball. Nour joined the running race and won second place. She was very proud of herself.',
    question: 'Which sport did Nour compete in?',
    options: ['Swimming', 'Running', 'Basketball'],
    correctAnswer: 'Running'
  },
  {
    passage: 'Hassan works in a small restaurant in the city. He serves food to customers and sometimes helps the cook in the kitchen. He usually works in the evening because many people come to eat dinner.',
    question: 'When does Hassan usually work?',
    options: ['In the morning', 'In the evening', 'At night'],
    correctAnswer: 'In the evening'
  },
  {
    passage: 'Rania loves traveling. Last year, she visited Egypt and saw the pyramids. She took many photos and bought some gifts for her friends. She said the trip was one of the best experiences in her life.',
    question: 'What did Rania see in Egypt?',
    options: ['The pyramids', 'The desert', 'The Nile'],
    correctAnswer: 'The pyramids'
  },
  {
    passage: 'Karim wakes up at 6 a.m. every day. He eats breakfast quickly and then takes the train to his office. He works as a secretary, answering phone calls and writing emails. After work, he goes to the gym to exercise.',
    question: 'What does Karim do after work?',
    options: ['Goes shopping', 'Goes to the gym', 'Visits his friends'],
    correctAnswer: 'Goes to the gym'
  }
,
];