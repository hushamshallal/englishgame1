import { CefrWord, SentenceFormationData, ReadingComprehensionData } from '../../types';

export const C2_WORDS: CefrWord[] = [
    // Verbs
    { word: 'equivocate', ar: 'يراوغ في الكلام', pos: 'verb', example: { sentence: 'The politician seemed to ____ when asked about his plans.', ar: 'بدا السياسي يراوغ في الكلام عندما سُئل عن خططه.' }, synonyms: ['prevaricate', 'be evasive'] },
    { word: 'ameliorate', ar: 'يحسن', pos: 'verb', example: { sentence: 'The new policies did little to ____ the situation.', ar: 'لم تفعل السياسات الجديدة الكثير لتحسين الوضع.' }, synonyms: ['improve', 'enhance'], antonyms: ['worsen'] },
    { word: 'corroborate', ar: 'يؤكد', pos: 'verb', example: { sentence: 'The witness was able to ____ the victim\'s story.', ar: 'تمكن الشاهد من تأكيد قصة الضحية.' }, synonyms: ['confirm', 'substantiate'] },
    { word: 'proliferate', ar: 'ينتشر بسرعة', pos: 'verb', example: { sentence: 'Misinformation tends to ____ on social media.', ar: 'تميل المعلومات المضللة إلى الانتشار بسرعة على وسائل التواصل الاجتماعي.' }, synonyms: ['multiply', 'escalate'] },
    { word: 'venerate', ar: 'يبجل', pos: 'verb', example: { sentence: 'In some cultures, people ____ their ancestors.', ar: 'في بعض الثقافات، يبجل الناس أسلافهم.' }, synonyms: ['revere', 'respect'], antonyms: ['despise'] },

    // Nouns
    { word: 'cacophony', ar: 'نشاز', pos: 'noun', example: { sentence: 'The city street was a ____ of traffic and construction noise.', ar: 'كان شارع المدينة نشازًا من ضوضاء المرور والبناء.' }, synonyms: ['dissonance'], antonyms: ['harmony'] },
    { word: 'panacea', ar: 'دواء لكل داء', pos: 'noun', example: { sentence: 'Unfortunately, there is no ____ for the world\'s economic problems.', ar: 'لسوء الحظ، لا يوجد دواء لكل داء لمشاكل العالم الاقتصادية.' }, synonyms: ['cure-all'] },
    { word: 'plethora', ar: 'وفرة', pos: 'noun', example: { sentence: 'The report contained a ____ of information.', ar: 'احتوى التقرير على وفرة من المعلومات.' }, synonyms: ['excess', 'surplus'], antonyms: ['dearth'] },
    { word: 'quagmire', ar: 'مأزق', pos: 'noun', example: { sentence: 'The political negotiations were stuck in a ____.', ar: 'كانت المفاوضات السياسية عالقة في مأزق.' }, synonyms: ['predicament', 'dilemma'] },
    { word: 'vicissitude', ar: 'تقلب', pos: 'noun', example: { sentence: 'He faced the ____s of life with courage.', ar: 'واجه تقلبات الحياة بشجاعة.' }, synonyms: ['fluctuation', 'change'] },
    
    // Adjectives
    { word: 'ephemeral', ar: 'عابر', pos: 'adjective', example: { sentence: 'Youth and beauty are often ____.', ar: 'الشباب والجمال غالبًا ما يكونان عابرين.' }, synonyms: ['transient', 'fleeting'], antonyms: ['permanent'] },
    { word: 'esoteric', ar: 'مقتصر على فئة معينة', pos: 'adjective', example: { sentence: 'The philosophy lecture was too ____ for most of us.', ar: 'كانت محاضرة الفلسفة مقتصرة على فئة معينة بالنسبة لمعظمنا.' }, synonyms: ['abstruse', 'obscure'] },
    { word: 'fastidious', ar: 'صعب الإرضاء', pos: 'adjective', example: { sentence: 'He is a ____ writer who revises his work multiple times.', ar: 'هو كاتب صعب الإرضاء يراجع عمله عدة مرات.' }, synonyms: ['meticulous', 'perfectionist'] },
    { word: 'pernicious', ar: 'ضار', pos: 'adjective', example: { sentence: 'The rumor had a ____ effect on her reputation.', ar: 'كان للإشاعة تأثير ضار على سمعتها.' }, synonyms: ['harmful', 'destructive'], antonyms: ['beneficial'] },
    { word: 'prolific', ar: 'غزير الإنتاج', pos: 'adjective', example: { sentence: 'He was a ____ author who wrote over 50 novels.', ar: 'كان مؤلفًا غزير الإنتاج كتب أكثر من 50 رواية.' }, synonyms: ['productive'] },

    // Adverbs
    { word: 'assiduously', ar: 'بجد واجتهاد', pos: 'adverb', example: { sentence: 'She worked ____ to complete the project on time.', ar: 'عملت بجد واجتهاد لإكمال المشروع في الوقت المحدد.' }, synonyms: ['diligently'] },
    { word: 'perfunctorily', ar: 'بشكل روتيني', pos: 'adverb', example: { sentence: 'He glanced at the report ____ without reading it carefully.', ar: 'ألقى نظرة على التقرير بشكل روتيني دون قراءته بعناية.' }, synonyms: ['cursory', 'superficially'] },
    { word: 'surreptitiously', ar: 'خلسة', pos: 'adverb', example: { sentence: 'She ____ checked her phone during the meeting.', ar: 'تحققت خلسة من هاتفها أثناء الاجتماع.' }, synonyms: ['secretly', 'stealthily'] },
    { word: 'unequivocally', ar: 'بشكل قاطع', pos: 'adverb', example: { sentence: 'She stated ____ that she was innocent.', ar: 'صرحت بشكل قاطع أنها بريئة.' }, synonyms: ['unambiguously', 'categorically'] },
    { word: 'vicariously', ar: 'بشكل غير مباشر', pos: 'adverb', example: { sentence: 'Many parents live ____ through their children\'s successes.', ar: 'يعيش العديد من الآباء بشكل غير مباشر من خلال نجاحات أطفالهم.' } },
];

