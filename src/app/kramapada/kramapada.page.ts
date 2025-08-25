import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonButton, IonIcon
} from '@ionic/angular/standalone';
import { AudioRecordingService, AudioRecording } from './audio-recording.service';

// Interfaces for Krama Pāṭha
interface Word {
  devanagari: string;
  roman: string;
  meaning: string;
}

interface Sloka {
  id: number;
  title: string;
  subtitle: string;
  devanagari: string[];
  roman: string[];
  words: Word[];
  meaning: string;
  difficulty: string;
}

interface KramaStep {
  id: number;
  type: 'single' | 'pair';
  words: Word[];
  text: string;
  roman: string;
  instruction: string;
  completed: boolean;
}

interface PracticeResult {
  level: 'excellent' | 'good' | 'needs-work';
  title: string;
  message: string;
  accuracy: number;
}

@Component({
  selector: 'app-kramapada',
  templateUrl: './kramapada.page.html',
  styleUrls: ['./kramapada.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonButton, IonIcon, CommonModule, FormsModule
  ]
})
export class KramapadaPage implements OnInit {
  // Training state
  selectedMode: string | null = null;
  selectedSloka: Sloka | null = null;
  currentStep: number = 0;
  totalSteps: number = 0;
  kramaSequence: KramaStep[] = [];
  
  // Practice state
  isRecording: boolean = false;
  practiceResult: PracticeResult | null = null;
  completionTime: string = '';
  accuracy: number = 0;
  
  // Recording state
  recordingStartTime: number = 0;
  currentRecordingId: string | null = null;
  savedRecordings: any[] = [];
  
