import { CefrWord, SentenceFormationData, ReadingComprehensionData } from '../../types';

export const B2_WORDS: CefrWord[] = [
    // Verbs
    { word: 'persuade', ar: 'يقنع', pos: 'verb', example: { sentence: 'He managed to ____ them to join the team.', ar: 'تمكن من إقناعهم بالانضمام إلى الفريق.' }, synonyms: ['convince'], antonyms: ['dissuade'] },
    { word: 'exaggerate', ar: 'يبالغ', pos: 'verb', example: { sentence: 'He tends to ____ his stories to make them more interesting.', ar: 'يميل إلى المبالغة في قصصه لجعلها أكثر إثارة للاهتمام.' }, synonyms: ['overstate'], antonyms: ['understate'] },
    { word: 'conclude', ar: 'يستنتج', pos: 'verb', example: { sentence: 'From the evidence, we can ____ that he is guilty.', ar: 'من الأدلة، يمكننا أن نستنتج أنه مذنب.' }, synonyms: ['deduce', 'infer'] },
    { word: 'recognize', ar: 'يتعرف على', pos: 'verb', example: { sentence: 'I didn\'t ____ you with your new haircut.', ar: 'لم أتعرف عليك بقصة شعرك الجديدة.' }, synonyms: ['identify'] },
    { word: 'maintain', ar: 'يحافظ على', pos: 'verb', example: { sentence: 'It is important to ____ a healthy diet.', ar: 'من المهم الحفاظ على نظام غذائي صحي.' }, synonyms: ['preserve', 'sustain'] },

    // Nouns
    { word: 'consequence', ar: 'عاقبة', pos: 'noun', example: { sentence: 'Every action has a ____.', ar: 'كل فعل له عاقبة.' }, synonyms: ['result', 'outcome'] },
    { word: 'priority', ar: 'أولوية', pos: 'noun', example: { sentence: 'My main ____ right now is finding a job.', ar: 'أولويتي الرئيسية الآن هي العثور على وظيفة.' } },
    { word: 'issue', ar: 'قضية', pos: 'noun', example: { sentence: 'Climate change is a major global ____.', ar: 'تغير المناخ هو قضية عالمية رئيسية.' }, synonyms: ['problem', 'matter'] },
    { word: 'approach', ar: 'نهج', pos: 'noun', example: { sentence: 'We need a new ____ to solve this problem.', ar: 'نحن بحاجة إلى نهج جديد لحل هذه المشكلة.' }, synonyms: ['method', 'strategy'] },
    { word: 'evidence', ar: 'دليل', pos: 'noun', example: { sentence: 'The police found ____ that linked him to the crime.', ar: 'وجدت الشرطة دليلاً يربطه بالجريمة.' }, synonyms: ['proof'] },
    
    // Adjectives
    { word: 'significant', ar: 'هام', pos: 'adjective', example: { sentence: 'There has been a ____ improvement in her grades.', ar: 'كان هناك تحسن هام في درجاتها.' }, synonyms: ['important', 'major'], antonyms: ['insignificant'] },
    { word: 'efficient', ar: 'فعّال', pos: 'adjective', example: { sentence: 'The new system is much more ____ than the old one.', ar: 'النظام الجديد أكثر فعالية من القديم.' }, synonyms: ['effective'], antonyms: ['inefficient'] },
    { word: 'reliable', ar: 'موثوق', pos: 'adjective', example: { sentence: 'We need a ____ source of information.', ar: 'نحتاج إلى مصدر معلومات موثوق.' }, synonyms: ['dependable', 'trustworthy'], antonyms: ['unreliable'] },
    { word: 'controversial', ar: 'مثير للجدل', pos: 'adjective', example: { sentence: 'The new law is highly ____.', ar: 'القانون الجديد مثير للجدل للغاية.' } },
    { word: 'adequate', ar: 'كافٍ', pos: 'adjective', example: { sentence: 'His skills were not ____ for the job.', ar: 'مهاراته لم تكن كافية للوظيفة.' }, synonyms: ['sufficient'], antonyms: ['inadequate'] },
    
    // Adverbs
    { word: 'gradually', ar: 'تدريجياً', pos: 'adverb', example: { sentence: 'The weather is ____ getting warmer.', ar: 'الطقس يصبح أكثر دفئًا تدريجيًا.' }, synonyms: ['slowly'], antonyms: ['suddenly'] },
    { word: 'apparently', ar: 'على ما يبدو', pos: 'adverb', example: { sentence: '____, he missed his flight.', ar: 'على ما يبدو، فاتته رحلته.' }, synonyms: ['seemingly'] },
    { word: 'eventually', ar: 'في النهاية', pos: 'adverb', example: { sentence: 'After a long search, they ____ found the treasure.', ar: 'بعد بحث طويل، وجدوا الكنز في النهاية.' }, synonyms: ['finally', 'ultimately'] },
    { word: 'precisely', ar: 'بدقة', pos: 'adverb', example: { sentence: 'That is ____ what I meant.', ar: 'هذا بالضبط ما قصدته.' }, synonyms: ['exactly'] },
    { word: 'frequently', ar: 'بشكل متكرر', pos: 'adverb', example: { sentence: 'This bus runs ____ during rush hour.', ar: 'تعمل هذه الحافلة بشكل متكرر خلال ساعة الذروة.' }, synonyms: ['often'], antonyms: ['rarely'] },
];

