import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Interfaces
export interface RelatedSloka {
  chapter: number;
  verse: number;
  relevance: string;
  slokaText: string;
  slokaTransliteration: string;
  slokaTranslation: string;
  slokaPurport: string;
}

export interface LifeQuestion {
  id: number;
  category: 'Career' | 'Fear' | 'Anger' | 'Loss' | 'Confusion' | 'Relationships' | 'Motivation' | 'Peace' | 'Justice' | 'Self-Realization';
  question: string;
  situation: string;
  imageUrl: string;
  audioUrl: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relatedSlokas: RelatedSloka[];
  isCustom?: boolean;
  createdAt?: Date;
}

export interface QuestionCategory {
  name: string;
  icon: string;
  color: string;
  description: string;
  questionCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class PrashnaPatha {
  
  private mockQuestions: LifeQuestion[] = [
    // Career & Purpose
    {
      id: 1,
      category: 'Career',
      question: 'How do I handle workplace pressure and expectations?',
      situation: 'I feel overwhelmed with deadlines, targets, and my boss\'s expectations. I\'m afraid of failure and losing my job.',
      imageUrl: 'assets/images/questions/workplace-stress.jpg',
      audioUrl: 'assets/audio/questions/q1.mp3',
      difficulty: 'intermediate',
      relatedSlokas: [
        {
          chapter: 2,
          verse: 47,
          relevance: 'Focus on action, not results',
          slokaText: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
          slokaTransliteration: 'karmaṇy evādhikāras te mā phaleṣu kadācana, mā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi',
          slokaTranslation: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.',
          slokaPurport: 'This verse teaches us to focus on our work without being anxious about results. Do your best effort, but don\'t let fear of failure paralyze you. The quality of work matters, not the attachment to outcomes.'
        }
      ]
    },
    {
      id: 2,
      category: 'Career',
      question: 'Should I quit my stable job to pursue my passion?',
      situation: 'I have a secure job but I\'m not fulfilled. I dream of starting my own business or pursuing a creative career, but I\'m scared of financial instability.',
      imageUrl: 'assets/images/questions/career-change.jpg',
      audioUrl: 'assets/audio/questions/q2.mp3',
      difficulty: 'advanced',
      relatedSlokas: [
        {
          chapter: 3,
          verse: 35,
          relevance: 'Better to do your own dharma imperfectly',
          slokaText: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् । स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥',
          slokaTransliteration: 'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt, sva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ',
          slokaTranslation: 'It is far better to discharge one\'s prescribed duties, even though faultily, than another\'s duties perfectly. Destruction in the course of performing one\'s own duty is better than engaging in another\'s duties, for to follow another\'s path is dangerous.',
          slokaPurport: 'Follow your true calling (svadharma) even if it seems risky. Living someone else\'s life or staying in a role that doesn\'t align with your purpose is more dangerous than taking calculated risks for your authentic path.'
        }
      ]
    },
    
    // Fear & Anxiety
    {
      id: 3,
      category: 'Fear',
      question: 'How do I overcome fear of failure?',
      situation: 'I\'m paralyzed by fear. I don\'t try new things because I\'m afraid I might fail and people will judge me.',
      imageUrl: 'assets/images/questions/fear-failure.jpg',
      audioUrl: 'assets/audio/questions/q3.mp3',
      difficulty: 'beginner',
      relatedSlokas: [
        {
          chapter: 2,
          verse: 56,
          relevance: 'The wise remain unshaken',
          slokaText: 'दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः । वीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते ॥',
          slokaTransliteration: 'duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ, vīta-rāga-bhaya-krodhaḥ sthita-dhīr munir ucyate',
          slokaTranslation: 'One who is not disturbed in mind even amidst the threefold miseries or elated when there is happiness, and who is free from attachment, fear and anger, is called a sage of steady mind.',
          slokaPurport: 'Cultivate mental steadiness. Success and failure are temporary. The real victory is maintaining equanimity regardless of outcomes. Fear loses power when you don\'t identify with results.'
        }
      ]
    },
    {
      id: 4,
      category: 'Fear',
      question: 'I\'m afraid of death and losing loved ones',
      situation: 'The thought of death terrifies me. I worry constantly about losing my parents, spouse, or children. How do I cope with this fear?',
      imageUrl: 'assets/images/questions/fear-death.jpg',
      audioUrl: 'assets/audio/questions/q4.mp3',
      difficulty: 'advanced',
      relatedSlokas: [
        {
          chapter: 2,
          verse: 20,
          relevance: 'The soul is eternal',
          slokaText: 'न जायते म्रियते वा कदाचिन् नायं भूत्वा भविता वा न भूयः । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥',
          slokaTransliteration: 'na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ, ajo nityaḥ śāśvato \'yaṁ purāṇo na hanyate hanyamāne śarīre',
          slokaTranslation: 'For the soul there is neither birth nor death at any time. He has not come into being, does not come into being, and will not come into being. He is unborn, eternal, ever-existing and primeval. He is not slain when the body is slain.',
          slokaPurport: 'Understanding the eternal nature of the soul removes the fear of death. Bodies change, but consciousness continues. Love transcends physical form. This knowledge brings peace and reduces anxiety about mortality.'
        }
      ]
    },
    
    // Anger Management
    {
      id: 5,
      category: 'Anger',
      question: 'How do I control my anger and frustration?',
      situation: 'I get angry quickly - in traffic, when people don\'t listen to me, or when things don\'t go my way. My anger is affecting my relationships.',
      imageUrl: 'assets/images/questions/anger-management.jpg',
      audioUrl: 'assets/audio/questions/q5.mp3',
      difficulty: 'intermediate',
      relatedSlokas: [
        {
          chapter: 2,
          verse: 62,
          relevance: 'How anger destroys intelligence',
          slokaText: 'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते । सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते ॥',
          slokaTransliteration: 'dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate, saṅgāt sañjāyate kāmaḥ kāmāt krodho \'bhijāyate',
          slokaTranslation: 'While contemplating the objects of the senses, a person develops attachment for them, and from such attachment lust develops, and from lust anger arises.',
          slokaPurport: 'Anger comes from unfulfilled desires (lust). When you expect things to go your way and they don\'t, frustration turns to anger. Understanding this chain (contemplation → attachment → desire → anger) helps you intercept anger at its source.'
        },
        {
          chapter: 2,
          verse: 63,
          relevance: 'The destructive power of anger',
          slokaText: 'क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः । स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥',
          slokaTransliteration: 'krodhād bhavati sammohaḥ sammohāt smṛti-vibhramaḥ, smṛti-bhraṁśād buddhi-nāśo buddhi-nāśāt praṇaśyati',
          slokaTranslation: 'From anger, complete delusion arises, and from delusion bewilderment of memory. When memory is bewildered, intelligence is lost, and when intelligence is lost one falls down again into the material pool.',
          slokaPurport: 'Krishna explains the domino effect: Anger → Delusion → Memory Loss → Intelligence Destroyed → Downfall. Recognize this pattern in your life. When angry, pause before acting. Your anger clouds your judgment.'
        }
      ]
    },
    
    // Loss & Grief
    {
      id: 6,
      category: 'Loss',
      question: 'How do I cope with the death of a loved one?',
      situation: 'I recently lost my parent/spouse/friend and I\'m devastated. The pain feels unbearable. How do I find peace?',
      imageUrl: 'assets/images/questions/grief.jpg',
      audioUrl: 'assets/audio/questions/q6.mp3',
      difficulty: 'advanced',
      relatedSlokas: [
        {
          chapter: 2,
          verse: 13,
          relevance: 'Body changes, soul continues',
          slokaText: 'देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा । तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति ॥',
          slokaTransliteration: 'dehino \'smin yathā dehe kaumāraṁ yauvanaṁ jarā, tathā dehāntara-prāptir dhīras tatra na muhyati',
          slokaTranslation: 'As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change.',
          slokaPurport: 'Just as your loved one changed from child to adult in this life, they have simply moved to another phase. The soul is eternal. Your relationship transcends the physical body. Grief is natural, but understanding the soul\'s continuity brings comfort.'
        }
      ]
    },
    
    // Confusion & Decision Making
    {
      id: 7,
      category: 'Confusion',
      question: 'I\'m confused about which path to choose in life',
      situation: 'I have multiple options - marriage vs career, city vs hometown, safe vs risky choices. I\'m paralyzed by indecision.',
      imageUrl: 'assets/images/questions/confusion.jpg',
      audioUrl: 'assets/audio/questions/q7.mp3',
      difficulty: 'intermediate',
      relatedSlokas: [
        {
          chapter: 3,
          verse: 3,
          relevance: 'Two paths: wisdom and work',
          slokaText: 'लोकेऽस्मिन्द्विविधा निष्ठा पुरा प्रोक्ता मयानघ । ज्ञानयोगेन सांख्यानां कर्मयोगेन योगिनाम् ॥',
          slokaTransliteration: 'loke \'smin dvi-vidhā niṣṭhā purā proktā mayānagha, jñāna-yogena sāṅkhyānāṁ karma-yogena yoginām',
          slokaTranslation: 'O sinless Arjuna, I have already explained that there are two classes of men who try to realize the self. Some are inclined to understand it by empirical, philosophical speculation, and others by devotional service.',
          slokaPurport: 'There are different valid paths. Choose based on your nature (svabhava). If you\'re intellectually inclined, pursue knowledge. If you\'re action-oriented, engage in dedicated work. Both lead to self-realization. The key is sincerity on your chosen path.'
        }
      ]
    },
    {
      id: 8,
      category: 'Confusion',
      question: 'Should I forgive someone who hurt me?',
      situation: 'Someone betrayed my trust or hurt me deeply. Part of me wants to forgive, but another part wants justice or revenge.',
      imageUrl: 'assets/images/questions/forgiveness.jpg',
      audioUrl: 'assets/audio/questions/q8.mp3',
      difficulty: 'advanced',
      relatedSlokas: [
        {
          chapter: 12,
          verse: 13,
          relevance: 'Qualities of a devotee',
          slokaText: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च । निर्ममो निरहङ्कारः समदुःखसुखः क्षमी ॥',
          slokaTransliteration: 'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca, nirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī',
          slokaTranslation: 'One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, who is tolerant, forgiving...',
          slokaPurport: 'Forgiveness (kshami) is a divine quality. Holding grudges only harms you, not the other person. Forgiveness doesn\'t mean condoning wrong actions - it means freeing yourself from the poison of resentment. You can forgive while maintaining boundaries.'
        }
      ]
    },
    
    // Relationships & Love
    {
      id: 9,
      category: 'Relationships',
      question: 'How do I deal with a toxic relationship?',
      situation: 'My relationship (family/friend/partner) is draining me. There\'s constant conflict, manipulation, or emotional abuse. Should I stay or leave?',
      imageUrl: 'assets/images/questions/toxic-relationship.jpg',
      audioUrl: 'assets/audio/questions/q9.mp3',
      difficulty: 'advanced',
      relatedSlokas: [
        {
          chapter: 16,
          verse: 21,
          relevance: 'Three gates to hell',
          slokaText: 'त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः । कामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् ॥',
          slokaTransliteration: 'tri-vidhaṁ narakasyedaṁ dvāraṁ nāśanam ātmanaḥ, kāmaḥ krodhas tathā lobhas tasmād etat trayaṁ tyajet',
          slokaTranslation: 'There are three gates leading to this hell - lust, anger and greed. Every sane man should give these up, for they lead to the degradation of the soul.',
          slokaPurport: 'Relationships dominated by lust, anger, and greed are toxic. If a relationship is destroying your peace, mental health, or spiritual growth, it may be time to establish boundaries or walk away. Your well-being is not selfish - it\'s necessary for serving others.'
        }
      ]
    },
    {
      id: 10,
      category: 'Relationships',
      question: 'How do I love without attachment?',
      situation: 'I love my family/partner deeply, but I\'m afraid of losing them. My attachment causes anxiety and possessiveness.',
      imageUrl: 'assets/images/questions/love-attachment.jpg',
      audioUrl: 'assets/audio/questions/q10.mp3',
      difficulty: 'advanced',
      relatedSlokas: [
        {
          chapter: 5,
          verse: 10,
          relevance: 'Work without attachment',
          slokaText: 'ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः । लिप्यते न स पापेन पद्मपत्रमिवाम्भसा ॥',
          slokaTransliteration: 'brahmaṇy ādhāya karmāṇi saṅgaṁ tyaktvā karoti yaḥ, lipyate na sa pāpena padma-patram ivāmbhasā',
          slokaTranslation: 'One who performs his duty without attachment, surrendering the results unto the Supreme Lord, is unaffected by sinful action, as the lotus leaf is untouched by water.',
          slokaPurport: 'Love is beautiful; attachment is suffering. Like a lotus in water - be in relationships but not consumed by them. Love freely, serve devotedly, but remember everyone (including you) belongs to the Divine. This perspective reduces possessiveness and increases genuine love.'
        }
      ]
    },
    
    // Motivation & Strength
    {
      id: 11,
      category: 'Motivation',
      question: 'I feel lazy and unmotivated. How do I overcome inertia?',
      situation: 'I procrastinate, waste time on social media, and lack the drive to work towards my goals.',
      imageUrl: 'assets/images/questions/laziness.jpg',
      audioUrl: 'assets/audio/questions/q11.mp3',
      difficulty: 'beginner',
      relatedSlokas: [
        {
          chapter: 3,
          verse: 8,
          relevance: 'Perform your duty',
          slokaText: 'नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः । शरीरयात्रापि च ते न प्रसिद्ध्येदकर्मणः ॥',
          slokaTransliteration: 'niyataṁ kuru karma tvaṁ karma jyāyo hy akarmaṇaḥ, śarīra-yātrāpi ca te na prasiddhyed akarmaṇaḥ',
          slokaTranslation: 'Perform your prescribed duty, for doing so is better than not working. One cannot even maintain one\'s physical body without work.',
          slokaPurport: 'Action is better than inaction. Even basic survival requires effort. Don\'t wait for motivation - start with small actions. Momentum builds motivation, not the other way around. Do your duty, and energy will follow.'
        }
      ]
    },
    
    // Peace & Meditation
    {
      id: 12,
      category: 'Peace',
      question: 'My mind is always restless. How do I find inner peace?',
      situation: 'I can\'t meditate or focus. My mind jumps from worry to worry. I feel constantly anxious and never at peace.',
      imageUrl: 'assets/images/questions/restless-mind.jpg',
      audioUrl: 'assets/audio/questions/q12.mp3',
      difficulty: 'intermediate',
      relatedSlokas: [
        {
          chapter: 6,
          verse: 35,
          relevance: 'Controlling the mind',
          slokaText: 'असंशयं महाबाहो मनो दुर्निग्रहं चलम् । अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥',
          slokaTransliteration: 'asaṁśayaṁ mahā-bāho mano durnigrahaṁ calam, abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate',
          slokaTranslation: 'O mighty-armed son of Kunti, it is undoubtedly very difficult to curb the restless mind, but it is possible by suitable practice and by detachment.',
          slokaPurport: 'Krishna acknowledges that controlling the mind is difficult - you\'re not alone! But it\'s possible through two methods: 1) Abhyasa (practice) - regular meditation, even 5 minutes daily. 2) Vairagya (detachment) - letting go of excessive desires. Patience and persistence are key.'
        }
      ]
    },
    
    // Justice & Dharma
    {
      id: 13,
      category: 'Justice',
      question: 'Should I fight against injustice or stay peaceful?',
      situation: 'I see corruption, unfairness, or someone being mistreated. Should I speak up and fight, or maintain peace by staying silent?',
      imageUrl: 'assets/images/questions/justice.jpg',
      audioUrl: 'assets/audio/questions/q13.mp3',
      difficulty: 'advanced',
      relatedSlokas: [
        {
          chapter: 2,
          verse: 31,
          relevance: 'Fighting for dharma',
          slokaText: 'स्वधर्ममपि चावेक्ष्य न विकम्पितुमर्हसि । धर्म्याद्धि युद्धाच्छ्रेयोऽन्यत्क्षत्रियस्य न विद्यते ॥',
          slokaTransliteration: 'sva-dharmam api cāvekṣya na vikampitum arhasi, dharmyād dhi yuddhāc chreyo \'nyat kṣatriyasya na vidyate',
          slokaTranslation: 'Considering your specific duty as a kṣatriya, you should know that there is no better engagement for you than fighting on religious principles; and so there is no need for hesitation.',
          slokaPurport: 'Sometimes fighting (not necessarily physically) is your dharma. If you have the capability and position to stop injustice, silence is cowardice. Non-violence doesn\'t mean tolerating evil. Stand up for what\'s right, but ensure your fight is rooted in dharma, not personal revenge.'
        }
      ]
    },
    
    // Self-Realization
    {
      id: 14,
      category: 'Self-Realization',
      question: 'Who am I? What is the purpose of my life?',
      situation: 'I feel lost. I don\'t understand why I exist or what I\'m supposed to do. Material success feels empty.',
      imageUrl: 'assets/images/questions/purpose.jpg',
      audioUrl: 'assets/audio/questions/q14.mp3',
      difficulty: 'advanced',
      relatedSlokas: [
        {
          chapter: 2,
          verse: 20,
          relevance: 'You are the eternal soul',
          slokaText: 'न जायते म्रियते वा कदाचिन् नायं भूत्वा भविता वा न भूयः । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥',
          slokaTransliteration: 'na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ, ajo nityaḥ śāśvato \'yaṁ purāṇo na hanyate hanyamāne śarīre',
          slokaTranslation: 'For the soul there is neither birth nor death at any time. He has not come into being, does not come into being, and will not come into being. He is unborn, eternal, ever-existing and primeval. He is not slain when the body is slain.',
          slokaPurport: 'You are not your body, mind, or social role - you are the eternal soul (atma). Your purpose is to realize your spiritual nature and reconnect with the Divine (Krishna/Supreme). Material achievements are temporary. Real fulfillment comes from spiritual awakening and service to humanity.'
        }
      ]
    },
    {
      id: 15,
      category: 'Self-Realization',
      question: 'How do I overcome feelings of unworthiness?',
      situation: 'I feel like I\'m not good enough - not smart, attractive, successful, or spiritual enough. Low self-esteem controls my life.',
      imageUrl: 'assets/images/questions/self-worth.jpg',
      audioUrl: 'assets/audio/questions/q15.mp3',
      difficulty: 'intermediate',
      relatedSlokas: [
        {
          chapter: 5,
          verse: 18,
          relevance: 'Equal vision',
          slokaText: 'विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि । शुनि चैव श्वपाके च पण्डिताः समदर्शिनः ॥',
          slokaTransliteration: 'vidyā-vinaya-sampanne brāhmaṇe gavi hastini, śuni caiva śva-pāke ca paṇḍitāḥ sama-darśinaḥ',
          slokaTranslation: 'The humble sages, by virtue of true knowledge, see with equal vision a learned and gentle brāhmaṇa, a cow, an elephant, a dog and a dog-eater [outcaste].',
          slokaPurport: 'The enlightened see the same divine spark in all beings - scholar or outcast, rich or poor. Your worth is not in your achievements or appearance but in your eternal spiritual nature. You are a soul, part of the Divine. That\'s your inherent value, regardless of external circumstances.'
        }
      ]
    }
  ];

  private customQuestions: LifeQuestion[] = [];

  constructor() {
    this.loadCustomQuestions();
  }

  // Get all questions
  getAllQuestions(): Observable<LifeQuestion[]> {
    return of([...this.mockQuestions, ...this.customQuestions]);
  }

  // Get questions by category
  getQuestionsByCategory(category: string): Observable<LifeQuestion[]> {
    const filtered = [...this.mockQuestions, ...this.customQuestions]
      .filter(q => q.category === category);
    return of(filtered);
  }

  // Get single question by ID
  getQuestionById(id: number): Observable<LifeQuestion | undefined> {
    const question = [...this.mockQuestions, ...this.customQuestions]
      .find(q => q.id === id);
    return of(question);
  }

  // Get all categories with counts
  getCategories(): Observable<QuestionCategory[]> {
    const allQuestions = [...this.mockQuestions, ...this.customQuestions];
    
    const categories: QuestionCategory[] = [
      {
        name: 'Career',
        icon: 'briefcase-outline',
        color: 'primary',
        description: 'Work, purpose, and professional life',
        questionCount: allQuestions.filter(q => q.category === 'Career').length
      },
      {
        name: 'Fear',
        icon: 'alert-circle-outline',
        color: 'danger',
        description: 'Anxiety, worry, and overcoming fear',
        questionCount: allQuestions.filter(q => q.category === 'Fear').length
      },
      {
        name: 'Anger',
        icon: 'flame-outline',
        color: 'warning',
        description: 'Managing frustration and anger',
        questionCount: allQuestions.filter(q => q.category === 'Anger').length
      },
      {
        name: 'Loss',
        icon: 'heart-dislike-outline',
        color: 'medium',
        description: 'Grief, death, and letting go',
        questionCount: allQuestions.filter(q => q.category === 'Loss').length
      },
      {
        name: 'Confusion',
        icon: 'help-circle-outline',
        color: 'tertiary',
        description: 'Decision making and clarity',
        questionCount: allQuestions.filter(q => q.category === 'Confusion').length
      },
      {
        name: 'Relationships',
        icon: 'people-outline',
        color: 'secondary',
        description: 'Family, friends, and love',
        questionCount: allQuestions.filter(q => q.category === 'Relationships').length
      },
      {
        name: 'Motivation',
        icon: 'rocket-outline',
        color: 'success',
        description: 'Energy, drive, and overcoming laziness',
        questionCount: allQuestions.filter(q => q.category === 'Motivation').length
      },
      {
        name: 'Peace',
        icon: 'leaf-outline',
        color: 'success',
        description: 'Inner calm and meditation',
        questionCount: allQuestions.filter(q => q.category === 'Peace').length
      },
      {
        name: 'Justice',
        icon: 'scale-outline',
        color: 'primary',
        description: 'Ethics, fairness, and dharma',
        questionCount: allQuestions.filter(q => q.category === 'Justice').length
      },
      {
        name: 'Self-Realization',
        icon: 'infinite-outline',
        color: 'tertiary',
        description: 'Purpose, identity, and spirituality',
        questionCount: allQuestions.filter(q => q.category === 'Self-Realization').length
      }
    ];

    return of(categories);
  }

  // Add custom question
  addCustomQuestion(question: Omit<LifeQuestion, 'id' | 'isCustom' | 'createdAt'>): Observable<LifeQuestion> {
    const newQuestion: LifeQuestion = {
      ...question,
      id: Date.now(), // Simple ID generation
      isCustom: true,
      createdAt: new Date()
    };
    
    this.customQuestions.push(newQuestion);
    this.saveCustomQuestions();
    
    return of(newQuestion);
  }

  // Delete custom question
  deleteCustomQuestion(id: number): Observable<boolean> {
    const index = this.customQuestions.findIndex(q => q.id === id);
    if (index > -1) {
      this.customQuestions.splice(index, 1);
      this.saveCustomQuestions();
      return of(true);
    }
    return of(false);
  }

  // Search questions
  searchQuestions(searchTerm: string): Observable<LifeQuestion[]> {
    const term = searchTerm.toLowerCase();
    const filtered = [...this.mockQuestions, ...this.customQuestions]
      .filter(q => 
        q.question.toLowerCase().includes(term) ||
        q.situation.toLowerCase().includes(term) ||
        q.category.toLowerCase().includes(term)
      );
    return of(filtered);
  }

  // Private helpers for localStorage
  private loadCustomQuestions(): void {
    const stored = localStorage.getItem('prashna-custom-questions');
    if (stored) {
      try {
        this.customQuestions = JSON.parse(stored);
      } catch (e) {
        console.error('Error loading custom questions:', e);
      }
    }
  }

  private saveCustomQuestions(): void {
    localStorage.setItem('prashna-custom-questions', JSON.stringify(this.customQuestions));
  }
}