export const C2_SENTENCES: SentenceFormationData[] = [
  {
    jumbled: ['No sooner', 'had', 'the conference started', 'than', 'problems arose'],
    correct: 'No sooner had the conference started than problems arose.',
    distractors: ['The conference started no sooner than had problems arose.', 'No sooner the conference had started than problems arose.']
  },
  {
    jumbled: ['Seldom', 'do', 'students', 'complete', 'assignments', 'without guidance'],
    correct: 'Seldom do students complete assignments without guidance.',
    distractors: ['Students do seldom complete assignments without guidance.', 'Seldom students complete do assignments without guidance.']
  },
  {
    jumbled: ['Had it not been for', 'her determination,', 'the project', 'would have failed'],
    correct: 'Had it not been for her determination, the project would have failed.',
    distractors: ['The project would have failed had it not been for her determination.', 'Her determination had it not been for, the project would have failed.']
  },
  {
    jumbled: ['Not until', 'the evidence', 'was reviewed', 'did', 'the committee', 'reach a decision'],
    correct: 'Not until the evidence was reviewed did the committee reach a decision.',
    distractors: ['The committee did not until the evidence was reviewed reach a decision.', 'Not until did the committee the evidence was reviewed reach a decision.']
  },
  {
    jumbled: ['Only by', 'thorough preparation', 'can', 'success', 'be achieved'],
    correct: 'Only by thorough preparation can success be achieved.',
    distractors: ['Success can only by thorough preparation be achieved.', 'Can success only by thorough preparation be achieved.']
  },
  {
    jumbled: ['Little', 'did', 'they', 'suspect', 'that a major error', 'had occurred'],
    correct: 'Little did they suspect that a major error had occurred.',
    distractors: ['They little did suspect that a major error had occurred.', 'That a major error had occurred little did they suspect.']
  },
  {
    jumbled: ['Hardly', 'had', 'she', 'entered the room', 'when', 'the alarm went off'],
    correct: 'Hardly had she entered the room when the alarm went off.',
    distractors: ['She hardly had entered the room when the alarm went off.', 'The alarm went off hardly had she entered the room when.']
  },
  {
    jumbled: ['So', 'thorough', 'was', 'the investigation', 'that', 'no details were overlooked'],
    correct: 'So thorough was the investigation that no details were overlooked.',
    distractors: ['The investigation was so thorough that no details were overlooked.', 'No details were overlooked so thorough was the investigation that.']
  },
  {
    jumbled: ['Rarely', 'have', 'scientists', 'encountered', 'such contradictory results'],
    correct: 'Rarely have scientists encountered such contradictory results.',
    distractors: ['Scientists rarely have encountered such contradictory results.', 'Such contradictory results rarely have scientists encountered.']
  },
  {
    jumbled: ['Only when', 'all variables', 'are considered', 'can', 'an accurate conclusion', 'be drawn'],
    correct: 'Only when all variables are considered can an accurate conclusion be drawn.',
    distractors: ['An accurate conclusion can only when all variables are considered be drawn.', 'Can an accurate conclusion only when all variables are considered be drawn.']
  }
]


