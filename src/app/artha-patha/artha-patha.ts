import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Interface for meaning-to-sloka learning
export interface MeaningToSloka {
  id: number;
  category: string;
  meaningEnglish: string;
  meaningHindi?: string;
  chapter: number;
  verse: number;
  verseReference: string;
  slokaDevanagari: string;
  slokaTransliteration: string;
  audioUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  wordByWordMeaning?: string;
  context?: string;
  imageUrl?: string;
  isCustom?: boolean;
  createdAt?: Date;
}

// Interface for categories
export interface SlokaCategory {
  name: string;
  icon: string;
  color: string;
  description: string;
  meaningCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArthaPatha {
  private meanings: MeaningToSloka[] = [
    // 1. Karma Yoga - Action
    {
      id: 1,
      category: 'Karma Yoga',
      meaningEnglish: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.',
      meaningHindi: 'कर्म करने में तुम्हारा अधिकार है, लेकिन फल में कभी नहीं। कर्म के फल का कारण अपने आप को कभी मत समझो और कर्म न करने में भी आसक्त मत होओ।',
      chapter: 2,
      verse: 47,
      verseReference: 'BG 2.47',
      slokaDevanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      slokaTransliteration: 'karmaṇy-evādhikāras te mā phaleṣhu kadāchana\nmā karma-phala-hetur bhūr mā te saṅgo "stvakarmaṇi"',
      audioUrl: '/assets/audio/bg-2-47.mp3',
      difficulty: 'beginner',
      wordByWordMeaning: 'karmaṇi—in prescribed duties; eva—only; adhikāraḥ—right; te—your; mā—not; phaleṣhu—in the fruits; kadāchana—at any time; mā—never; karma-phala—results of the activities; hetuḥ—cause; bhūḥ—be; mā—not; te—your; saṅgaḥ—attachment; astu—let there be; akarmaṇi—in inaction',
      context: 'This is one of the most famous verses of the Bhagavad Gita, teaching the principle of Nishkama Karma (selfless action)',
      imageUrl: '/assets/images/karma-yoga.jpg'
    },

    // 2. Bhakti Yoga - Devotion
    {
      id: 2,
      category: 'Bhakti Yoga',
      meaningEnglish: 'Abandon all varieties of dharmas and simply surrender unto Me alone. I shall liberate you from all sinful reactions; do not fear.',
      meaningHindi: 'सभी प्रकार के धर्मों को त्यागकर केवल मेरी शरण में आ जाओ। मैं तुम्हें सभी पापों से मुक्त कर दूँगा, भय मत करो।',
      chapter: 18,
      verse: 66,
      verseReference: 'BG 18.66',
      slokaDevanagari: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
      slokaTransliteration: 'sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ',
      audioUrl: '/assets/audio/bg-18-66.mp3',
      difficulty: 'intermediate',
      wordByWordMeaning: 'sarva-dharmān—all varieties of dharmas; parityajya—abandoning; mām—unto Me; ekam—only; śharaṇam—refuge; vraja—take; aham—I; tvām—you; sarva—all; pāpebhyaḥ—from sinful reactions; mokṣhayiṣhyāmi—shall liberate; mā—do not; śhuchaḥ—fear',
      context: 'This is the ultimate teaching of the Gita, known as the Charama Shloka (final instruction), emphasizing complete surrender to Krishna',
      imageUrl: '/assets/images/bhakti-yoga.jpg'
    },

    // 3. Jnana Yoga - Knowledge
    {
      id: 3,
      category: 'Jnana Yoga',
      meaningEnglish: 'As the blazing fire reduces wood to ashes, O Arjuna, so does the fire of knowledge reduce all karma to ashes.',
      meaningHindi: 'हे अर्जुन! जैसे प्रज्वलित अग्नि लकड़ी को राख कर देती है, वैसे ही ज्ञान की अग्नि सभी कर्मों को राख कर देती है।',
      chapter: 4,
      verse: 37,
      verseReference: 'BG 4.37',
      slokaDevanagari: 'यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुतेऽर्जुन।\nज्ञानाग्निः सर्वकर्माणि भस्मसात्कुरुते तथा॥',
      slokaTransliteration: "yathaidhānsi samiddho 'gnir bhasma-sāt kurute 'rjuna\njñānāgniḥ sarva-karmāṇi bhasma-sāt kurute tathā",
      audioUrl: '/assets/audio/bg-4-37.mp3',
      difficulty: 'intermediate',
      wordByWordMeaning: 'yathā—as; edhānsi—firewood; samiddhaḥ—blazing; agniḥ—fire; bhasma-sāt—to ashes; kurute—reduces; arjuna—Arjun; jñāna-agniḥ—the fire of knowledge; sarva-karmāṇi—all karmas; bhasma-sāt—to ashes; kurute—reduces; tathā—similarly',
      context: 'This verse explains the supreme power of transcendental knowledge in destroying the bondage of karma',
      imageUrl: '/assets/images/jnana-yoga.jpg'
    },

    // 4. Dharma - Duty
    {
      id: 4,
      category: 'Dharma',
      meaningEnglish: "It is far better to perform one's natural prescribed duty, though tinged with faults, than to perform another's prescribed duty, though perfectly. In fact, it is preferable to die in the discharge of one's duty, than to follow the path of another, which is fraught with danger.",
      meaningHindi: 'दोषयुक्त भी अपना धर्म श्रेष्ठ है, दूसरे के धर्म से जो भली-भांति आचरण किया गया हो। अपने धर्म में मरना भी कल्याणकारक है, परन्तु दूसरे का धर्म भयावह है।',
      chapter: 3,
      verse: 35,
      verseReference: 'BG 3.35',
      slokaDevanagari: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥',
      slokaTransliteration: "śhreyān swa-dharmo viguṇaḥ para-dharmāt sv-anuṣhṭhitāt\nswa-dharme nidhanaṁ śhreyaḥ para-dharmo bhayāvahaḥ",
      audioUrl: '/assets/audio/bg-3-35.mp3',
      difficulty: 'beginner',
      wordByWordMeaning: "śhreyān—better; swa-dharmaḥ—personal duty; viguṇaḥ—tinged with faults; para-dharmāt—than another's; su-anuṣhṭhitāt—perfectly performed; swa-dharme—in one's personal duties; nidhanam—death; śhreyaḥ—better; para-dharmaḥ—duties prescribed for others; bhaya-āvahaḥ—fraught with fear",
      context: "Krishna emphasizes the importance of following one's own dharma rather than imitating others",
      imageUrl: '/assets/images/dharma.jpg'
    },

    // 5. Detachment - Vairagya
    {
      id: 5,
      category: 'Detachment',
      meaningEnglish: 'One who is not disturbed in spite of the threefold miseries, who is not elated when there is happiness, and who is free from attachment, fear, and anger, is called a sage of steady mind.',
      meaningHindi: 'जो व्यक्ति दुःख में व्याकुल नहीं होता, सुख की इच्छा नहीं करता, और राग, भय और क्रोध से रहित है, वह स्थिर बुद्धि मुनि कहलाता है।',
      chapter: 2,
      verse: 56,
      verseReference: 'BG 2.56',
      slokaDevanagari: 'दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥',
      slokaTransliteration: "duḥkheṣhv-anudvigna-manāḥ sukheṣhu vigata-spṛihaḥ\nvīta-rāga-bhaya-krodhaḥ sthita-dhīr munir uchyate",
      audioUrl: '/assets/audio/bg-2-56.mp3',
      difficulty: 'intermediate',
      wordByWordMeaning: 'duḥkheṣhu—in suffering; anudvigna-manāḥ—not disturbed; sukheṣhu—in happiness; vigata-spṛihaḥ—without craving; vīta—free from; rāga—attachment; bhaya—fear; krodhaḥ—anger; sthita-dhīḥ—one of steady mind; muniḥ—sage; uchyate—is called',
      context: 'This verse describes the qualities of a sthita-prajna (person of steady wisdom)',
      imageUrl: '/assets/images/detachment.jpg'
    },

    // 6. Self-Realization - Atma Jnana
    {
      id: 6,
      category: 'Self-Realization',
      meaningEnglish: 'For the soul there is neither birth nor death at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing and primeval. It is not slain when the body is slain.',
      meaningHindi: 'आत्मा का न कभी जन्म होता है न मृत्यु। यह उत्पन्न नहीं होती, न होगी, न हुई है। यह अजन्मा, नित्य, शाश्वत और पुरातन है। शरीर के मारे जाने पर भी यह नहीं मारी जाती।',
      chapter: 2,
      verse: 20,
      verseReference: 'BG 2.20',
      slokaDevanagari: 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥',
      slokaTransliteration: "na jāyate mriyate vā kadāchin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ\najo nityaḥ śhāśhvato 'yaṁ purāṇo na hanyate hanyamāne śharīre",
      audioUrl: '/assets/audio/bg-2-20.mp3',
      difficulty: 'advanced',
      wordByWordMeaning: 'na—never; jāyate—is born; mriyate—dies; vā—or; kadāchit—at any time; na—not; ayam—this; bhūtvā—having once existed; bhavitā—will be; vā—or; na—not; bhūyaḥ—further; ajaḥ—unborn; nityaḥ—eternal; śhāśhvataḥ—immortal; ayam—this; purāṇaḥ—primeval; na—not; hanyate—is destroyed; hanyamāne—is destroyed; śharīre—when the body',
      context: 'This profound verse reveals the eternal nature of the soul, a fundamental teaching of the Gita',
      imageUrl: '/assets/images/self-realization.jpg'
    },

    // 7. Karma Yoga - Equanimity
    {
      id: 7,
      category: 'Karma Yoga',
      meaningEnglish: 'Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called Yoga.',
      meaningHindi: 'हे अर्जुन! समत्व में स्थित होकर योग में दृढ़ होकर कर्म कर, सिद्धि और असिद्धि में समान बुद्धि रख। समत्व ही योग कहलाता है।',
      chapter: 2,
      verse: 48,
      verseReference: 'BG 2.48',
      slokaDevanagari: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
      slokaTransliteration: "yoga-sthaḥ kuru karmāṁi saṅgaṁ tyaktvā dhanañjaya\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga uchyate",
      audioUrl: '/assets/audio/bg-2-48.mp3',
      difficulty: 'beginner',
      wordByWordMeaning: 'yoga-sthaḥ—being steadfast in Yog; kuru—perform; karmāṇi—duties; saṅgam—attachment; tyaktvā—abandoning; dhanañjaya—Arjun; siddhi-asiddhyoḥ—in success and failure; samaḥ—equipoised; bhūtvā—becoming; samatvam—equanimity; yogaḥ—Yog; uchyate—is called',
      context: 'This verse defines yoga as equanimity and mental equilibrium in all situations',
      imageUrl: '/assets/images/equanimity.jpg'
    },

    // 8. Bhakti Yoga - Remembrance
    {
      id: 8,
      category: 'Bhakti Yoga',
      meaningEnglish: 'And whoever, at the end of their life, quits their body remembering Me alone, at once attains My nature. Of this there is no doubt.',
      meaningHindi: 'जो कोई भी अंत समय में शरीर त्यागते समय केवल मुझे स्मरण करता है, वह तुरंत मेरे स्वरूप को प्राप्त होता है, इसमें कोई संदेह नहीं।',
      chapter: 8,
      verse: 5,
      verseReference: 'BG 8.5',
      slokaDevanagari: 'अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्।\nयः प्रयाति स मद्भावं याति नास्त्यत्र संशयः॥',
      slokaTransliteration: "anta-kāle cha mām eva smaran muktvā kalevaram\nyaḥ prayāti sa mad-bhāvaṁ yāti nāsty atra sanśhayaḥ",
      audioUrl: '/assets/audio/bg-8-5.mp3',
      difficulty: 'intermediate',
      wordByWordMeaning: 'anta-kāle—at the time of death; cha—and; mām—Me; eva—alone; smaran—remembering; muktvā—relinquishing; kalevaram—the body; yaḥ—who; prayāti—goes; saḥ—he; mat-bhāvam—Godlike nature; yāti—achieves; na—no; asti—there is; atra—here; sanśhayaḥ—doubt',
      context: 'This verse emphasizes the importance of remembering the Supreme at the time of death',
      imageUrl: '/assets/images/remembrance.jpg'
    },

    // 9. Jnana Yoga - Self-Knowledge
    {
      id: 9,
      category: 'Jnana Yoga',
      meaningEnglish: 'Those who are seers of the truth have concluded that of the nonexistent there is no endurance, and of the eternal there is no change. This they have concluded by studying the nature of both.',
      meaningHindi: 'तत्त्वदर्शी महापुरुषों ने तत्व के ज्ञान से यह निश्चय किया है कि असत् वस्तु की सत्ता नहीं है और सत् का अभाव नहीं है।',
      chapter: 2,
      verse: 16,
      verseReference: 'BG 2.16',
      slokaDevanagari: 'नासतो विद्यते भावो नाभावो विद्यते सतः।\nउभयोरपि दृष्टोऽन्तस्त्वनयोस्तत्त्वदर्शिभिः॥',
      slokaTransliteration: "nāsato vidyate bhāvo nābhāvo vidyate sataḥ\nubhayor api dṛiṣhṭo 'ntas tv anayos tattva-darśhibhiḥ",
      audioUrl: '/assets/audio/bg-2-16.mp3',
      difficulty: 'advanced',
      wordByWordMeaning: 'na—no; asataḥ—of the temporary; vidyate—there is; bhāvaḥ—is existance; na—no; abhāvaḥ—cessation; vidyate—is; sataḥ—of the eternal; ubhayoḥ—of the two; api—also; dṛiṣhṭaḥ—observed; antaḥ—conclusion; tu—verily; anayoḥ—of these; tattva—of the truth; darśhibhiḥ—by the seers',
      context: 'This verse establishes the fundamental distinction between the temporary material body and the eternal soul',
      imageUrl: '/assets/images/self-knowledge.jpg'
    },

    // 10. Detachment - Desirelessness
    {
      id: 10,
      category: 'Detachment',
      meaningEnglish: "That person who is equal to an enemy or a friend, and also in honour or dishonour, heat or cold, happiness or distress, fame or infamy, who is always free from contamination, always silent and satisfied with anything, who doesn't care for any residence, who is fixed in knowledge and engaged in devotional service, is very dear to Me.",
      meaningHindi: 'जो व्यक्ति मित्र-शत्रु, मान-अपमान, सर्दी-गर्मी, सुख-दुःख में समान रहता है, आसक्ति रहित है, निन्दा-स्तुति में समान है, मौन है, जो कुछ मिले उसमें संतुष्ट है, जिसका कोई निश्चित निवास नहीं, जो स्थिर बुद्धि और भक्तियुक्त है, वह पुरुष मुझे अति प्रिय है।',
      chapter: 12,
      verse: 18,
      verseReference: 'BG 12.18-19',
      slokaDevanagari: 'समः शत्रौ च मित्रे च तथा मानापमानयोः।\nशीतोष्णसुखदुःखेषु समः सङ्गविवर्जितः॥\nतुल्यनिन्दास्तुतिर्मौनी सन्तुष्टो येन केनचित्।\nअनिकेतः स्थिरमतिर्भक्तिमान्मे प्रियो नरः॥',
      slokaTransliteration: "samaḥ śhatrau cha mitre cha tathā mānāpamānayoḥ\nśhītoṣhṇa-sukha-duḥkheṣhu samaḥ saṅga-vivarjitaḥ\ntulya-nindā-stutir maunī santuṣhṭo yena kenachit\naniketaḥ sthira-matir bhaktimān me priyo naraḥ",
      audioUrl: '/assets/audio/bg-12-18-19.mp3',
      difficulty: 'advanced',
      wordByWordMeaning: 'samaḥ—alike; śhatrau—to an enemy; cha—and; mitre—friend; cha—and; tathā—so; māna—honor; apamānayoḥ—dishonor; śhīta—cold; uṣhṇa—heat; sukha—happiness; duḥkheṣhu—distress; samaḥ—equipoised; saṅga-vivarjitaḥ—free from all unfavorable association',
      context: 'This verse describes the qualities of a dear devotee who remains equipoised in all dualities',
      imageUrl: '/assets/images/desirelessness.jpg'
    }
  ];

  private customMeanings: MeaningToSloka[] = [];

  constructor() {
    this.loadCustomMeanings();
  }

  // Get all meanings
  getAllMeanings(): Observable<MeaningToSloka[]> {
    return of([...this.meanings, ...this.customMeanings]);
  }

  // Get meanings by category
  getMeaningsByCategory(category: string): Observable<MeaningToSloka[]> {
    const filtered = [...this.meanings, ...this.customMeanings].filter(
      m => m.category === category
    );
    return of(filtered);
  }

  // Get meaning by ID
  getMeaningById(id: number): Observable<MeaningToSloka | undefined> {
    const meaning = [...this.meanings, ...this.customMeanings].find(m => m.id === id);
    return of(meaning);
  }

  // Get all categories with counts
  getCategories(): Observable<SlokaCategory[]> {
    const allMeanings = [...this.meanings, ...this.customMeanings];
    const categories: SlokaCategory[] = [
      {
        name: 'Karma Yoga',
        icon: 'fitness',
        color: '#FF6B6B',
        description: 'Path of selfless action and duty',
        meaningCount: allMeanings.filter(m => m.category === 'Karma Yoga').length
      },
      {
        name: 'Bhakti Yoga',
        icon: 'heart',
        color: '#4ECDC4',
        description: 'Path of devotion and surrender',
        meaningCount: allMeanings.filter(m => m.category === 'Bhakti Yoga').length
      },
      {
        name: 'Jnana Yoga',
        icon: 'bulb',
        color: '#95E1D3',
        description: 'Path of knowledge and wisdom',
        meaningCount: allMeanings.filter(m => m.category === 'Jnana Yoga').length
      },
      {
        name: 'Dharma',
        icon: 'shield',
        color: '#F38181',
        description: 'Teachings on duty and righteousness',
        meaningCount: allMeanings.filter(m => m.category === 'Dharma').length
      },
      {
        name: 'Detachment',
        icon: 'leaf',
        color: '#AA96DA',
        description: 'Freedom from worldly attachments',
        meaningCount: allMeanings.filter(m => m.category === 'Detachment').length
      },
      {
        name: 'Self-Realization',
        icon: 'infinite',
        color: '#FCBAD3',
        description: 'Understanding the eternal soul',
        meaningCount: allMeanings.filter(m => m.category === 'Self-Realization').length
      }
    ];
    return of(categories);
  }

  // Search meanings
  searchMeanings(searchTerm: string): Observable<MeaningToSloka[]> {
    const term = searchTerm.toLowerCase();
    const results = [...this.meanings, ...this.customMeanings].filter(m =>
      m.meaningEnglish.toLowerCase().includes(term) ||
      m.category.toLowerCase().includes(term) ||
      m.verseReference.toLowerCase().includes(term) ||
      (m.meaningHindi && m.meaningHindi.toLowerCase().includes(term))
    );
    return of(results);
  }

  // Add custom meaning
  addCustomMeaning(meaning: MeaningToSloka): Observable<MeaningToSloka> {
    const newMeaning = {
      ...meaning,
      id: Date.now(),
      isCustom: true,
      createdAt: new Date()
    };
    this.customMeanings.push(newMeaning);
    this.saveCustomMeanings();
    return of(newMeaning);
  }

  // Delete custom meaning
  deleteCustomMeaning(id: number): Observable<boolean> {
    const index = this.customMeanings.findIndex(m => m.id === id);
    if (index !== -1) {
      this.customMeanings.splice(index, 1);
      this.saveCustomMeanings();
      return of(true);
    }
    return of(false);
  }

  // LocalStorage operations
  private loadCustomMeanings(): void {
    const stored = localStorage.getItem('artha_patha_custom_meanings');
    if (stored) {
      this.customMeanings = JSON.parse(stored);
    }
  }

  private saveCustomMeanings(): void {
    localStorage.setItem('artha_patha_custom_meanings', JSON.stringify(this.customMeanings));
  }
}
