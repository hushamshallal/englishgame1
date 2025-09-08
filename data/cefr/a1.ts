import { CefrWord, SentenceFormationData, ReadingComprehensionData } from '../../types';

export const A1_WORDS: CefrWord[] = [
    // Nouns
    { word: 'apple', ar: 'تفاحة', pos: 'noun', example: { sentence: 'I eat an ____ every day.', ar: 'أنا آكل تفاحة كل يوم.' } },
    { word: 'book', ar: 'كتاب', pos: 'noun', example: { sentence: 'She is reading a ____.', ar: 'هي تقرأ كتابًا.' } },
    { word: 'cat', ar: 'قطة', pos: 'noun', example: { sentence: 'The ____ is sleeping.', ar: 'القطة نائمة.' } },
    { word: 'dog', ar: 'كلب', pos: 'noun', example: { sentence: 'My ____ is friendly.', ar: 'كلبي ودود.' } },
    { word: 'house', ar: 'منزل', pos: 'noun', example: { sentence: 'My ____ is near the school.', ar: 'منزلي قريب من المدرسة.' } },
    { word: 'car', ar: 'سيارة', pos: 'noun', example: { sentence: 'My father drives a blue ____.', ar: 'أبي يقود سيارة زرقاء.' } },
    { word: 'water', ar: 'ماء', pos: 'noun', example: { sentence: 'Can I have a glass of ____?', ar: 'هل يمكنني الحصول على كوب من الماء؟' } },
    { word: 'friend', ar: 'صديق', pos: 'noun', example: { sentence: 'He is my best ____.', ar: 'هو أفضل صديق لي.' } },
    { word: 'name', ar: 'اسم', pos: 'noun', example: { sentence: 'What is your ____?', ar: 'ما هو اسمك؟' } },
    { word: 'school', ar: 'مدرسة', pos: 'noun', example: { sentence: 'The children go to ____ in the morning.', ar: 'يذهب الأطفال إلى المدرسة في الصباح.' } },
    { word: 'student', ar: 'طالب', pos: 'noun', example: { sentence: 'I am a ____ at this school.', ar: 'أنا طالب في هذه المدرسة.' } },
    { word: 'teacher', ar: 'معلم', pos: 'noun', example: { sentence: 'The ____ writes on the board.', ar: 'المعلم يكتب على السبورة.' } },
    { word: 'time', ar: 'وقت', pos: 'noun', example: { sentence: 'What ____ is it?', ar: 'كم الوقت؟' } },
    { word: 'day', ar: 'يوم', pos: 'noun', example: { sentence: 'Today is a beautiful ____.', ar: 'اليوم يوم جميل.' } },
    { word: 'man', ar: 'رجل', pos: 'noun', example: { sentence: 'That ____ is very tall.', ar: 'ذلك الرجل طويل جدًا.' } },
    { word: 'woman', ar: 'امرأة', pos: 'noun', example: { sentence: 'The ____ is wearing a red dress.', ar: 'المرأة ترتدي فستانًا أحمر.' } },
    { word: 'boy', ar: 'ولد', pos: 'noun', example: { sentence: 'The ____ is playing with a ball.', ar: 'الولد يلعب بالكرة.' } },
    { word: 'girl', ar: 'بنت', pos: 'noun', example: { sentence: 'The ____ has long hair.', ar: 'البنت لديها شعر طويل.' } },
    { word: 'food', ar: 'طعام', pos: 'noun', example: { sentence: 'This ____ is delicious.', ar: 'هذا الطعام لذيذ.' } },
    { word: 'table', ar: 'طاولة', pos: 'noun', example: { sentence: 'The keys are on the ____.', ar: 'المفاتيح على الطاولة.' } },
    { word: 'chair', ar: 'كرسي', pos: 'noun', example: { sentence: 'Please have a seat on this ____.', ar: 'من فضلك تفضل بالجلوس على هذا الكرسي.' } },
    { word: 'pen', ar: 'قلم', pos: 'noun', example: { sentence: 'I write with a ____.', ar: 'أنا أكتب بالقلم.' } },
    { word: 'morning', ar: 'صباح', pos: 'noun', example: { sentence: 'I wake up early in the ____.', ar: 'أستيقظ باكرًا في الصباح.' } },
    { word: 'country', ar: 'بلد', pos: 'noun', example: { sentence: 'Iraq is my ____.', ar: 'العراق هو بلدي.' } },

    // Verbs
    { word: 'go', ar: 'يذهب', pos: 'verb', example: { sentence: 'We ____ to school by bus.', ar: 'نحن نذهب إلى المدرسة بالحافلة.' } },
    { word: 'eat', ar: 'يأكل', pos: 'verb', example: { sentence: 'They ____ dinner at 7 PM.', ar: 'هم يأكلون العشاء في السابعة مساءً.' } },
    { word: 'see', ar: 'يرى', pos: 'verb', example: { sentence: 'I can ____ the birds in the sky.', ar: 'أستطيع أن أرى الطيور في السماء.' } },
    { word: 'play', ar: 'يلعب', pos: 'verb', example: { sentence: 'Children like to ____ in the park.', ar: 'الأطفال يحبون اللعب في الحديقة.' } },
    { word: 'run', ar: 'يركض', pos: 'verb', example: { sentence: 'I ____ in the morning.', ar: 'أنا أركض في الصباح.' } },
    { word: 'is', ar: 'يكون', pos: 'verb', example: { sentence: 'He ____ a doctor.', ar: 'هو يكون طبيبًا.' } },
    { word: 'have', ar: 'يملك', pos: 'verb', example: { sentence: 'I ____ two brothers.', ar: 'أنا أملك أخوين.' } },
    { word: 'read', ar: 'يقرأ', pos: 'verb', example: { sentence: 'She likes to ____ stories.', ar: 'هي تحب أن تقرأ القصص.' } },
    { word: 'write', ar: 'يكتب', pos: 'verb', example: { sentence: 'Please ____ your name here.', ar: 'من فضلك اكتب اسمك هنا.' } },
    { word: 'speak', ar: 'يتحدث', pos: 'verb', example: { sentence: 'I ____ English and Arabic.', ar: 'أنا أتحدث الإنجليزية والعربية.' } },
    { word: 'like', ar: 'يحب', pos: 'verb', example: { sentence: 'I ____ pizza.', ar: 'أنا أحب البيتزا.' } },
    { word: 'work', ar: 'يعمل', pos: 'verb', example: { sentence: 'My father ____s in a bank.', ar: 'أبي يعمل في بنك.' } },
    { word: 'sleep', ar: 'ينام', pos: 'verb', example: { sentence: 'The baby ____s a lot.', ar: 'الرضيع ينام كثيرًا.' } },
    { word: 'drink', ar: 'يشرب', pos: 'verb', example: { sentence: 'I ____ coffee in the morning.', ar: 'أنا أشرب القهوة في الصباح.' } },
    { word: 'want', ar: 'يريد', pos: 'verb', example: { sentence: 'I ____ a new phone.', ar: 'أنا أريد هاتفًا جديدًا.' } },

    // Adjectives
    { word: 'happy', ar: 'سعيد', pos: 'adjective', example: { sentence: 'The child is very ____.', ar: 'الطفل سعيد جدًا.' } },
    { word: 'big', ar: 'كبير', pos: 'adjective', example: { sentence: 'It is a ____ house.', ar: 'إنه منزل كبير.' } },
    { word: 'small', ar: 'صغير', pos: 'adjective', example: { sentence: 'A mouse is a ____ animal.', ar: 'الفأر حيوان صغير.' } },
    { word: 'good', ar: 'جيد', pos: 'adjective', example: { sentence: 'This is a ____ movie.', ar: 'هذا فيلم جيد.' } },
    { word: 'red', ar: 'أحمر', pos: 'adjective', example: { sentence: 'The apple is ____.', ar: 'التفاحة حمراء.' } },
    { word: 'blue', ar: 'أزرق', pos: 'adjective', example: { sentence: 'The sky is ____.', ar: 'السماء زرقاء.' } },
    { word: 'sad', ar: 'حزين', pos: 'adjective', example: { sentence: 'She is ____ because she lost her toy.', ar: 'هي حزينة لأنها فقدت لعبتها.' } },
    { word: 'new', ar: 'جديد', pos: 'adjective', example: { sentence: 'I have a ____ pair of shoes.', ar: 'لدي زوج أحذية جديد.' } },
    { word: 'old', ar: 'قديم/كبير في السن', pos: 'adjective', example: { sentence: 'My grandfather is very ____.', ar: 'جدي كبير جدًا في السن.' } },
    { word: 'cold', ar: 'بارد', pos: 'adjective', example: { sentence: 'The weather is ____ today.', ar: 'الطقس بارد اليوم.' } },
    { word: 'hot', ar: 'حار', pos: 'adjective', example: { sentence: 'The tea is too ____.', ar: 'الشاي حار جدًا.' } },

    // Phrases & Others
    { word: 'hello', ar: 'مرحباً', pos: 'phrase', example: { sentence: 'You say ____ when you meet someone.', ar: 'تقول مرحباً عندما تقابل شخصاً.' } },
    { word: 'thank you', ar: 'شكراً لك', pos: 'phrase', example: { sentence: 'You should say ____ when someone helps you.', ar: 'يجب أن تقول شكراً لك عندما يساعدك شخص ما.' } },
    { word: 'goodbye', ar: 'وداعاً', pos: 'phrase', example: { sentence: 'We say ____ when we leave.', ar: 'نقول وداعاً عندما نغادر.' } },
    { word: 'in', ar: 'في', pos: 'adverb', example: { sentence: 'The cat is ____ the box.', ar: 'القطة في الصندوق.' } },
    { word: 'on', ar: 'على', pos: 'adverb', example: { sentence: 'The book is ____ the table.', ar: 'الكتاب على الطاولة.' } },
    { word: 'under', ar: 'تحت', pos: 'adverb', example: { sentence: 'The ball is ____ the chair.', ar: 'الكرة تحت الكرسي.' } },
    { word: 'I', ar: 'أنا', pos: 'phrase', example: { sentence: '____ am a student.', ar: 'أنا طالب.' } },
    { word: 'you', ar: 'أنت', pos: 'phrase', example: { sentence: 'Are ____ ready?', ar: 'هل أنت جاهز؟' } },
    { word: 'he', ar: 'هو', pos: 'phrase', example: { sentence: '____ is my brother.', ar: 'هو أخي.' } },
    { word: 'she', ar: 'هي', pos: 'phrase', example: { sentence: '____ is my sister.', ar: 'هي أختي.' } },
];


