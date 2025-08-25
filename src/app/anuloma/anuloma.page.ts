import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline, playOutline, micOutline, checkmarkCircleOutline, starOutline, ellipseOutline, radioButtonOffOutline, trophyOutline, ribbonOutline, libraryOutline, volumeHighOutline, recordingOutline, arrowForwardOutline, arrowDownOutline, playCircleOutline, layersOutline, listOutline, musicalNotesOutline, playForwardOutline, radioButtonOn, lockClosedOutline, medalOutline, timeOutline, repeatOutline, checkmarkCircle, trophy, bookOutline } from 'ionicons/icons';

interface Line {
  devanagari: string;
  roman: string;
  meaning: string;
  practiced: number;
  mastered: boolean;
  audioUrl?: string;
}

interface Sloka {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: string;
  lines: Line[];
}

@Component({
  selector: 'app-anuloma',
  templateUrl: './anuloma.page.html',
  styleUrls: ['./anuloma.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, CommonModule, FormsModule]
})
export class AnulomaPage implements OnInit {

  selectedSloka: Sloka | null = null;
  currentLineIndex: number = 0;
  isRecording: boolean = false;
  isRecordingCombined: boolean = false;
  hasHeardLine: boolean = false;
  practiceeFeedback: string = '';
  feedbackClass: string = '';
  combinedFeedback: string = '';
  combinedFeedbackClass: string = '';

  // Sample sloka data for Anuloma practice
  slokas: Sloka[] = [
    {
      id: 1,
      title: 'Gītā 4.1',
      subtitle: 'imaṁ vivasvate yogaṁ',
      description: 'Krishna explains the ancient transmission of yoga - practice the flow of divine instruction',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'श्रीभगवानुवाच इमं विवस्वते योगं प्रोक्तवानहमव्ययम्।',
          roman: 'śrī-bhagavān uvāca imaṁ vivasvate yogaṁ proktavān aham avyayam',
          meaning: 'The Blessed Lord said: I instructed this imperishable science of yoga to the sun-god, Vivasvān',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'विवस्वान्मनवे प्राह मनुरिक्ष्वाकवेऽब्रवीत्॥',
          roman: 'vivasvān manave prāha manur ikṣvākave \'bravīt',
          meaning: 'Vivasvān instructed it to Manu, the father of mankind, and Manu in turn instructed it to Ikṣvāku',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 2,
      title: 'Gītā 4.2',
      subtitle: 'evaṁ paramparā-prāptam',
      description: 'Krishna describes the transmission of yoga through disciplic succession and its loss over time',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'एवं परम्परा-प्राप्तम् इमं राजर्षयो विदुः।',
          roman: 'evaṁ paramparā-prāptam imaṁ rājarṣayo viduḥ',
          meaning: 'This supreme science was thus received through the chain of disciplic succession, and the saintly kings understood it in that way.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'स कालेनेह महता योगो नष्टः परन्तप॥',
          roman: 'sa kāleneha mahatā yogo naṣṭaḥ parantapa',
          meaning: 'But in course of time the succession was broken, and therefore the science as it is appears to be lost.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 3,
      title: 'Gītā 4.3',
      subtitle: 'sa evāyaṁ mayā te \'dya',
      description: 'Krishna reveals the ancient science of yoga to Arjuna, His devotee and friend',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'स एवायं मया तेऽद्य योगः प्रोक्तः पुरातनः।',
          roman: 'sa evāyaṁ mayā te \'dya yogaḥ proktaḥ purātanaḥ',
          meaning: 'That very ancient science of the relationship with the Supreme is today told by Me to you',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'भक्तोऽसि मे सखा चेति रहस्यं ह्येतदुत्तमम्॥',
          roman: 'bhakto \'si me sakhā ceti rahasyaṁ hy etad uttamam',
          meaning: 'because you are My devotee as well as My friend; therefore you can understand the transcendental mystery of this science.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 4,
      title: 'Gītā 4.4',
      subtitle: 'arjuna uvāca',
      description: 'Arjuna questions how Krishna could have instructed the sun-god, who was born long before Him.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'अर्जुन उवाच अपरं भवतो जन्म परं जन्म विवस्वतः।',
          roman: 'arjuna uvāca aparaṁ bhavato janma paraṁ janma vivasvataḥ',
          meaning: 'Arjuna said: Your birth is junior, and the birth of Vivasvān is superior.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'कथमेतद्विजानीयां त्वमादौ प्रोक्तवानिति॥',
          roman: 'katham etad vijānīyāṁ tvam ādau proktavān iti',
          meaning: 'How am I to understand that in the beginning You instructed this science to him?',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 5,
      title: 'Gītā 4.5',
      subtitle: 'bahūni me vyatītāni',
      description: 'Krishna explains His transcendental nature and perfect memory, unlike Arjuna.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'श्रीभगवानुवाच बहूनि मे व्यतीतानि जन्मानि तव चार्जुन।',
          roman: 'śrī-bhagavān uvāca bahūni me vyatītāni janmāni tava cārjuna',
          meaning: 'The Blessed Lord said: Many, many births both you and I have passed.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'तान्यहं वेद सर्वाणि न त्वं वेत्थ परन्तप॥',
          roman: 'tāny ahaṁ veda sarvāṇi na tvaṁ vettha parantapa',
          meaning: 'I can remember all of them, but you cannot, O subduer of the enemy!',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 6,
      title: 'Gītā 4.6',
      subtitle: 'ajo \'pi sann avyayātmā',
      description: 'Krishna describes His transcendental nature and His appearance in the material world by His own internal energy.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'अजोऽपि सन्नव्ययात्मा भूतानामीश्वरोऽपि सन्।',
          roman: 'ajo \'pi sann avyayātmā bhūtānām īśvaro \'pi san',
          meaning: 'Although I am unborn and My transcendental body never deteriorates, and although I am the Lord of all sentient beings...',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'प्रकृतिं स्वामधिष्ठाय सम्भवाम्यात्ममायया॥',
          roman: 'prakṛtiṁ svām adhiṣṭhāya sambhavāmy ātma-māyayā',
          meaning: '...I still appear in every millennium in My original transcendental form by My internal energy.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 7,
      title: 'Gītā 4.7',
      subtitle: 'yadā yadā hi dharmasya',
      description: 'Krishna describes His appearance whenever there is a decline in righteousness and rise of unrighteousness.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।',
          roman: 'yadā yadā hi dharmasya glānir bhavati bhārata',
          meaning: 'Whenever and wherever there is a decline in religious practice, O descendant of Bharata,',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
          roman: 'abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham',
          meaning: 'and a predominant rise of irreligion—at that time I descend Myself.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 8,
      title: 'Gītā 4.8',
      subtitle: 'paritrāṇāya sādhūnāṁ',
      description: 'Krishna explains His purpose for appearing: to protect the devotees, destroy the miscreants, and reestablish dharma.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'परित्राणाय साधूनां विनाशाय च दुष्कृताम्।',
          roman: 'paritrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām',
          meaning: 'For the deliverance of the pious and the annihilation of the miscreants,',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥',
          roman: 'dharma-saṁsthāpanārthāya sambhavāmi yuge yuge',
          meaning: 'as well as to reestablish the principles of religion, I appear millennium after millennium.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 9,
      title: 'Gītā 4.9',
      subtitle: 'janma karma ca me divyam',
      description: 'Krishna explains the transcendental nature of His birth and activities, and the liberation attained by those who understand this truth.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'जन्म कर्म च मे दिव्यमेवं यो वेत्ति तत्त्वतः।',
          roman: 'janma karma ca me divyam evaṁ yo vetti tattvataḥ',
          meaning: 'One who knows the transcendental nature of My appearance and activities in reality...',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'त्यक्त्वा देहं पुनर्जन्म नैति मामेति सोऽर्जुन॥',
          roman: 'tyaktvā dehaṁ punar janma naiti mām eti so \'rjuna',
          meaning: '...upon leaving the body, does not take birth again, but attains My eternal abode, O Arjuna.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 10,
      title: 'Gītā 4.10',
      subtitle: 'vīta-rāga-bhaya-krodhā',
      description: 'Krishna describes how many have attained transcendental love for Him by being freed from attachment, fear, and anger, and by being purified through knowledge and penance.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'वीतरागभयक्रोधा मन्मया मामुपाश्रिताः।',
          roman: 'vīta-rāga-bhaya-krodhā man-mayā mām upāśritāḥ',
          meaning: 'Being freed from attachment, fear and anger, being fully absorbed in Me and taking refuge in Me,',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'बहवो ज्ञानतपसा पूता मद्भावमागताः॥',
          roman: 'bahavo jñāna-tapasā pūtā mad-bhāvam āgatāḥ',
          meaning: 'many, many persons in the past became purified by knowledge of Me—and thus they all attained transcendental love for Me.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 11,
      title: 'Gītā 4.11',
      subtitle: 'ye yathā māṁ prapadyante',
      description: 'Krishna explains how He reciprocates with everyone according to their surrender, and that all follow His path in all respects.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'ये यथा मां प्रपद्यन्ते तांस्तथैव भजाम्यहम्।',
          roman: 'ye yathā māṁ prapadyante tāṁs tathaiva bhajāmy aham',
          meaning: 'As all surrender unto Me, I reward them accordingly.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'मम वर्त्मानुवर्तन्ते मनुष्याः पार्थ सर्वशः॥',
          roman: 'mama vartmānuvartante manuṣyāḥ pārtha sarvaśaḥ',
          meaning: 'Everyone follows My path in all respects, O son of Pṛthā.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 12,
      title: 'Gītā 4.12',
      subtitle: 'kāṅkṣantaḥ karmaṇāṁ siddhiṁ',
      description: 'Krishna explains how people worship demigods for quick results in fruitive activities.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'काङ्क्षन्तः कर्मणां सिद्धिं यजन्त इह देवताः।',
          roman: 'kāṅkṣantaḥ karmaṇāṁ siddhiṁ yajanta iha devatāḥ',
          meaning: 'Desiring success in fruitive activities, men in this world worship the demigods.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'क्षिप्रं हि मानुषे लोके सिद्धिर्भवति कर्मजा॥',
          roman: 'kṣipraṁ hi mānuṣe loke siddhir bhavati karma-jā',
          meaning: 'Quickly, of course, men get results from fruitive work in this world.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 13,
      title: 'Gītā 4.13',
      subtitle: 'cātur-varṇyaṁ mayā sṛṣṭaṁ',
      description: 'Krishna describes the creation of the four divisions of human society according to qualities and work.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'चातुर्-वर्ण्यं मया सृष्टं गुण-कर्म-विभागशः।',
          roman: 'cātur-varṇyaṁ mayā sṛṣṭaṁ guṇa-karma-vibhāgaśaḥ',
          meaning: 'The four divisions of human society were created by Me according to the three modes of material nature and work.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'तस्य कर्तारम् अपि मां विद्ध्य अकर्तारम् अव्ययम्॥',
          roman: 'tasya kartāram api māṁ viddhy akartāram avyayam',
          meaning: 'Although I am the creator of this system, you should know that I am yet the non-doer, being unchangeable.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 14,
      title: 'Gītā 4.14',
      subtitle: 'na māṁ karmāṇi limpanti',
      description: 'Krishna explains His transcendental position regarding work and fruitive results.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'न मां कर्माणि लिम्पन्ति न मे कर्म-फले स्पृहा।',
          roman: 'na māṁ karmāṇi limpanti na me karma-phale spṛhā',
          meaning: 'There is no work that affects Me; nor do I aspire for the fruits of action.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'इति मां योऽभिजानाति कर्मभिर्न स बध्यते॥',
          roman: 'iti māṁ yo \'bhijānāti karmabhir na sa badhyate',
          meaning: 'One who understands this truth about Me also does not become entangled in the fruitive reactions of work.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 15,
      title: 'Gītā 4.15',
      subtitle: 'evaṁ jñātvā kṛtaṁ karma',
      description: 'Krishna instructs Arjuna to perform his duty as the ancients did, with divine consciousness.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'एवं ज्ञात्वा कृतं कर्म पूर्वैरपि मुमुक्षुभिः।',
          roman: 'evaṁ jñātvā kṛtaṁ karma pūrvair api mumukṣubhiḥ',
          meaning: 'Thus knowing, all the liberated souls in ancient times acted and attained liberation.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'कुरु कर्मैव तस्मात्त्वं पूर्वैः पूर्वतरं कृतम्॥',
          roman: 'kuru karmaiva tasmāt tvaṁ pūrvaiḥ pūrvataraṁ kṛtam',
          meaning: 'Therefore, as the ancients, you should perform your duty in this divine consciousness.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 16,
      title: 'Gītā 4.16',
      subtitle: 'kiṁ karma kim akarmeti',
      description: 'Krishna explains the bewilderment regarding action and inaction, and promises to clarify the nature of karma.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'किं कर्म किमकर्मेति कवयोऽप्यत्र मोहिताः।',
          roman: 'kiṁ karma kim akarmeti kavayo \'py atra mohitāḥ',
          meaning: 'Even the intelligent are bewildered in determining what is action and what is inaction.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'तत्ते कर्म प्रवक्ष्यामि यज्ज्ञात्वा मोक्ष्यसेऽशुभात्॥',
          roman: 'tat te karma pravakṣyāmi yaj jñātvā mokṣyase \'śubhāt',
          meaning: 'Now I shall explain to you what action is, knowing which you shall be liberated from all sins.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 17,
      title: 'Gītā 4.17',
      subtitle: 'karmaṇo hy api boddhavyaṁ',
      description: 'The intricacies of action are very hard to understand. Therefore one should know properly what action is, what forbidden action is, and what inaction is.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'कर्मणो ह्यपि बोद्धव्यं बोद्धव्यं च विकर्मणः।',
          roman: 'karmaṇo hy api boddhavyaṁ boddhavyaṁ ca vikarmaṇaḥ',
          meaning: 'One should understand what is action and what is forbidden action.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'अकर्मणश्च बोद्धव्यं गहना कर्मणो गतिः॥',
          roman: 'akarmaṇaś ca boddhavyaṁ gahanā karmaṇo gatiḥ',
          meaning: 'One should also understand what is inaction; the intricacies of action are very difficult to comprehend.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 18,
      title: 'Gītā 4.18',
      subtitle: 'karmaṇy akarma yaḥ paśyed',
      description: 'Krishna explains the wisdom of seeing inaction in action and action in inaction, revealing the transcendental position of the truly intelligent.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'कर्मण्यकर्म यः पश्येदकर्मणि च कर्म यः।',
          roman: 'karmaṇy akarma yaḥ paśyed akarmaṇi ca karma yaḥ',
          meaning: 'One who sees inaction in action, and action in inaction, is intelligent among men.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'स बुद्धिमान् मनुष्येषु स युक्तः कृत्स्नकर्मकृत्॥',
          roman: 'sa buddhimān manuṣyeṣu sa yuktaḥ kṛtsna-karma-kṛt',
          meaning: 'He is in the transcendental position, although engaged in all sorts of activities.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 19,
      title: 'Gītā 4.19',
      subtitle: 'yasya sarve samārambhāḥ',
      description: 'Krishna describes the wise person whose actions are free from desire and whose work is purified by knowledge.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'यस्य सर्वे समारम्भाः काम-सङ्कल्प-वर्जिताः।',
          roman: 'yasya sarve samārambhāḥ kāma-saṅkalpa-varjitāḥ',
          meaning: 'One whose every act is devoid of desire for sense gratification.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'ज्ञानाग्नि-दग्ध-कर्माणं तमाहुः पण्डितं बुधाः॥',
          roman: 'jñānāgni-dagdha-karmāṇaṁ tam āhuḥ paṇḍitaṁ budhāḥ',
          meaning: 'He is said by sages to be a worker whose fruitive action is burned up by the fire of perfect knowledge.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 20,
      title: 'Gītā 4.20',
      subtitle: 'tyaktvā karma-phalāsaṅgam',
      description: 'Krishna describes the transcendental worker who acts without attachment to results, always satisfied and independent.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'त्यक्त्वा कर्म-फलासङ्गं नित्य-तृप्तो निराश्रयः।',
          roman: 'tyaktvā karma-phalāsaṅgaṁ nitya-tṛpto nirāśrayaḥ',
          meaning: 'Abandoning all attachment to the results of his activities, ever satisfied and independent,',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'कर्मण्यभिप्रवृत्तोऽपि नैव किंचित्करोति सः॥',
          roman: 'karmaṇy abhipravṛtto \'pi naiva kiñcit karoti saḥ',
          meaning: 'he performs no fruitive action, although engaged in all kinds of undertakings.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 21,
      title: 'Gītā 4.21',
      subtitle: 'nirāśīr yata-cittātmā',
      description: 'Krishna describes the transcendental worker who acts only for the bare necessities of life, without attachment or proprietorship.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'निराशीः यतचित्तात्मा त्यक्तसर्वपरिग्रहः।',
          roman: 'nirāśīr yata-cittātmā tyakta-sarva-parigrahaḥ',
          meaning: 'Without desire for results, with mind and intelligence controlled, giving up all sense of proprietorship.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'शारीरं केवलं कर्म कुर्वन्नाप्नोति किल्बिषम्॥',
          roman: 'śārīraṁ kevalaṁ karma kurvan nāpnoti kilbiṣam',
          meaning: 'Acting only for the bare necessities of life, he does not acquire sinful reactions.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 22,
      title: 'Gītā 4.22',
      subtitle: 'yadṛcchā-lābha-santuṣṭo',
      description: 'Krishna describes the transcendental worker who is satisfied with whatever comes by chance, free from duality, envy, and steady in success and failure.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'यदृच्छालाभसन्तुष्टो द्वन्द्वातीतो विमत्सरः।',
          roman: 'yadṛcchā-lābha-santuṣṭo dvandvātīto vimatsaraḥ',
          meaning: 'He who is satisfied with gain which comes of its own accord, who is free from duality and does not envy,',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'समः सिद्धावसिद्धौ च कृत्वापि न निबध्यते॥',
          roman: 'samaḥ siddhāv asiddhau ca kṛtvāpi na nibadhyate',
          meaning: 'who is steady both in success and failure, is never entangled, although performing actions.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 23,
      title: 'Gītā 4.23',
      subtitle: 'gata-saṅgasya muktasya',
      description: 'Krishna describes how the actions of one who is unattached and situated in transcendental knowledge merge into transcendence.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'गतसङ्गस्य मुक्तस्य ज्ञानावस्थितचेतसः।',
          roman: 'gata-saṅgasya muktasya jñānāvasthita-cetasaḥ',
          meaning: 'Of one who is unattached, liberated, and whose mind is situated in transcendence.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'यज्ञायाचरतः कर्म समग्रं प्रविलीयते॥',
          roman: 'yajñāyācarataḥ karma samagraṁ pravilīyate',
          meaning: 'Actions performed for the sake of Yajña (Kṛṣṇa) merge entirely into transcendence.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 24,
      title: 'Gītā 4.24',
      subtitle: 'brahmārpaṇaṁ brahma havir',
      description: 'A person fully absorbed in spiritual activities attains the spiritual kingdom, where everything is of the same spiritual nature.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम्।',
          roman: 'brahmārpaṇaṁ brahma havir brahmāgnau brahmaṇā hutam',
          meaning: 'The offering is Brahman, the oblation is Brahman, it is offered by Brahman in the fire of Brahman.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'ब्रह्मैव तेन गन्तव्यं ब्रह्मकर्मसमाधिना॥',
          roman: 'brahmaiva tena gantavyaṁ brahma-karma-samādhinā',
          meaning: 'By complete absorption in Brahman, one certainly attains Brahman.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 25,
      title: 'Gītā 4.25',
      subtitle: 'daivam evāpare yajñaṁ',
      description: 'Some yogīs worship the demigods by offering sacrifices to them, while others offer sacrifices in the fire of the Supreme Brahman.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'दैवमेवापरे यज्ञं योगिनः पर्युपासते।',
          roman: 'daivam evāpare yajñaṁ yoginaḥ paryupāsate',
          meaning: 'Some yogīs perfectly worship the demigods by offering different sacrifices to them.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'ब्रह्माग्नावपरे यज्ञं यज्ञेनैवोपजुह्वति॥',
          roman: 'brahmāgnāv apare yajñaṁ yajñenaivopajuhvati',
          meaning: 'Others offer sacrifices in the fire of the Supreme Brahman.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 26,
      title: 'Gītā 4.26',
      subtitle: 'śrotrādīnīndriyāṇy anye',
      description: 'Some sacrifice the hearing process and senses in the fire of the controlled mind, others sacrifice the objects of the senses in the fire of sacrifice.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'श्रोत्रादीनीन्द्रियाण्यन्ये संयमाग्निषु जुह्वति।',
          roman: 'śrotrādīnīndriyāṇy anye saṁyamāgniṣu juhvati',
          meaning: 'Some of them sacrifice the hearing process and the senses in the fire of the controlled mind.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'शब्दादीन्विषयानन्य इन्द्रियाग्निषु जुह्वति॥',
          roman: 'śabdādīn viṣayān anya indriyāgniṣu juhvati',
          meaning: 'Others sacrifice the objects of the senses, such as sound, in the fire of sacrifice.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 27,
      title: 'Gītā 4.27',
      subtitle: 'sarvāṇīndriya-karmāṇi',
      description: 'Those interested in self-realization offer the functions of all senses and breath into the fire of the controlled mind.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'सर्वाणीन्द्रियकर्माणि प्राणकर्माणि चापरे।',
          roman: 'sarvāṇīndriya-karmāṇi prāṇa-karmāṇi cāpare',
          meaning: 'Others offer all the functions of the senses and the functions of the life breath...',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'आत्मसंयमयोगाग्नौ जुह्वति ज्ञानदीपिते॥',
          roman: 'ātma-saṁyama-yogāgnau juhvati jñāna-dīpite',
          meaning: '...as oblations into the fire of the controlled mind, illuminated by knowledge.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 28,
      title: 'Gītā 4.28',
      subtitle: 'dravya-yajñās tapo-yajñā',
      description: 'Krishna describes various types of sacrifice, including those involving possessions, austerities, mystic yoga, study of the Vedas, and advancement of transcendental knowledge.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'द्रव्ययज्ञास्तपोयज्ञा योगयज्ञास्तथापरे।',
          roman: 'dravya-yajñās tapo-yajñā yoga-yajñās tathāpare',
          meaning: 'There are others who, enlightened by sacrificing their material possessions in severe austerities, take strict vows and practice the yoga of eightfold mysticism,',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'स्वाध्यायज्ञानयज्ञाश्च यतयः संशितव्रताः॥',
          roman: 'svādhyāya-jñāna-yajñāś ca yatayaḥ saṁśita-vratāḥ',
          meaning: 'and others study the Vedas for the advancement of transcendental knowledge.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 29,
      title: 'Gītā 4.29',
      subtitle: 'apāne juhvati prāṇaṁ',
      description: 'Krishna describes yogic practices involving breath restraint and controlled eating as forms of sacrifice.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'अपाने जुह्वति प्राणं प्राणेऽपानं तथापरे।',
          roman: 'apāne juhvati prāṇaṁ prāṇe \'pānaṁ tathāpare',
          meaning: 'Others offer the outgoing breath into the incoming, and the incoming into the outgoing.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'प्राणापानगती रुद्ध्वा प्राणायामपरायणाः।',
          roman: 'prāṇāpāna-gatī ruddhvā prāṇāyāma-parāyaṇāḥ',
          meaning: 'Having checked the movement of both, they remain in trance, stopping all breathing.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'अपरे नियताहाराः प्राणान्प्राणेषु जुह्वति॥',
          roman: 'apare niyatāhārāḥ prāṇān prāṇeṣu juhvati',
          meaning: 'Others, curtailing the eating process, offer the outgoing breath into itself as a sacrifice.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 30,
      title: 'Gītā 4.30',
      subtitle: 'sarve \'py ete yajña-vido',
      description: 'All performers who understand sacrifice are purified and attain the supreme eternal atmosphere.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'सर्वेऽप्येते यज्ञविदो यज्ञक्षपितकल्मषाः।',
          roman: 'sarve \'py ete yajña-vido yajña-kṣapita-kalmaṣāḥ',
          meaning: 'All these performers who know the meaning of sacrifice become cleansed of sinful reaction.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'यज्ञशिष्टामृतभुजो यान्ति ब्रह्म सनातनम्॥',
          roman: 'yajña-śiṣṭāmṛta-bhujo yānti brahma sanātanam',
          meaning: 'Having tasted the nectar of the remnants of such sacrifice, they go to the supreme eternal atmosphere.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 31,
      title: 'Gītā 4.31',
      subtitle: 'nāyaṁ loko \'sty ayajñasya',
      description: 'Krishna explains that without sacrifice, one cannot live happily in this world or the next.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'नायं लोकोऽस्त्ययज्ञस्य कुतोऽन्यः कुरुसत्तम।',
          roman: 'nāyaṁ loko \'sty ayajñasya kuto \'nyaḥ kuru-sattama',
          meaning: 'O best of the Kuru dynasty, without sacrifice one can never live happily on this planet or in this life: what then of the next?',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 32,
      title: 'Gītā 4.32',
      subtitle: 'evaṁ bahu-vidhā yajñā',
      description: 'Krishna explains that all types of sacrifice are sanctioned by the Vedas and are born of work. Understanding this leads to liberation.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'एवं बहुविधा यज्ञा वितता ब्रह्मणो मुखे।',
          roman: 'evaṁ bahu-vidhā yajñā vitatā brahmaṇo mukhe',
          meaning: 'Thus, various kinds of sacrifices are spread at the mouth of the Vedas.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'कर्मजान्विद्धि तान्सर्वान् एवं ज्ञात्वा विमोक्ष्यसे॥',
          roman: 'karma-jān viddhi tān sarvān evaṁ jñātvā vimokṣyase',
          meaning: 'You should know all of them as born of work. Knowing thus, you will be liberated.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 33,
      title: 'Gītā 4.33',
      subtitle: 'śreyān dravya-mayād yajñāj',
      description: 'Krishna explains that sacrifice performed in knowledge is superior to sacrifice of material possessions, and that all work ultimately leads to transcendental knowledge.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'श्रेयान्द्रव्यमयाद्यज्ञाज्ज्ञानयज्ञः परन्तप।',
          roman: 'śreyān dravya-mayād yajñāj jñāna-yajñaḥ parantapa',
          meaning: 'O chastiser of the enemy, the sacrifice of knowledge is greater than the sacrifice of material possessions.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'सर्वं कर्माखिलं पार्थ ज्ञाने परिसमाप्यते॥',
          roman: 'sarvaṁ karmākhilaṁ pārtha jñāne parisamāpyate',
          meaning: 'O son of Pṛthā, after all, the sacrifice of work culminates in transcendental knowledge.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 34,
      title: 'Gītā 4.34',
      subtitle: 'tad viddhi praṇipātena',
      description: 'Krishna instructs Arjuna to approach a spiritual master, inquire submissively, and render service to receive transcendental knowledge.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया।',
          roman: 'tad viddhi praṇipātena paripraśnena sevayā',
          meaning: 'Just try to learn the truth by approaching a spiritual master, by submissive inquiry and service.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'उपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः॥',
          roman: 'upadekṣyanti te jñānaṁ jñāninas tattva-darśinaḥ',
          meaning: 'The self-realized soul can impart knowledge unto you because he has seen the truth.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 35,
      title: 'Gītā 4.35',
      subtitle: 'yaj jñātvā na punar moham',
      description: 'Krishna explains that by gaining true knowledge, one will never fall into illusion and will see all beings as part of Him.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'यज्ज्ञात्वा न पुनर्मोहम् एवं यास्यसि पाण्डव।',
          roman: 'yaj jñātvā na punar moham evaṁ yāsyasi pāṇḍava',
          meaning: 'And when you have thus learned the truth, you will never again fall into illusion, O son of Pāṇḍu.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'येन भूतान्यशेषाणि द्रक्ष्यस्यात्मन्यथो मयि॥',
          roman: 'yena bhūtāny aśeṣāṇi drakṣyasy ātmani atho mayi',
          meaning: 'By that knowledge you will see all living beings as part of Me, and they are in Me.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 36,
      title: 'Gītā 4.36',
      subtitle: 'api ced asi pāpebhyaḥ',
      description: 'Even the greatest sinner can cross the ocean of miseries by the boat of transcendental knowledge.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'अपि चेदसि पापेभ्यः सर्वेभ्यः पापकृत्तमः।',
          roman: 'api ced asi pāpebhyaḥ sarvebhyaḥ pāpa-kṛt-tamaḥ',
          meaning: 'Even if you are considered to be the most sinful of all sinners,',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'सर्वं ज्ञानप्लवेनैव वृजिनं सन्तरिष्यसि॥',
          roman: 'sarvaṁ jñāna-plavenaiva vṛjinaṁ santariṣyasi',
          meaning: 'when you are situated in the boat of transcendental knowledge, you will be able to cross over the ocean of miseries.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 37,
      title: 'Gītā 4.37',
      subtitle: 'yathaidhāṁsi samiddho \'gnir',
      description: 'Krishna compares the fire of knowledge to a blazing fire that burns all reactions to material activities to ashes.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुतेऽर्जुन।',
          roman: 'yathaidhāṁsi samiddho \'gnir bhasma-sāt kurute \'rjuna',
          meaning: 'As the blazing fire turns firewood to ashes, O Arjuna,',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'ज्ञानाग्निः सर्वकर्माणि भस्मसात्कुरुते तथा॥',
          roman: 'jñānāgniḥ sarva-karmāṇi bhasma-sāt kurute tathā',
          meaning: 'so does the fire of knowledge burn to ashes all reactions to material activities.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 38,
      title: 'Gītā 4.38',
      subtitle: 'na hi jñānena sadṛśaṁ',
      description: 'Krishna glorifies transcendental knowledge as the purest and most sublime, attainable by mature devotion.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।',
          roman: 'na hi jñānena sadṛśaṁ pavitram iha vidyate',
          meaning: 'In this world, there is nothing so sublime and pure as transcendental knowledge.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'तत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥',
          roman: 'tat svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati',
          meaning: 'Such knowledge is the mature fruit of all mysticism. And one who has achieved this enjoys the self within himself in due course of time.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 39,
      title: 'Gītā 4.39',
      subtitle: 'śraddhāvāl labhate jñānaṁ',
      description: 'A faithful person absorbed in transcendental knowledge and who controls the senses quickly attains supreme spiritual peace.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'श्रद्धावाँल्लभते ज्ञानं तत्परः संयतेन्द्रियः।',
          roman: 'śraddhāvān labhate jñānaṁ tat-paraḥ saṁyatendriyaḥ',
          meaning: 'A faithful man who is absorbed in transcendental knowledge and who subdues his senses...',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'ज्ञानं लब्ध्वा परां शान्तिमचिरेणाधिगच्छति॥',
          roman: 'jñānaṁ labdhvā parāṁ śāntim acireṇādhigacchati',
          meaning: '...quickly attains the supreme spiritual peace.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 40,
      title: 'Gītā 4.40',
      subtitle: 'ajñaś cāśraddadhānaś ca',
      description: 'Krishna explains that those who are ignorant, faithless, and doubtful are doomed and find no happiness in this world or the next.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'अज्ञश्चाश्रद्दधानश्च संशयात्मा विनश्यति।',
          roman: 'ajñaś cāśraddadhānaś ca saṁśayātmā vinaśyati',
          meaning: 'But ignorant and faithless persons who doubt the revealed scriptures do not attain God consciousness.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'नायं लोकोऽस्ति न परो न सुखं संशयात्मनः॥',
          roman: 'nāyaṁ loko \'sti na paro na sukhaṁ saṁśayātmanaḥ',
          meaning: 'For the doubting soul there is happiness neither in this world nor in the next.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 41,
      title: 'Gītā 4.41',
      subtitle: 'yoga-sannyasta-karmāṇaṁ',
      description: 'Krishna explains that one who has renounced the fruits of action, destroyed doubts by knowledge, and is situated in the self is not bound by work.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'योग-सन्न्यस्तकर्माणं ज्ञान-सञ्छिन्न-संशयम्।',
          roman: 'yoga-sannyasta-karmāṇaṁ jñāna-sañchinna-saṁśayam',
          meaning: 'One who has renounced the fruits of action, whose doubts are destroyed by knowledge,',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'आत्मवन्तं न कर्माणि निबध्नन्ति धनञ्जय॥',
          roman: 'ātmavantaṁ na karmāṇi nibadhnanti dhanañjaya',
          meaning: 'and who is situated firmly in the self, is not bound by works, O conqueror of riches.',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 42,
      title: 'Gītā 4.42',
      subtitle: 'tasmād ajñāna-sambhūtaṁ',
      description: 'Krishna instructs Arjuna to cut off doubts with the sword of knowledge and rise in yoga.',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'तस्मादज्ञानसंभूतं हृत्स्थं ज्ञानासिनात्मनः।',
          roman: 'tasmād ajñāna-sambhūtaṁ hṛt-sthaṁ jñānāsinātmanaḥ',
          meaning: 'Therefore the doubts which have arisen in your heart out of ignorance should be slashed by the weapon of knowledge.',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'छित्त्वैनं संशयं योगमातिष्ठोत्तिष्ठ भारत॥',
          roman: 'chittvainaṁ saṁśayaṁ yogam ātiṣṭhottiṣṭha bhārata',
          meaning: 'Armed with yoga, O Bhārata, stand and fight.',
          practiced: 0,
          mastered: false
        }
      ]
    },
  ];

  constructor() { 
    addIcons({arrowForwardOutline,bookOutline,libraryOutline,trophyOutline,arrowDownOutline,playCircleOutline,micOutline,checkmarkCircleOutline,layersOutline,listOutline,starOutline,musicalNotesOutline,checkmarkCircle,playForwardOutline,radioButtonOn,lockClosedOutline,chevronBackOutline,chevronForwardOutline,trophy,medalOutline,timeOutline,repeatOutline,playOutline,ellipseOutline,radioButtonOffOutline,ribbonOutline,volumeHighOutline,recordingOutline});
  }

  ngOnInit() {
  }

  get currentLine(): Line {
    return this.selectedSloka?.lines[this.currentLineIndex] || {
      devanagari: '',
      roman: '',
      meaning: '',
      practiced: 0,
      mastered: false
    };
  }

  get overallProgress(): number {
    if (!this.selectedSloka) return 0;
    const totalLines = this.selectedSloka.lines.length;
    const masteredLines = this.selectedSloka.lines.filter(line => line.mastered).length;
    const currentProgress = this.currentLineIndex / totalLines;
    const masteryProgress = masteredLines / totalLines;
    return Math.round(Math.max(currentProgress, masteryProgress) * 100);
  }

  selectSloka(slokaId: number) {
    this.selectedSloka = this.slokas.find(s => s.id === slokaId) || null;
    this.currentLineIndex = 0;
    this.resetPracticeState();
    if (this.selectedSloka) {
      // Reset all line progress
      this.selectedSloka.lines.forEach(line => {
        line.practiced = 0;
        line.mastered = false;
      });
    }
  }

  nextLine() {
    if (this.canProceedToNext()) {
      this.currentLineIndex++;
      this.resetPracticeState();
    }
  }

  previousLine() {
    if (this.currentLineIndex > 0) {
      this.currentLineIndex--;
      this.resetPracticeState();
    }
  }

  goToLine(lineIndex: number) {
    // Can only go to current line or previously mastered lines
    if (lineIndex <= this.currentLineIndex || this.selectedSloka?.lines[lineIndex].mastered) {
      this.currentLineIndex = lineIndex;
      this.resetPracticeState();
    }
  }

  canProceedToNext(): boolean {
    if (!this.selectedSloka) return false;
    if (this.currentLineIndex >= this.selectedSloka.lines.length - 1) return false;
    return this.currentLine.mastered;
  }

  playLineSlow() {
    this.hasHeardLine = true;
    // TODO: Implement actual audio playback at slow speed
    console.log('Playing line slowly:', this.currentLine.roman);
    this.showTemporaryFeedback('🔊 Playing line at slow speed...', 'feedback-audio');
  }

  playLineNormal() {
    this.hasHeardLine = true;
    // TODO: Implement actual audio playback at normal speed
    console.log('Playing line normally:', this.currentLine.roman);
    this.showTemporaryFeedback('🎵 Playing line at normal speed...', 'feedback-audio');
  }

  startRecording() {
    if (!this.hasHeardLine) return;
    
    this.isRecording = true;
    this.practiceeFeedback = '';
    
    // Simulate recording process
    setTimeout(() => {
      this.isRecording = false;
      this.evaluateLineRecording();
    }, 3000);

    console.log('Recording practice for line:', this.currentLine.roman);
  }

  private evaluateLineRecording() {
    // Simulate pronunciation evaluation
    const accuracy = Math.random();
    
    if (accuracy > 0.75) {
      this.currentLine.practiced++;
      this.practiceeFeedback = '🎉 Excellent pronunciation! Keep practicing!';
      this.feedbackClass = 'feedback-excellent';
      
      if (this.currentLine.practiced >= 3) {
        this.practiceeFeedback += ' ✅ Ready to mark as mastered!';
      }
    } else if (accuracy > 0.5) {
      this.currentLine.practiced++;
      this.practiceeFeedback = '👍 Good attempt! Focus on rhythm and pronunciation.';
      this.feedbackClass = 'feedback-good';
    } else {
      this.practiceeFeedback = '🔄 Keep practicing! Listen carefully and try again.';
      this.feedbackClass = 'feedback-needs-work';
    }
  }

  markLineMastered() {
    if (this.currentLine.practiced >= 3) {
      this.currentLine.mastered = true;
      this.practiceeFeedback = '🏆 Line mastered! You can now proceed to the next line.';
      this.feedbackClass = 'feedback-mastered';
    }
  }

  getLineStatusClass(): string {
    if (this.currentLine.mastered) return 'status-mastered';
    if (this.currentLine.practiced >= 3) return 'status-ready';
    if (this.currentLine.practiced > 0) return 'status-practicing';
    return 'status-new';
  }

  getLineStatusIcon(): string {
    if (this.currentLine.mastered) return 'checkmark-circle-outline';
    if (this.currentLine.practiced >= 3) return 'star-outline';
    if (this.currentLine.practiced > 0) return 'ellipse-outline';
    return 'radio-button-off-outline';
  }

  getLineStatusText(): string {
    if (this.currentLine.mastered) return 'Mastered';
    if (this.currentLine.practiced >= 3) return 'Ready to Master';
    if (this.currentLine.practiced > 0) return `${this.currentLine.practiced}/3 Practices`;
    return 'New Line';
  }

  hasMasteredLines(): boolean {
    return this.selectedSloka ? this.selectedSloka.lines.some(line => line.mastered) : false;
  }

  getMasteredLines(): Line[] {
    if (!this.selectedSloka) return [];
    return this.selectedSloka.lines.filter(line => line.mastered);
  }

  getCombinedLines(): Line[] {
    if (!this.selectedSloka) return [];
    return this.selectedSloka.lines.slice(0, this.currentLineIndex + 1).filter(line => line.mastered || line === this.currentLine);
  }

  playCombinedLines() {
    const combinedLines = this.getCombinedLines();
    console.log('Playing combined lines:', combinedLines.map(l => l.roman).join(' | '));
    this.showTemporaryFeedback(`🎵 Playing combined lines 1-${this.currentLineIndex + 1}...`, 'feedback-audio');
  }

  recordCombined() {
    this.isRecordingCombined = true;
    this.combinedFeedback = '';
    
    // Simulate combined recording process
    setTimeout(() => {
      this.isRecordingCombined = false;
      this.evaluateCombinedRecording();
    }, 5000);

    console.log('Recording combined lines practice');
  }

  private evaluateCombinedRecording() {
    const accuracy = Math.random();
    
    if (accuracy > 0.7) {
      this.combinedFeedback = '🎉 Excellent flow! You\'re building great rhythm and continuity!';
      this.combinedFeedbackClass = 'feedback-excellent';
    } else if (accuracy > 0.5) {
      this.combinedFeedback = '👍 Good combined recitation! Work on smoother transitions between lines.';
      this.combinedFeedbackClass = 'feedback-good';
    } else {
      this.combinedFeedback = '🔄 Keep practicing the individual lines and their flow together.';
      this.combinedFeedbackClass = 'feedback-needs-work';
    }
  }

  private showTemporaryFeedback(message: string, className: string) {
    this.practiceeFeedback = message;
    this.feedbackClass = className;
    setTimeout(() => {
      this.practiceeFeedback = '';
    }, 2000);
  }

  isSlokaCompleted(): boolean {
    return this.selectedSloka ? this.selectedSloka.lines.every(line => line.mastered) : false;
  }

  practiceFullSloka() {
    console.log('Starting full sloka practice for:', this.selectedSloka?.title);
    alert('🎉 Full Śloka Practice Mode!\n\nYou can now recite the entire verse with perfect forward flow and rhythm.');
  }

  claimMasteryBadge() {
    alert('🏆 Anuloma Pāṭha Master Badge Earned!\n\n🎊 Congratulations! You\'ve mastered the forward sequential recitation method.\n\n+150 points awarded!');
  }

  selectNextSloka() {
    const currentIndex = this.slokas.findIndex(s => s.id === this.selectedSloka?.id);
    const nextIndex = (currentIndex + 1) % this.slokas.length;
    this.selectSloka(this.slokas[nextIndex].id);
  }

  private resetPracticeState() {
    this.practiceeFeedback = '';
    this.combinedFeedback = '';
    this.hasHeardLine = false;
    this.isRecording = false;
    this.isRecordingCombined = false;
  }

}
