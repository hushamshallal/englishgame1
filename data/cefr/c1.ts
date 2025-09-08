import { CefrWord, SentenceFormationData, ReadingComprehensionData } from '../../types';

export const C1_WORDS: CefrWord[] = [
    // Verbs
    { word: 'mitigate', ar: 'يخفف', pos: 'verb', example: { sentence: 'Governments are trying to ____ the effects of climate change.', ar: 'تحاول الحكومات تخفيف آثار تغير المناخ.' }, synonyms: ['alleviate', 'reduce'], antonyms: ['exacerbate'] },
    { word: 'scrutinize', ar: 'يفحص بدقة', pos: 'verb', example: { sentence: 'The lawyer will ____ every detail of the contract.', ar: 'سيقوم المحامي بفحص كل تفاصيل العقد بدقة.' }, synonyms: ['examine', 'inspect'] },
    { word: 'foster', ar: 'يعزز', pos: 'verb', example: { sentence: 'The school aims to ____ a sense of community among students.', ar: 'تهدف المدرسة إلى تعزيز الشعور بالانتماء للمجتمع بين الطلاب.' }, synonyms: ['promote', 'encourage'], antonyms: ['hinder'] },
    { word: 'articulate', ar: 'يوضح', pos: 'verb', example: { sentence: 'She was able to ____ her ideas clearly and concisely.', ar: 'كانت قادرة على توضيح أفكارها بوضوح وإيجاز.' }, synonyms: ['express', 'enunciate'] },
    { word: 'differentiate', ar: 'يميز', pos: 'verb', example: { sentence: 'It\'s difficult to ____ between the two identical twins.', ar: 'من الصعب التمييز بين التوأمين المتطابقين.' }, synonyms: ['distinguish'] },

    // Nouns
    { word: 'dichotomy', ar: 'انقسام', pos: 'noun', example: { sentence: 'There is a ____ between the rich and the poor.', ar: 'هناك انقسام بين الأغنياء والفقراء.' }, synonyms: ['division', 'contrast'] },
    { word: 'ambiguity', ar: 'غموض', pos: 'noun', example: { sentence: 'The ____ in his statement made everyone confused.', ar: 'الغموض في تصريحه جعل الجميع مرتبكين.' }, synonyms: ['vagueness'], antonyms: ['clarity'] },
    { word: 'consensus', ar: 'إجماع', pos: 'noun', example: { sentence: 'The committee reached a ____ on the new policy.', ar: 'توصلت اللجنة إلى إجماع بشأن السياسة الجديدة.' }, synonyms: ['agreement'] },
    { word: 'implication', ar: 'تضمين', pos: 'noun', example: { sentence: 'The ____ of his speech was that he would resign.', ar: 'كان تضمين خطابه أنه سيستقيل.' }, synonyms: ['suggestion', 'insinuation'] },
    { word: 'proponent', ar: 'مؤيد', pos: 'noun', example: { sentence: 'He is a leading ____ of renewable energy.', ar: 'هو مؤيد رائد للطاقة المتجددة.' }, synonyms: ['advocate'], antonyms: ['opponent'] },
    
    // Adjectives
    { word: 'ubiquitous', ar: 'واسع الانتشار', pos: 'adjective', example: { sentence: 'Smartphones have become ____ in modern society.', ar: 'أصبحت الهواتف الذكية واسعة الانتشار في المجتمع الحديث.' }, synonyms: ['omnipresent', 'pervasive'] },
    { word: 'eloquent', ar: 'فصيح', pos: 'adjective', example: { sentence: 'He gave an ____ speech that moved the audience.', ar: 'ألقى خطابًا فصيحًا أثر في الجمهور.' }, synonyms: ['articulate'], antonyms: ['inarticulate'] },
    { word: 'meticulous', ar: 'دقيق', pos: 'adjective', example: { sentence: 'She is a ____ planner, leaving no detail to chance.', ar: 'هي مخططة دقيقة، لا تترك أي تفصيل للصدفة.' }, synonyms: ['thorough', 'fastidious'], antonyms: ['careless'] },
    { word: 'pragmatic', ar: 'واقعي', pos: 'adjective', example: { sentence: 'We need a ____ solution to this complex problem.', ar: 'نحن بحاجة إلى حل واقعي لهذه المشكلة المعقدة.' }, synonyms: ['practical'], antonyms: ['idealistic'] },
    { word: 'resilient', ar: 'مرن', pos: 'adjective', example: { sentence: 'Children are often more ____ than adults.', ar: 'غالبًا ما يكون الأطفال أكثر مرونة من البالغين.' }, synonyms: ['tough', 'durable'] },

    // Adverbs
    { word: 'inevitably', ar: 'حتماً', pos: 'adverb', example: { sentence: 'Technological advances will ____ change our lives.', ar: 'التقدم التكنولوجي سيغير حياتنا حتماً.' }, synonyms: ['unavoidably'] },
    { word: 'subsequently', ar: 'لاحقاً', pos: 'adverb', example: { sentence: 'He was arrested and ____ convicted.', ar: 'تم القبض عليه وأدين لاحقًا.' }, synonyms: ['afterwards', 'later'] },
    { word: 'inherently', ar: 'بطبيعته', pos: 'adverb', example: { sentence: 'Some risks are ____ part of the business.', ar: 'بعض المخاطر هي بطبيعتها جزء من العمل.' }, synonyms: ['intrinsically'] },
    { word: 'explicitly', ar: 'صراحةً', pos: 'adverb', example: { sentence: 'The instructions were ____ stated.', ar: 'تم ذكر التعليمات صراحةً.' }, synonyms: ['clearly', 'directly'], antonyms: ['implicitly'] },
    { word: 'ostensibly', ar: 'ظاهرياً', pos: 'adverb', example: { sentence: '____ a research trip, it was actually a vacation.', ar: 'ظاهريًا كانت رحلة بحثية، لكنها في الواقع كانت إجازة.' }, synonyms: ['apparently', 'seemingly'] },
];