export const A1_SENTENCES: SentenceFormationData[] = [
  {
    jumbled: ['is', 'My', 'name', 'Omar'],
    correct: 'My name is Omar.',
    distractors: ['Omar name is my.', 'Is my Omar name.']
  },
  {
    jumbled: ['a', 'This', 'is', 'book'],
    correct: 'This is a book.',
    distractors: ['A is this book.', 'Book is this a.']
  },
  {
    jumbled: ['cat', 'The', 'sleeping', 'is'],
    correct: 'The cat is sleeping.',
    distractors: ['Sleeping the cat is.', 'Is cat the sleeping.']
  },
  {
    jumbled: ['I', 'from', 'am', 'Iraq'],
    correct: 'I am from Iraq.',
    distractors: ['From am I Iraq.', 'Iraq I from am.']
  },
  {
    jumbled: ['likes', 'She', 'to', 'read'],
    correct: 'She likes to read.',
    distractors: ['To read she likes.', 'Likes she read to.']
  },
  {
    jumbled: ['have', 'I', 'two', 'brothers'],
    correct: 'I have two brothers.',
    distractors: ['Two I have brothers.', 'I brothers have two.']
  },
  {
    jumbled: ['is', 'The', 'dog', 'brown'],
    correct: 'The dog is brown.',
    distractors: ['Brown the dog is.', 'Dog brown is the.']
  },
  {
    jumbled: ['We', 'to', 'go', 'school'],
    correct: 'We go to school.',
    distractors: ['Go we school to.', 'School to we go.']
  },
  {
    jumbled: ['She', 'a', 'has', 'cat'],
    correct: 'She has a cat.',
    distractors: ['A cat she has.', 'Has she cat a.']
  },
  {
    jumbled: ['I', 'like', 'ice', 'cream'],
    correct: 'I like ice cream.',
    distractors: ['Like I cream ice.', 'Ice I like cream.']
  }
]