export const B2_SENTENCES: SentenceFormationData[] = [
  {
    jumbled: ['Despite', 'the heavy traffic', 'arrived', 'on time', 'she'],
    correct: 'Despite the heavy traffic, she arrived on time.',
    distractors: ['She arrived on time despite traffic the heavy.', 'Despite arrived she on time the heavy traffic.']
  },
  {
    jumbled: ['people', 'who', 'exercise', 'regularly', 'tend to', 'live', 'longer'],
    correct: 'People who exercise regularly tend to live longer.',
    distractors: ['Live longer people tend to exercise regularly who.', 'Regularly exercise people who live tend to longer.']
  },
  {
    jumbled: ['Although', 'was', 'tired', 'he', 'continued', 'working', 'until midnight'],
    correct: 'Although he was tired, he continued working until midnight.',
    distractors: ['He working continued until midnight although was tired.', 'Although until midnight he continued working was tired.']
  },
  {
    jumbled: ['Protecting', 'the environment', 'future generations', 'is important', 'for'],
    correct: 'Protecting the environment is important for future generations.',
    distractors: ['For future generations protecting important is the environment.', 'The environment protecting is future generations for important.']
  },
  {
    jumbled: ['Technology', 'dramatically', 'has', 'our lives', 'changed', 'in recent years'],
    correct: 'Technology has changed our lives dramatically in recent years.',
    distractors: ['Has changed technology dramatically our lives in recent years.', 'Our lives in recent years technology has dramatically changed.']
  },
  {
    jumbled: ['He', 'was disappointed', 'with', 'the results', 'of the exam'],
    correct: 'He was disappointed with the results of the exam.',
    distractors: ['The results of the exam he with disappointed was.', 'With the exam results of the disappointed he was.']
  },
  {
    jumbled: ['Take', 'your umbrella', 'in case', 'it rains', 'later'],
    correct: 'Take your umbrella in case it rains later.',
    distractors: ['Umbrella in case it rains later take your.', 'In case later it rains your umbrella take.']
  },
  {
    jumbled: ['The book', 'I borrowed', 'was', 'from the library', 'very interesting'],
    correct: 'The book I borrowed from the library was very interesting.',
    distractors: ['I borrowed from the library the book very interesting was.', 'From the library the book I borrowed was interesting very.']
  },
  {
    jumbled: ['He', 'would have failed', 'the exam', 'help', 'your', 'without'],
    correct: 'He would have failed the exam without your help.',
    distractors: ['Without the exam your help he would have failed.', 'He without your help failed the exam would have.']
  },
  {
    jumbled: ['While', 'was raining', 'we', 'decided', 'to stay', 'inside'],
    correct: 'While it was raining, we decided to stay inside.',
    distractors: ['We decided while it was raining stay inside to.', 'Inside to stay we decided it was raining while.']
  }
]