export const C1_SENTENCES: SentenceFormationData[] = [
  {
    jumbled: ['Despite', 'the significant risks', 'the team', 'proceeded', 'with the plan'],
    correct: 'Despite the significant risks, the team proceeded with the plan.',
    distractors: ['The team proceeded despite with the significant risks the plan.', 'Despite the plan the team proceeded with significant risks.']
  },
  {
    jumbled: ['Rarely', 'he', 'had encountered', 'such a challenging problem', 'before'],
    correct: 'Rarely had he encountered such a challenging problem before.',
    distractors: ['He rarely had encountered before such a challenging problem.', 'Before he had rarely encountered such a challenging problem.']
  },
  {
    jumbled: ['Only after', 'the report was reviewed', 'did', 'management', 'approve the proposal'],
    correct: 'Only after the report was reviewed did management approve the proposal.',
    distractors: ['Management approve only after did the report the proposal was reviewed.', 'The report was reviewed only after management did approve the proposal.']
  },
  {
    jumbled: ['Having been', 'studied extensively', 'the results', 'were', 'surprisingly positive'],
    correct: 'Having been studied extensively, the results were surprisingly positive.',
    distractors: ['The results having been studied extensively were surprisingly positive.', 'Were the results having been studied extensively surprisingly positive.']
  },
  {
    jumbled: ['Not only', 'does', 'this initiative', 'benefit students', 'but also', 'enhances teacher training'],
    correct: 'Not only does this initiative benefit students, but also enhances teacher training.',
    distractors: ['This initiative not only benefit students does but also enhances teacher training.', 'Not only benefit students does this initiative but also enhances teacher training.']
  },
  {
    jumbled: ['Under no circumstances', 'should', 'confidential information', 'be shared', 'with outsiders'],
    correct: 'Under no circumstances should confidential information be shared with outsiders.',
    distractors: ['Confidential information under no circumstances should be shared with outsiders.', 'Be shared under no circumstances should confidential information with outsiders.']
  },
  {
    jumbled: ['Scarcely', 'had', 'the meeting', 'begun', 'when', 'problems arose'],
    correct: 'Scarcely had the meeting begun when problems arose.',
    distractors: ['Problems arose scarcely had the meeting begun when.', 'Had the meeting scarcely begun when problems arose.']
  },
  {
    jumbled: ['Only by', 'analyzing the data carefully', 'can', 'accurate conclusions', 'be drawn'],
    correct: 'Only by analyzing the data carefully can accurate conclusions be drawn.',
    distractors: ['Accurate conclusions can only by analyzing the data carefully be drawn.', 'Be drawn only by analyzing the data carefully can accurate conclusions.']
  },
  {
    jumbled: ['Little', 'did', 'she', 'expect', 'to find', 'such strong support'],
    correct: 'Little did she expect to find such strong support.',
    distractors: ['She did little expect to find such strong support.', 'To find such strong support little did she expect.']
  },
  {
    jumbled: ['Hardly', 'had', 'the experiment', 'started', 'when', 'unexpected results appeared'],
    correct: 'Hardly had the experiment started when unexpected results appeared.',
    distractors: ['The experiment hardly had started when unexpected results appeared.', 'Unexpected results appeared hardly had the experiment started when.']
  }
]