export const A1_READING: ReadingComprehensionData[] = [
  {
    passage: 'My name is Sara. I have a cat. My cat is white.',
    question: "What color is Sara's cat?",
    options: ['White', 'Black', 'Brown'],
    correctAnswer: 'White'
  },
  {
    passage: 'Ali goes to school. He likes to read books. His friend plays football.',
    question: 'What does Ali like to do?',
    options: ['Play football', 'Read books', 'Watch TV'],
    correctAnswer: 'Read books'
  },
  {
    passage: 'This is a big house. The house has a red door. A small car is in front of the house.',
    question: 'What color is the door?',
    options: ['Big', 'Small', 'Red'],
    correctAnswer: 'Red'
  },
  {
    passage: 'Tom has a blue bike. He rides it every day to the park.',
    question: 'What color is Tom’s bike?',
    options: ['Blue', 'Green', 'Yellow'],
    correctAnswer: 'Blue'
  },
  {
    passage: 'Lina likes apples. She eats one every morning.',
    question: 'What does Lina eat every morning?',
    options: ['Bread', 'Apple', 'Banana'],
    correctAnswer: 'Apple'
  },
  {
    passage: 'The dog is big and brown. It likes to play with children.',
    question: 'What color is the dog?',
    options: ['Black', 'Brown', 'White'],
    correctAnswer: 'Brown'
  },
  {
    passage: 'We go to school at 8 o’clock. Our school is near the park.',
    question: 'What time do we go to school?',
    options: ['7 o’clock', '8 o’clock', '9 o’clock'],
    correctAnswer: '8 o’clock'
  },
  {
    passage: 'I have a small red ball. I play with it in the garden.',
    question: 'What color is the ball?',
    options: ['Red', 'Blue', 'Green'],
    correctAnswer: 'Red'
  },
  {
    passage: 'Sara and Ali like to read books. They read every evening.',
    question: 'When do Sara and Ali read?',
    options: ['In the morning', 'Every evening', 'At school'],
    correctAnswer: 'Every evening'
  },
  {
    passage: 'The cat is on the table. It is sleeping.',
    question: 'Where is the cat?',
    options: ['On the floor', 'On the table', 'In the garden'],
    correctAnswer: 'On the table'
  }
]