export const B2_READING: ReadingComprehensionData[] = [
  {
    passage: 'Climate change is one of the most pressing global issues today. Rising sea levels and extreme weather events threaten millions of lives. Governments are urged to reduce carbon emissions and invest in renewable energy sources to slow down its impact.',
    question: 'What solution is suggested in the passage to address climate change?',
    options: ['Building more factories', 'Investing in renewable energy', 'Cutting down forests'],
    correctAnswer: 'Investing in renewable energy'
  },
  {
    passage: 'Online education has grown rapidly, especially after the pandemic. It allows students to learn from anywhere, but it also requires self-discipline. Without strong time-management skills, many learners struggle to keep up with their studies.',
    question: 'What is a potential drawback of online education mentioned in the passage?',
    options: ['High travel costs', 'Lack of self-discipline', 'Limited internet worldwide'],
    correctAnswer: 'Lack of self-discipline'
  },
  {
    passage: 'Social media platforms connect people across the globe, enabling instant communication. However, they have also been criticized for spreading misinformation and negatively affecting mental health, especially among teenagers.',
    question: 'What negative effect of social media is highlighted in the passage?',
    options: ['Improved education', 'Spreading misinformation', 'Better job opportunities'],
    correctAnswer: 'Spreading misinformation'
  },
  {
    passage: 'Space exploration has advanced rapidly, with private companies now joining governments in launching rockets. While this opens new opportunities for scientific discovery, it also raises concerns about space debris and its impact on future missions.',
    question: 'What concern is mentioned about space exploration?',
    options: ['Space debris', 'High profits', 'Faster travel'],
    correctAnswer: 'Space debris'
  },
  {
    passage: 'Healthy eating habits are essential for long-term well-being. Diets rich in fruits, vegetables, and whole grains can reduce the risk of chronic diseases. On the other hand, excessive consumption of processed foods increases health problems.',
    question: 'According to the passage, what helps reduce the risk of chronic diseases?',
    options: ['Processed foods', 'Whole grains and vegetables', 'Sugary drinks'],
    correctAnswer: 'Whole grains and vegetables'
  },
  {
    passage: 'Electric cars are becoming more popular as technology improves. They produce fewer emissions than traditional vehicles, making them environmentally friendly. However, limited charging stations remain a challenge for widespread adoption.',
    question: 'What is a challenge for the adoption of electric cars?',
    options: ['Limited charging stations', 'High fuel prices', 'Excessive emissions'],
    correctAnswer: 'Limited charging stations'
  },
  {
    passage: 'Tourism boosts local economies by creating jobs and supporting small businesses. Yet, over-tourism can harm the environment and disrupt local communities, leading to calls for more sustainable travel practices.',
    question: 'What is one negative effect of over-tourism?',
    options: ['Job creation', 'Environmental harm', 'Support for small businesses'],
    correctAnswer: 'Environmental harm'
  },
  {
    passage: 'Robotics is revolutionizing manufacturing by increasing efficiency and reducing human error. However, many workers fear that machines will replace their jobs, creating uncertainty about the future of employment.',
    question: 'What fear do workers have regarding robotics in manufacturing?',
    options: ['Machines will break easily', 'Robots may replace jobs', 'Production will slow down'],
    correctAnswer: 'Robots may replace jobs'
  },
  {
    passage: 'Reading books has numerous benefits, including improving concentration and expanding vocabulary. In contrast, spending too much time on digital devices is linked to shorter attention spans and less deep thinking.',
    question: 'What is one benefit of reading books mentioned in the passage?',
    options: ['Improving concentration', 'Causing short attention spans', 'Increasing screen time'],
    correctAnswer: 'Improving concentration'
  },
  {
    passage: 'Global trade allows countries to access goods they cannot produce locally. While it boosts economic growth, it also makes economies dependent on international markets, which can be risky during global crises.',
    question: 'What is a risk of global trade according to the passage?',
    options: ['Access to new goods', 'Economic dependency', 'Economic growth'],
    correctAnswer: 'Economic dependency'
  }
]