  // Available slokas for practice
  availableSlokas: Sloka[] = [
    
    {
      id: 1,
      title: 'Gītā 3.1',
      subtitle: 'अर्जुन उवाच',
      devanagari: [
        'अर्जुन उवाच',
        'ज्यायसी चेत्कर्मणस्ते मताबुद्धिर्जनार्दन',
        'तत्किं कर्मणि घोरे मां नियोजयसि केशव'
      ],
      roman: [
        'arjuna uvāca',
        'jyāyasī cet karmaṇas te matā buddhir janārdana',
        'tat kiṁ karmaṇi ghore māṁ niyojayasi keśava'
      ],
      words: [
        { devanagari: 'अर्जुनः', roman: 'arjunaḥ', meaning: 'Arjuna' },
        { devanagari: 'उवाच', roman: 'uvāca', meaning: 'said' },
        { devanagari: 'ज्यायसी', roman: 'jyāyasī', meaning: 'speaking very highly' },
        { devanagari: 'चेत्', roman: 'cet', meaning: 'although' },
        { devanagari: 'कर्मणः', roman: 'karmaṇaḥ', meaning: 'than fruitive action' },
        { devanagari: 'ते', roman: 'te', meaning: 'your' },
        { devanagari: 'मता', roman: 'matā', meaning: 'opinion' },
        { devanagari: 'बुद्धिः', roman: 'buddhiḥ', meaning: 'intelligence' },
        { devanagari: 'जनार्दन', roman: 'janārdana', meaning: 'O Kṛṣṇa' },
        { devanagari: 'तत्', roman: 'tat', meaning: 'therefore' },
        { devanagari: 'किम्', roman: 'kim', meaning: 'why' },
        { devanagari: 'कर्मणि', roman: 'karmaṇi', meaning: 'in action' },
        { devanagari: 'घोरे', roman: 'ghore', meaning: 'ghastly' },
        { devanagari: 'माम्', roman: 'mām', meaning: 'me' },
        { devanagari: 'नियोजयसि', roman: 'niyojayasi', meaning: 'engaging me' },
        { devanagari: 'केशव', roman: 'keśava', meaning: 'O Kṛṣṇa' }
      ],
      meaning: 'Arjuna said: O Janārdana, O Keśava, why do You urge me to engage in this ghastly warfare, if You think that intelligence is better than fruitive work?',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: 'Gītā 3.2',
      subtitle: 'व्यामिश्रेणेव वाक्येन',
      devanagari: [
        'व्यामिश्रेणेव वाक्येन बुद्धिं मोहयसीव मे',
        'तदेकं वद निश्चित्य येन श्रेयोऽहमाप्नुयाम्'
      ],
      roman: [
        'vyāmiśreṇeva vākyena buddhiṁ mohayasīva me',
        'tad ekaṁ vada niścitya yena śreyo \'ham āpnuyām'
      ],
      words: [
        { devanagari: 'व्यामिश्रेण', roman: 'vyāmiśreṇa', meaning: 'by equivocal' },
        { devanagari: 'इव', roman: 'iva', meaning: 'as' },
        { devanagari: 'वाक्येन', roman: 'vākyena', meaning: 'words' },
        { devanagari: 'बुद्धिम्', roman: 'buddhim', meaning: 'intelligence' },
        { devanagari: 'मोहयसी', roman: 'mohayasi', meaning: 'bewildering' },
        { devanagari: 'इव', roman: 'iva', meaning: 'as' },
        { devanagari: 'मे', roman: 'me', meaning: 'my' },
        { devanagari: 'तत्', roman: 'tat', meaning: 'therefore' },
        { devanagari: 'एकम्', roman: 'ekam', meaning: 'only one' },
        { devanagari: 'वद', roman: 'vada', meaning: 'please tell' },
        { devanagari: 'निश्चित्य', roman: 'niścitya', meaning: 'ascertaining' },
        { devanagari: 'येन', roman: 'yena', meaning: 'by which' },
        { devanagari: 'श्रेयः', roman: 'śreyaḥ', meaning: 'real benefit' },
        { devanagari: 'अहम्', roman: 'aham', meaning: 'I' },
        { devanagari: 'आप्नुयाम्', roman: 'āpnuyām', meaning: 'may have it' }
      ],
      meaning: 'My intelligence is bewildered by Your equivocal instructions. Therefore, please tell me decisively what is most beneficial for me.',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Gītā 3.3',
      subtitle: 'श्रीभगवानुवाच',
      devanagari: [
        'श्रीभगवानुवाच',
        'लोकेऽस्मिन्द्विविधा निष्ठा पुरा प्रोक्ता मयानघ',
        'ज्ञानयोगेन सांख्यानां कर्मयोगेन योगिनाम्'
      ],
      roman: [
        'śrī-bhagavān uvāca',
        'loke \'smin dvi-vidhā niṣṭhā purā proktā mayānagha',
        'jñāna-yogena sāṅkhyānāṁ karma-yogena yoginām'
      ],
      words: [
        { devanagari: 'श्रीभगवान्', roman: 'śrī bhagavān', meaning: 'the Supreme Personality of Godhead' },
        { devanagari: 'उवाच', roman: 'uvāca', meaning: 'said' },
        { devanagari: 'लोके', roman: 'loke', meaning: 'in the world' },
        { devanagari: 'अस्मिन्', roman: 'asmin', meaning: 'this' },
        { devanagari: 'द्विविधा', roman: 'dvi-vidhā', meaning: 'two kinds of' },
        { devanagari: 'निष्ठा', roman: 'niṣṭhā', meaning: 'faith' },
        { devanagari: 'पुरा', roman: 'purā', meaning: 'formerly' },
        { devanagari: 'प्रोक्ता', roman: 'proktā', meaning: 'was said' },
        { devanagari: 'मया', roman: 'mayā', meaning: 'by Me' },
        { devanagari: 'अनघ', roman: 'anagha', meaning: 'O sinless one' },
        { devanagari: 'ज्ञानयोगेन', roman: 'jñāna-yogena', meaning: 'by the linking process of knowledge' },
        { devanagari: 'सांख्यानाम्', roman: 'sāṅkhyānām', meaning: 'of the empiric philosophers' },
        { devanagari: 'कर्मयोगेन', roman: 'karma-yogena', meaning: 'by the linking process of devotion' },
        { devanagari: 'योगिनाम्', roman: 'yoginām', meaning: 'of the devotees' }
      ],
      meaning: 'The Blessed Lord said: O sinless Arjuna, I have already explained that there are two classes of men who realize the Self. Some are inclined to understand Him by empirical, philosophical speculation, and others are inclined to know Him by devotional work.',
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      title: 'Gītā 3.4',
      subtitle: 'न कर्मणामनारम्भान्',
      devanagari: [
        'न कर्मणामनारम्भान् नैष्कर्म्यं पुरुषोऽश्नुते',
        'न च संन्यसनादेव सिद्धिं समधिगच्छति'
      ],
      roman: [
        'na karmaṇām anārambhān naiṣkarmyaṁ puruṣo \'śnute',
        'na ca sannyasanād eva siddhiṁ samadhigacchati'
      ],
      words: [
        { devanagari: 'न', roman: 'na', meaning: 'without' },
        { devanagari: 'कर्मणाम्', roman: 'karmaṇām', meaning: 'of the prescribed duties' },
        { devanagari: 'अनारम्भात्', roman: 'anārambhāt', meaning: 'non-performance' },
        { devanagari: 'नैष्कर्म्यम्', roman: 'naiṣkarmyam', meaning: 'freedom from reaction' },
        { devanagari: 'पुरुषः', roman: 'puruṣaḥ', meaning: 'man' },
        { devanagari: 'अश्नुते', roman: 'aśnute', meaning: 'achieve' },
        { devanagari: 'न', roman: 'na', meaning: 'nor' },
        { devanagari: 'च', roman: 'ca', meaning: 'also' },
        { devanagari: 'संन्यसनात्', roman: 'sannyasanāt', meaning: 'by renunciation' },
        { devanagari: 'एव', roman: 'eva', meaning: 'simply' },
        { devanagari: 'सिद्धिम्', roman: 'siddhim', meaning: 'success' },
        { devanagari: 'समधिगच्छति', roman: 'samadhigacchati', meaning: 'attain' }
      ],
      meaning: 'Not by merely abstaining from work can one achieve freedom from reaction, nor by renunciation alone can one attain perfection.',
      difficulty: 'Intermediate'
    },
    {
      id: 5,
      title: 'Gītā 3.5',
      subtitle: 'न हि कश्चित्क्षणमपि',
      devanagari: [
        'न हि कश्चित्क्षणमपि',
        'जातु तिष्ठत्यकर्मकृत्',
        'कार्यते ह्यवशः कर्म',
        'सर्वः प्रकृतिजैर्गुणैः'
      ],
      roman: [
        'na hi kaścit kṣaṇam api',
        'jātu tiṣṭhaty akarma-kṛt',
        'kāryate hy avaśaḥ karma',
        'sarvaḥ prakṛti-jair guṇaiḥ'
      ],
      words: [
        { devanagari: 'न', roman: 'na', meaning: 'nor' },
        { devanagari: 'हि', roman: 'hi', meaning: 'certainly' },
        { devanagari: 'कश्चित्', roman: 'kaścit', meaning: 'anyone' },
        { devanagari: 'क्षणम्', roman: 'kṣaṇam', meaning: 'even a moment' },
        { devanagari: 'अपि', roman: 'api', meaning: 'also' },
        { devanagari: 'जातु', roman: 'jātu', meaning: 'even' },
        { devanagari: 'तिष्ठति', roman: 'tiṣṭhati', meaning: 'stands' },
        { devanagari: 'अकर्मकृत्', roman: 'akarma-kṛt', meaning: 'without doing something' },
        { devanagari: 'कार्यते', roman: 'kāryate', meaning: 'is forced to do' },
        { devanagari: 'हि', roman: 'hi', meaning: 'certainly' },
        { devanagari: 'अवशः', roman: 'avaśaḥ', meaning: 'helplessly' },
        { devanagari: 'कर्म', roman: 'karma', meaning: 'work' },
        { devanagari: 'सर्वः', roman: 'sarvaḥ', meaning: 'everything' },
        { devanagari: 'प्रकृतिजैः', roman: 'prakṛti-jaiḥ', meaning: 'out of the modes of material nature' },
        { devanagari: 'गुणैः', roman: 'guṇaiḥ', meaning: 'by the qualities' }
      ],
      meaning: 'All men are forced to act helplessly according to the impulses born of the modes of material nature; therefore no one can refrain from doing something, not even for a moment.',
      difficulty: 'Intermediate'
    },
    {
      id: 6,
      title: 'Gītā 3.6',
      subtitle: 'कर्मेन्द्रियाणि संयम्य',
      devanagari: [
        'कर्मेन्द्रियाणि संयम्य',
        'य आस्ते मनसा स्मरन्',
        'इन्द्रियार्थान्विमूढात्मा',
        'मिथ्याचारः स उच्यते'
      ],
      roman: [
        'karmendriyāṇi saṁyamya',
        'ya āste manasā smaran',
        'indriyārthān vimūḍhātmā',
        'mithyācāraḥ sa ucyate'
      ],
      words: [
        { devanagari: 'कर्मेन्द्रियाणि', roman: 'karma-indriyāṇi', meaning: 'the five working sense organs' },
        { devanagari: 'संयम्य', roman: 'saṁyamya', meaning: 'controlling' },
        { devanagari: 'यः', roman: 'yaḥ', meaning: 'anyone who' },
        { devanagari: 'आस्ते', roman: 'āste', meaning: 'remains' },
        { devanagari: 'मनसा', roman: 'manasā', meaning: 'by mind' },
        { devanagari: 'स्मरन्', roman: 'smaran', meaning: 'thinking' },
        { devanagari: 'इन्द्रियार्थान्', roman: 'indriya-arthān', meaning: 'sense objects' },
        { devanagari: 'विमूढात्मा', roman: 'vimūḍha-ātmā', meaning: 'foolish soul' },
        { devanagari: 'मिथ्याचारः', roman: 'mithyā-ācāraḥ', meaning: 'pretender' },
        { devanagari: 'सः', roman: 'saḥ', meaning: 'he' },
        { devanagari: 'उच्यते', roman: 'ucyate', meaning: 'is called' }
      ],
      meaning: 'One who restrains the senses and organs of action, but whose mind dwells on sense objects, certainly deludes himself and is called a pretender.',
      difficulty: 'Intermediate'
    },
    {
      id: 7,
      title: 'Gītā 3.7',
      subtitle: 'यस्त्विन्द्रियाणि मनसा',
      devanagari: [
        'यस्त्विन्द्रियाणि मनसा',
        'नियम्यारभतेऽर्जुन',
        'कर्मेन्द्रियैः कर्मयोगम्',
        'असक्तः स विशिष्यते'
      ],
      roman: [
        'yas tv indriyāṇi manasā',
        'niyamyārabhate \'rjuna',
        'karmendriyaiḥ karma-yogam',
        'asaktaḥ sa viśiṣyate'
      ],
      words: [
        { devanagari: 'यः', roman: 'yaḥ', meaning: 'one who' },
        { devanagari: 'तु', roman: 'tu', meaning: 'but' },
        { devanagari: 'इन्द्रियाणि', roman: 'indriyāṇi', meaning: 'senses' },
        { devanagari: 'मनसा', roman: 'manasā', meaning: 'by the mind' },
        { devanagari: 'नियम्य', roman: 'niyamya', meaning: 'regulating' },
        { devanagari: 'आरभते', roman: 'ārabhate', meaning: 'begins' },
        { devanagari: 'अर्जुन', roman: 'arjuna', meaning: 'O Arjuna' },
        { devanagari: 'कर्मेन्द्रियैः', roman: 'karma-indriyaiḥ', meaning: 'by the active sense organs' },
        { devanagari: 'कर्मयोगम्', roman: 'karma-yogam', meaning: 'devotion' },
        { devanagari: 'असक्तः', roman: 'asaktaḥ', meaning: 'without attachment' },
        { devanagari: 'सः', roman: 'saḥ', meaning: 'he' },
        { devanagari: 'विशिष्यते', roman: 'viśiṣyate', meaning: 'by far the better' }
      ],
      meaning: 'On the other hand, he who controls the senses by the mind and engages his active organs in works of devotion, without attachment, is by far superior.',
      difficulty: 'Intermediate'
    },
    {
      id: 8,
      title: 'Gītā 3.8',
      subtitle: 'नियतं कुरु कर्म त्वं',
      devanagari: [
        'नियतं कुरु कर्म त्वं',
        'कर्म ज्यायो ह्यकर्मणः',
        'शरीरयात्रापि च ते',
        'न प्रसिद्ध्येदकर्मणः'
      ],
      roman: [
        'niyataṁ kuru karma tvaṁ',
        'karma jyāyo hy akarmaṇaḥ',
        'śarīra-yātrāpi ca te',
        'na prasiddhyed akarmaṇaḥ'
      ],
      words: [
        { devanagari: 'नियतम्', roman: 'niyatam', meaning: 'prescribed' },
        { devanagari: 'कुरु', roman: 'kuru', meaning: 'do' },
        { devanagari: 'कर्म', roman: 'karma', meaning: 'duties' },
        { devanagari: 'त्वम्', roman: 'tvam', meaning: 'you' },
        { devanagari: 'कर्म', roman: 'karma', meaning: 'work' },
        { devanagari: 'ज्यायः', roman: 'jyāyaḥ', meaning: 'better' },
        { devanagari: 'हि', roman: 'hi', meaning: 'than' },
        { devanagari: 'अकर्मणः', roman: 'akarmaṇaḥ', meaning: 'without work' },
        { devanagari: 'शरीर', roman: 'śarīra', meaning: 'bodily' },
        { devanagari: 'यात्रा', roman: 'yātrā', meaning: 'maintenance' },
        { devanagari: 'अपि', roman: 'api', meaning: 'even' },
        { devanagari: 'च', roman: 'ca', meaning: 'also' },
        { devanagari: 'ते', roman: 'te', meaning: 'your' },
        { devanagari: 'न', roman: 'na', meaning: 'never' },
        { devanagari: 'प्रसिद्ध्येत्', roman: 'prasiddhyet', meaning: 'effected' },
        { devanagari: 'अकर्मणः', roman: 'akarmaṇaḥ', meaning: 'without work' }
      ],
      meaning: 'Perform your prescribed duty, for action is better than inaction. A man cannot even maintain his physical body without work.',
      difficulty: 'Intermediate'
    },
    {
      id: 9,
      title: 'Gītā 3.9',
      subtitle: 'यज्ञार्थात्कर्मणोऽन्यत्र',
      devanagari: [
        'यज्ञार्थात्कर्मणोऽन्यत्र',
        'लोकोऽयं कर्मबन्धनः',
        'तदर्थं कर्म कौन्तेय',
        'मुक्तसङ्गः समाचर'
      ],
      roman: [
        'yajñārthāt karmaṇo \'nyatra',
        'loko \'yaṁ karma-bandhanaḥ',
        'tad-arthaṁ karma kaunteya',
        'mukta-saṅgaḥ samācara'
      ],
      words: [
        { devanagari: 'यज्ञ-अर्थात्', roman: 'yajña-arthāt', meaning: 'only for the sake of Yajña, or Viṣṇu' },
        { devanagari: 'कर्मणः', roman: 'karmaṇaḥ', meaning: 'work done' },
        { devanagari: 'अन्यत्र', roman: 'anyatra', meaning: 'otherwise' },
        { devanagari: 'लोकः', roman: 'lokaḥ', meaning: 'this world' },
        { devanagari: 'अयम्', roman: 'ayam', meaning: 'this' },
        { devanagari: 'कर्म-बन्धनः', roman: 'karma-bandhanaḥ', meaning: 'bondage by work' },
        { devanagari: 'तत्', roman: 'tat', meaning: 'Him' },
        { devanagari: 'अर्थम्', roman: 'artham', meaning: 'for the sake of' },
        { devanagari: 'कर्म', roman: 'karma', meaning: 'work' },
        { devanagari: 'कौन्तेय', roman: 'kaunteya', meaning: 'O son of Kuntī' },
        { devanagari: 'मुक्त-सङ्गः', roman: 'mukta-saṅgaḥ', meaning: 'liberated from association' },
        { devanagari: 'समाचर', roman: 'samācara', meaning: 'do it perfectly' }
      ],
      meaning: 'Work done as a sacrifice for Viṣṇu has to be performed, otherwise work binds one to this material world. Therefore, O son of Kuntī, perform your prescribed duties for His satisfaction, and in that way you will always remain unattached and free from bondage.',
      difficulty: 'Intermediate'
    },
    {
      id: 10,
      title: 'Gītā 3.10',
      subtitle: 'सहयज्ञाः प्रजाः सृष्ट्वा',
      devanagari: [
        'सहयज्ञाः प्रजाः सृष्ट्वा',
        'पुरोवाच प्रजापतिः',
        'अनेन प्रसविष्यध्वम्',
        'एष वोऽस्त्विष्टकामधुक्'
      ],
      roman: [
        'saha-yajñāḥ prajāḥ sṛṣṭvā',
        'purovāca prajāpatiḥ',
        'anena prasaviṣyadhvam',
        'eṣa vo \'stv iṣṭa-kāma-dhuk'
      ],
      words: [
        { devanagari: 'सह', roman: 'saha', meaning: 'along with' },
        { devanagari: 'यज्ञाः', roman: 'yajñāḥ', meaning: 'sacrifices' },
        { devanagari: 'प्रजाः', roman: 'prajāḥ', meaning: 'generations' },
        { devanagari: 'सृष्ट्वा', roman: 'sṛṣṭvā', meaning: 'by creating' },
        { devanagari: 'पुरा', roman: 'purā', meaning: 'anciently' },
        { devanagari: 'उवाच', roman: 'uvāca', meaning: 'said' },
        { devanagari: 'प्रजापतिः', roman: 'prajāpatiḥ', meaning: 'the Lord of creatures' },
        { devanagari: 'अनेन', roman: 'anena', meaning: 'by this' },
        { devanagari: 'प्रसविष्यध्वम्', roman: 'prasaviṣyadhvam', meaning: 'be more and more prosperous' },
        { devanagari: 'एषः', roman: 'eṣaḥ', meaning: 'certainly' },
        { devanagari: 'वः', roman: 'vaḥ', meaning: 'your' },
        { devanagari: 'अस्तु', roman: 'astu', meaning: 'let it be' },
        { devanagari: 'इष्ट', roman: 'iṣṭa', meaning: 'all desirable' },
        { devanagari: 'कामधुक्', roman: 'kāma-dhuk', meaning: 'bestower' }
      ],
      meaning: 'In the beginning of creation, the Lord of all creatures sent forth generations of men and demigods, along with sacrifices for Viṣṇu, and blessed them by saying, "Be thou happy by this yajña [sacrifice] because its performance will bestow upon you all desirable things."',
      difficulty: 'Intermediate'
    },
    {
      id: 11,
      title: 'Gītā 3.11',
      subtitle: 'देवान्भावयतानेन',
      devanagari: [
        'देवान्भावयतानेन',
        'ते देवा भावयन्तु वः',
        'परस्परं भावयन्तः',
        'श्रेयः परमवाप्स्यथ'
      ],
      roman: [
        'devān bhāvayatānena',
        'te devā bhāvayantu vaḥ',
        'parasparaṁ bhāvayantaḥ',
        'śreyaḥ param avāpsyatha'
      ],
      words: [
        { devanagari: 'देवान्', roman: 'devān', meaning: 'demigods' },
        { devanagari: 'भावयता', roman: 'bhāvayata', meaning: 'having been pleased' },
        { devanagari: 'अनेन', roman: 'anena', meaning: 'by this sacrifice' },
        { devanagari: 'ते', roman: 'te', meaning: 'those' },
        { devanagari: 'देवाः', roman: 'devāḥ', meaning: 'the demigods' },
        { devanagari: 'भावयन्तु', roman: 'bhāvayantu', meaning: 'will please' },
        { devanagari: 'वः', roman: 'vaḥ', meaning: 'you' },
        { devanagari: 'परस्परम्', roman: 'parasparam', meaning: 'mutual' },
        { devanagari: 'भावयन्तः', roman: 'bhāvayantaḥ', meaning: 'pleasing one another' },
        { devanagari: 'श्रेयः', roman: 'śreyaḥ', meaning: 'benediction' },
        { devanagari: 'परम्', roman: 'param', meaning: 'the supreme' },
        { devanagari: 'अवाप्स्यथ', roman: 'avāpsyatha', meaning: 'do you achieve' }
      ],
      meaning: 'The demigods, being pleased by sacrifices, will also please you; thus nourishing one another, there will reign general prosperity for all.',
      difficulty: 'Intermediate'
    },
    {
      id: 12,
      title: 'Gītā 3.12',
      subtitle: 'इष्टान्भोगान्हि वो देवा',
      devanagari: [
        'इष्टान्भोगान्हि वो देवा',
        'दास्यन्ते यज्ञभाविताः',
        'तैर्दत्तानप्रदायैभ्यो',
        'यो भुङ्क्ते स्तेन एव सः'
      ],
      roman: [
        'iṣṭān bhogān hi vo devā',
        'dāsyante yajña-bhāvitāḥ',
        'tair dattān apradāyaibhyo',
        'yo bhuṅkte stena eva saḥ'
      ],
      words: [
        { devanagari: 'इष्टान्', roman: 'iṣṭān', meaning: 'desired' },
        { devanagari: 'भोगान्', roman: 'bhogān', meaning: 'necessities of life' },
        { devanagari: 'हि', roman: 'hi', meaning: 'certainly' },
        { devanagari: 'वः', roman: 'vaḥ', meaning: 'unto you' },
        { devanagari: 'देवाः', roman: 'devāḥ', meaning: 'the demigods' },
        { devanagari: 'दास्यन्ते', roman: 'dāsyante', meaning: 'award' },
        { devanagari: 'यज्ञभाविताः', roman: 'yajña-bhāvitāḥ', meaning: 'being satisfied by the performance of sacrifices' },
        { devanagari: 'तैः', roman: 'taiḥ', meaning: 'by them' },
        { devanagari: 'दत्तान्', roman: 'dattān', meaning: 'things given' },
        { devanagari: 'अप्रदाय', roman: 'apradāya', meaning: 'without offering' },
        { devanagari: 'एभ्यः', roman: 'ebhyaḥ', meaning: 'to the demigods' },
        { devanagari: 'यः', roman: 'yaḥ', meaning: 'he who' },
        { devanagari: 'भुङ्क्ते', roman: 'bhuṅkte', meaning: 'enjoys' },
        { devanagari: 'स्तेनः', roman: 'stenaḥ', meaning: 'thief' },
        { devanagari: 'एव', roman: 'eva', meaning: 'certainly' },
        { devanagari: 'सः', roman: 'saḥ', meaning: 'is he' }
      ],
      meaning: 'In charge of the various necessities of life, the demigods, being satisfied by the performance of yajña [sacrifice], supply all necessities to man. But he who enjoys these gifts, without offering them to the demigods in return, is certainly a thief.',
      difficulty: 'Intermediate'
    },
    {
      id: 13,
      title: 'Gītā 3.13',
      subtitle: 'यज्ञशिष्टाशिनः सन्तो',
      devanagari: [
        'यज्ञशिष्टाशिनः सन्तो',
        'मुच्यन्ते सर्वकिल्बिषैः',
        'भुञ्जते ते त्वघं पापा',
        'ये पचन्त्यात्मकारणात्'
      ],
      roman: [
        'yajña-śiṣṭāśinaḥ santo',
        'mucyante sarva-kilbiṣaiḥ',
        'bhuñjate te tv aghaṁ pāpā',
        'ye pacanty ātma-kāraṇāt'
      ],
      words: [
        { devanagari: 'यज्ञ-शिष्ट', roman: 'yajña-śiṣṭa', meaning: 'food taken after performance of yajña' },
        { devanagari: 'अशिनः', roman: 'aśinaḥ', meaning: 'eaters' },
        { devanagari: 'सन्तः', roman: 'santaḥ', meaning: 'the devotees' },
        { devanagari: 'मुच्यन्ते', roman: 'mucyante', meaning: 'get relief from' },
        { devanagari: 'सर्व', roman: 'sarva', meaning: 'all kinds of' },
        { devanagari: 'किल्बिषैः', roman: 'kilbiṣaiḥ', meaning: 'sins' },
        { devanagari: 'भुञ्जते', roman: 'bhuñjate', meaning: 'enjoy' },
        { devanagari: 'ते', roman: 'te', meaning: 'they' },
        { devanagari: 'तु', roman: 'tu', meaning: 'but' },
        { devanagari: 'अघम्', roman: 'agham', meaning: 'grievous sins' },
        { devanagari: 'पापाः', roman: 'pāpāḥ', meaning: 'sinners' },
        { devanagari: 'ये', roman: 'ye', meaning: 'those' },
        { devanagari: 'पचन्ति', roman: 'pacanti', meaning: 'prepare food' },
        { devanagari: 'आत्म-कारणात्', roman: 'ātma-kāraṇāt', meaning: 'for sense enjoyment' }
      ],
      meaning: 'The devotees of the Lord are released from all kinds of sins because they eat food which is offered first for sacrifice. Others, who prepare food for personal sense enjoyment, verily eat only sin.',
      difficulty: 'Intermediate'
    },
    {
      id: 14,
      title: 'Gītā 3.14',
      subtitle: 'अन्नाद्भवन्ति भूतानि',
      devanagari: [
        'अन्नाद्भवन्ति भूतानि',
        'पर्जन्यादन्नसम्भवः',
        'यज्ञाद्भवति पर्जन्यो',
        'यज्ञः कर्मसमुद्भवः'
      ],
      roman: [
        'annād bhavanti bhūtāni',
        'parjanyād anna-sambhavaḥ',
        'yajñād bhavati parjanyo',
        'yajñaḥ karma-samudbhavaḥ'
      ],
      words: [
        { devanagari: 'अन्नात्', roman: 'annāt', meaning: 'from grains' },
        { devanagari: 'भवन्ति', roman: 'bhavanti', meaning: 'grow' },
        { devanagari: 'भूतानि', roman: 'bhūtāni', meaning: 'the material bodies' },
        { devanagari: 'पर्जन्यात्', roman: 'parjanyāt', meaning: 'from rains' },
        { devanagari: 'अन्न', roman: 'anna', meaning: 'food grains' },
        { devanagari: 'सम्भवः', roman: 'sambhavaḥ', meaning: 'are made possible' },
        { devanagari: 'यज्ञात्', roman: 'yajñāt', meaning: 'from the performance of sacrifice' },
        { devanagari: 'भवति', roman: 'bhavati', meaning: 'becomes possible' },
        { devanagari: 'पर्जन्यः', roman: 'parjanyaḥ', meaning: 'rains' },
        { devanagari: 'यज्ञः', roman: 'yajñaḥ', meaning: 'performance of yajña' },
        { devanagari: 'कर्म', roman: 'karma', meaning: 'prescribed duties' },
        { devanagari: 'समुद्भवः', roman: 'samudbhavaḥ', meaning: 'born of' }
      ],
      meaning: 'All living bodies subsist on food grains, which are produced from rain. Rains are produced by performance of yajña [sacrifice], and yajña is born of prescribed duties.',
      difficulty: 'Intermediate'
    },
    {
      id: 15,
      title: 'Gītā 3.15',
      subtitle: 'कर्म ब्रह्मोद्भवं विद्धि',
      devanagari: [
        'कर्म ब्रह्मोद्भवं विद्धि',
        'ब्रह्माक्षरसमुद्भवम्',
        'तस्मात्सर्वगतं ब्रह्म',
        'नित्यं यज्ञे प्रतिष्ठितम्'
      ],
      roman: [
        'karma brahmodbhavaṁ viddhi',
        'brahmākṣara-samudbhavam',
        'tasmāt sarva-gataṁ brahma',
        'nityaṁ yajñe pratiṣṭhitam'
      ],
      words: [
        { devanagari: 'कर्म', roman: 'karma', meaning: 'work' },
        { devanagari: 'ब्रह्म', roman: 'brahma', meaning: 'Vedas' },
        { devanagari: 'उद्भवम्', roman: 'udbhavam', meaning: 'produced from' },
        { devanagari: 'विद्धि', roman: 'viddhi', meaning: 'one should know' },
        { devanagari: 'ब्रह्म', roman: 'brahma', meaning: 'the Vedas' },
        { devanagari: 'अक्षर', roman: 'akṣara', meaning: 'the Supreme Brahman (Personality of Godhead)' },
        { devanagari: 'समुद्भवम्', roman: 'samudbhavam', meaning: 'directly manifested' },
        { devanagari: 'तस्मात्', roman: 'tasmāt', meaning: 'therefore' },
        { devanagari: 'सर्वगतम्', roman: 'sarva-gatam', meaning: 'all-pervading' },
        { devanagari: 'ब्रह्म', roman: 'brahma', meaning: 'Transcendence' },
        { devanagari: 'नित्यं', roman: 'nityaṁ', meaning: 'eternally' },
        { devanagari: 'यज्ञे', roman: 'yajñe', meaning: 'in sacrifice' },
        { devanagari: 'प्रतिष्ठितम्', roman: 'pratiṣṭhitam', meaning: 'situated' }
      ],
      meaning: 'Regulated activities are prescribed in the Vedas, and the Vedas are directly manifested from the Supreme Personality of Godhead. Consequently the all-pervading Transcendence is eternally situated in acts of sacrifice.',
      difficulty: 'Intermediate'
    },
    {
      id: 16,
      title: 'Gītā 3.16',
      subtitle: 'एवं प्रवर्तितं चक्रं',
      devanagari: [
        'एवं प्रवर्तितं चक्रं',
        'नानुवर्तयतीह यः',
        'अघायुरिन्द्रियारामो',
        'मोगं पार्थ स जीवति'
      ],
      roman: [
        'evaṁ pravartitaṁ cakraṁ',
        'nānuvartayatīha yaḥ',
        'aghāyur indriyārāmo',
        'moghaṁ pārtha sa jīvati'
      ],
      words: [
        { devanagari: 'एवम्', roman: 'evam', meaning: 'thus prescribed' },
        { devanagari: 'प्रवर्तितम्', roman: 'pravartitam', meaning: 'established by the Vedas' },
        { devanagari: 'चक्रम्', roman: 'cakram', meaning: 'cycle' },
        { devanagari: 'न', roman: 'na', meaning: 'does not' },
        { devanagari: 'अनुवर्तयति', roman: 'anuvartayati', meaning: 'adopt' },
        { devanagari: 'इह', roman: 'iha', meaning: 'in this life' },
        { devanagari: 'यः', roman: 'yaḥ', meaning: 'one who' },
        { devanagari: 'अघायुः', roman: 'aghāyuḥ', meaning: 'life full of sins' },
        { devanagari: 'इन्द्रियारामः', roman: 'indriyārāmaḥ', meaning: 'satisfied in sense gratification' },
        { devanagari: 'मोगम्', roman: 'mogham', meaning: 'useless' },
        { devanagari: 'पार्थ', roman: 'pārtha', meaning: 'O son of Pṛthā (Arjuna)' },
        { devanagari: 'सः', roman: 'saḥ', meaning: 'one who does so' },
        { devanagari: 'जीवति', roman: 'jīvati', meaning: 'lives' }
      ],
      meaning: 'My dear Arjuna, a man who does not follow this prescribed Vedic system of sacrifice certainly leads a life of sin, for a person delighting only in the senses lives in vain.',
      difficulty: 'Intermediate'
    },
    {
      id: 17,
      title: 'Gītā 3.17',
      subtitle: 'यस्त्वात्मरतिरेव स्यात्',
      devanagari: [
        'यस्त्वात्मरतिरेव स्यात्',
        'आत्मतृप्तश्च मानवः',
        'आत्मन्येव च सन्तुष्टस्',
        'तस्य कार्यं न विद्यते'
      ],
      roman: [
        'yas tv ātma-ratir eva syād',
        'ātma-tṛptaś ca mānavaḥ',
        'ātmany eva ca santuṣṭas',
        'tasya kāryaṁ na vidyate'
      ],
      words: [
        { devanagari: 'यः', roman: 'yaḥ', meaning: 'one who' },
        { devanagari: 'तु', roman: 'tu', meaning: 'but' },
        { devanagari: 'आत्मरति', roman: 'ātma-ratiḥ', meaning: 'takes pleasure in the self' },
        { devanagari: 'एव', roman: 'eva', meaning: 'certainly' },
        { devanagari: 'स्यात्', roman: 'syāt', meaning: 'remains' },
        { devanagari: 'आत्मतृप्तः', roman: 'ātma-tṛptaḥ', meaning: 'self-illuminated' },
        { devanagari: 'च', roman: 'ca', meaning: 'and' },
        { devanagari: 'मानवः', roman: 'mānavaḥ', meaning: 'a man' },
        { devanagari: 'आत्मनि', roman: 'ātmani', meaning: 'in himself' },
        { devanagari: 'एव', roman: 'eva', meaning: 'only' },
        { devanagari: 'च', roman: 'ca', meaning: 'and' },
        { devanagari: 'सन्तुष्टः', roman: 'santuṣṭaḥ', meaning: 'perfectly satiated' },
        { devanagari: 'तस्य', roman: 'tasya', meaning: 'his' },
        { devanagari: 'कार्यं', roman: 'kāryam', meaning: 'duty' },
        { devanagari: 'न', roman: 'na', meaning: 'does not' },
        { devanagari: 'विद्यते', roman: 'vidyate', meaning: 'exist' }
      ],
      meaning: 'One who is, however, taking pleasure in the self, who is illumined in the self, who rejoices in and is satisfied with the self only, fully satiated—for him there is no duty.',
      difficulty: 'Intermediate'
    },
    {
      id: 18,
      title: 'Gītā 3.18',
      subtitle: 'नैव तस्य कृतनेर्थो',
      devanagari: [
        'नैव तस्य कृतनेर्थो',
        'नाकृतेनेह कश्चन',
        'न चास्य सर्वभूतेषु',
        'कश्चिदर्थव्यपाश्रयः'
      ],
      roman: [
        'naiva tasya kṛtenārtho',
        'nākṛteneha kaścana',
        'na cāsya sarva-bhūteṣu',
        'kaścid artha-vyapāśrayaḥ'
      ],
      words: [
        { devanagari: 'न', roman: 'na', meaning: 'never' },
        { devanagari: 'एव', roman: 'eva', meaning: 'certainly' },
        { devanagari: 'तस्य', roman: 'tasya', meaning: 'his' },
        { devanagari: 'कृतेन', roman: 'kṛtena', meaning: 'by discharge of duty' },
        { devanagari: 'अर्थः', roman: 'arthaḥ', meaning: 'purpose' },
        { devanagari: 'न', roman: 'na', meaning: 'nor' },
        { devanagari: 'अकृतेन', roman: 'akṛtena', meaning: 'without discharge of duty' },
        { devanagari: 'इह', roman: 'iha', meaning: 'in this world' },
        { devanagari: 'कश्चन', roman: 'kaścana', meaning: 'whatever' },
        { devanagari: 'न', roman: 'na', meaning: 'never' },
        { devanagari: 'च', roman: 'ca', meaning: 'and' },
        { devanagari: 'अस्य', roman: 'asya', meaning: 'of him' },
        { devanagari: 'सर्वभूतेषु', roman: 'sarva-bhūteṣu', meaning: 'in all living beings' },
        { devanagari: 'कश्चित्', roman: 'kaścit', meaning: 'any' },
        { devanagari: 'अर्थ', roman: 'artha', meaning: 'purpose' },
        { devanagari: 'व्यपाश्रयः', roman: 'vyapāśrayaḥ', meaning: 'taking shelter of' }
      ],
      meaning: 'A self-realized man has no purpose to fulfill in the discharge of his prescribed duties, nor has he any reason not to perform such work. Nor has he any need to depend on any other living being.',
      difficulty: 'Intermediate'
    },
    {
      id: 19,
      title: 'Gītā 3.19',
      subtitle: 'तस्मादसक्तः सततं',
      devanagari: [
        'तस्मादसक्तः सततं',
        'कार्यं कर्म समाचर',
        'असक्तो ह्याचरन्कर्म',
        'परमाप्नोति पूरुषः'
      ],
      roman: [
        'tasmād asaktaḥ satataṁ',
        'kāryaṁ karma samācara',
        'asakto hy ācaran karma',
        'param āpnoti pūruṣaḥ'
      ],
      words: [
        { devanagari: 'तस्मात्', roman: 'tasmāt', meaning: 'therefore' },
        { devanagari: 'असक्तः', roman: 'asaktaḥ', meaning: 'without attachment' },
        { devanagari: 'सततम्', roman: 'satataṁ', meaning: 'constantly' },
        { devanagari: 'कार्यं', roman: 'kāryam', meaning: 'as duty' },
        { devanagari: 'कर्म', roman: 'karma', meaning: 'work' },
        { devanagari: 'समाचर', roman: 'samācara', meaning: 'perform' },
        { devanagari: 'असक्तः', roman: 'asaktaḥ', meaning: 'nonattachment' },
        { devanagari: 'हि', roman: 'hi', meaning: 'certainly' },
        { devanagari: 'आचरन्', roman: 'ācaran', meaning: 'performing' },
        { devanagari: 'कर्म', roman: 'karma', meaning: 'work' },
        { devanagari: 'परम्', roman: 'param', meaning: 'the Supreme' },
        { devanagari: 'आप्नोति', roman: 'āpnoti', meaning: 'achieves' },
        { devanagari: 'पूरुषः', roman: 'pūruṣaḥ', meaning: 'a man' }
      ],
      meaning: 'Therefore, without being attached to the fruits of activities, one should act as a matter of duty; for by working without attachment, one attains the Supreme.',
      difficulty: 'Intermediate'
    },
    {
      id: 20,
      title: 'Gītā 3.20',
      subtitle: 'कर्मणा एव हि संसिद्धिम्',
      devanagari: [
        'कर्मणा एव हि संसिद्धिम्',
        'आस्थिताः जनकादयः',
        'लोकसंग्रहमेवापि',
        'संपश्यन्कर्तुमर्हसि'
      ],
      roman: [
        'karmaṇā eva hi saṁsiddhim',
        'āsthitā janakādayaḥ',
        'loka-saṅgraham evāpi',
        'sampaśyan kartum arhasi'
      ],
      words: [
        { devanagari: 'कर्मणा', roman: 'karmaṇā', meaning: 'by work' },
        { devanagari: 'एव', roman: 'eva', meaning: 'even' },
        { devanagari: 'हि', roman: 'hi', meaning: 'certainly' },
        { devanagari: 'संसिद्धिम्', roman: 'saṁsiddhim', meaning: 'perfection' },
        { devanagari: 'आस्थिताः', roman: 'āsthitāḥ', meaning: 'situated' },
        { devanagari: 'जनकादयः', roman: 'janakādayaḥ', meaning: 'kings like Janaka and others' },
        { devanagari: 'लोकसंग्रहम्', roman: 'loka-saṅgraham', meaning: 'educating the people in general' },
        { devanagari: 'एव', roman: 'eva', meaning: 'also' },
        { devanagari: 'अपि', roman: 'api', meaning: 'for the sake of' },
        { devanagari: 'संपश्यन्', roman: 'sampaśyan', meaning: 'by considering' },
        { devanagari: 'कर्तुम्', roman: 'kartum', meaning: 'to act' },
        { devanagari: 'अर्हसि', roman: 'arhasi', meaning: 'deserve' }
      ],
      meaning: 'Even kings like Janaka and others attained the perfectional stage by performance of prescribed duties. Therefore, just for the sake of educating the people in general, you should perform your work.',
      difficulty: 'Intermediate'
    },
    {
      id: 21,
      title: 'Gītā 3.21',
      subtitle: 'यद् यदाचरति श्रेष्ठः',
      devanagari: [
        'यद् यदाचरति श्रेष्ठस्',
        'तत् तदेवेतरो जनः',
        'स यत् प्रमाणं कुरुते',
        'लोकस् तदनुवर्तते'
      ],
      roman: [
        'yad yad ācarati śreṣṭhas',
        'tat tad evetaro janaḥ',
        'sa yat pramāṇaṁ kurute',
        'lokas tad anuvartate'
      ],
      words: [
        { devanagari: 'यत्', roman: 'yat', meaning: 'whatever' },
        { devanagari: 'यत्', roman: 'yat', meaning: 'and whichever' },
        { devanagari: 'आचरति', roman: 'ācarati', meaning: 'does he act' },
        { devanagari: 'श्रेष्ठः', roman: 'śreṣṭhaḥ', meaning: 'respectable leader' },
        { devanagari: 'तत्', roman: 'tat', meaning: 'that' },
        { devanagari: 'तत्', roman: 'tat', meaning: 'and that alone' },
        { devanagari: 'एव', roman: 'eva', meaning: 'certainly' },
        { devanagari: 'इतरो', roman: 'itaraḥ', meaning: 'common' },
        { devanagari: 'जनः', roman: 'janaḥ', meaning: 'person' },
        { devanagari: 'सः', roman: 'saḥ', meaning: 'he' },
        { devanagari: 'यत्', roman: 'yat', meaning: 'whichever' },
        { devanagari: 'प्रमाणम्', roman: 'pramāṇam', meaning: 'evidence' },
        { devanagari: 'कुरुते', roman: 'kurute', meaning: 'does perform' },
        { devanagari: 'लोकः', roman: 'lokaḥ', meaning: 'all the world' },
        { devanagari: 'तत्', roman: 'tat', meaning: 'that' },
        { devanagari: 'अनुवर्तते', roman: 'anuvartate', meaning: 'follow in the footsteps' }
      ],
      meaning: 'Whatever action is performed by a great man, common men follow in his footsteps. And whatever standards he sets by exemplary acts, all the world pursues.',
      difficulty: 'Intermediate'
    },
    {
      id: 22,
      title: 'Gītā 3.22',
      subtitle: 'न मे पार्थास्ति कर्तव्यं',
      devanagari: [
        'न मे पार्थास्ति कर्तव्यं',
        'त्रिषु लोकेषु किञ्चन',
        'नानवाप्तमवाप्तव्यं',
        'वर्त एव च कर्मणि'
      ],
      roman: [
        'na me pārthāsti kartavyaṁ',
        'triṣu lokeṣu kiñcana',
        'nānavāptam avāptavyaṁ',
        'varta eva ca karmaṇi'
      ],
      words: [
        { devanagari: 'न', roman: 'na', meaning: 'none' },
        { devanagari: 'मे', roman: 'me', meaning: 'Mine' },
        { devanagari: 'पार्थ', roman: 'pārtha', meaning: 'O son of Pṛthā' },
        { devanagari: 'अस्ति', roman: 'asti', meaning: 'there is' },
        { devanagari: 'कर्तव्यम्', roman: 'kartavyam', meaning: 'any prescribed duty' },
        { devanagari: 'त्रिषु', roman: 'triṣu', meaning: 'in the three' },
        { devanagari: 'लोकेषु', roman: 'lokeṣu', meaning: 'planetary systems' },
        { devanagari: 'किञ्चन', roman: 'kiñcana', meaning: 'anything' },
        { devanagari: 'न', roman: 'na', meaning: 'no' },
        { devanagari: 'अनवाप्तम्', roman: 'anavāptam', meaning: 'in want' },
        { devanagari: 'अवाप्तव्यम्', roman: 'avāptavyam', meaning: 'to be gained' },
        { devanagari: 'वर्ते', roman: 'varte', meaning: 'engaged' },
        { devanagari: 'एव', roman: 'eva', meaning: 'certainly' },
        { devanagari: 'च', roman: 'ca', meaning: 'also' },
        { devanagari: 'कर्मणि', roman: 'karmaṇi', meaning: 'in one\'s prescribed duty' }
      ],
      meaning: 'O son of Pṛthā, there is no work prescribed for Me within all the three planetary systems. Nor am I in want of anything, nor have I need to obtain anything—and yet I am engaged in work.',
      difficulty: 'Intermediate'
    },
    {
      id: 23,
      title: 'Gītā 3.23',
      subtitle: 'यदि ह्यहं न वर्तेयं',
      devanagari: [
        'यदि ह्यहं न वर्तेयं',
        'जातु कर्मण्यतन्द्रितः',
        'मम वर्त्मानुवर्तन्ते',
        'मनुष्याः पार्थ सर्वशः'
      ],
      roman: [
        'yadi hy ahaṁ na varteyaṁ',
        'jātu karmaṇy atandritaḥ',
        'mama vartmānuvartante',
        'manuṣyāḥ pārtha sarvaśaḥ'
      ],
      words: [
        { devanagari: 'यदि', roman: 'yadi', meaning: 'if' },
        { devanagari: 'हि', roman: 'hi', meaning: 'certainly' },
        { devanagari: 'अहम्', roman: 'aham', meaning: 'I' },
        { devanagari: 'न', roman: 'na', meaning: 'do not' },
        { devanagari: 'वर्तेयं', roman: 'varteyaṁ', meaning: 'thus engage' },
        { devanagari: 'जातु', roman: 'jātu', meaning: 'ever' },
        { devanagari: 'कर्मणि', roman: 'karmaṇi', meaning: 'in the performance of prescribed duties' },
        { devanagari: 'अतन्द्रितः', roman: 'atandritaḥ', meaning: 'with great care' },
        { devanagari: 'मम', roman: 'mama', meaning: 'My' },
        { devanagari: 'वर्त्म', roman: 'vartma', meaning: 'path' },
        { devanagari: 'अनुवर्तन्ते', roman: 'anuvartante', meaning: 'would follow' },
        { devanagari: 'मनुष्याः', roman: 'manuṣyāḥ', meaning: 'all men' },
        { devanagari: 'पार्थ', roman: 'pārtha', meaning: 'O son of Pṛthā' },
        { devanagari: 'सर्वशः', roman: 'sarvaśaḥ', meaning: 'in all respects' }
      ],
      meaning: 'For, if I did not engage in work, O Pārtha, certainly all men would follow My path.',
      difficulty: 'Intermediate'
    },
    {
      id: 24,
      title: 'Gītā 3.24',
      subtitle: 'उत्सीदेयुरिमे लोकाः',
      devanagari: [
        'उत्सीदेयुरिमे लोकाः',
        'न कुर्यां कर्म चेदहम्',
        'सङ्करस्य च कर्ता स्याम्',
        'उपहन्यामिमाः प्रजाः'
      ],
      roman: [
        'utsīdeyur ime lokā',
        'na kuryāṁ karma ced aham',
        'saṅkarasya ca kartā syām',
        'upahanyām imāḥ prajāḥ'
      ],
      words: [
        { devanagari: 'उत्सीदेयुः', roman: 'utsīdeyuḥ', meaning: 'put into ruin' },
        { devanagari: 'इमे', roman: 'ime', meaning: 'all these' },
        { devanagari: 'लोकाः', roman: 'lokāḥ', meaning: 'worlds' },
        { devanagari: 'न', roman: 'na', meaning: 'do not' },
        { devanagari: 'कुर्यां', roman: 'kuryāṁ', meaning: 'perform' },
        { devanagari: 'कर्म', roman: 'karma', meaning: 'prescribed duties' },
        { devanagari: 'चेत्', roman: 'cet', meaning: 'if' },
        { devanagari: 'अहम्', roman: 'aham', meaning: 'I' },
        { devanagari: 'सङ्करस्य', roman: 'saṅkarasya', meaning: 'of unwanted population' },
        { devanagari: 'च', roman: 'ca', meaning: 'and' },
        { devanagari: 'कर्ताः', roman: 'kartā', meaning: 'creator' },
        { devanagari: 'स्याम्', roman: 'syām', meaning: 'shall be' },
        { devanagari: 'उपहन्याम्', roman: 'upahanyām', meaning: 'destroy' },
        { devanagari: 'इमाः', roman: 'imāḥ', meaning: 'all these' },
        { devanagari: 'प्रजाः', roman: 'prajāḥ', meaning: 'living entities' }
      ],
      meaning: 'If I should cease to work, then all these worlds would be put to ruination. I would also be the cause of creating unwanted population, and I would thereby destroy the peace of all sentient beings.',
      difficulty: 'Intermediate'
    },
    {
      id: 25,
      title: 'Gītā 3.25',
      subtitle: 'सक्ताः कर्मण्यविद्वांसो',
      devanagari: [
        'सक्ताः कर्मण्यविद्वांसो',
        'यथा कुर्वन्ति भारत',
        'कुर्याद्विद्वांस्तथासक्तश्',
        'चिकीर्षुर्लोकसंग्रहम्'
      ],
      roman: [
        'saktāḥ karmaṇy avidvāṁso',
        'yathā kurvanti bhārata',
        'kuryād vidvāṁs tathāsaktaś',
        'cikīrṣur loka-saṅgraham'
      ],
      words: [
        { devanagari: 'सक्ताः', roman: 'saktāḥ', meaning: 'being attached' },
        { devanagari: 'कर्मणि', roman: 'karmaṇi', meaning: 'prescribed duties' },
        { devanagari: 'अविद्वांसः', roman: 'avidvāṁsaḥ', meaning: 'the ignorant' },
        { devanagari: 'यथा', roman: 'yathā', meaning: 'as much as' },
        { devanagari: 'कुर्वन्ति', roman: 'kurvanti', meaning: 'do it' },
        { devanagari: 'भारत', roman: 'bhārata', meaning: 'O descendant of Bharata' },
        { devanagari: 'कुर्यात्', roman: 'kuryāt', meaning: 'must do' },
        { devanagari: 'विद्वान्', roman: 'vidvān', meaning: 'the learned' },
        { devanagari: 'तथा', roman: 'tathā', meaning: 'thus' },
        { devanagari: 'असक्तः', roman: 'asaktaḥ', meaning: 'without attachment' },
        { devanagari: 'चिकीर्षुः', roman: 'cikīrṣuḥ', meaning: 'desiring to' },
        { devanagari: 'लोकसंग्रहम्', roman: 'loka-saṅgraham', meaning: 'leading the people in general' }
      ],
      meaning: 'As the ignorant perform their duties with attachment to results, similarly the learned may also act, but without attachment, for the sake of leading people on the right path.',
      difficulty: 'Intermediate'
    },
    {
      id: 26,
      title: 'Gītā 3.26',
      subtitle: 'न बुद्धिभेदं जनयेत्',
      devanagari: [
        'न बुद्धिभेदं जनयेत्',
        'अज्ञानां कर्मसङ्गिनाम्',
        'योषयेत् सर्वकर्माणि',
        'विद्वान्युक्तः समाचरन्'
      ],
      roman: [
        'na buddhi-bhedaṁ janayet',
        'ajñānāṁ karma-saṅginām',
        'joṣayet sarva-karmāṇi',
        'vidvān yuktaḥ samācaran'
      ],
      words: [
        { devanagari: 'न', roman: 'na', meaning: 'do not' },
        { devanagari: 'बुद्धि-भेदम्', roman: 'buddhi-bhedam', meaning: 'disrupt the intelligence' },
        { devanagari: 'जनयेत्', roman: 'janayet', meaning: 'do' },
        { devanagari: 'अज्ञानाम्', roman: 'ajñānām', meaning: 'of the foolish' },
        { devanagari: 'कर्म-सङ्गिनाम्', roman: 'karma-saṅginām', meaning: 'attached to fruitive work' },
        { devanagari: 'योषयेत्', roman: 'joṣayet', meaning: 'dovetailed' },
        { devanagari: 'सर्व', roman: 'sarva', meaning: 'all' },
        { devanagari: 'कर्माणि', roman: 'karmāṇi', meaning: 'work' },
        { devanagari: 'विद्वान्', roman: 'vidvān', meaning: 'learned' },
        { devanagari: 'युक्तः', roman: 'yuktaḥ', meaning: 'all engaged' },
        { devanagari: 'समाचरन्', roman: 'samācaran', meaning: 'practicing' }
      ],
      meaning: 'Let not the wise disrupt the minds of the ignorant who are attached to fruitive action. They should not be encouraged to refrain from work, but to engage in work in the spirit of devotion.',
      difficulty: 'Intermediate'
    },
    {
      id: 27,
      title: 'Gītā 3.27',
      subtitle: 'प्रकृतेः क्रियमाणानि',
      devanagari: [
        'प्रकृतेः क्रियमाणानि',
        'गुणैः कर्माणि सर्वशः',
        'अहङ्कारविमूढात्मा',
        'कर्ताहमिति मन्यते'
      ],
      roman: [
        'prakṛteḥ kriyamāṇāni',
        'guṇaiḥ karmāṇi sarvaśaḥ',
        'ahaṅkāra-vimūḍhātmā',
        'kartāham iti manyate'
      ],
      words: [
        { devanagari: 'प्रकृतेः', roman: 'prakṛteḥ', meaning: 'of material nature' },
        { devanagari: 'क्रियमाणानि', roman: 'kriyamāṇāni', meaning: 'all being done' },
        { devanagari: 'गुणैः', roman: 'guṇaiḥ', meaning: 'by the modes' },
        { devanagari: 'कर्माणि', roman: 'karmāṇi', meaning: 'activities' },
        { devanagari: 'सर्वशः', roman: 'sarvaśaḥ', meaning: 'all kinds of' },
        { devanagari: 'अहङ्कार', roman: 'ahaṅkāra', meaning: 'false ego' },
        { devanagari: 'विमूढ', roman: 'vimūḍha', meaning: 'bewildered' },
        { devanagari: 'आत्मा', roman: 'ātmā', meaning: 'the spirit soul' },
        { devanagari: 'कर्ता', roman: 'kartā', meaning: 'doer' },
        { devanagari: 'अहम्', roman: 'aham', meaning: 'I' },
        { devanagari: 'इति', roman: 'iti', meaning: 'thus' },
        { devanagari: 'मन्यते', roman: 'manyate', meaning: 'thinks' }
      ],
      meaning: 'The bewildered spirit soul, under the influence of the three modes of material nature, thinks himself to be the doer of activities, which are in actuality carried out by nature.',
      difficulty: 'Intermediate'
    },
    {
      id: 28,
      title: 'Gītā 3.28',
      subtitle: 'तत्त्ववित्तु महाबाहो',
      devanagari: [
        'तत्त्ववित्तु महाबाहो',
        'गुणकर्मविभागयोः',
        'गुणा गुणेषु वर्तन्त',
        'इति मत्वा न सज्जते'
      ],
      roman: [
        'tattva-vit tu mahā-bāho',
        'guṇa-karma-vibhāgayoḥ',
        'guṇā guṇeṣu vartanta',
        'iti matvā na sajjate'
      ],
      words: [
        { devanagari: 'तत्त्ववित्', roman: 'tattvavit', meaning: 'the knower of the Absolute Truth' },
        { devanagari: 'तु', roman: 'tu', meaning: 'but' },
        { devanagari: 'महाबाहो', roman: 'mahā-bāho', meaning: 'O mighty-armed one' },
        { devanagari: 'गुणकर्म', roman: 'guṇa-karma', meaning: 'works under material influence' },
        { devanagari: 'विभागयोः', roman: 'vibhāgayoḥ', meaning: 'differences' },
        { devanagari: 'गुणाः', roman: 'guṇāḥ', meaning: 'senses' },
        { devanagari: 'गुणेषु', roman: 'guṇeṣu', meaning: 'in sense gratification' },
        { devanagari: 'वर्तन्त', roman: 'vartanta', meaning: 'being engaged' },
        { devanagari: 'इति', roman: 'iti', meaning: 'thus' },
        { devanagari: 'मत्वा', roman: 'matvā', meaning: 'thinking' },
        { devanagari: 'न', roman: 'na', meaning: 'never' },
        { devanagari: 'सज्जते', roman: 'sajjate', meaning: 'becomes attached' }
      ],
      meaning: 'One who is in knowledge of the Absolute Truth, O mighty-armed, does not engage himself in the senses and sense gratification, knowing well the differences between work in devotion and work for fruitive results.',
      difficulty: 'Intermediate'
    },
    {
      id: 29,
      title: 'Gītā 3.29',
      subtitle: 'प्रकृतेर्गुणसम्मूढाः',
      devanagari: [
        'प्रकृतेर्गुणसम्मूढाः',
        'सज्जन्ते गुणकर्मसु',
        'तानकृत्स्नविदो मन्दान्',
        'कृत्स्नविन्न विचालयेत्'
      ],
      roman: [
        'prakṛter guṇa-sammūḍhāḥ',
        'sajjante guṇa-karmasu',
        'tān akṛtsna-vido mandān',
        'kṛtsna-vin na vicālayet'
      ],
      words: [
        { devanagari: 'प्रकृतेः', roman: 'prakṛteḥ', meaning: 'impelled by the material modes' },
        { devanagari: 'गुणसम्मूढाः', roman: 'guṇa-saṁmūḍhāḥ', meaning: 'befooled by material identification' },
        { devanagari: 'सज्जन्ते', roman: 'sajjante', meaning: 'become engaged' },
        { devanagari: 'गुणकर्मसु', roman: 'guṇa-karmasu', meaning: 'in material activities' },
        { devanagari: 'तान्', roman: 'tān', meaning: 'all those' },
        { devanagari: 'अकृत्स्नविदः', roman: 'akṛtsna-vidaḥ', meaning: 'persons with a poor fund of knowledge' },
        { devanagari: 'मन्दान्', roman: 'mandān', meaning: 'lazy to understand self-realization' },
        { devanagari: 'कृत्स्नवित्', roman: 'kṛtsna-vit', meaning: 'one who is in factual knowledge' },
        { devanagari: 'न', roman: 'na', meaning: 'may not' },
        { devanagari: 'विचालयेत्', roman: 'vicālayet', meaning: 'try to agitate' }
      ],
      meaning: 'Bewildered by the modes of material nature, the ignorant fully engage themselves in material activities and become attached. But the wise should not unsettle them, although these duties are inferior due to the performers\' lack of knowledge.',
      difficulty: 'Intermediate'
    },
    {
      id: 30,
      title: 'Gītā 3.30',
      subtitle: 'मयि सर्वाणि कर्माणि',
      devanagari: [
        'मयि सर्वाणि कर्माणि',
        'संन्यस्याध्यात्मचेतसा',
        'निराशीर्निर्ममो भूत्वा',
        'युध्यस्व विगतज्वरः'
      ],
      roman: [
        'mayi sarvāṇi karmāṇi',
        'sannyasyādhyātma-cetasā',
        'nirāśīr nirmamo bhūtvā',
        'yudhyasva vigata-jvaraḥ'
      ],
      words: [
        { devanagari: 'मयि', roman: 'mayi', meaning: 'unto Me' },
        { devanagari: 'सर्वाणि', roman: 'sarvāṇi', meaning: 'all sorts of' },
        { devanagari: 'कर्माणि', roman: 'karmāṇi', meaning: 'activities' },
        { devanagari: 'संन्यस्य', roman: 'sannyasya', meaning: 'giving up completely' },
        { devanagari: 'अध्यात्म', roman: 'adhyātma', meaning: 'with full knowledge of the self' },
        { devanagari: 'चेतसा', roman: 'cetasā', meaning: 'consciousness' },
        { devanagari: 'निराशीः', roman: 'nirāśīḥ', meaning: 'without desire for profit' },
        { devanagari: 'निर्ममः', roman: 'nirmamaḥ', meaning: 'without ownership' },
        { devanagari: 'भूत्वा', roman: 'bhūtvā', meaning: 'so being' },
        { devanagari: 'युध्यस्व', roman: 'yudhyasva', meaning: 'fight' },
        { devanagari: 'विगतज्वरः', roman: 'vigata-jvaraḥ', meaning: 'without being lethargic' }
      ],
      meaning: 'Therefore, O Arjuna, surrendering all your works unto Me, with mind intent on Me, and without desire for gain and free from egoism and lethargy, fight.',
      difficulty: 'Intermediate'
    },
    {
      id: 31,
      title: 'Gītā 3.31',
      subtitle: 'ये मे मतमिदं नित्यम्',
      devanagari: [
        'ये मे मतमिदं नित्यम्',
        'अनुतिष्ठन्ति मानवाः',
        'श्रद्धावन्तोऽनसूयन्तो',
        'मुच्यन्ते तेऽपि कर्मभिः'
      ],
      roman: [
        'ye me matam idaṁ nityam',
        'anutiṣṭhanti mānavāḥ',
        'śraddhāvanto \'nasūyanto',
        'mucyante te \'pi karmabhiḥ'
      ],
      words: [
        { devanagari: 'ये', roman: 'ye', meaning: 'those' },
        { devanagari: 'मे', roman: 'me', meaning: 'My' },
        { devanagari: 'मतम्', roman: 'matam', meaning: 'injunctions' },
        { devanagari: 'इदं', roman: 'idam', meaning: 'this' },
        { devanagari: 'नित्यम्', roman: 'nityam', meaning: 'eternal function' },
        { devanagari: 'अनुतिष्ठन्ति', roman: 'anutiṣṭhanti', meaning: 'execute regularly' },
        { devanagari: 'मानवाः', roman: 'mānavāḥ', meaning: 'humankind' },
        { devanagari: 'श्रद्धावन्तः', roman: 'śraddhāvantaḥ', meaning: 'with faith and devotion' },
        { devanagari: 'अनसूयन्तः', roman: 'anasūyantaḥ', meaning: 'without envy' },
        { devanagari: 'मुच्यन्ते', roman: 'mucyante', meaning: 'become free' },
        { devanagari: 'ते', roman: 'te', meaning: 'all of them' },
        { devanagari: 'अपि', roman: 'api', meaning: 'even' },
        { devanagari: 'कर्मभिः', roman: 'karmabhiḥ', meaning: 'from the bondage of the law of fruitive action' }
      ],
      meaning: 'One who executes his duties according to My injunctions and who follows this teaching faithfully, without envy, becomes free from the bondage of fruitive actions.',
      difficulty: 'Intermediate'
    },
    {
      id: 32,
      title: 'Gītā 3.32',
      subtitle: 'ये त्वेतदभ्यसूयन्तो',
      devanagari: [
        'ये त्वेतदभ्यसूयन्तो',
        'नानुतिष्ठन्ति मे मतम्',
        'सर्वज्ञानविमूढांस् तान्',
        'विद्धि नष्टानचेतसः'
      ],
      roman: [
        'ye tv etad abhyasūyanto',
        'nānutiṣṭhanti me matam',
        'sarva-jñāna-vimūḍhāṁs tān',
        'viddhi naṣṭān acetasaḥ'
      ],
      words: [
        { devanagari: 'ये', roman: 'ye', meaning: 'those' },
        { devanagari: 'तु', roman: 'tu', meaning: 'however' },
        { devanagari: 'एतत्', roman: 'etat', meaning: 'this' },
        { devanagari: 'अभ्यसूयन्तः', roman: 'abhyasūyantaḥ', meaning: 'out of envy' },
        { devanagari: 'न', roman: 'na', meaning: 'do not' },
        { devanagari: 'अनुतिष्ठन्ति', roman: 'anutiṣṭhanti', meaning: 'regularly perform' },
        { devanagari: 'मे', roman: 'me', meaning: 'My' },
        { devanagari: 'मतम्', roman: 'matam', meaning: 'injunction' },
        { devanagari: 'सर्व', roman: 'sarva', meaning: 'all sorts of' },
        { devanagari: 'ज्ञान', roman: 'jñāna', meaning: 'knowledge' },
        { devanagari: 'विमूढान्', roman: 'vimūḍhān', meaning: 'perfectly befooled' },
        { devanagari: 'तान्', roman: 'tān', meaning: 'they are' },
        { devanagari: 'विद्धि', roman: 'viddhi', meaning: 'know it well' },
        { devanagari: 'नष्टान्', roman: 'naṣṭān', meaning: 'all ruined' },
        { devanagari: 'अचेतसः', roman: 'acetasaḥ', meaning: 'without Kṛṣṇa consciousness' }
      ],
      meaning: 'But those who, out of envy, disregard these teachings and do not practice them regularly, are to be considered bereft of all knowledge, befooled, and doomed to ignorance and bondage.',
      difficulty: 'Intermediate'
    },
    {
      id: 33,
      title: 'Gītā 3.33',
      subtitle: 'सदृशं चेष्टते स्वस्याः',
      devanagari: [
        'सदृशं चेष्टते स्वस्याः',
        'प्रकृतेर्ज्ञानवानपि',
        'प्रकृतिं यान्ति भूतानि',
        'निग्रहः किं करिष्यति'
      ],
      roman: [
        'sadṛśaṁ ceṣṭate svasyāḥ',
        'prakṛter jñānavān api',
        'prakṛtiṁ yānti bhūtāni',
        'nigrahaḥ kiṁ kariṣyati'
      ],
      words: [
        { devanagari: 'सदृशम्', roman: 'sadṛśam', meaning: 'accordingly' },
        { devanagari: 'चेष्टते', roman: 'ceṣṭate', meaning: 'tries' },
        { devanagari: 'स्वस्याः', roman: 'svasyāḥ', meaning: 'in one\'s own nature' },
        { devanagari: 'प्रकृतेः', roman: 'prakṛteḥ', meaning: 'modes' },
        { devanagari: 'ज्ञानवान्', roman: 'jñānavān', meaning: 'the learned' },
        { devanagari: 'अपि', roman: 'api', meaning: 'although' },
        { devanagari: 'प्रकृतिम्', roman: 'prakṛtim', meaning: 'nature' },
        { devanagari: 'यान्ति', roman: 'yānti', meaning: 'undergo' },
        { devanagari: 'भूतानि', roman: 'bhūtāni', meaning: 'all living entities' },
        { devanagari: 'निग्रहः', roman: 'nigrahaḥ', meaning: 'suppression' },
        { devanagari: 'किम्', roman: 'kim', meaning: 'what' },
        { devanagari: 'करिष्यति', roman: 'kariṣyati', meaning: 'can do' }
      ],
      meaning: 'Even a man of knowledge acts according to his own nature, for everyone follows his nature. What can repression accomplish?',
      difficulty: 'Intermediate'
    },
    {
      id: 34,
      title: 'Gītā 3.34',
      subtitle: 'इन्द्रियस्येन्द्रियस्यार्थे',
      devanagari: [
        'इन्द्रियस्येन्द्रियस्यार्थे',
        'रागद्वेषौ व्यवस्थितौ',
        'तयोर्न वशमागच्छेत्',
        'तौ ह्यस्य परिपन्थिनौ'
      ],
      roman: [
        'indriyasyendriyasyārthe',
        'rāga-dveṣau vyavasthitau',
        'tayor na vaśam āgacchet',
        'tau hy asya paripanthinau'
      ],
      words: [
        { devanagari: 'इन्द्रियस्य', roman: 'indriyasya', meaning: 'of the senses' },
        { devanagari: 'इन्द्रियस्य', roman: 'indriyasya', meaning: 'of the senses' },
        { devanagari: 'अर्थे', roman: 'arthe', meaning: 'in the sense objects' },
        { devanagari: 'राग', roman: 'rāga', meaning: 'attachment' },
        { devanagari: 'द्वेषौ', roman: 'dveṣau', meaning: 'also in detachment' },
        { devanagari: 'व्यवस्थितौ', roman: 'vyavasthitau', meaning: 'put under regulations' },
        { devanagari: 'तयोः', roman: 'tayoḥ', meaning: 'of them' },
        { devanagari: 'न', roman: 'na', meaning: 'never' },
        { devanagari: 'वशम्', roman: 'vaśam', meaning: 'control' },
        { devanagari: 'आगच्छेत्', roman: 'āgacchet', meaning: 'one should come' },
        { devanagari: 'तौ', roman: 'tau', meaning: 'those' },
        { devanagari: 'हि', roman: 'hi', meaning: 'certainly are' },
        { devanagari: 'अस्य', roman: 'asya', meaning: 'his' },
        { devanagari: 'परिपन्थिनौ', roman: 'paripanthinau', meaning: 'stumbling blocks' }
      ],
      meaning: 'Attraction and repulsion for sense objects are felt by embodied beings, but one should not fall under the control of senses and sense objects because they are stumbling blocks on the path of self-realization.',
      difficulty: 'Intermediate'
    },
    {
      id: 35,
      title: 'Gītā 3.35',
      subtitle: 'श्रेयान् स्वधर्मो विगुणः',
      devanagari: [
        'श्रेयान् स्वधर्मो विगुणः',
        'परधर्मात्स्वनुष्ठितात्',
        'स्वधर्मे निधनं श्रेयः',
        'परधर्मो भयावहः'
      ],
      roman: [
        'śreyān sva-dharmo viguṇaḥ',
        'para-dharmāt sv-anuṣṭhitāt',
        'sva-dharme nidhanaṁ śreyaḥ',
        'para-dharmo bhayāvahaḥ'
      ],
      words: [
        { devanagari: 'श्रेयान्', roman: 'śreyān', meaning: 'far better' },
        { devanagari: 'स्वधर्मः', roman: 'sva-dharmaḥ', meaning: "one's prescribed duties" },
        { devanagari: 'विगुणः', roman: 'viguṇaḥ', meaning: 'even faulty' },
        { devanagari: 'परधर्मात्', roman: 'para-dharmāt', meaning: 'from duties mentioned for others' },
        { devanagari: 'स्वनुष्ठितात्', roman: 'svanuṣṭhitāt', meaning: 'than perfectly done' },
        { devanagari: 'स्वधर्मे', roman: 'sva-dharme', meaning: "in one's prescribed duties" },
        { devanagari: 'निधनम्', roman: 'nidhanam', meaning: 'destruction' },
        { devanagari: 'श्रेयः', roman: 'śreyaḥ', meaning: 'better' },
        { devanagari: 'परधर्मः', roman: 'para-dharmaḥ', meaning: 'duties prescribed for others' },
        { devanagari: 'भयावहः', roman: 'bhayāvahaḥ', meaning: 'dangerous' }
      ],
      meaning: "It is far better to discharge one's prescribed duties, even though they may be faulty, than another's duties. Destruction in the course of performing one's own duty is better than engaging in another's duties, for to follow another's path is dangerous.",
      difficulty: 'Intermediate'
    },
    {
      id: 36,
      title: 'Gītā 3.36',
      subtitle: 'अर्जुन उवाच',
      devanagari: [
        'अर्जुन उवाच',
        'अथ केन प्रयुक्तोऽयं',
        'पापं चरति पूरुषः',
        'अनिच्छन्नपि वार्ष्णेय',
        'बलादिव नियोजितः'
      ],
      roman: [
        'arjuna uvāca',
        'atha kena prayukto \'yaṁ',
        'pāpaṁ carati pūruṣaḥ',
        'anicchann api vārṣṇeya',
        'balād iva niyojitaḥ'
      ],
      words: [
        { devanagari: 'अर्जुनः', roman: 'arjunaḥ', meaning: 'Arjuna' },
        { devanagari: 'उवाच', roman: 'uvāca', meaning: 'said' },
        { devanagari: 'अथ', roman: 'atha', meaning: 'hereafter' },
        { devanagari: 'केन', roman: 'kena', meaning: 'by what' },
        { devanagari: 'प्रयुक्तः', roman: 'prayuktaḥ', meaning: 'impelled' },
        { devanagari: 'अयम्', roman: 'ayam', meaning: 'one' },
        { devanagari: 'पापम्', roman: 'pāpam', meaning: 'sins' },
        { devanagari: 'चरति', roman: 'carati', meaning: 'acts' },
        { devanagari: 'पुरुषः', roman: 'puruṣaḥ', meaning: 'a man' },
        { devanagari: 'अनिच्छन्', roman: 'anicchan', meaning: 'without desiring' },
        { devanagari: 'अपि', roman: 'api', meaning: 'although' },
        { devanagari: 'वार्ष्णेय', roman: 'vārṣṇeya', meaning: 'O descendant of Vṛṣṇi' },
        { devanagari: 'बलात्', roman: 'balāt', meaning: 'by force' },
        { devanagari: 'इव', roman: 'iva', meaning: 'as if' },
        { devanagari: 'नियोजितः', roman: 'niyojitaḥ', meaning: 'engaged' }
      ],
      meaning: 'Arjuna said: O descendant of Vṛṣṇi, by what is one impelled to sinful acts, even unwillingly, as if engaged by force?',
      difficulty: 'Intermediate'
    },
    {
      id: 37,
      title: 'Gītā 3.37',
      subtitle: 'श्रीभगवानुवाच',
      devanagari: [
        'श्रीभगवानुवाच',
        'काम एष क्रोध एष',
        'रजोगुणसमुद्भवः',
        'महाशनो महापाप्मा',
        'विद्ध्येनमिह वैरिणम्'
      ],
      roman: [
        'śrī-bhagavān uvāca',
        'kāma eṣa krodha eṣa',
        'rajo-guṇa-samudbhavaḥ',
        'mahāśano mahā-pāpmā',
        'viddhy enam iha vairiṇam'
      ],
      words: [
        { devanagari: 'श्रीभगवान्', roman: 'śrī bhagavān', meaning: 'the Personality of Godhead' },
        { devanagari: 'उवाच', roman: 'uvāca', meaning: 'said' },
        { devanagari: 'कामः', roman: 'kāmaḥ', meaning: 'lust' },
        { devanagari: 'एषः', roman: 'eṣaḥ', meaning: 'this' },
        { devanagari: 'क्रोधः', roman: 'krodhaḥ', meaning: 'wrath' },
        { devanagari: 'एषः', roman: 'eṣaḥ', meaning: 'this' },
        { devanagari: 'रजोगुण', roman: 'rajo-guṇa', meaning: 'the mode of passion' },
        { devanagari: 'समुद्भवः', roman: 'samudbhavaḥ', meaning: 'born of' },
        { devanagari: 'महाशनः', roman: 'mahāśanaḥ', meaning: 'all-devouring' },
        { devanagari: 'महापाप्मा', roman: 'mahā-pāpmā', meaning: 'greatly sinful' },
        { devanagari: 'विद्धि', roman: 'viddhi', meaning: 'know' },
        { devanagari: 'एनम्', roman: 'enam', meaning: 'this' },
        { devanagari: 'इह', roman: 'iha', meaning: 'in this world' },
        { devanagari: 'वैरिणम्', roman: 'vairiṇam', meaning: 'enemy' }
      ],
      meaning: 'The Blessed Lord said: It is lust only, Arjuna, which is born of contact with the material modes of passion and later transformed into wrath, and which is the all-devouring, sinful enemy of this world.',
      difficulty: 'Intermediate'
    },
    {
      id: 38,
      title: 'Gītā 3.38',
      subtitle: 'धूमेनावृतिवह्निः',
      devanagari: [
        'धूमेनावृतिवह्निः',
        'यथादर्शो मलेन च',
        'यथोल्बेनावृतो गर्भस्',
        'तथा तेनेदमावृतम्'
      ],
      roman: [
        'dhūmenāvriyate vahnir',
        'yathādarśo malena ca',
        'yatholbenāvṛto garbhas',
        'tathā tenedam āvṛtam'
      ],
      words: [
        { devanagari: 'धूमेन', roman: 'dhūmena', meaning: 'by smoke' },
        { devanagari: 'आव्रियते', roman: 'āvriyate', meaning: 'covered' },
        { devanagari: 'वह्निः', roman: 'vahniḥ', meaning: 'fire' },
        { devanagari: 'यथा', roman: 'yathā', meaning: 'just as' },
        { devanagari: 'आदर्शः', roman: 'ādarśaḥ', meaning: 'mirror' },
        { devanagari: 'मलेन', roman: 'malena', meaning: 'by dust' },
        { devanagari: 'च', roman: 'ca', meaning: 'also' },
        { devanagari: 'यथा', roman: 'yathā', meaning: 'just as' },
        { devanagari: 'उल्बेन', roman: 'ulbena', meaning: 'by the womb' },
        { devanagari: 'आवृतः', roman: 'āvṛtaḥ', meaning: 'is covered' },
        { devanagari: 'गर्भः', roman: 'garbhaḥ', meaning: 'embryo' },
        { devanagari: 'तथा', roman: 'tathā', meaning: 'so' },
        { devanagari: 'तेन', roman: 'tena', meaning: 'by that lust' },
        { devanagari: 'इदम्', roman: 'idam', meaning: 'this' },
        { devanagari: 'आवृतम्', roman: 'āvṛtam', meaning: 'is covered' }
      ],
      meaning: 'As fire is covered by smoke, as a mirror is covered by dust, or as the embryo is covered by the womb, similarly, the living entity is covered by different degrees of this lust.',
      difficulty: 'Intermediate'
    },
    {
      id: 39,
      title: 'Gītā 3.39',
      subtitle: 'आवृतं ज्ञानमेतेन',
      devanagari: [
        'आवृतं ज्ञानमेतेन',
        'ज्ञानिनो नित्यवैरिणा',
        'कामरूपेण कौन्तेय',
        'दुष्पूरेणानलेन च'
      ],
      roman: [
        'āvṛtaṁ jñānam etena',
        'jñānino nitya-vairiṇā',
        'kāma-rūpeṇa kaunteya',
        'duṣpūreṇānalena ca'
      ],
      words: [
        { devanagari: 'आवृतम्', roman: 'āvṛtam', meaning: 'covered' },
        { devanagari: 'ज्ञानम्', roman: 'jñānam', meaning: 'pure consciousness' },
        { devanagari: 'एतेन', roman: 'etena', meaning: 'by this' },
        { devanagari: 'ज्ञानिनः', roman: 'jñāninaḥ', meaning: 'of the knower' },
        { devanagari: 'नित्यवैरिणा', roman: 'nitya-vairiṇā', meaning: 'eternal enemy' },
        { devanagari: 'कामरूपेण', roman: 'kāma-rūpeṇa', meaning: 'in the form of lust' },
        { devanagari: 'कौन्तेय', roman: 'kaunteya', meaning: 'O son of Kuntī' },
        { devanagari: 'दुष्पूरेण', roman: 'duṣpūreṇa', meaning: 'never to be satisfied' },
        { devanagari: 'अनलेन', roman: 'analena', meaning: 'by the fire' },
        { devanagari: 'च', roman: 'ca', meaning: 'also' }
      ],
      meaning: 'Thus, a man\'s pure consciousness is covered by his eternal enemy in the form of lust, which is never satisfied and which burns like fire.',
      difficulty: 'Intermediate'
    },
    {
      id: 40,
      title: 'Gītā 3.40',
      subtitle: 'इन्द्रियाणि मनो बुद्धिर्',
      devanagari: [
        'इन्द्रियाणि मनो बुद्धिर्',
        'अस्याधिष्ठानमुच्यते',
        'एतैर्विमोहयत्येष',
        'ज्ञानमावृत्य देहिनम्'
      ],
      roman: [
        'indriyāṇi mano buddhir',
        'asyādhiṣṭhānam ucyate',
        'etair vimohayaty eṣa',
        'jñānam āvṛtya dehinam'
      ],
      words: [
        { devanagari: 'इन्द्रियाणि', roman: 'indriyāṇi', meaning: 'the senses' },
        { devanagari: 'मन्', roman: 'manaḥ', meaning: 'the mind' },
        { devanagari: 'बुद्धिः', roman: 'buddhiḥ', meaning: 'the intelligence' },
        { devanagari: 'अस्य', roman: 'asya', meaning: 'of the lust' },
        { devanagari: 'अधिष्ठानम्', roman: 'adhiṣṭhānam', meaning: 'sitting place' },
        { devanagari: 'उच्यते', roman: 'ucyate', meaning: 'called' },
        { devanagari: 'एतैः', roman: 'etaiḥ', meaning: 'by all these' },
        { devanagari: 'विमोहयति', roman: 'vimohayati', meaning: 'bewilders' },
        { devanagari: 'एषः', roman: 'eṣaḥ', meaning: 'of this' },
        { devanagari: 'ज्ञानम्', roman: 'jñānam', meaning: 'knowledge' },
        { devanagari: 'आवृत्य', roman: 'āvṛtya', meaning: 'covering' },
        { devanagari: 'देहिनम्', roman: 'dehinam', meaning: 'the embodied' }
      ],
      meaning: 'The senses, the mind and the intelligence are the sitting places of this lust, which veils the real knowledge of the living entity and bewilders him.',
      difficulty: 'Intermediate'
    },
    {
      id: 41,
      title: 'Gītā 3.41',
      subtitle: 'तस्मात्त्वमिन्द्रियाण्यादौ',
      devanagari: [
        'तस्मात्त्वमिन्द्रियाण्यादौ',
        'नियम्य भरतर्षभ',
        'पाप्मानं प्रजहि ह्येनं',
        'ज्ञानविज्ञाननाशनम्'
      ],
      roman: [
        'tasmāt tvam indriyāṇy ādau',
        'niyamya bharatarṣabha',
        'pāpmānaṁ prajahi hy enaṁ',
        'jñāna-vijñāna-nāśanam'
      ],
      words: [
        { devanagari: 'तस्मात्', roman: 'tasmāt', meaning: 'therefore' },
        { devanagari: 'त्वम्', roman: 'tvam', meaning: 'you' },
        { devanagari: 'इन्द्रियाणि', roman: 'indriyāṇi', meaning: 'senses' },
        { devanagari: 'आदौ', roman: 'ādau', meaning: 'in the beginning' },
        { devanagari: 'नियम्य', roman: 'niyamya', meaning: 'by regulating' },
        { devanagari: 'भरतर्षभ', roman: 'bharatarṣabha', meaning: 'O chief amongst the descendants of Bharata' },
        { devanagari: 'पाप्मानम्', roman: 'pāpmānam', meaning: 'the great symbol of sin' },
        { devanagari: 'प्रजहि', roman: 'prajahi', meaning: 'curb' },
        { devanagari: 'हि', roman: 'hi', meaning: 'certainly' },
        { devanagari: 'एनम्', roman: 'enam', meaning: 'this' },
        { devanagari: 'ज्ञान', roman: 'jñāna', meaning: 'knowledge' },
        { devanagari: 'विज्ञान', roman: 'vijñāna', meaning: 'scientific knowledge of the pure soul' },
        { devanagari: 'नाशनम्', roman: 'nāśanam', meaning: 'destroyer' }
      ],
      meaning: 'Therefore, O Arjuna, best of the Bhāratas, in the very beginning curb this great symbol of sin [lust] by regulating the senses, and slay this destroyer of knowledge and self-realization.',
      difficulty: 'Intermediate'
    },
    {
      id: 42,
      title: 'Gītā 3.42',
      subtitle: 'इन्द्रियाणि पराण्याहुर्',
      devanagari: [
        'इन्द्रियाणि पराण्याहुर्',
        'इन्द्रियेभ्यः परं मनः',
        'मनसस्तु परा बुद्धिर्',
        'यो बुद्धेः परतस्तु सः'
      ],
      roman: [
        'indriyāṇi parāṇy āhur',
        'indriyebhyaḥ paraṁ manaḥ',
        'manasas tu parā buddhir',
        'yo buddheḥ paratas tu saḥ'
      ],
      words: [
        { devanagari: 'इन्द्रियाणि', roman: 'indriyāṇī', meaning: 'senses' },
        { devanagari: 'पराणि', roman: 'parāṇi', meaning: 'superior' },
        { devanagari: 'आहुः', roman: 'āhuḥ', meaning: 'is said' },
        { devanagari: 'इन्द्रियेभ्यः', roman: 'indriyebhyaḥ', meaning: 'more than the senses' },
        { devanagari: 'परम्', roman: 'param', meaning: 'superior' },
        { devanagari: 'मनः', roman: 'manaḥ', meaning: 'the mind' },
        { devanagari: 'मनसः', roman: 'manasaḥ', meaning: 'more than the mind' },
        { devanagari: 'तु', roman: 'tu', meaning: 'also' },
        { devanagari: 'परा', roman: 'parā', meaning: 'superior' },
        { devanagari: 'बुद्धिः', roman: 'buddhiḥ', meaning: 'intelligence' },
        { devanagari: 'यः', roman: 'yaḥ', meaning: 'one which' },
        { devanagari: 'बुद्धेः', roman: 'buddheḥ', meaning: 'more than the intelligence' },
        { devanagari: 'परतः', roman: 'parataḥ', meaning: 'superior' },
        { devanagari: 'तु', roman: 'tu', meaning: 'but' },
        { devanagari: 'सः', roman: 'saḥ', meaning: 'he (the soul)' }
      ],
      meaning: 'The working senses are superior to dull matter; mind is higher than the senses; intelligence is still higher than the mind; and he [the soul] is even higher than the intelligence.',
      difficulty: 'Intermediate'
    },
    {
      id: 43,
      title: 'Gītā 3.43',
      subtitle: 'एवं बुद्धेः परं बुद्ध्वा',
      devanagari: [
        'एवं बुद्धेः परं बुद्ध्वा',
        'संस्तभ्यात्मानमात्मना',
        'जहि शत्रुं महाबाहो',
        'कामरूपं दुरासदम्'
      ],
      roman: [
        'evaṁ buddheḥ paraṁ buddhvā',
        'saṁstabhyātmānam ātmanā',
        'jahi śatruṁ mahā-bāho',
        'kāma-rūpaṁ durāsadam'
      ],
      words: [
        { devanagari: 'एवम्', roman: 'evam', meaning: 'thus' },
        { devanagari: 'बुद्धेः', roman: 'buddheḥ', meaning: 'of intelligence' },
        { devanagari: 'परम्', roman: 'param', meaning: 'superior' },
        { devanagari: 'बुद्ध्वा', roman: 'buddhvā', meaning: 'so knowing' },
        { devanagari: 'संस्तभ्य', roman: 'saṁstabhya', meaning: 'by steadying' },
        { devanagari: 'आत्मानम्', roman: 'ātmānam', meaning: 'the mind' },
        { devanagari: 'आत्मना', roman: 'ātmanā', meaning: 'by deliberate intelligence' },
        { devanagari: 'जहि', roman: 'jahi', meaning: 'conquer' },
        { devanagari: 'शत्रुम्', roman: 'śatrum', meaning: 'the enemy' },
        { devanagari: 'महाबाहो', roman: 'mahā-bāho', meaning: 'O mighty-armed one' },
        { devanagari: 'कामरूपम्', roman: 'kāma-rūpam', meaning: 'the form of lust' },
        { devanagari: 'दुरासदम्', roman: 'durāsadam', meaning: 'formidable' }
      ],
      meaning: 'Thus knowing oneself to be transcendental to material senses, mind and intelligence, one should control the lower self by the higher self and thus—by spiritual strength—conquer this insatiable enemy known as lust.',
      difficulty: 'Intermediate'
    }
  ];