export const C1_READING: ReadingComprehensionData[] = [
  {
    passage: 'Urbanization has transformed societies globally, reshaping economies, infrastructure, and social dynamics. While cities offer greater opportunities for education and employment, they also face challenges like congestion, pollution, and social inequality.',
    question: 'What is one negative consequence of urbanization mentioned?',
    options: ['Greater education opportunities', 'Social inequality', 'Increased job availability'],
    correctAnswer: 'Social inequality'
  },
  {
    passage: 'Artificial intelligence (AI) continues to advance, revolutionizing industries from healthcare to finance. While it improves efficiency and decision-making, it also raises concerns about ethical usage, privacy, and potential job displacement.',
    question: 'Which concern is highlighted regarding AI?',
    options: ['Faster decision-making', 'Ethical usage and job displacement', 'Better healthcare outcomes'],
    correctAnswer: 'Ethical usage and job displacement'
  },
  {
    passage: 'The rise of social media has changed communication profoundly. It enables global connectivity but also contributes to the spread of misinformation and may negatively impact mental health, especially among young adults.',
    question: 'What is a negative impact of social media according to the passage?',
    options: ['Global connectivity', 'Spread of misinformation', 'Easier communication'],
    correctAnswer: 'Spread of misinformation'
  },
  {
    passage: 'Renewable energy sources, such as solar and wind, are crucial for reducing carbon emissions. Despite initial costs and technological challenges, they represent a sustainable path for mitigating climate change.',
    question: 'Why are renewable energy sources important?',
    options: ['They are cheap to implement', 'They help reduce carbon emissions', 'They increase energy dependence'],
    correctAnswer: 'They help reduce carbon emissions'
  },
  {
    passage: 'Behavioral economics explores how psychological factors influence economic decisions. Unlike classical models assuming rational behavior, it studies biases, heuristics, and social influences that lead individuals to make seemingly irrational choices.',
    question: 'What does behavioral economics examine?',
    options: ['Only financial markets', 'Psychological influences on economic decisions', 'Strictly rational decision-making'],
    correctAnswer: 'Psychological influences on economic decisions'
  },
  {
    passage: 'Global public health crises, such as pandemics, highlight the interconnectedness of nations. Effective response requires international cooperation, data sharing, and equitable access to medical resources.',
    question: 'What is essential for responding effectively to global health crises?',
    options: ['National isolation', 'International cooperation', 'Ignoring data sharing'],
    correctAnswer: 'International cooperation'
  },
  {
    passage: 'Climate change mitigation involves reducing greenhouse gas emissions while adapting to inevitable impacts. Policies often combine renewable energy adoption, reforestation, and sustainable transportation to achieve long-term environmental goals.',
    question: 'Which action is part of climate change mitigation?',
    options: ['Increasing fossil fuel use', 'Reforestation', 'Expanding urban sprawl'],
    correctAnswer: 'Reforestation'
  },
  {
    passage: 'The concept of "intersectionality" explains how various social identities, such as race, gender, and class, intersect to create unique experiences of discrimination and privilege.',
    question: 'What does intersectionality examine?',
    options: ['Single social identities', 'Intersections of multiple social identities', 'Only economic status'],
    correctAnswer: 'Intersections of multiple social identities'
  },
  {
    passage: 'Neuroscience research reveals that the human brain is highly plastic, capable of adapting and reorganizing throughout life. This plasticity underlies learning, memory, and recovery from injury.',
    question: 'What does brain plasticity enable?',
    options: ['Fixed learning patterns', 'Adaptation and recovery', 'Inability to learn new skills'],
    correctAnswer: 'Adaptation and recovery'
  },
  {
    passage: 'Economic globalization facilitates cross-border trade and investment but can exacerbate income inequality and increase dependence on volatile international markets.',
    question: 'What is a negative effect of economic globalization mentioned in the passage?',
    options: ['Increased cross-border trade', 'Exacerbated income inequality', 'Higher investment opportunities'],
    correctAnswer: 'Exacerbated income inequality'
  }
]

