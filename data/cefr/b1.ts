import { CefrWord, SentenceFormationData, ReadingComprehensionData } from '../../types';

export const B1_WORDS: CefrWord[] = [
    { word: 'achieve', ar: 'يحقق', pos: 'verb', example: { sentence: 'You must work hard to ____ your goals.', ar: 'يجب أن تعمل بجد لتحقق أهدافك.' }, synonyms: ['accomplish', 'attain'], antonyms: ['fail'] },
    { word: 'confident', ar: 'واثق', pos: 'adjective', example: { sentence: 'She felt ____ about her exam results.', ar: 'شعرت بالثقة بشأن نتائج امتحانها.' }, synonyms: ['self-assured'], antonyms: ['insecure', 'nervous'] },
    { word: 'discuss', ar: 'يناقش', pos: 'verb', example: { sentence: 'Let\'s ____ the plan for the project.', ar: 'دعنا نناقش خطة المشروع.' }, synonyms: ['debate', 'talk about'] },
    { word: 'environment', ar: 'بيئة', pos: 'noun', example: { sentence: 'We need to protect the ____.', ar: 'نحن بحاجة لحماية البيئة.' } },
    { word: 'goal', ar: 'هدف', pos: 'noun', example: { sentence: 'My main ____ is to learn Spanish.', ar: 'هدفي الرئيسي هو تعلم الإسبانية.' }, synonyms: ['objective', 'aim'] },
    { word: 'improve', ar: 'يحسن', pos: 'verb', example: { sentence: 'I want to ____ my English skills.', ar: 'أريد تحسين مهاراتي في اللغة الإنجليزية.' }, synonyms: ['enhance', 'develop'], antonyms: ['worsen'] },
    { word: 'knowledge', ar: 'معرفة', pos: 'noun', example: { sentence: 'Reading books increases your ____.', ar: 'قراءة الكتب تزيد من معرفتك.' } },
    { word: 'opportunity', ar: 'فرصة', pos: 'noun', example: { sentence: 'This job is a great ____ for me.', ar: 'هذه الوظيفة فرصة عظيمة لي.' }, synonyms: ['chance'] },
    { word: 'patient', ar: 'صبور', pos: 'adjective', example: { sentence: 'You need to be ____ when learning a new skill.', ar: 'تحتاج أن تكون صبورًا عند تعلم مهارة جديدة.' }, antonyms: ['impatient'] },
    { word: 'quality', ar: 'جودة', pos: 'noun', example: { sentence: 'The ____ of this product is very high.', ar: 'جودة هذا المنتج عالية جدًا.' }, antonyms: ['inferiority'] },
    { word: 'reduce', ar: 'يقلل', pos: 'verb', example: { sentence: 'We should ____ the amount of plastic we use.', ar: 'يجب أن نقلل كمية البلاستيك التي نستخدمها.' }, synonyms: ['decrease', 'lessen'], antonyms: ['increase'] },
    { word: 'skill', ar: 'مهارة', pos: 'noun', example: { sentence: 'Communication is an important ____.', ar: 'التواصل مهارة مهمة.' }, synonyms: ['ability', 'talent'] },
    { word: 'suggest', ar: 'يقترح', pos: 'verb', example: { sentence: 'I ____ we go to the cinema.', ar: 'أقترح أن نذهب إلى السينما.' }, synonyms: ['propose', 'recommend'] },
    { word: 'success', ar: 'نجاح', pos: 'noun', example: { sentence: 'Hard work is the key to ____.', ar: 'العمل الجاد هو مفتاح النجاح.' }, antonyms: ['failure'] },
    { word: 'understand', ar: 'يفهم', pos: 'verb', example: { sentence: 'Do you ____ the question?', ar: 'هل تفهم السؤال؟' }, synonyms: ['comprehend', 'grasp'], antonyms: ['misunderstand'] },
    { word: 'valuable', ar: 'قيم', pos: 'adjective', example: { sentence: 'Your advice is very ____ to me.', ar: 'نصيحتك قيمة جدًا بالنسبة لي.' }, synonyms: ['precious'], antonyms: ['worthless'] },
    { word: 'waste', ar: 'يهدر', pos: 'verb', example: { sentence: 'Don\'t ____ your time on unimportant things.', ar: 'لا تهدر وقتك في أشياء غير مهمة.' }, synonyms: ['squander'], antonyms: ['save'] },
    { word: 'anxious', ar: 'قلق', pos: 'adjective', example: { sentence: 'He was ____ about the interview.', ar: 'كان قلقًا بشأن المقابلة.' }, synonyms: ['worried', 'nervous'], antonyms: ['calm'] },
    { word: 'compare', ar: 'يقارن', pos: 'verb', example: { sentence: 'It is not fair to ____ the two students.', ar: 'ليس من العدل مقارنة الطالبين.' } },
    { word: 'develop', ar: 'يطور', pos: 'verb', example: { sentence: 'The city continues to ____ quickly.', ar: 'تستمر المدينة في التطور بسرعة.' }, synonyms: ['grow', 'expand'] },
];