  constructor(private audioService: AudioRecordingService) { }

  ngOnInit() {
    // Initialize component
    this.loadSavedRecordings();
  }

  async loadSavedRecordings() {
    try {
      this.savedRecordings = this.audioService.getRecordingsFromLocalStorage();
      console.log('Loaded recordings:', this.savedRecordings.length);
    } catch (error) {
      console.error('Failed to load recordings:', error);
    }
  }

  // Mode selection
  selectMode(mode: string) {
    this.selectedMode = mode;
    // Reset practice state when switching modes
    this.practiceResult = null;
    this.isRecording = false;
    console.log('Selected mode:', mode);
  }

  // Sloka selection
  selectSloka(slokaId: number) {
    this.selectedSloka = this.availableSlokas.find(s => s.id === slokaId) || null;
    if (this.selectedSloka) {
      // Automatically start with guided mode for immediate training
      this.selectedMode = 'guided';
      this.generateKramaSequence();
      console.log('Selected sloka:', this.selectedSloka.title, 'Starting guided mode');
    }
  }

  // Generate the Krama sequence for the selected sloka
  generateKramaSequence() {
    if (!this.selectedSloka) return;

    this.kramaSequence = [];
    const words = this.selectedSloka.words;
    let stepId = 1;

    for (let i = 0; i < words.length; i++) {
      // Single word step
      this.kramaSequence.push({
        id: stepId++,
        type: 'single',
        words: [words[i]],
        text: words[i].devanagari,
        roman: words[i].roman,
        instruction: `Recite the word "${words[i].roman}" clearly`,
        completed: false
      });

      // Pair step (if not the last word)
      if (i < words.length - 1) {
        this.kramaSequence.push({
          id: stepId++,
          type: 'pair',
          words: [words[i], words[i + 1]],
          text: `${words[i].devanagari} ${words[i + 1].devanagari}`,
          roman: `${words[i].roman} ${words[i + 1].roman}`,
          instruction: `Combine "${words[i].roman}" with "${words[i + 1].roman}"`,
          completed: false
        });
      }
    }

    this.totalSteps = this.kramaSequence.length;
    this.currentStep = 0;
  }

