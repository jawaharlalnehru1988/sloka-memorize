import { Injectable } from '@angular/core';

export interface Line {
  devanagari: string;
  roman: string;
  meaning: string;
  attempts: ('success' | 'good' | 'failed')[];
  successfulAttempts: number;
  mastered: boolean;
  audio?: string;
}

export interface VakyaPadaSloka {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  lines: Line[];
}

@Injectable({
  providedIn: 'root'
})
export class Vakyapda {
   vakyaPadaSlokas: VakyaPadaSloka[] = [
    {
      id: 1,
      title: 'Gītā 1.1',
      subtitle: 'த்ருத்தராஷ்ட்ர உவாச',
      description: 'Dhritarashtra inquires about the activities of both armies on the battlefield of Kurukshetra.',
      lines: [
        {
          devanagari: 'த்ருத்தராஷ்ட்ர உவாச',
          roman: 'dhṛtarāṣṭra uvāca',
          meaning: 'திருதராஷ்ட்டிரர் கூறினார்:',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        },
        {
          devanagari: 'தர்ம க்ஷேத்ரே குருக்ஷேத்ரே ஸமவேதா யுயுத்ஸவ:',
          roman: 'dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ',
          meaning: 'புண்ணிய யாத்திரைத் தலமான குருக்ஷேத்திரத்தில் போர் புரிய விருப்பம் கொண்டு ஒன்று கூடிய பிறகு',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        },
        {
          devanagari: 'மாமகா: பாண்டவாஸ் சைவ கிமகுர்வத சஞ்ஜய',
          roman: 'māmakāḥ pāṇḍavāś caiva kim akurvata sañjaya',
          meaning: 'என் மகன்களும், பாண்டுவின் புதல்வரும் என்ன செய்தனர் சஞ்ஜயனே?',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        }
      ]
    },
    {
      id: 2,
      title: 'Gītā 1.2',
      subtitle: 'சஞ்ஜய உவாச',
      description: 'Sañjaya describes Duryodhana’s reaction upon seeing the Pandava army arranged in military formation.',
      lines: [
        {
          devanagari: 'சஞ்ஜய உவாச',
          roman: 'sañjaya uvāca',
          meaning: 'சஞ்ஜயன் கூறினான்:',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        },
        {
          devanagari: 'த்ருஷ்ட்வா து பாண்டவானீகம் வ்யூடம் துர்யோதனஸ் ததா',
          roman: 'dṛṣṭvā tu pāṇḍavānīkam vyūḍham duryodhanas tathā',
          meaning: 'பாண்டுவின் புதல்வரால் அணிவகுக்கப்பட்ட படையை மேற்பார்வையிட்ட பிறகு',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        },
        {
          devanagari: 'ஆசார்யம் உபஸங்கம்ய ராஜா வசனம் அப்ரவீத்',
          roman: 'ācāryam upasaṅgamya rājā vacanam abravīt',
          meaning: 'மன்னன் துரியோதனன் தன் ஆசிரியரை அணுகிப் பின்வருமாறு பேசலானான்:',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        }
      ]
    },
    {
      id: 3,
      title: 'Gītā 1.3',
      subtitle: 'சஞ்ஜய உவாச',
      description: 'Sañjaya points out the Pandava army arranged by Dhrishtadyumna, the son of Drupada.',
      lines: [
        {
          devanagari: 'பஷ்யைதாம் பாண்டு புத்ராணாம் ஆசார்ய மஹதீம் சமூம்',
          roman: 'paśyaitāṁ pāṇḍu-putrāṇām ācārya mahatīṁ camūm',
          meaning: 'ஆசிரியரே, பாண்டுபுத்திரரின் சிறந்த சேனையைப் பாருங்கள்.',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        },
        {
          devanagari: 'வ்யூடாம் த்ருபத புத்ரேண தவ சிஷ்யேண தீமதா',
          roman: 'vyūḍhāṁ drupada-putreṇa tava śiṣyeṇa dhīmatā',
          meaning: 'துருபத குமாரனான உங்கள் சீடனால் மிகத் திறமையாக அணிவகுக்கப்பட்ட.',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        }
      ]
    },
    {
      id: 4,
      title: 'Gītā 1.4',
      subtitle: 'சஞ்ஜய உவாச',
      description: 'Sañjaya lists the great bowmen equal to Bhīma and Arjuna, including Yuyudhāna, Virāṭa, and Drupada.',
      lines: [
        {
          devanagari: 'அத்ர சூரா மஹேஷ்வாஸா பீமார்ஜுன ஸமா யுதி',
          roman: 'atra śūrā maheṣvāsā bhīmārjuna-samā yudhi',
          meaning: 'இதோ இந்த சேனையில் பீமனுக்கும் அர்ஜுனனுக்கும் சமமான வீரமிகு வில்லாளிகள், பலரும் இருக்கின்றனர்.',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        },
        {
          devanagari: 'யுயுதானோ விராடஸ் ச த்ருபதஸ் ச மஹாரத:',
          roman: 'yuyudhāno virāṭaś ca drupadaś ca mahārathaḥ',
          meaning: 'யுயுதானன், விராடன், துருபதன் போன்ற சிறந்த மஹாரதர்களும் இருக்கின்றனர்.',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        }
      ]
    },
    {
  id: 5,
  title: 'Gītā 1.5',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Sañjaya continues listing the heroic leaders in the Pandava army such as Dhrishtaketu, Cekitana, Kāśirāja, Purujit, Kuntibhoja, and Śaibya.',
  lines: [
    {
      devanagari: 'த்ருஷ்டகேது: சேகிதான: காசிராஜஸ் ச வீர்யவான்',
      roman: 'dṛṣṭaketuś cekitānaḥ kāśirājas ca vīryavān',
      meaning: 'த்ருஷ்டகேது, சேகிதானன், காசிராஜன் ஆகிய வீரர்கள் உள்ளனர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'புருஜித் குந்திபோஜஸ் ச ஷைப்யஸ் ச நரபுங்கவ:',
      roman: 'purujit kuntibhojaś ca śaibyaś ca nara-puṅgavaḥ',
      meaning: 'புருஜித், குந்திபோஜன், ஷைப்யன் போன்ற சிறந்த, பலமிக்க போர் நாயகர்களும் இருக்கின்றனர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 6,
  title: 'Gītā 1.6',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Sañjaya names other mighty warriors like Yudhāmanyu, Uttamaujā, Abhimanyu (son of Subhadrā), and the sons of Draupadī.',
  lines: [
    {
      devanagari: 'யுதாமன்யுஸ் ச விக்ராந்த உத்தமெளஜாஸ் ச வீர்யவான்',
      roman: 'yudhāmanyuś ca vikrānta uttamaujāś ca vīryavān',
      meaning: 'வீரனான யுதாமன்யு, பலமிக்க உத்தமௌஜன் இருக்கின்றனர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஸெளபத்ரோ த்ரௌபதேயாஸ் ச ஸர்வ ஏவ மஹாரதா:',
      roman: 'saubhadro draupadeyāś ca sarva eva mahā-rathāḥ',
      meaning: 'சுபத்ரையின் புதல்வன் அபிமன்யு, திரௌபதியின் குமாரர்கள்—இவர்களும் இருக்கின்றனர். இவர்கள் எல்லோருமே சிறந்த ரதப்போர் வீரர்கள்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 7,
  title: 'Gītā 1.7',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Sañjaya now begins listing the great leaders on the Kaurava side as instructed by Duryodhana.',
  lines: [
    {
      devanagari: 'அஸ்மாகம் து விசிஷ்டா யே தான்னிபோத த்விஜோத்தம',
      roman: 'asmākaṁ tu viśiṣṭā ye tān nibodha dvijottama',
      meaning: 'அந்தணரில் சிறந்தவரே, எங்கள் பக்கம் விசேஷமாகத் திகழும் தலைவர்களை கேளுங்கள்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'நாயகா மம ஸைன்யஸ்ய ஸம்க்ஞார்த்தம் தான் ப்ரவீமி தே',
      roman: 'nāyakā mama sainyasya saṁjñārtham tān bravīmi te',
      meaning: 'எனது சேனையை நடத்தும் தகுதியான தலைவர்களை, நீர் அறியும்படிக் கூறுகின்றேன்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 8,
  title: 'Gītā 1.8',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Sañjaya lists the mighty warriors on the Kaurava side such as Bhīṣma, Karṇa, Kṛpa, Aśvatthāmā, Vikarṇa, and Bhūriśravā (the son of Somadatta).',
  lines: [
    {
      devanagari: 'பவான் பீஷ்மஸ் ச கர்ணஸ் ச க்ருபஸ் ச ஸமிதிஞ்ஜய:',
      roman: 'bhavān bhīṣmaś ca karṇaś ca kṛpaś ca samitiñjayaḥ',
      meaning: 'எப்போதும் போரில் வெற்றிகாண்பவரான தாங்களும், பீஷ்மர், கர்ணன், கிருபர் உள்ளனர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'அஸ்வத்தாமா விகர்ணஸ் ச சௌமதத்திஸ: ததைவ ச',
      roman: 'aśvatthāmā vikarṇaś ca saumadattis tathaiva ca',
      meaning: 'அஸ்வத்தாமன், விகர்ணன், சோமதத்தனின் குமாரன் பூரி-ஷ்ரவஸ் போன்ற பெரும் வீரரும் இருக்கின்றனர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 9,
  title: 'Gītā 1.9',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Sañjaya adds that countless other warriors are also present, ready to give up their lives for Duryodhana, all armed with various weapons and skilled in battle.',
  lines: [
    {
      devanagari: 'அன்யே ச பஹவ: ஸூரா மதர்த்தே த்யக்த ஜீவிதா:',
      roman: 'anye ca bahavaḥ śūrā mad-arthe tyakta-jīvitāḥ',
      meaning: 'எனக்காக உயிரையும் கொடுக்கக்கூடிய எண்ணற்ற வீரர்கள் பிறரும் உள்ளனர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'நாநா ஷஸ்த்ர ப்ரஹரணா: ஸர்வே யுத்த விஷாரதா:',
      roman: 'nānā-śastra-praharaṇāḥ sarve yuddha-viśāradāḥ',
      meaning: 'அவர்கள் எல்லோருமே பலவிதமான ஆயுதங்களை உடையவர்களாயும், போர்க்கலையில் மிகத் தேர்ந்தவர்களாயும் இருக்கின்றனர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 10,
  title: 'Gītā 1.10',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Duryodhana declares that his army, protected by Bhīṣma, is unlimited, whereas the Pandava army, protected by Bhīma, is limited.',
  lines: [
    {
      devanagari: 'அபர்யாப்தம் ததஸ்மாகம் பலம் பீஷ்மாபிரக்ஷிதம்',
      roman: 'aparyāptaṁ tad asmākaṁ balaṁ bhīṣmābhirakṣitam',
      meaning: 'பாட்டனார் பீஷ்மரால் பாதுகாக்கப்பட்ட நமது பலம் கணக்கிலடங்காதது.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'பர்யாப்தம் த்விதமே தேஷாம் பலம் பீமாபிரக்ஷிதம்',
      roman: 'paryāptaṁ tvidam eteṣāṁ balaṁ bhīmābhirakṣitam',
      meaning: 'ஆனால் பீமனால் கவனமாய்ப் பாதுகாக்கப்பட்ட பாண்டவ சேனையோ அளவிடக் கூடியதாக இருக்கின்றது.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 11,
  title: 'Gītā 1.11',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Duryodhana instructs all the warriors to give full protection to Bhīṣma while stationed in their respective battle positions.',
  lines: [
    {
      devanagari: 'அயனேஷு ச ஸர்வேஷு யதா பாகம் அவஸ்திதா:',
      roman: 'ayaneṣu ca sarveṣu yathā-bhāgam avasthitāḥ',
      meaning: 'படை அணிவகுப்பின் முக்கியமான போர்முனை நிலைகளில் இருந்துகொண்டு,',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'பீஷ்மமேவாபி ரக்ஷந்து பவந்த: ஸர்வ ஏவ ஹி',
      roman: 'bhīṣmam evābhirakṣantu bhavantaḥ sarva eva hi',
      meaning: 'நீங்களெல்லோரும் பாட்டனார் பீஷ்மருக்குப் பாதுகாப்புக் கொடுப்பீர்களாக.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 12,
  title: 'Gītā 1.12',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Then Bhīṣma, the grandsire and elder of the Kurus, blew his conch loudly like a lion’s roar, bringing joy to Duryodhana.',
  lines: [
    {
      devanagari: 'தஸ்ய ஸஞ்ஜனயன் ஹர்ஷம் குருவ்ருத்த: பிதாமஹ:',
      roman: 'tasya sañjanayan harṣaṁ kuru-vṛddhaḥ pitāmahaḥ',
      meaning: 'குருவம்சத்தின் பெருவீர முதியவரும், பாட்டனாருமான பீஷ்மர், துரியோதனனுக்கு மகிழ்வைக் கொடுத்தார்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஸிம்ஹநாதம் வினத்யோச்சை: சங்கம் தத்மௌ ப்ரதாபவான்',
      roman: 'siṁhanādaṁ vinadyochchaiḥ śaṅkhaṁ dadhmau pratāpavān',
      meaning: 'அவர் சிங்க கர்ஜனைபோல் உரக்க தனது சங்கை ஊதினார்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 13,
  title: 'Gītā 1.13',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Conches, kettledrums, tabors, drums, and cow-horns resound all at once, creating an uproar.',
  lines: [
    {
      devanagari: 'தத: ஷங்காஸ் ச பேர்யஸ் ச பணவானக கோமுகா:',
      roman: 'tataḥ śaṅkhāś ca bheryaś ca paṇavānaka-gomukhāḥ',
      meaning: 'அதன்பின் சங்குகள், குழல்கள், முரசுகள், பறைகள், கொம்புகள்—இவை எல்லாம்,',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஸஹஸைவாப்யஹந்யந்த ஸ ஷப்தஸ்துமுலோऽபவத்',
      roman: 'sahasaivābhyahanyanta sa śabdas tumulo ’bhavat',
      meaning: 'ஒரே சமயத்தில் முழக்கப்பட, அவ்வதிர்வு பேரொலியை எழுப்பியது.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 14,
  title: 'Gītā 1.14',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'On a magnificent chariot yoked with white horses, Mādhava (Krishna) and Pāṇḍava (Arjuna) blow their divine conches.',
  lines: [
    {
      devanagari: 'தத: ஸ்வேதைர் ஹயைர்யுக்தே மஹதி ஸ்யந்தனே ஸ்திதௌ',
      roman: 'tataḥ śvetair hayair yukte mahati syandane sthitau',
      meaning: 'வெண்புரவிகள் பூட்டிய மிகச் சிறந்த ரதத்தில் அமர்ந்திருந்தார்—',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'மாதவ: பாண்டவஷ்சைவ திவ்யௌ ஷங்கௌ ப்ரதத்மது:',
      roman: 'mādhavaḥ pāṇḍavaś caiva divyau śaṅkhau pradadhmatuḥ',
      meaning: 'பகவான் ஸ்ரீகிருஷ்ணரும் அர்ஜுனனும் தங்கள் தெய்வீக சங்குகளை முழக்கினர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 15,
  title: 'Gītā 1.15',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Krishna blows Pāñcajanya, Arjuna Devadatta, and mighty Bhīma the great conch Pauṇḍra.',
  lines: [
    {
      devanagari: 'பாஞ்ச்சஜன்யம் ஹ்ருஷீகேஷோ தேவதத்தம் தனஞ்சய:',
      roman: 'pāñcajanyaṁ hṛṣīkeśo devadattaṁ dhanañjayaḥ',
      meaning: 'ஹ்ருஷீகேஷனான ஸ்ரீகிருஷ்ணர் பாஞ்ச்சஜன்யத்தை; அர்ஜுனன் தேவதத்தத்தை முழக்கினார்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'பெளண்ட்ரம் தத்மௌ மஹாஷங்கம் பீமகர்மா வ்ருகோதர:',
      roman: 'pauṇḍraṁ dadhmau mahāśaṅkhaṁ bhīma-karmā vṛkodaraḥ',
      meaning: 'பெருந்தீனிக்காரனும் வீரசாகசி யுமான பீமன் பெளண்ட்ரமெனும் மஹா-சங்கத்தை ஊதினார்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 16,
  title: 'Gītā 1.16–18 (part 1)',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Yudhiṣṭhira, Nakula, Sahadeva, and other foremost warriors on the Pāṇḍava side blow their conches.',
  lines: [
    {
      devanagari: 'அனந்த விஜயம் ராஜா குந்தீ புத்ரோ யுதிஷ்டிர:',
      roman: 'ananta-vijayaṁ rājā kuntī-putro yudhiṣṭhiraḥ',
      meaning: 'குந்தியின் புதல்வனான மன்னன் யுதிஷ்டிரன் “அநந்தவிஜயம்” எனும் சங்கத்தை ஊதினார்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'நகுல: ஸஹதேவஷ்ச ஸுகோஷ மணிபுஷ்பகௌ',
      roman: 'nakulaḥ sahadevaś ca sughoṣa-maṇipuṣpakau',
      meaning: 'நகுலனும் ஸஹதேவனும் “ஸுகோஷ”, “மணிபுஷ்பக” எனும் சங்கங்களை ஊதினர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 17,
  title: 'Gītā 1.16–18 (part 2)',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Kāśirāja, Śikhaṇḍī, Dhṛṣṭadyumna, Virāṭa, and the unconquered Sātyaki also sound their conches.',
  lines: [
    {
      devanagari: 'காஸ்யஷ்ச பரமேஷ்வாச: ஷிகண்டீ ச மஹாரத:',
      roman: 'kāśyaś ca parameṣvāsaḥ śikhaṇḍī ca mahārathaḥ',
      meaning: 'பெரும் வில்லாளியான காசிராஜன், மஹாரதரான சிகண்டியும்,',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'த்ருஷ்டத்யும்னோ விராடஷ்ச ஸாத்யகிஷ்சாபராஜித:',
      roman: 'dhṛṣṭadyumno virāṭaś ca sātyakiś cāparājitaḥ',
      meaning: 'த்ருஷ்டத்யும்னன், விராடன், வெற்றி கொள்ளப்படாத ஸாத்யகியும் தங்கள் சங்கங்களை ஊதினர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 18,
  title: 'Gītā 1.16–18 (part 3)',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Drupada, the sons of Draupadī, and Abhimanyu (son of Subhadrā) blow their conches separately.',
  lines: [
    {
      devanagari: 'த்ருபதோ த்ரௌபதேயாஷ்ச ஸர்வஷ: ப்ருதிவீபதே',
      roman: 'drupado draupadeyāś ca sarvaśaḥ pṛthivī-pate',
      meaning: 'துருபதன், திரௌபதியின் புதல்வர்கள்—ஓ மன்னா—அவர்களெல்லாம்,',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஸௌபத்ரஷ்ச மஹாபாஹு: ஷங்காந் தத்மு: ப்ருதக் ப்ருதக்',
      roman: 'saubhadraś ca mahā-bāhuḥ śaṅkhān dadhmuḥ pṛthak pṛthak',
      meaning: 'பெரும் புயல்கைகள் உடைய அபிமன்யுவும் தத்தம் சங்குகளைத் தனித்தனியாக ஊதினர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 19,
  title: 'Gītā 1.19',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'The terrific sound echoes through earth and sky, tearing the hearts of Dhṛtarāṣṭra’s sons.',
  lines: [
    {
      devanagari: 'ஸ கோஷோ தார்த்தராஷ்ட்ராணாம் ஹ்ருதயானி வ்யதாரயத்',
      roman: 'sa goṣo dhārtarāṣṭrāṇāṁ hṛdayāni vyadārayat',
      meaning: 'அந்த பேரொலி திருதராஷ்டிரரின் மகன்களின் இதயங்களைச் சிதறடித்தது.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'நபஷ்ச ப்ருதிவீம் சைவ துமுலோऽப்யனுநாதயன்',
      roman: 'nabhaś ca pṛthivīṁ caiva tumulo ’bhy-anunādayan',
      meaning: 'அது வானமும் பூமியும் நடுங்குமாறு எதிரொலித்தது.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 20,
  title: 'Gītā 1.20',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Seeing the Kauravas arrayed, Arjuna (with the Hanuman-banner) lifts his bow and addresses Hṛṣīkeśa (Krishna).',
  lines: [
    {
      devanagari: 'அத வையவஸ்திதான் த்ருஷ்ட்வா தார்த்தராஷ்ட்ரான் கபித்வஜ:',
      roman: 'atha vyavasthitān dṛṣṭvā dhārtarāṣṭrān kapidhvajaḥ',
      meaning: 'அந்த நேரத்தில், ஹனுமான் கொடியை உடைய அர்ஜுனன், திருதராஷ்டிரரின் மகன்களை அணிவகுத்ததைக் கண்டு,',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ப்ரவ்ருத்தே ஷஸ்த்ரஸம்பாதே தனுருத்யம்ய பாண்டவ:',
      roman: 'pravṛtte śastra-sampāte dhanur udyamya pāṇḍavaḥ',
      meaning: 'போர் தொடங்கத் தயாராக வில்லை உயர்த்தி,',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஹ்ருஷீகேஷம் ததா வாக்யமிதம் ஆஹ மஹீபதே',
      roman: 'hṛṣīkeśaṁ tadā vākyam idaṁ āha mahī-pate',
      meaning: 'ரிஷிகேசனான ஸ்ரீகிருஷ்ணரை நோக்கிப் பின்வருமாறு கூறினான், அரசே.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 21,
  title: 'Gītā 1.21–22',
  subtitle: 'அர்ஜுன உவாச',
  description: 'Arjuna requests Krishna to place his chariot between the two armies so he can see with whom he must fight.',
  lines: [
    {
      devanagari: 'ஸேனயோருபயோர்மத்யே ரதம் ஸ்தாபய மேச்யுத',
      roman: 'senayor ubhayor madhye rathaṁ sthāpaya me ’cyuta',
      meaning: 'அழிவற்றவரே! இரு படைகளின் நடுவே எனது தேரை நிறுத்துவீராக.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'யாவதேதான் நிரீக்ஷேஹம் யோத்துகாமான் அவஸ்திதான்',
      roman: 'yāvad etān nirīkṣe ’haṁ yoddhu-kāmān avasthitān',
      meaning: 'போர்புரியும் ஆவலுடையவர்களை நான் பார்க்கட்டும்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'கைர்மயா ஸஹ யோத்தவ்யம் அஸ்மின் ரண ஸமுத்யமே',
      roman: 'kair mayā saha yoddhavyam asmin raṇa-samudyame',
      meaning: 'இந்தப் பெரும் போரில் நான் எவரோடு பொருந்த வேண்டும் என்று அறியட்டும்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 22,
  title: 'Gītā 1.23',
  subtitle: 'அர்ஜுன உவாச',
  description: 'Arjuna wants to see those assembled to fight for the evil-minded Duryodhana’s pleasure.',
  lines: [
    {
      devanagari: 'யோத்ஸ்ய மானான் அவேக்ஷேஹம் ய ஏதேத்ர ஸமாகதா:',
      roman: 'yotsyamānān avekṣe ’haṁ ya ete ’tra samāgatāḥ',
      meaning: 'இங்கு போர்புரிய கூடியவர்களை நான் பார்க்கட்டும்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'தார்த்தராஷ்ட்ரஸ்ய துர்புத்தே: யுத்தே ப்ரியசிகீர்ஷவ:',
      roman: 'dhārtarāṣṭrasya durbuddher yuddhe priyacikīrṣavaḥ',
      meaning: 'திருதராஷ்டிரனின் கெடுமதியுடைய மகன் துரியோதனனை மகிழ்விக்கும் விருப்பமுடையவர்களை பார்க்கட்டும்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 23,
  title: 'Gītā 1.24',
  subtitle: 'ஸஞ்ஜய உவாச',
  description: 'Sañjaya narrates: Hearing Arjuna’s request, Hṛṣīkeśa (Krishna) placed the grand chariot between the two armies.',
  lines: [
    {
      devanagari: 'ஏவமுக்தோ ஹ்ருஷீகேஷோ குடாகேஷேன பாரத',
      roman: 'evam ukto hṛṣīkeśo guḍākeśena bhārata',
      meaning: 'பரத குலத்தவனே, குடாகேசனான அர்ஜுனனால் இவ்வாறு கூறப்பட்ட ஸ்ரீ கிருஷ்ணர்,',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஸேனயோருபயோர் மத்யே ஸ்தாபயித்வா ரதோத்தமம்',
      roman: 'senayor ubhayor madhye sthāpayitvā rathottamam',
      meaning: 'இரு படைகளின் நடுவே மிகச் சிறந்த ரதத்தை நிறுத்தினார்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 24,
  title: 'Gītā 1.25',
  subtitle: 'ஸஞ்ஜய உவாச',
  description: 'Krishna stops the chariot in front of Bhīṣma, Droṇa, and other kings, and tells Arjuna to behold the Kurus assembled.',
  lines: [
    {
      devanagari: 'பீஷ்மத்ரோண ப்ரமுகத: ஸர்வேஷாம் ச மஹீக்ஷிதாம்',
      roman: 'bhīṣma-droṇa-pramukhataḥ sarveṣāṁ ca mahī-kṣitām',
      meaning: 'பீஷ்மர், துரோணர் மற்றும் பல உலகத் தலைவர்களின் முன்னிலையில்,',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'உவாச பார்த்த பஷ்யைதான் ஸமவேதான் குரூநிதி',
      roman: 'uvāca pārtha paśyaitān samavetān kurūn iti',
      meaning: '“பார்த்தா, இங்கு கூடியிருக்கும் குருவம்சத்தினரைப் பார்” என்று கூறினார்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 25,
  title: 'Gītā 1.26',
  subtitle: 'ஸஞ்ஜய உவாச',
  description: 'Arjuna beholds fathers, grandfathers, teachers, uncles, brothers, sons, grandsons, friends, and well-wishers on both sides.',
  lines: [
    {
      devanagari: 'தத்ராபஷ்ய ஸ்திதான் பார்த்த: பித்ருனத பிதாமஹான்',
      roman: 'tatrāpaśyat sthitān pārthaḥ pitṝn atha pitāmahān',
      meaning: 'அர்ஜுனன் அங்கு தந்தைமாரும் பாட்டனார்களும் இருப்பதை கண்டான்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஆசார்யான் மாதுலாந் ப்ராத்ருன் புத்ராந் பௌத்ராந் ஸகீன் ததா',
      roman: 'ācāryān mātulān bhrātṝn putrān pautrān sakhīṁs tathā',
      meaning: 'ஆசிரியர்கள், மாமாக்கள், சகோதரர்கள், மகன்கள், பேரன்கள், நண்பர்கள் ஆகியோரும் இருந்தனர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஸ்வசஸுராந் ஸுஹ்ருதஷ்சைவ ஸேனயோருபயோரபி',
      roman: 'śvaśurān suhṛdaś caiva senayor ubhayor api',
      meaning: 'மாமனார்களும் நன்மை விரும்பிகளும் இருதரப்புச் சேனைகளிலும் கூடியிருந்தனர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 26,
  title: 'Gītā 1.27',
  subtitle: 'சஞ்ஜய உவாச',
  description: 'Overwhelmed with compassion, Arjuna speaks sorrowfully after seeing all his relatives and friends assembled.',
  lines: [
    {
      devanagari: 'தான் ஸமீக்ஷ்ய ஸ கெளந்தேய: ஸர்வான் பந்தூன் அவஸ்திதான்',
      roman: 'tān samīkṣya sa kaunteyaḥ sarvān bandhūn avasthitān',
      meaning: 'அந்த நண்பர்களையும், உறவினர்களையும் கண்டு குந்திமகனான அர்ஜுனன்,',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'க்ருபயா பரயாவிஷ்டோ விஷீதன்னிதம் அப்ரவீத்',
      roman: 'kṛipayā parayāviṣṭo viṣīdann idam abravīt',
      meaning: 'பரிவால் நிறைந்து, துயருற்று இவ்வாறு கூறினான்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 27,
  title: 'Gītā 1.28',
  subtitle: 'அர்ஜுன உவாச',
  description: 'Arjuna expresses his sorrow to Krishna, saying his limbs tremble and mouth dries seeing his kinsmen eager for battle.',
  lines: [
    {
      devanagari: 'த்ருஷ்டவேமம் ஸ்வஜனம் க்ருஷ்ண யுயுத்ஸும் ஸமுபஸ்திதம்',
      roman: 'dṛṣṭvemaṁ sva-janaṁ kṛṣṇa yuyutsuṁ samupasthitam',
      meaning: 'என் அன்புக்குரிய கிருஷ்ணா, போரிடத் தயாராக கூடியுள்ள உறவினரைப் பார்த்து,',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஸீதந்தி மம காத்ராணி முகம் ச பரிஷுஷ்யதி',
      roman: 'sīdanti mama gātrāṇi mukhaṁ ca pariśuṣyati',
      meaning: 'என் உடல் நடுங்குகின்றது, வாய் உலர்கின்றது.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 28,
  title: 'Gītā 1.29',
  subtitle: 'அர்ஜுன உவாச',
  description: 'Arjuna says his body trembles, hair stands on end, bow slipping from his hand, and skin burning.',
  lines: [
    {
      devanagari: 'வேபதுஸ் ச ஷரீரே மே ரோமஹர்ஷஸ் ச ஜாயதே',
      roman: 'vepathuś ca śarīre me roma-harṣaś ca jāyate',
      meaning: 'என் உடல் முழுதும் நடுங்குகின்றது. மயிர் கூச்செறிகின்றது.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'காண்டீவம் ஸ்ரம்ஸதே ஹஸ்தாத் த்வக்சைவ பரிதஹ்யதே',
      roman: 'gāṇḍīvaṁ sraṁsate hastāt tvak caiva paridahyate',
      meaning: 'என் காண்டீபம் கைகளிலிருந்து நழுவுகின்றது, சருமம் எரிகின்றது.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 29,
  title: 'Gītā 1.30',
  subtitle: 'அர்ஜுன உவாச',
  description: 'Arjuna confesses he cannot stand any longer; his mind reels and he sees only evil omens.',
  lines: [
    {
      devanagari: 'ந ச ஷக்னோம்யவஸ்தாதும் ப்ரமதீவ ச மே மன:',
      roman: 'na ca śaknomy avasthātuṁ bhramatīva ca me manaḥ',
      meaning: 'இனியும் இங்கு என்னால் நிற்க முடியவில்லை. என் மனம் குழம்புகின்றது.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'நிமித்தானி ச பஷ்யாமி விபரீதானி கேசவ',
      roman: 'nimittāni ca paśyāmi viparītāni keśava',
      meaning: 'கேசவா, நான் கெட்ட சகுனங்களையே காண்கிறேன்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 30,
  title: 'Gītā 1.31',
  subtitle: 'அர்ஜுன உவாச',
  description: 'Arjuna declares he sees no good in killing his own kinsmen in battle, nor does he desire victory, kingdom, or pleasures.',
  lines: [
    {
      devanagari: 'ந ச ஸ்ரேயோऽனுபஷ்யாமி ஹத்வா ஸ்வஜநமாஹவே',
      roman: 'na ca śreyo ’nupaśyāmi hatvā sva-janam āhave',
      meaning: 'சொந்த உறவினரை இப்போரில் கொல்வதால் என்ன நன்மை வருமென்பதை காணவில்லை.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ந காங்க்ஷே விஜயம் க்ருஷ்ண ந ச ராஜ்யம் ஸுகானி ச',
      roman: 'na kāṅkṣe vijayaṁ kṛṣṇa na ca rājyaṁ sukhāni ca',
      meaning: 'வெற்றியையோ, அரசையோ, இன்பங்களையோ நான் விரும்பவில்லை, கிருஷ்ணா.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 31,
  title: 'Gītā 1.32–35',
  subtitle: 'அர்ஜுன உவாச',
  description: 'Arjuna questions the value of kingdom, pleasures, and life when they require killing one’s own kith and kin; he refuses to fight.',
  lines: [
    {
      devanagari: 'கிம் நோ ராஜ்யேன கோவிந்த கிம் போகை: ஜீவிதேன வா',
      roman: 'kim no rājyena govinda kim bhogaiḥ kim jīvitena vā',
      meaning: 'அரசுகளும், இன்பமும் — ஏன் வாழ்வே கூட யாருக்காய்? (இவற்றுக்கு என்ன நன்மை?)',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஏஷாமர்த்தே காங்க்ஷிதம் நோ ராஜ்யம் போகா: ஸுகானி ச',
      roman: 'eṣām arthe kāṅkṣitaṁ no rājyaṁ bhogaḥ sukhāni ca',
      meaning: 'இவர்கள் காஞ்சித்துச் செய்கின்ற நோக்கத்திற்காக வேண்டிய ராஜ்யமும், ভோகமும், ஆனந்தங்களும் எதற்கு?',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'த இமேவஸ்திதா யுத்தே ப்ராணாம்ஸ் த்யக்த்வா தனானி ச',
      roman: 'te ime vasthitā yuddhe prāṇāṁs tyaktvā dhanāni ca',
      meaning: 'இவர்கள் இவ்வருட்டுப் போரில் தங்களுடைய உயிர்களையும், சொத்துகளையும் தியாகம் செய்ய உபயோகிப்பர்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஆசார்யா: பிதர: புத்ரா: ததைவ ச பிதாமஹா:',
      roman: 'ācāryāḥ pitaraḥ putrāḥ tathāiva ca pitāmahāḥ',
      meaning: 'ஆசார்யர், தந்தைகள், பிள்ளைகள், பிதாமகர்கள் போன்றவர்கள் —',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'மாதுலா: ஸ்வஸுரா: பௌத்ரா: ஸ்யாலா: சம்பந்திஸ்ததா',
      roman: 'mātulāḥ śvaśurāḥ pautrāḥ śyālāḥ sambandhiś ca tathā',
      meaning: 'மாமாக்கள், மாமனார்கள், பேரன்கள், சகோதர்யர் மற்றும் பிற உறவினர்கள்—இவை எல்லாம்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஏதான் ந ஹந்தும் இச்சாமி க்னதோபி மதுஸுதன அபி த்ரைலோக்ய ராஜ்யஸ்ய ஹேதோ: கிம் நு மஹீக்ருதே நிஹத்ய தார்த்தராஷ்ட்ரான் ந: கா ப்ரீதி: ஸ்யாத் ஜனார்தன',
      roman: 'etān na hantum ichchāmi gṛdho ’pi me madhu-sūdana apy atrailokya-rājyasya hetoḥ kim nu mahī-kṛte nihitya dhārtarāṣṭrān na kā prītiḥ syāt janārdana',
      meaning: 'நான் அவற்றைக் கொன்று புகழ், ராஜ்யம் போன்றவற்றிற்காகவே இவர்களை கொல்ல விரும்புவதில்லை — பூமியும் மூவுலகமும் இருந்தாலும், திருதராஷ்ட்ரரின் மகன்களை கொன்றால் எங்களுக்கு எப்படிப் பயன்? நான் அவர்களுடன் யுத்தம் செய்திட விரும்பவில்லை.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 32,
  title: 'Gītā 1.36',
  subtitle: 'அர்ஜுன உவாச',
  description: 'Arjuna argues that killing kinsmen who have sought refuge with him is sinful and cannot bring happiness.',
  lines: [
    {
      devanagari: 'பாபம் ஏவ ஆஸ்ரயேத் அஸ்மான் ஹத்வைதான் ஆததாயின: தஸ்மான்னார்ஹாவயம் ஹந்தும் தார்த்தராஷ்ட்ரான் ஸ்வபாந்தவான் ஸ்வஜனம் ஹி கதம் ஹத்வா ஸுகின: ஸ்யாம மாதவ',
      roman: 'pāpam eva āśraye t asmān hatvaitān ādadhyaina tasmāt nārha vayam hantum dhārtarāṣṭrān sva-pāṇthavān sva-janaṁ hi katham hatvā sukhin bhavāma madhu',
      meaning: 'இவ்வாறு உதயகரியை கொல்லுவதால் நமக்கு பாவம் வரும். திருதராஷ்டிரரின் மகன்களையும் நமதோடும் உறவினரையும் கொன்றால் எப்படி நாங்கள் சுபிதமாகி மகிழ்ச்சியடைவோம்?',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 33,
  title: 'Gītā 1.37',
  subtitle: 'அர்ஜுன உவாச',
  description: 'Arjuna asks why we — knowing the sin in family-destruction — should be driven by greed to commit such crimes.',
  lines: [
    {
      devanagari: 'யத்யப்யேதே ந பஷ்யந்தி லோபோபஹத சேதஸ: குலக்ஷய க்ருதம் தோஷம் மித்ர த்ரோஹே ச பாதகம் கதம் ந க்ஞேயம் அஸ்மாபி: பாபாத் அஸ்மான் நிவர்திதும் குலஷய க்ருதம் தோஷம் ப்ரபஷ்யத்பி: ஜனார்தன',
      roman: 'yad yapy ete na paśyanti lobhopabhṛtāḥ śeṣataḥ kulakṣaya-kṛtam doṣam mitra-trohe ca pāpakam katham na jñeyam asmābhiḥ pāpāt asmān nivartitum kulakṣaya-kṛtam doṣam prapaśyat pi janārdana',
      meaning: 'ஜனார்தன! பேராசையால் அரிவோரோ இதரர்களின் குடும்பநாசத்தை, துன்பத்தை காணாவிட்டாலும், நாம் ஏன் அவற்றில் ஈடுபட வேண்டும்? நாம் பாவத்தை உணர்ந்தும் அதிலிருந்து விலகமுடியாதால் எப்படி?',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 34,
  title: 'Gītā 1.38',
  subtitle: 'அர்ஜுன உவாச',
  description: 'Arjuna warns that when family virtue is destroyed, the eternal family dharma is lost and adharmic habits prevail.',
  lines: [
    {
      devanagari: 'குலக்ஷயே ப்ரணஸ்யந்தி குலதர்மா: ஸநாதனா தர்மே நஷ்டே குலம் க்ருத்ஸ்னம் அதர்மோபி பவத்யுத.',
      roman: 'kulakṣaye praṇaśyanti kuladharmāḥ sanātanāḥ dharme naśte kulaṁ kṛtsnam adharmo ’bhavati',
      meaning: 'குலம் அழிவதால் நித்தியமான குலவிருதிகள் நாசமடைகின்றன; அறம் நீக்கப்பட்டால் அந்தக் குடும்பத்தில் முழு அறமற்ற தன்மைகள் உருவாகும்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
},
{
  id: 35,
  title: 'Gītā 1.39–1.45',
  subtitle: 'அர்ஜுன உவாச / ஸஞ்ஜய உவாச',
  description: 'Arjuna explains the destructive results of adharma (family-ruin) — loss of family dharma, rise of mixing of castes, hellish consequences — and then, filled with sorrow, he casts aside his bow and sits down on the chariot.',
  lines: [
    {
      devanagari: 'அதர்மாபி பவாத் க்ருஷ்ண ப்ரதுஷ்யந்தி குல ஸ்த்ரிய: ஸ்த்ரீஷு துஷ்டாஸு வார்ஷ்ணேய ஜாயதே வர்ண ஸங்கர: ',
      roman: 'adharmā́pi bhavati kṛṣṇa praduṣyanti kula-striyāḥ strīṣu duṣṭāsu vārṣṇeya jāyate varṇa-saṅkaraḥ',
      meaning: 'குலத்தில் அறமின்மை தலையெடுக்கும்போது — குடும்பப் பெண்கள் களங்கமாகின்றனர்; பெண்மையின் சீரழிவால் தேவையற்ற சந்ததி (வகை அறம் இழந்த சந்ததி) உருவாகும்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஸங்கரோ நரகாயைவ குலக்நானாம் குலஸ்ய ச பதந்தி பிதரோ ஹ்யேஷாம் லுப்த பிண்டோதக க்ரியா:',
      roman: 'saṅgharo narakāyaiva kulakṣayānām kulasya ca pradanti pitaraḥ hyeṣām lubdha-pindodaka-kriyāḥ',
      meaning: 'தேவையற்ற சந்ததியின் பெருக்கத்தால் குடும்பத்திற்கும், குடும்ப நலத்தைக் கெட்டி விடுபவர்களுக்கும் நரகப் பொருத்தம் உருவாகும்; முன்னோர் இன்றையவர்களைப் போல் அவர்களுக்கு உணவு-நீர் வழங்கிய பணியோ நிறைய குறையும்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'தோஷை ர் ஏதை: குலக்நானாம் வர்ணஸங்கர காரகை: உத்ஸாத்யந்தே ஜாதிதர்மா: குலதர்மாஸ் ச ஷாஸ்வத:',
      roman: 'doṣair etaiḥ kulakṣayānām varṇa-saṅkara-kārakaiḥ utsādhyante jāti-dharmāḥ kuladharmās ca śāśvataḥ',
      meaning: 'குலநாசத்தை விளைவிக்கும்மடிவின் தீய செயல்களால் (வர்ணசங்கர போன்றவை) பிற இனங்களின் தர்மங்களும் அழிக்கப்படுகின்றன; குடும்பநெறிகள் நீக்கப்படுகின்றன.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'உத்ஸன்ன குலதர்மாணம் மனுஷ்யாணாம் ஜனார்தன நரகே நியதம் வாஸோ பவதீதி அனுஷுஸ்ரும:',
      roman: 'utsanna-kuladharmāṇām manuṣyāṇām janārdana narake niyataṁ vāso bhavati iti anuśṛnu',
      meaning: 'உறவின நெறிகள் அழிந்து போனால், மனிதர்கள் நரகத்தில் நிரந்தரமாக வாழ்வார்கள் என்று, ஜனார்தனா! நான் கேட்டுள்ளேன் — எனவே கவலையாக இருக்க வேண்டும்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'அஹோ பத மஹத்பாபம் கர்தும் வ்யவஸிதா வயம் யத்ராஜ்ய ஸுக லோபேன ஹந்தும் ஸ்வஜநம்உத்யதா:',
      roman: 'aho patha mahad pāpam kartum vyavasitā vayam yatra rājya-sukha-loben hantum sva-janam udyatāḥ',
      meaning: 'அயோ! அரச ஞானம் மற்றும் அனுபவங்களுக்காக நாங்கள் தங்கள் சொந்த உறவினர்களைக் கொல்லத் தயாராகிறோம்; இதுவே பெரும் பாவம் என்பதில் ஏதேனும் சந்தேகம் இல்லாமல் இருக்கிறது.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'யதி மாம் அப்ரதீகாரம் அஷஸ்த்ரம் ஷஸ்த்ர பாணய: தார்த்தராஷ்ட்ரா ரணே ஹன்யு: தன்மே க்ஷேமதரம் பவேத்',
      roman: 'yadi mām apratīkāraṁ aśastraṁ śastra-pāṇayaḥ dhārtarāṣṭra raṇe hanyuḥ tan me kṣemataraṁ bhavet',
      meaning: 'யாரோ என்னை ஆயுதமின்றி, ஆயுதம் வைத்தேயும், போர் இடத்தில் கொன்றால் என் க்ஷேමத்திற்காக இருப்பதை விட அது சிறந்தது என்று நான் நினைக்கிறேன்.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    },
    {
      devanagari: 'ஏவமுக்த்வா அர்ஜூன: ஸங்க்யே ரதோபஸ்த உபாவிஷத் விச்ருஜ்ய ஸஷரம் ச அபம் ஷோகஸம்விக்ன மானஸ:',
      roman: 'evam uktvā arjunaḥ saṅkhye ratho bbhastha upaviśat visrujya śaraṁ śapaṁ śoka-samvigna-mānas',
      meaning: 'இவ்வாறு கூறி அர்ஜுனன் தன் சங்கமும் அம்புகளையும் விட்டு தேரில் அமர்ந்தார்; அவர் மனம் கவலையால் நிரம்பியிருந்தது.',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    }
  ]
}

  ];
}