export const C2_READING: ReadingComprehensionData[] = [
  {
    passage: 'The Sapir-Whorf hypothesis posits that the structure of a language affects its speakers\' worldview or cognition, and thus people\'s perceptions are relative to their spoken language. While the strong version (linguistic determinism) is largely discredited, the weaker version (linguistic relativity) remains influential, suggesting that language can influence thought and decision-making in subtle ways, without entirely determining it.',
    question: 'What is the core idea of the weaker version of the Sapir-Whorf hypothesis?',
    options: ['Language completely determines how we think.', 'Language has no effect on our thoughts.', 'Language can subtly influence our cognitive processes.'],
    correctAnswer: 'Language can subtly influence our cognitive processes.'
  },
  {
    passage: 'Utilitarianism, a normative ethical theory, holds that the best moral action is the one that maximizes utility, usually defined as maximizing happiness and well-being for the greatest number of people. However, it faces criticism for potentially justifying actions that are intuitively immoral, such as sacrificing an individual for the greater good, and for the inherent difficulty in quantifying and comparing happiness across different individuals.',
    question: 'What is a major criticism of utilitarianism mentioned in the text?',
    options: ['It is too focused on individual rights.', 'It can be difficult to apply and may justify immoral acts.', 'It does not consider happiness as a factor.'],
    correctAnswer: 'It can be difficult to apply and may justify immoral acts.'
  },
  {
    passage: 'Postmodernist thought challenges the idea of objective truth, emphasizing that knowledge is socially constructed and context-dependent. Critics argue that extreme relativism can undermine the pursuit of empirical evidence and rational debate, while proponents claim it exposes the power dynamics inherent in knowledge production.',
    question: 'What is a central claim of postmodernist thought according to the passage?',
    options: ['Truth is absolute and universal.', 'Knowledge is socially constructed and context-dependent.', 'Science is the only valid form of knowledge.'],
    correctAnswer: 'Knowledge is socially constructed and context-dependent.'
  },
  {
    passage: 'Game theory, a branch of applied mathematics, studies strategic interactions among rational decision-makers. It has applications in economics, political science, and biology, allowing analysts to predict outcomes in competitive and cooperative scenarios, though real-world behavior sometimes deviates from theoretical predictions.',
    question: 'What is the main application of game theory?',
    options: ['Predicting outcomes in strategic interactions', 'Explaining linguistic relativity', 'Assessing historical events'],
    correctAnswer: 'Predicting outcomes in strategic interactions'
  },
  {
    passage: 'Cognitive behavioral therapy (CBT) is a widely used psychological intervention aimed at altering dysfunctional thoughts and behaviors. By identifying negative thought patterns and challenging them, patients can develop healthier coping mechanisms. However, its effectiveness can vary depending on the individual’s context and engagement.',
    question: 'What is the primary goal of CBT?',
    options: ['To prescribe medication for mental illness', 'To alter dysfunctional thoughts and behaviors', 'To explore unconscious desires'],
    correctAnswer: 'To alter dysfunctional thoughts and behaviors'
  },
  {
    passage: 'The principle of comparative advantage suggests that countries should specialize in producing goods for which they have a lower opportunity cost, thereby increasing overall efficiency and global trade benefits. However, critics argue that it may exacerbate inequalities between nations.',
    question: 'What does the principle of comparative advantage recommend?',
    options: ['Producing everything domestically', 'Specializing in goods with lower opportunity cost', 'Eliminating international trade'],
    correctAnswer: 'Specializing in goods with lower opportunity cost'
  },
  {
    passage: 'Existentialist philosophy emphasizes individual freedom, choice, and responsibility. Thinkers such as Sartre and Camus highlight the inherent absurdity of life and the necessity for individuals to create meaning despite an indifferent universe.',
    question: 'According to existentialist philosophy, how should individuals deal with life’s absurdity?',
    options: ['By accepting predetermined fate', 'By creating their own meaning through choices', 'By relying solely on religious guidance'],
    correctAnswer: 'By creating their own meaning through choices'
  },
  {
    passage: 'Epigenetics studies changes in gene expression that do not involve alterations to the DNA sequence itself. Environmental factors, lifestyle, and experiences can influence these modifications, which can have long-term effects on health and disease susceptibility.',
    question: 'What does epigenetics focus on?',
    options: ['DNA sequence mutations', 'Changes in gene expression without altering DNA sequence', 'The study of fossils'],
    correctAnswer: 'Changes in gene expression without altering DNA sequence'
  },
  {
    passage: 'Critical discourse analysis examines how language reflects, reinforces, or challenges power structures in society. It investigates texts, spoken communication, and media to reveal hidden ideologies and social inequalities.',
    question: 'What is the main focus of critical discourse analysis?',
    options: ['Studying grammar rules', 'Analyzing how language reflects or challenges power', 'Measuring IQ levels'],
    correctAnswer: 'Analyzing how language reflects or challenges power'
  },
  {
    passage: 'Sustainable development integrates economic growth, social inclusion, and environmental protection. Achieving sustainability requires balancing short-term economic benefits with long-term ecological and social considerations, often necessitating policy coordination across sectors.',
    question: 'What is essential for sustainable development according to the passage?',
    options: ['Focusing solely on economic growth', 'Balancing economic, social, and environmental factors', 'Ignoring environmental considerations for faster growth'],
    correctAnswer: 'Balancing economic, social, and environmental factors'
  }
]