export const B1_SENTENCES: SentenceFormationData[] = [
   
  {
    jumbled: ['plans', 'summer', 'next', 'to', 'travel', 'Europe', 'She', 'has'],
    correct: 'She has plans to travel to Europe next summer.',
    distractors: ['She travel to Europe has plans next summer.', 'Next summer she has to Europe plans travel.']
  },
  {
    jumbled: ['exercise', 'regularly', 'good', 'health', 'for', 'is'],
    correct: 'Regularly doing exercise is good for health.',
    distractors: ['Exercise regularly is for good health doing.', 'Health is good for exercise regularly doing.']
  },
  {
    jumbled: ['meeting', 'the', 'was', 'postponed', 'week', 'next', 'until'],
    correct: 'The meeting was postponed until next week.',
    distractors: ['Next week was postponed until the meeting.', 'Was postponed the meeting next until week.']
  },
  {
    jumbled: ['late', 'because', 'missed', 'bus', 'arrived', 'He', 'the'],
    correct: 'He arrived late because he missed the bus.',
    distractors: ['Because he late missed the bus arrived.', 'He missed because the bus late arrived.']
  },
  {
    jumbled: ['interested', 'are', 'environment', 'protecting', 'They', 'in'],
    correct: 'They are interested in protecting the environment.',
    distractors: ['They in protecting are interested the environment.', 'Protecting the environment they are in interested.']
  },
  {
    jumbled: ['important', 'learn', 'is', 'language', 'second', 'a', 'It', 'to'],
    correct: 'It is important to learn a second language.',
    distractors: ['Important is it learn a to second language.', 'To learn a second important is language it.']
  },
  {
    jumbled: ['yesterday', 'explained', 'teacher', 'homework', 'the', 'our', 'clearly'],
    correct: 'The teacher explained our homework clearly yesterday.',
    distractors: ['Clearly yesterday explained the teacher homework our.', 'Our clearly teacher explained the homework yesterday.']
  },
  {
    jumbled: ['decided', 'new', 'They', 'open', 'restaurant', 'a', 'to'],
    correct: 'They decided to open a new restaurant.',
    distractors: ['To open a restaurant new they decided.', 'A new restaurant they decided to open.']
  },
  {
    jumbled: ['responsible', 'protecting', 'for', 'all', 'are', 'We', 'nature'],
    correct: 'We are all responsible for protecting nature.',
    distractors: ['Nature are we responsible for protecting all.', 'All we are responsible nature protecting for.']
  },
  {
    jumbled: ['exam', 'prepare', 'must', 'for', 'hard', 'You', 'the'],
    correct: 'You must prepare hard for the exam.',
    distractors: ['The exam must hard prepare for you.', 'Prepare you must hard exam for the.']
  }
]


export const B1_READING: ReadingComprehensionData[] = [
  {
    passage: 'Learning a new language takes time and practice. Some people think it is difficult, but the benefits are great. You can travel more easily, find better job opportunities, and understand other cultures. The key is to practice a little every day.',
    question: 'According to the passage, what is the key to learning a new language?',
    options: ['Studying only before exams.', 'Practicing a little every day.', 'Traveling to another country.'],
    correctAnswer: 'Practicing a little every day.'
  },
  {
    passage: 'Many people today prefer online shopping because it is fast and convenient. You can compare prices, read reviews, and order products without leaving home. However, some worry about security and the quality of items they cannot see before buying.',
    question: 'What is one disadvantage of online shopping mentioned in the passage?',
    options: ['It takes too much time.', 'You cannot see the items before buying.', 'There are no reviews available.'],
    correctAnswer: 'You cannot see the items before buying.'
  },
  {
    passage: 'Last month, our school organized a charity event to collect money for poor families. Students sold homemade food, old books, and handmade crafts. Many teachers and parents also came to support the event. In the end, we collected enough money to help more than 20 families.',
    question: 'What was the main purpose of the charity event?',
    options: ['To help poor families.', 'To sell old books.', 'To invite parents to school.'],
    correctAnswer: 'To help poor families.'
  },
  {
    passage: 'Exercising regularly is important for both physical and mental health. It makes your body stronger and also reduces stress. Doctors recommend at least 30 minutes of activity every day, such as walking, running, or cycling.',
    question: 'What do doctors recommend in the passage?',
    options: ['Thirty minutes of activity daily.', 'Exercising only once a week.', 'Doing only mental exercises.'],
    correctAnswer: 'Thirty minutes of activity daily.'
  },
  {
    passage: 'Climate change is a serious problem that affects the whole world. Temperatures are rising, ice is melting, and many animals are losing their homes. Governments and people need to work together to reduce pollution and protect the environment for the future.',
    question: 'What is the main problem discussed in the passage?',
    options: ['Air pollution in cities.', 'Climate change and its effects.', 'Animals moving to new places.'],
    correctAnswer: 'Climate change and its effects.'
  }
]

