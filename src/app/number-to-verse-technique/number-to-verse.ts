import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface VerseReference {
  id: number;
  chapter: number;
  verse: number;
  verseReference: string; // e.g., "BG 2.47"
  hint: string; // Context/hint about the verse
  firstWords: string; // First few words in Devanagari
  slokaDevanagari: string;
  slokaTransliteration: string;
  meaningEnglish: string;
  meaningHindi: string;
  audioUrl: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  wordByWordMeaning: string;
  context: string;
  imageUrl?: string;
}

export interface ChapterCategory {
  chapter: number;
  name: string;
  icon: string;
  color: string;
  description: string;
  verseCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class NumberToVerse {

  private verses: VerseReference[] = [
    // 1. BG 2.47 - Nishkama Karma
    {
      id: 1,
      chapter: 2,
      verse: 47,
      verseReference: 'BG 2.47',
      hint: 'The famous verse about performing duty without attachment to results',
      firstWords: 'कर्मण्येवाधिकारस्ते मा फलेषु...',
      slokaDevanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      slokaTransliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana\nmā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi",
      meaningEnglish: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.',
      meaningHindi: 'तेरा कर्म करने में ही अधिकार है, फलों में कभी नहीं। इसलिए तू कर्मों के फल का हेतु मत बन और तेरी अकर्म में भी आसक्ति न हो।',
      audioUrl: '/assets/audio/bg-2-47.mp3',
      difficulty: 'beginner',
      wordByWordMeaning: "karmaṇi—prescribed duties; eva—only; adhikāraḥ—right; te—your; mā—never; phaleṣhu—to the fruits; kadāchana—at any time; mā—never; karma-phala—results of the activities; hetuḥ—cause; bhūḥ—be; mā—never; te—your; saṅgaḥ—attachment; astu—must be; akarmaṇi—to inaction",
      context: 'This is one of the most famous verses of the Bhagavad Gita, establishing the principle of Nishkama Karma (selfless action)',
      imageUrl: '/assets/images/karma-yoga.jpg'
    },

    // 2. BG 18.66 - Charama Shloka (Surrender)
    {
      id: 2,
      chapter: 18,
      verse: 66,
      verseReference: 'BG 18.66',
      hint: 'The ultimate instruction - complete surrender to the Supreme',
      firstWords: 'सर्वधर्मान्परित्यज्य मामेकं शरणं...',
      slokaDevanagari: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
      slokaTransliteration: "sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ",
      meaningEnglish: 'Abandon all varieties of dharmas and simply surrender unto Me alone. I shall liberate you from all sinful reactions; do not fear.',
      meaningHindi: 'सम्पूर्ण धर्मों को अर्थात सम्पूर्ण कर्तव्य कर्मों को मुझमें त्यागकर तू केवल एक मुझ सर्वशक्तिमान, सर्वाधार परमेश्वर की ही शरण में आ जा। मैं तुझे सम्पूर्ण पापों से मुक्त कर दूँगा, तू शोक मत कर।',
      audioUrl: '/assets/audio/bg-18-66.mp3',
      difficulty: 'beginner',
      wordByWordMeaning: "sarva-dharmān—all varieties of dharmas; parityajya—abandoning; mām—unto Me; ekam—only; śharaṇam—refuge; vraja—take; aham—I; tvām—you; sarva—all; pāpebhyaḥ—from sinful reactions; mokṣhayiṣhyāmi—shall liberate; mā—do not; śhuchaḥ—fear",
      context: 'Known as the Charama Shloka (final/ultimate verse), this is the pinnacle instruction of the Bhagavad Gita',
      imageUrl: '/assets/images/surrender.jpg'
    },

    // 3. BG 4.37 - Knowledge Fire
    {
      id: 3,
      chapter: 4,
      verse: 37,
      verseReference: 'BG 4.37',
      hint: 'How knowledge burns all karmas to ashes',
      firstWords: 'यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुते...',
      slokaDevanagari: 'यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुतेऽर्जुन।\nज्ञानाग्निः सर्वकर्माणि भस्मसात्कुरुते तथा॥',
      slokaTransliteration: "yathaidhānsi samiddho 'gnir bhasma-sāt kurute 'rjuna\njñānāgniḥ sarva-karmāṇi bhasma-sāt kurute tathā",
      meaningEnglish: 'As a blazing fire turns firewood to ashes, O Arjuna, so does the fire of knowledge burn to ashes all karmas.',
      meaningHindi: 'हे अर्जुन! जैसे प्रज्वलित अग्नि ईंधन को भस्म कर देती है, वैसे ही ज्ञानरूपी अग्नि सम्पूर्ण कर्मों को भस्म कर देती है।',
      audioUrl: '/assets/audio/bg-4-37.mp3',
      difficulty: 'intermediate',
      wordByWordMeaning: "yathā—as; edhānsi—firewood; samiddhaḥ—blazing; agniḥ—fire; bhasma-sāt—to ashes; kurute—reduces; arjuna—Arjun; jñāna-agniḥ—the fire of knowledge; sarva-karmāṇi—all karmas; bhasma-sāt—to ashes; kurute—reduces; tathā—similarly",
      context: 'This verse explains the supreme power of transcendental knowledge in destroying the bondage of karma',
      imageUrl: '/assets/images/jnana-yoga.jpg'
    },

    // 4. BG 3.35 - Swadharma
    {
      id: 4,
      chapter: 3,
      verse: 35,
      verseReference: 'BG 3.35',
      hint: "Better to follow one's own dharma than another's",
      firstWords: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्...',
      slokaDevanagari: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥',
      slokaTransliteration: "śhreyān swa-dharmo viguṇaḥ para-dharmāt sv-anuṣhṭhitāt\nswa-dharme nidhanaṁ śhreyaḥ para-dharmo bhayāvahaḥ",
      meaningEnglish: "It is far better to perform one's natural prescribed duty, though tinged with faults, than to perform another's prescribed duty, though perfectly. In fact, it is preferable to die in the discharge of one's duty, than to follow the path of another, which is fraught with danger.",
      meaningHindi: 'दोषयुक्त भी अपना धर्म श्रेष्ठ है, दूसरे के धर्म से जो भली-भांति आचरण किया गया हो। अपने धर्म में मरना भी कल्याणकारक है, परन्तु दूसरे का धर्म भयावह है।',
      audioUrl: '/assets/audio/bg-3-35.mp3',
      difficulty: 'beginner',
      wordByWordMeaning: "śhreyān—better; swa-dharmaḥ—personal duty; viguṇaḥ—tinged with faults; para-dharmāt—than another's; su-anuṣhṭhitāt—perfectly performed; swa-dharme—in one's personal duties; nidhanam—death; śhreyaḥ—better; para-dharmaḥ—duties prescribed for others; bhaya-āvahaḥ—fraught with fear",
      context: "Krishna emphasizes the importance of following one's own dharma rather than imitating others",
      imageUrl: '/assets/images/dharma.jpg'
    },

    // 5. BG 2.56 - Sthita Prajna
    {
      id: 5,
      chapter: 2,
      verse: 56,
      verseReference: 'BG 2.56',
      hint: 'Qualities of a person with steady wisdom',
      firstWords: 'दुःखेष्वनुद्विग्नमनाः सुखेषु...',
      slokaDevanagari: 'दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥',
      slokaTransliteration: "duḥkheṣhv-anudvigna-manāḥ sukheṣhu vigata-spṛihaḥ\nvīta-rāga-bhaya-krodhaḥ sthita-dhīr munir uchyate",
      meaningEnglish: 'One who is not disturbed in spite of the threefold miseries, who is not elated when there is happiness, and who is free from attachment, fear, and anger, is called a sage of steady mind.',
      meaningHindi: 'जो व्यक्ति दुःख में व्याकुल नहीं होता, सुख की इच्छा नहीं करता, और राग, भय और क्रोध से रहित है, वह स्थिर बुद्धि मुनि कहलाता है।',
      audioUrl: '/assets/audio/bg-2-56.mp3',
      difficulty: 'intermediate',
      wordByWordMeaning: "duḥkheṣhu—in suffering; anudvigna-manāḥ—not disturbed; sukheṣhu—in happiness; vigata-spṛihaḥ—without craving; vīta—free from; rāga—attachment; bhaya—fear; krodhaḥ—anger; sthita-dhīḥ—one of steady mind; muniḥ—sage; uchyate—is called",
      context: 'This verse describes the qualities of a sthita-prajna (person of steady wisdom)',
      imageUrl: '/assets/images/detachment.jpg'
    },

    // 6. BG 2.20 - Eternal Soul
    {
      id: 6,
      chapter: 2,
      verse: 20,
      verseReference: 'BG 2.20',
      hint: 'The soul is eternal, unborn, and never dies',
      firstWords: 'न जायते म्रियते वा कदाचिन्...',
      slokaDevanagari: 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥',
      slokaTransliteration: "na jāyate mriyate vā kadāchin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ\najo nityaḥ śhāśhvato 'yaṁ purāṇo na hanyate hanyamāne śharīre",
      meaningEnglish: 'For the soul there is neither birth nor death at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing and primeval. It is not slain when the body is slain.',
      meaningHindi: 'आत्मा का न कभी जन्म होता है न मृत्यु। यह उत्पन्न नहीं होती, न होगी, न हुई है। यह अजन्मा, नित्य, शाश्वत और पुरातन है। शरीर के मारे जाने पर भी यह नहीं मारी जाती।',
      audioUrl: '/assets/audio/bg-2-20.mp3',
      difficulty: 'advanced',
      wordByWordMeaning: "na—never; jāyate—is born; mriyate—dies; vā—or; kadāchit—at any time; na—not; ayam—this; bhūtvā—having once existed; bhavitā—will be; vā—or; na—not; bhūyaḥ—further; ajaḥ—unborn; nityaḥ—eternal; śhāśhvataḥ—immortal; ayam—this; purāṇaḥ—primeval; na—not; hanyate—is destroyed; hanyamāne—is destroyed; śharīre—when the body",
      context: 'This profound verse reveals the eternal nature of the soul, a fundamental teaching of the Gita',
      imageUrl: '/assets/images/self-realization.jpg'
    },

    // 7. BG 9.22 - Ananya Bhakti
    {
      id: 7,
      chapter: 9,
      verse: 22,
      verseReference: 'BG 9.22',
      hint: 'God personally takes care of His exclusive devotees',
      firstWords: 'अनन्याश्चिन्तयन्तो मां ये जनाः...',
      slokaDevanagari: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
      slokaTransliteration: "ananyāśh chintayanto māṁ ye janāḥ paryupāsate\nteṣhāṁ nityābhiyuktānāṁ yoga-kṣhemaṁ vahāmyaham",
      meaningEnglish: 'To those who are constantly devoted and who worship Me with love, I give the understanding by which they can come to Me. I personally take care of both their spiritual and material needs.',
      meaningHindi: 'जो भक्तजन अनन्य प्रेम से युक्त हुए निरन्तर मेरा चिन्तन करते हुए मेरी उपासना करते हैं, उन नित्य मुझमें लगे हुए भक्तों का योगक्षेम मैं स्वयं वहन करता हूँ।',
      audioUrl: '/assets/audio/bg-9-22.mp3',
      difficulty: 'beginner',
      wordByWordMeaning: "ananyāḥ—exclusively; chintayantaḥ—thinking; mām—of Me; ye—who; janāḥ—people; paryupāsate—worship; teṣhām—to them; nitya—constantly; abhiyuktānām—engaged; yoga-kṣhemam—spiritual and material needs; vahāmi—carry; aham—I",
      context: 'This verse gives the beautiful assurance that Krishna personally takes care of His devotees',
      imageUrl: '/assets/images/bhakti-yoga.jpg'
    },

    // 8. BG 6.5 - Self-elevation
    {
      id: 8,
      chapter: 6,
      verse: 5,
      verseReference: 'BG 6.5',
      hint: 'Elevate yourself by your own mind, not degrade yourself',
      firstWords: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्...',
      slokaDevanagari: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
      slokaTransliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ",
      meaningEnglish: 'Elevate yourself through the power of your mind, and not degrade yourself, for the mind can be the friend and also the enemy of the self.',
      meaningHindi: 'अपने द्वारा अपना उद्धार करे और अपना पतन न करे, क्योंकि आप ही अपना मित्र है और आप ही अपना शत्रु है।',
      audioUrl: '/assets/audio/bg-6-5.mp3',
      difficulty: 'intermediate',
      wordByWordMeaning: "uddharet—elevate; ātmanā—through the mind; ātmānam—the self; na—not; ātmānam—the self; avasādayet—degrade; ātmā—the mind; eva—certainly; hi—indeed; ātmanaḥ—of the self; bandhuḥ—friend; ātmā—the mind; eva—certainly; ripuḥ—enemy; ātmanaḥ—of the self",
      context: 'This verse emphasizes personal responsibility for spiritual progress and the dual nature of the mind',
      imageUrl: '/assets/images/self-elevation.jpg'
    },

    // 9. BG 2.14 - Tolerance
    {
      id: 9,
      chapter: 2,
      verse: 14,
      verseReference: 'BG 2.14',
      hint: 'Learn to tolerate happiness and distress as temporary',
      firstWords: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः...',
      slokaDevanagari: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
      slokaTransliteration: "mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ\nāgamāpāyino 'nityās tāṁs titikṣhasva bhārata",
      meaningEnglish: 'O son of Kunti, the contact between the senses and the sense objects gives rise to fleeting perceptions of happiness and distress. These are non-permanent, and come and go like the winter and summer seasons. O descendent of Bharat, one must learn to tolerate them without being disturbed.',
      meaningHindi: 'हे कुन्तीपुत्र! सर्दी-गर्मी और सुख-दुःख देनेवाले इन्द्रिय और विषयों के संयोग तो उत्पत्ति-विनाशशील और अनित्य हैं, इसलिए हे भारत! उनको तू सहन कर।',
      audioUrl: '/assets/audio/bg-2-14.mp3',
      difficulty: 'beginner',
      wordByWordMeaning: "mātrā-sparśhāḥ—contact of the senses with the sense objects; tu—indeed; kaunteya—Arjun, the son of Kunti; śhīta—winter; uṣhṇa—summer; sukha—happiness; duḥkha—distress; dāḥ—give; āgama—come; apāyinaḥ—go; anityāḥ—non-permanent; tān—them; titikṣhasva—tolerate; bhārata—descendent of Bharat",
      context: 'Krishna teaches Arjuna to develop tolerance and equanimity in the face of dualities of life',
      imageUrl: '/assets/images/tolerance.jpg'
    },

    // 10. BG 4.7 - Avatar
    {
      id: 10,
      chapter: 4,
      verse: 7,
      verseReference: 'BG 4.7',
      hint: 'Why and when God descends to this world',
      firstWords: 'यदा यदा हि धर्मस्य ग्लानिर्भवति...',
      slokaDevanagari: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
      slokaTransliteration: "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛijāmyaham",
      meaningEnglish: 'Whenever there is a decline in righteousness and a rise in unrighteousness, O Arjuna, at that time I manifest Myself on earth.',
      meaningHindi: 'हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं अपने रूप को रचता हूँ अर्थात साकार रूप से लोगों के सम्मुख प्रकट होता हूँ।',
      audioUrl: '/assets/audio/bg-4-7.mp3',
      difficulty: 'beginner',
      wordByWordMeaning: "yadā yadā—whenever; hi—certainly; dharmasya—of righteousness; glāniḥ—decline; bhavati—is; bhārata—Arjun, descendant of Bharat; abhyutthānam—increase; adharmasya—of unrighteousness; tadā—at that time; ātmānam—self; sṛijāmi—manifest; aham—I",
      context: 'This famous verse explains the purpose of divine incarnation',
      imageUrl: '/assets/images/avatar.jpg'
    }
  ];

  constructor() {}

  // Get all verses
  getAllVerses(): Observable<VerseReference[]> {
    return of(this.verses);
  }

  // Get verses by chapter
  getVersesByChapter(chapter: number): Observable<VerseReference[]> {
    const filtered = this.verses.filter(v => v.chapter === chapter);
    return of(filtered);
  }

  // Get verse by ID
  getVerseById(id: number): Observable<VerseReference | undefined> {
    const verse = this.verses.find(v => v.id === id);
    return of(verse);
  }

  // Get all chapters with verse counts
  getChapters(): Observable<ChapterCategory[]> {
    const chapters: ChapterCategory[] = [
      {
        chapter: 2,
        name: 'Chapter 2',
        icon: 'book',
        color: '#9C27B0',
        description: 'Sankhya Yoga - Analytics of Self-Realization',
        verseCount: this.verses.filter(v => v.chapter === 2).length
      },
      {
        chapter: 3,
        name: 'Chapter 3',
        icon: 'fitness',
        color: '#7B1FA2',
        description: 'Karma Yoga - Path of Selfless Action',
        verseCount: this.verses.filter(v => v.chapter === 3).length
      },
      {
        chapter: 4,
        name: 'Chapter 4',
        icon: 'bulb',
        color: '#6A1B9A',
        description: 'Jnana Yoga - Path of Knowledge',
        verseCount: this.verses.filter(v => v.chapter === 4).length
      },
      {
        chapter: 6,
        name: 'Chapter 6',
        icon: 'leaf',
        color: '#4A148C',
        description: 'Dhyana Yoga - Path of Meditation',
        verseCount: this.verses.filter(v => v.chapter === 6).length
      },
      {
        chapter: 9,
        name: 'Chapter 9',
        icon: 'heart',
        color: '#8E24AA',
        description: 'Raja Vidya Yoga - Royal Knowledge',
        verseCount: this.verses.filter(v => v.chapter === 9).length
      },
      {
        chapter: 18,
        name: 'Chapter 18',
        icon: 'shield',
        color: '#AB47BC',
        description: 'Moksha Sannyasa Yoga - Path of Liberation',
        verseCount: this.verses.filter(v => v.chapter === 18).length
      }
    ];
    return of(chapters.filter(c => c.verseCount > 0));
  }

  // Search verses
  searchVerses(term: string): Observable<VerseReference[]> {
    if (!term.trim()) {
      return of(this.verses);
    }
    
    const searchTerm = term.toLowerCase();
    const filtered = this.verses.filter(v =>
      v.verseReference.toLowerCase().includes(searchTerm) ||
      v.hint.toLowerCase().includes(searchTerm) ||
      v.context.toLowerCase().includes(searchTerm) ||
      v.meaningEnglish.toLowerCase().includes(searchTerm)
    );
    return of(filtered);
  }
}