  // Get current step information
  getCurrentStepType(): string {
    if (!this.kramaSequence[this.currentStep]) return '';
    return this.kramaSequence[this.currentStep].type;
  }

  getStepIcon(): string {
    const stepType = this.getCurrentStepType();
    return stepType === 'single' ? 'radio-button-on-outline' : 'link-outline';
  }

  getStepTypeText(): string {
    const stepType = this.getCurrentStepType();
    return stepType === 'single' ? 'Single Word' : 'Word Pair';
  }

  getCurrentInstruction(): string {
    if (!this.kramaSequence[this.currentStep]) return '';
    return this.kramaSequence[this.currentStep].instruction;
  }

  getCurrentRecitationText(): string {
    if (!this.kramaSequence[this.currentStep]) return '';
    return this.kramaSequence[this.currentStep].text;
  }

  getCurrentRecitationRoman(): string {
    if (!this.kramaSequence[this.currentStep]) return '';
    return this.kramaSequence[this.currentStep].roman;
  }

  shouldShowWordHighlight(): boolean {
    return this.getCurrentStepType() === 'pair';
  }

  getHighlightedWords(): string {
    if (!this.kramaSequence[this.currentStep] || this.getCurrentStepType() !== 'pair') return '';
    const step = this.kramaSequence[this.currentStep];
    return step.words.map(w => w.roman).join(' + ');
  }

  // Progress calculation
  get progressPercentage(): number {
    if (this.totalSteps === 0) return 0;
    return Math.round((this.currentStep / this.totalSteps) * 100);
  }

  // Audio controls
  playCurrentStep() {
    console.log('Playing current step:', this.currentStep);
    // Simulate audio playback
    this.simulateAudioPlayback();
  }

  playSlowly() {
    console.log('Playing slowly:', this.currentStep);
    // Simulate slow audio playback
    this.simulateAudioPlayback(true);
  }

  private simulateAudioPlayback(slow: boolean = false) {
    const speed = slow ? 'slowly' : 'normally';
    console.log(`Playing ${speed}:`, this.getCurrentRecitationText());
    // In a real app, this would trigger actual audio playback
  }

  // Recording functionality
  async startRecording() {
    if (this.isRecording) return;
    
    try {
      this.isRecording = true;
      this.recordingStartTime = Date.now();
      
      const success = await this.audioService.startRecording();
      if (!success) {
        this.isRecording = false;
        return;
      }
      
      console.log('Started recording for step:', this.currentStep + 1);
      
      // Auto-stop after 30 seconds for safety
      setTimeout(() => {
        if (this.isRecording) {
          this.stopRecording();
        }
      }, 30000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      this.isRecording = false;
      alert('Failed to start recording. Please check microphone permissions.');
    }
  }

  async stopRecording() {
    if (!this.isRecording) return;
    
    try {
      const audioBlob = await this.audioService.stopRecording();
      this.isRecording = false;
      
      if (!audioBlob || audioBlob.size === 0) {
        console.error('No audio data recorded');
        alert('No audio was recorded. Please try again.');
        return;
      }
      
      const duration = Date.now() - this.recordingStartTime;
      console.log('Recording completed. Duration:', duration, 'ms, Size:', audioBlob.size, 'bytes');
      
      // Save the recording
      await this.saveRecording(audioBlob, duration);
      
      // Evaluate the practice
      this.evaluatePractice();
      
    } catch (error) {
      console.error('Error stopping recording:', error);
      this.isRecording = false;
      alert('Failed to save recording. Please try again.');
    }
  }

  private async saveRecording(audioBlob: Blob, duration: number) {
    if (!this.selectedSloka) return;
    
    try {
      const recording: Omit<AudioRecording, 'id'> = {
        slokaId: this.selectedSloka.id,
        stepNumber: this.currentStep + 1,
        timestamp: Date.now(),
        duration: duration,
        audioBlob: audioBlob,
        mode: this.selectedMode || 'guided'
      };
      
      this.currentRecordingId = await this.audioService.saveRecording(recording);
      console.log('Recording saved with ID:', this.currentRecordingId);
      
      // Reload the recordings list
      await this.loadSavedRecordings();
      
    } catch (error) {
      console.error('Failed to save recording:', error);
      throw error;
    }
  }

  private evaluatePractice() {
    // Simulate random evaluation for demo
    const results: PracticeResult[] = [
      {
        level: 'excellent',
        title: 'Excellent!',
        message: 'Perfect pronunciation and timing. You can proceed to the next step.',
        accuracy: 95
      },
      {
        level: 'good',
        title: 'Good work!',
        message: 'Good pronunciation. Try to focus on the word transitions.',
        accuracy: 85
      },
      {
        level: 'needs-work',
        title: 'Needs practice',
        message: 'Practice the pronunciation a bit more before moving on.',
        accuracy: 70
      }
    ];

    const randomResult = results[Math.floor(Math.random() * results.length)];
    this.practiceResult = randomResult;
    this.accuracy = randomResult.accuracy;
  }

  getFeedbackIcon(): string {
    if (!this.practiceResult) return 'help-outline';
    
    switch (this.practiceResult.level) {
      case 'excellent': return 'checkmark-circle-outline';
      case 'good': return 'thumbs-up-outline';
      case 'needs-work': return 'refresh-outline';
      default: return 'help-outline';
    }
  }

  // Navigation
  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.practiceResult = null;
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      // Mark current step as completed
      this.kramaSequence[this.currentStep].completed = true;
      this.currentStep++;
      this.practiceResult = null;
      
      // Auto-generate practice result for guided mode to keep flow going
      if (this.selectedMode === 'guided') {
        setTimeout(() => {
          this.generateAutoFeedback();
        }, 500);
      }
    }
  }

  private generateAutoFeedback() {
    // For guided mode, provide encouraging feedback automatically
    const feedbacks = [
      {
        level: 'excellent' as const,
        title: 'Excellent Progress!',
        message: 'Great job following the Krama pattern. Continue to the next step.',
        accuracy: 95
      },
      {
        level: 'good' as const,
        title: 'Well Done!',
        message: 'You\'re getting the rhythm. Keep practicing the transitions.',
        accuracy: 88
      }
    ];
    
    const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
    this.practiceResult = randomFeedback;
    this.accuracy = randomFeedback.accuracy;
  }

  goToStep(stepIndex: number) {
    if (stepIndex >= 0 && stepIndex < this.totalSteps) {
      this.currentStep = stepIndex;
      this.practiceResult = null;
    }
  }

  canProceedToNext(): boolean {
    return this.currentStep < this.totalSteps - 1;
  }

  retryStep() {
    this.practiceResult = null;
  }

  // Test method for easier navigation
  completeCurrentStep() {
    this.practiceResult = {
      level: 'excellent',
      title: 'Perfect!',
      message: 'Step completed successfully. Moving to next step.',
      accuracy: 95
    };
    this.accuracy = 95;
  }

  // Recording management methods
  async playRecording(recordingId: string) {
    try {
      const recordings = await this.audioService.getAllRecordings();
      const recording = recordings.find(r => r.id === recordingId);
      
      if (recording) {
        const audioUrl = this.audioService.createAudioUrl(recording.audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          this.audioService.releaseAudioUrl(audioUrl);
        };
        
        audio.play();
        console.log('Playing recording:', recordingId);
      }
    } catch (error) {
      console.error('Failed to play recording:', error);
    }
  }

  async deleteRecording(recordingId: string) {
    try {
      const success = await this.audioService.deleteRecording(recordingId);
      if (success) {
        await this.loadSavedRecordings();
        console.log('Recording deleted:', recordingId);
      }
    } catch (error) {
      console.error('Failed to delete recording:', error);
    }
  }

  // Get recordings for current step
  getCurrentStepRecordings() {
    if (!this.selectedSloka) return [];
    
    return this.savedRecordings.filter(r => 
      r.slokaId === this.selectedSloka!.id && 
      r.stepNumber === this.currentStep + 1
    );
  }

  // Format duration for display
  formatDuration(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${seconds}s`;
  }

  // Format file size for display
  formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  // Get total recordings count for current sloka
  getCurrentSlokaRecordingsCount(): number {
    if (!this.selectedSloka) return 0;
    
    return this.savedRecordings.filter(r => 
      r.slokaId === this.selectedSloka!.id
    ).length;
  }

  // Completion checking
  isSequenceCompleted(): boolean {
    return this.currentStep >= this.totalSteps - 1 && 
           this.kramaSequence.every(step => step.completed);
  }

  // Completion actions
  practiceFullSequence() {
    console.log('Practicing full sequence');
    // Implement full sequence practice
  }

  earnMasteryBadge() {
    console.log('Earning mastery badge');
    // Implement badge earning logic
  }

  selectNewSloka() {
    this.selectedSloka = null;
    this.selectedMode = null;
    this.currentStep = 0;
    this.kramaSequence = [];
    this.practiceResult = null;
  }

  // Helper methods for template
  getDifficultyStars(difficulty: string): number[] {
    const starCount = difficulty === 'Beginner' ? 1 : 
                     difficulty === 'Intermediate' ? 2 : 3;
    return Array(starCount).fill(0);
  }

  getKramaStepCount(sloka: Sloka): number {
    // Krama steps = (word count * 2) - 1
    // Each word gets a single step, plus pair steps between adjacent words
    return (sloka.words.length * 2) - 1;
  }
}
