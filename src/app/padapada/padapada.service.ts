import { Injectable } from "@angular/core";

export interface Word {
  devanagari: string;
  roman: string;
  meaning: string;
  practiced?: boolean;
  audio?: string;
}

export interface Sloka {
  id: number;
  title: string;
  subtitle: string;
  meaning: string;
  text: string;
  words: Word[];
}

@Injectable({
  providedIn: 'root'
})
export class PadapadaService {
  constructor() {}

   slokas: Sloka[] = [
   {
  id: 0,
  title: 'கீதா 2.1',
  subtitle: 'சஞ்ஜய உவாச',
  meaning: 'சஞ்ஜயன் கூறினான்: அர்ஜுனன் கருணையால் நிறைந்து, மனம் சோர்ந்து, கண்ணீர் வழிந்த கண்களோடு துயருற்றிருந்தபோது, மதுசூதனனான கிருஷ்ணர் இவ்வாறு சொன்னார்.',
  text: 'சஞ்ஜய உவாச: தம் ததா க்ருபயாவிஷ்டம் அஷ்ருபூர்ணாகுலேக்ஷணம் விஷீதந்தம் இதம் வாக்யம் உவாச மதுஸூதன:',
  words: [
    { devanagari: 'சஞ்ஜய:', roman: 'sañjayaḥ', meaning: 'சஞ்ஜயன்' },
    { devanagari: 'உவாச', roman: 'uvāca', meaning: 'கூறினான்' },
    { devanagari: 'தம்', roman: 'tam', meaning: 'அர்ஜுனனை' },
    { devanagari: 'ததா', roman: 'tathā', meaning: 'அவ்வாறு' },
    { devanagari: 'க்ருபயா', roman: 'kṛpayā', meaning: 'கருணையால்' },
    { devanagari: 'ஆவிஷ்டம்', roman: 'āviṣṭam', meaning: 'மூழ்கியிருந்த' },
    { devanagari: 'அஷ்ருபூர்ண', roman: 'aśru-pūrṇa', meaning: 'கண்ணீர் நிரம்பிய' },
    { devanagari: 'ஆகுல', roman: 'ākula', meaning: 'குழப்பமடைந்த' },
    { devanagari: 'ஈக்ஷணம்', roman: 'īkṣaṇam', meaning: 'கண்கள்' },
    { devanagari: 'விஷீதந்தம்', roman: 'viṣīdantam', meaning: 'துயருற்ற' },
    { devanagari: 'இதம்', roman: 'idaṃ', meaning: 'இந்த' },
    { devanagari: 'வாக்யம்', roman: 'vākyam', meaning: 'வார்த்தைகள்' },
    { devanagari: 'மதுஸூதன:', roman: 'madhusūdanaḥ', meaning: 'மதுவை வதம் செய்தவன் (கிருஷ்ணர்)' }
  ]
},
{
  id: 1,
  title: 'கீதா 2.2',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஸ்ரீ பகவான் கூறினான்: அன்பான அர்ஜுனா! இவ்வாறு தாழ்வான கல்மஷம் உன்னை எப்படித் தாக்கியது? இது உயிரின் மதிப்பை அறிந்தவனுக்குச் சாலாது. இது உயர்ந்த நிலைகளுக்குச் செல்லாது, மாறாக கேடு மற்றும் அவமரியாதையே தரும்.',
  text: 'ஸ்ரீபகவானுவாச: குதஸ்த்வா கஷ்மலம் இதம் விஷமே ஸமுபஸ்திதம் அனார்யஜுஷ்டமஸ்வர்க்யமகீர்த்திகரம் அர்ஜுன',
  words: [
    { devanagari: 'ஸ்ரீபகவான்', roman: 'śrī-bhagavān', meaning: 'ஸ்ரீ பகவான்' },
    { devanagari: 'உவாச', roman: 'uvāca', meaning: 'கூறினான்' },
    { devanagari: 'குத:', roman: 'kutaḥ', meaning: 'எங்கிருந்து' },
    { devanagari: 'த்வா', roman: 'tvā', meaning: 'உன்னை' },
    { devanagari: 'கஷ்மலம்', roman: 'kaṣmalam', meaning: 'அழுக்கான தளர்ச்சி' },
    { devanagari: 'இதம்', roman: 'idaṃ', meaning: 'இந்த' },
    { devanagari: 'விஷமே', roman: 'viṣame', meaning: 'இக்கட்டான நேரத்தில்' },
    { devanagari: 'ஸமுபஸ்திதம்', roman: 'samupasthitam', meaning: 'வந்துள்ளது' },
    { devanagari: 'அனார்ய', roman: 'anārya', meaning: 'ஆரியரல்லாதவர், அறமற்றவர்' },
    { devanagari: 'ஜுஷ்டம்', roman: 'juṣṭam', meaning: 'பின்பற்றப்படும்' },
    { devanagari: 'அஸ்வர்க்யம்', roman: 'asvargyam', meaning: 'சுவர்க்கம் தராதது' },
    { devanagari: 'அகீர்த்தி', roman: 'akīrti', meaning: 'அவமரியாதை' },
    { devanagari: 'கரம்', roman: 'karam', meaning: 'வழிவகுக்கும்' },
    { devanagari: 'அர்ஜுன', roman: 'arjuna', meaning: 'அர்ஜுனா!' }
  ]
},
{
  id: 2,
  title: 'கீதா 2.3',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'பிரிதையின் மகனே! இவ்வாறு இழிந்த தளர்ச்சிக்குத் தள்ளப்படாதே. இது உனக்கு ஏற்றதல்ல. சிறிய மனவலிமை குறையை விட்டு, எதிரிகளை வெல்ல எழுந்திரு!',
  text: 'க்லைப்யம் மா ஸ்ம கம: பார்த நைதத் த்வய்யுபபத்யதே க்ஷுத்ரம் ஹ்ருதயதௌர்பல்யம் த்யக்த்வோத்திஷ்ட பரந்தப',
  words: [
    { devanagari: 'க்லைப்யம்', roman: 'klaibyam', meaning: 'தளர்ச்சி, ஆண்மை இழப்பு' },
    { devanagari: 'மா ஸ்ம', roman: 'mā sma', meaning: 'செய்யாதே' },
    { devanagari: 'கம:', roman: 'gamaḥ', meaning: 'அனுபவிக்காதே' },
    { devanagari: 'பார்த', roman: 'pārtha', meaning: 'பிரிதையின் மகனே' },
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை' },
    { devanagari: 'ஏதத்', roman: 'etat', meaning: 'இது' },
    { devanagari: 'த்வயி', roman: 'tvayi', meaning: 'உனக்கு' },
    { devanagari: 'உபபத்யதே', roman: 'upapadyate', meaning: 'ஏற்றதல்ல' },
    { devanagari: 'க்ஷுத்ரம்', roman: 'kṣudram', meaning: 'சிறிய' },
    { devanagari: 'ஹ்ருதய', roman: 'hṛdaya', meaning: 'இதயம்' },
    { devanagari: 'தௌர்பல்யம்', roman: 'daurbalyam', meaning: 'பலவீனம்' },
    { devanagari: 'த்யக்த்வா', roman: 'tyaktvā', meaning: 'விட்டு' },
    { devanagari: 'உத்திஷ்ட', roman: 'uttiṣṭha', meaning: 'எழுந்திரு' },
    { devanagari: 'பரந்தப', roman: 'parantapa', meaning: 'எதிரிகளைப் பொல்லாதவனே' }
  ]
},
{
  id: 3,
  title: 'கீதா 2.4',
  subtitle: 'அர்ஜுன உவாச',
  meaning: 'அர்ஜுனன் கூறினான்: மதுசூதனனே! பீஷ்மர், துரோணர் போன்ற வழிபாட்டுக்குரியவர்களை நான் அம்புகளால் எப்படி எதிர்ப்பேன்?',
  text: 'அர்ஜுன உவாச: கதம் பீஷ்மமஹம் சங்க்யே த்ரோணம் ச மதுஸூதன இஷுபி: பிரதியோத்ஸ்யாமி பூஜார்ஹாவரிஸூதன',
  words: [
    { devanagari: 'அர்ஜுன:', roman: 'arjunaḥ', meaning: 'அர்ஜுனன்' },
    { devanagari: 'உவாச', roman: 'uvāca', meaning: 'கூறினான்' },
    { devanagari: 'கதம்', roman: 'katham', meaning: 'எப்படி' },
    { devanagari: 'பீஷ்மம்', roman: 'bhīṣmam', meaning: 'பீஷ்மரை' },
    { devanagari: 'அஹம்', roman: 'aham', meaning: 'நான்' },
    { devanagari: 'சங்க்யே', roman: 'saṅkhye', meaning: 'போரில்' },
    { devanagari: 'த்ரோணம்', roman: 'droṇam', meaning: 'துரோணரை' },
    { devanagari: 'ச', roman: 'ca', meaning: 'மற்றும்' },
    { devanagari: 'மதுஸூதன', roman: 'madhusūdana', meaning: 'மதுவை வதம் செய்த கிருஷ்ணா!' },
    { devanagari: 'இஷுபி:', roman: 'iṣubhiḥ', meaning: 'அம்புகளால்' },
    { devanagari: 'பிரதியோத்ஸ்யாமி', roman: 'pratiyotsyāmi', meaning: 'எதிர்ப்பேன்' },
    { devanagari: 'பூஜார்ஹௌ', roman: 'pūjārhau', meaning: 'வழிபடத்தக்கவர்கள்' },
    { devanagari: 'அரிஸூதன', roman: 'ari-sūdana', meaning: 'எதிரிகளை அழிப்பவனே' }
  ]
},
 {
  id: 4,
  title: 'கீதா 2.5',
  subtitle: 'அர்ஜுன உவாச',
  meaning: 'வழிபாட்டுக்குரிய ஆசான்களைச் சாகடித்து வாழ்வதைவிட, இவ்வுலகில் பிச்சை எடுத்து வாழ்வதே நல்லது. ஆசை காரணமாக இருந்தாலும், அவர்கள் மூத்தோர். அவர்களை வென்று அனுபவிக்கும் இன்பங்கள் அனைத்தும் இரத்தக் களங்கம் படிந்தவையாகும்.',
  text: 'குரூன் அஹத்வா ஹி மஹாநுபாவாந் ஶ்ரேயோ போக்துங் பைக்ஷ்யமபீஹ லோதே ஹத்வார்த்த-காமாந்ஸ் து குரூன் இஹைவ புஞ்ஜீய பகான் ருதிர-ப்ரதிக்தாந்',
  words: [
    { devanagari: 'குரூன்', roman: 'gurūn', meaning: 'ஆசான்களை / மூத்தோரை' },
    { devanagari: 'அஹத்வா', roman: 'ahatvā', meaning: 'கொல்லாமல்' },
    { devanagari: 'ஹி', roman: 'hi', meaning: 'நிச்சயம்' },
    { devanagari: 'மஹாநுபாவாந்', roman: 'mahānubhāvān', meaning: 'மிகுந்த சிறந்தவர்களை' },
    { devanagari: 'ஶ்ரேய: போக்தும்', roman: 'śreyo bhoktuṁ', meaning: 'நல்லது — வாழ்வதற்கு' },
    { devanagari: 'பைக்ஷ்யம்', roman: 'bhaikṣyam', meaning: 'பிச்சை எடுத்தல்' },
    { devanagari: 'இஹ லோகே', roman: 'iha loke', meaning: 'இவ்வுலகில்' },
    { devanagari: 'ஹத்வா', roman: 'hatvā', meaning: 'கொன்று' },
    { devanagari: 'அர்த்த-காமாந்', roman: 'artha-kāmān', meaning: 'பொருள்-ஆசைக்காக இருப்பவர்களை' },
    { devanagari: 'இஹைவ', roman: 'ihaiva', meaning: 'இங்குத்தான்' },
    { devanagari: 'புஞ்ஜீய பகான்', roman: 'bhuñjīya bhogān', meaning: 'அனுபவங்களை அனுபவிப்போம்' },
    { devanagari: 'ருதிர-ப்ரதிக்தாந்', roman: 'rudhira-pradigdhān', meaning: 'இரத்தக் களங்கம் படிந்தவற்றை' }
  ]
},
{
  id: 5,
  title: 'கீதா 2.6',
  subtitle: 'அர்ஜுன உவாச',
  meaning: 'யார் ஜெயிப்பது நமக்குத்利益மானது என்று கூட நமக்குத் தெரியவில்லை — நாங்களா ஜெயிப்போம், இல்லையெனில் அவர்கள் நம்மை ஜெயிப்பார்களா? அவர்களையே கொன்றபின் நாங்கள் வாழ விரும்புவதில்லை; அவர்கள் தர்மராஷ்டிரரின் மகன்கள் நம்முன் நிற்கின்றனர்.',
  text: 'ந சைதத் வித்ம: கதரந்நோ க்ரீய: யத்வா ஜயேம யதிவா நோ ஜயேயுஃ யாந் எவ ஹத்வா ந ஜிஜீவிஷாம: தேऽவஸ்திதா: ப்ரமுகே தார்த்தராஷ்ட்ரா:',
  words: [
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை' },
    { devanagari: 'சைதத் வித்ம:', roman: 'ca etad vidmaḥ', meaning: 'இதனை நாங்கள் அறியோம்' },
    { devanagari: 'கதரத் ந: க்ரீய:', roman: 'katarat naḥ garīyaḥ', meaning: 'எது நமக்கு மேன்மை?' },
    { devanagari: 'யத் வா', roman: 'yad vā', meaning: 'அல்லது' },
    { devanagari: 'ஜயேம', roman: 'jayema', meaning: 'நாங்கள் ஜெயிப்போமா' },
    { devanagari: 'யதி வா', roman: 'yadi vā', meaning: 'அல்லையெனில்' },
    { devanagari: 'நோ ஜயேயுஃ', roman: 'no jayeyuḥ', meaning: 'அவர்கள் நம்மை ஜெயிப்பார்களா' },
    { devanagari: 'யாந் எவ', roman: 'yān eva', meaning: 'அவர்களையே' },
    { devanagari: 'ஹத்வா', roman: 'hatvā', meaning: 'கொன்றபின்' },
    { devanagari: 'ந ஜிஜீவிஷாம:', roman: 'na jijīviṣāmaḥ', meaning: 'வாழ்வதற்கு விருப்பமில்லை' },
    { devanagari: 'தே அவஸ்திதா:', roman: 'te avasthitāḥ', meaning: 'அவர்கள் நிற்கின்றனர்' },
    { devanagari: 'ப்ரமுகே', roman: 'pramukhe', meaning: 'முன்னே' },
    { devanagari: 'தார்த்தராஷ்ட்ரா:', roman: 'dhārtarāṣṭrāḥ', meaning: 'திருதராஷ்டிரரின் மகன்கள்' }
  ]
},
{
  id: 6,
  title: 'கீதா 2.7',
  subtitle: 'அர்ஜுன உவாச',
  meaning: 'கஞ்சத்தனத்தால் என் இயல்பு தளர்ந்துவிட்டது; தர்மத்தில் குழப்பமடைந்துள்ளேன். எனக்கு நிச்சயமாக உத்தமமானது எது என்று சொல்லுங்கள். நான் உங்கள் சீடன்; உமக்கே சரணடைந்தேன் — என்னை உபதேசிக்கவும்.',
  text: 'கார்பண்ய-தோஷோபஹத-ஸ்வபாவ: ப்ரிச்சாமி த்வாம் தர்ம-ஸம்மூட-சேதா: யத் ஶ்ரேய: ஸ்யான் நிஷ்சிதம் புரூஹி தன் மே ஶிஷ்யஸ்தேऽஹம் ஶாதி மாம் த்வாம் ப்ரபன்னம்',
  words: [
    { devanagari: 'கார்பண்ய', roman: 'kārpaṇya', meaning: 'கஞ்சத்தனம்/தாழ்ச்சி' },
    { devanagari: 'தோஷ-உபஹத', roman: 'doṣa-upahata', meaning: 'குறைவால் பாதிக்கப்பட்ட' },
    { devanagari: 'ஸ்வபாவ:', roman: 'svabhāvaḥ', meaning: 'இயல்பு' },
    { devanagari: 'ப்ரிச்சாமி', roman: 'pṛcchāmi', meaning: 'கேட்கிறேன்' },
    { devanagari: 'த்வாம்', roman: 'tvām', meaning: 'உம்மை' },
    { devanagari: 'தர்ம-ஸம்மூட-சேதா:', roman: 'dharma-sammūḍha-cetāḥ', meaning: 'தர்மத்தில் குழப்பமடைந்த மனம்' },
    { devanagari: 'யத் ஶ்ரேய:', roman: 'yat śreyaḥ', meaning: 'எது உத்தமம்' },
    { devanagari: 'நிஷ்சிதம்', roman: 'niścitam', meaning: 'நிச்சயமாக' },
    { devanagari: 'புரூஹி', roman: 'brūhi', meaning: 'சொல்லுங்கள்' },
    { devanagari: 'தத் மே', roman: 'tat me', meaning: 'அதை எனக்குச்' },
    { devanagari: 'ஶிஷ்ய:', roman: 'śiṣyaḥ', meaning: 'சீடன்' },
    { devanagari: 'தே அஹம்', roman: 'te ahaṁ', meaning: 'உங்களுடையவன் நான்' },
    { devanagari: 'ஶாதி', roman: 'śādhi', meaning: 'உபதேசம் செய்யுங்கள்' },
    { devanagari: 'மாம்', roman: 'māṁ', meaning: 'என்னை' },
    { devanagari: 'த்வாம் ப்ரபன்னம்', roman: 'tvāṁ prapannam', meaning: 'உம்மிடம் சரணடைந்தவனாய்' }
  ]
},
{
  id: 7,
  title: 'கீதா 2.8',
  subtitle: 'அர்ஜுன உவாச',
  meaning: 'என் இன்பேந்திரியங்களை உலரவைக்கும் இந்தத் துயரத்தை நீக்க வழி ஒன்றும் எனக்குத் தெரியவில்லை. பூமியில் ஒப்பற்ற ராஜ்யத்தையும், தேவர்களின் ஆதிபத்யத்தையும் பெற்றாலும் இதை ஒழிக்க முடியாது.',
  text: 'ந ஹி ப்ரபஶ்யாமி மமாபநுத்யாத் யச் ஶோகம் உச்சோஷணம் இந்த்ரியாணாம் அவாப்ய பூமாவஸபத்நம் ஋த்தம் ராஜ்யம் ஸுராணாமபி ச ஆதிபத்யம்',
  words: [
    { devanagari: 'ந ஹி', roman: 'na hi', meaning: 'நிச்சயமாக இல்லை' },
    { devanagari: 'ப்ரபஶ்யாமி', roman: 'prapaśyāmi', meaning: 'நான் காணவில்லை' },
    { devanagari: 'மம', roman: 'mama', meaning: 'என்' },
    { devanagari: 'அபநுத்யாத் ஶோகம்', roman: 'apanudyāt śokam', meaning: 'துயரத்தை அகற்ற' },
    { devanagari: 'உச்சோஷணம் இந்த்ரியாணாம்', roman: 'ucchoṣaṇam indriyāṇām', meaning: 'இந்திரியங்களை உலரவைக்கும்' },
    { devanagari: 'அவாப்ய', roman: 'avāpya', meaning: 'பெற்றாலும்' },
    { devanagari: 'பூமௌ', roman: 'bhūmau', meaning: 'பூமியில்' },
    { devanagari: 'அஸபத்நம் ராஜ்யம்', roman: 'asapatnam rājyaṁ', meaning: 'போட்டியற்ற ராஜ்யம்' },
    { devanagari: '஋த்தம்', roman: 'ṛddham', meaning: 'செழிப்பான' },
    { devanagari: 'ஸுராணாம் அபி', roman: 'surāṇām api', meaning: 'தேவர்களுடையதையும் கூட' },
    { devanagari: 'ஆதிபத்யம்', roman: 'ādhipatyam', meaning: 'ஆதிபத்யம்/சுவாதீனம்' }
  ]
},
{
  id: 8,
  title: 'கீதா 2.9',
  subtitle: 'சஞ்ஜய உவாச',
  meaning: 'சஞ்ஜயன் கூறினான்: இவ்வாறு ஹ்ருஷீகேஶனை நோக்கி கூறிய பின், எதிரிகளைப் பொல்லாத அர்ஜுனன் — “கோவிந்தா, நான் போராட மாட்டேன்” என்று சொன்னதும் மௌனமாகி விட்டான்.',
  text: 'ஏவமுக்த்வா ஹ்ருஷீகேஶம் குடாகேஶ: பரந்தப: ந யோத்ஸ்ய இதி கோவிந்தம் உக்த்வா துஷ்ணீம் பபூவ ஹ',
  words: [
    { devanagari: 'சஞ்ஜய:', roman: 'sañjayaḥ', meaning: 'சஞ்ஜயன்' },
    { devanagari: 'உவாச', roman: 'uvāca', meaning: 'கூறினான்' },
    { devanagari: 'குடாகேஶ:', roman: 'guḍākeśaḥ', meaning: 'தூக்கத்தை வென்றவன் (அர்ஜுனன்)' },
    { devanagari: 'பரந்தப:', roman: 'parantapaḥ', meaning: 'எதிரிகளைத் தண்டிப்பவன்' },
    { devanagari: 'ந யோத்ஸ்ய', roman: 'na yotsya', meaning: 'போராட மாட்டேன்' },
    { devanagari: 'இதਿ', roman: 'iti', meaning: 'என்று' },
    { devanagari: 'கோவிந்தம்', roman: 'govindam', meaning: 'கோவிந்தனை' },
    { devanagari: 'உக்த்வா', roman: 'uktvā', meaning: 'சொன்று' },
    { devanagari: 'துஷ்ணீம் பபூவ', roman: 'tūṣṇīṁ babhūva', meaning: 'மௌனமானான்' }
  ]
},
{
  id: 9,
  title: 'கீதா 2.10',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'அப்போது, இரு படைகளின் நடுவில், துயரத்தில் மூழ்கிய அர்ஜுனனை நோக்கி ஹ்ருஷீகேஶனான கிருஷ்ணர் சிரித்தபடி இவ்வாறு சொன்னார், ஓ பாரதா!',
  text: 'தம் உவாச ஹ்ருஷீகேஶ: ப்ரஹஸந்நிவ பாரத ஸேநயோரุบயோர்மத்யே விஷீதந்தமிதம் வச:',
  words: [
    { devanagari: 'தம்', roman: 'tam', meaning: 'அவனை' },
    { devanagari: 'உவாச', roman: 'uvāca', meaning: 'சொன்னார்' },
    { devanagari: 'ஹ்ருஷீகேஶ:', roman: 'hṛṣīkeśaḥ', meaning: 'இந்திரியங்களின் அதிபதி (கிருஷ்ணர்)' },
    { devanagari: 'ப்ரஹசன் இவ', roman: 'prahasan iva', meaning: 'சிரித்தபடி' },
    { devanagari: 'பாரத', roman: 'bhārata', meaning: 'ஓ பாரதா' },
    { devanagari: 'ஸேநயோ: உபயோ: மத்யே', roman: 'senayoḥ ubhayoḥ madhye', meaning: 'இரு படைகளின் நடுவில்' },
    { devanagari: 'விஷீதந்தம்', roman: 'viṣīdantam', meaning: 'துயர்படும் ஒருவனை' },
    { devanagari: 'இதம் வச:', roman: 'idaṁ vacaḥ', meaning: 'இந்த வார்த்தைகளை' }
  ]
},
{
  id: 10,
  title: 'கீதா 2.11',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஸ்ரீ பகவான் கூறினார்: நீ அறிவாளியின் பேச்சைப் பேசுகிறாய்; ஆனால் துயரப்பட வேண்டாதவற்றுக்குத் துயரப்படுகிறாய். பண்டிதர்கள் உயிருள்ளவர்களுக்கோ இறந்தவர்களுக்கோ துயரப்பட மாட்டார்கள்.',
  text: 'அஶோச்யாந் அன்வஶோசஸ்த்வம் ப்ரஜ்ஞாவாதான்ஶ்ச பாஷஸே கதாஸூந் அகதாஸூந்ஶ்ச நாநுஶோசந்தி பண்டிதா:',
  words: [
    { devanagari: 'அஶோச்யாந்', roman: 'aśocyān', meaning: 'துயரப்பட வேண்டாதவர்களை' },
    { devanagari: 'அன்வஶோச:', roman: 'anvaśocaḥ', meaning: 'நீ துயரப்படுகிறாய்' },
    { devanagari: 'த்வம்', roman: 'tvaṁ', meaning: 'நீ' },
    { devanagari: 'ப்ரஜ்ஞா-வாதாந்', roman: 'prajñā-vādān', meaning: 'ஞானப் பேச்சுகள்' },
    { devanagari: 'பாஷஸே', roman: 'bhāṣase', meaning: 'பேசுகிறாய்' },
    { devanagari: 'கத-அஸூந்', roman: 'gata-asūn', meaning: 'உயிர் நீங்கியவர்களை' },
    { devanagari: 'அகத-அஸூந்', roman: 'agata-asūn', meaning: 'உயிருள்ளவர்களை' },
    { devanagari: 'ந அனுஶோசந்தி', roman: 'na anuśocanti', meaning: 'துயரப்பட மாட்டார்கள்' },
    { devanagari: 'பண்டிதா:', roman: 'paṇḍitāḥ', meaning: 'பண்டிதர்கள்' }
  ]
},
  {
  id: 11,
  title: 'கீதா 2.12',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'நானும், நீதான், இங்கு உள்ள அரசரும் — எப்போதும் இல்லாதவர்கள் அல்ல; எதிர்காலத்திலும் நாம் யாரும் இல்லாமல் போகமாட்டோம்.',
  text: 'ந த்வேவாஹம் ஜாது நாஸம் ந த்வம் நேமே ஜனாதிபாஃ ந சைவ ந பவிஷ்யாமஃ ஸர்வே வயமதஃ பரம்',
  words: [
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை/ஒருபோதும் இல்லை' },
    { devanagari: 'து', roman: 'tu', meaning: 'ஆனால்/தான்' },
    { devanagari: 'ஏவ', roman: 'eva', meaning: 'நிச்சயம்' },
    { devanagari: 'அஹம்', roman: 'ahaṃ', meaning: 'நான்' },
    { devanagari: 'ஜாது', roman: 'jātu', meaning: 'எந்த காலத்திலும்' },
    { devanagari: 'நாஸம்', roman: 'nāsaṃ', meaning: 'இல்லாமை (இருப்பின்மை)' },
    { devanagari: 'த்வம்', roman: 'tvaṃ', meaning: 'நீ' },
    { devanagari: 'இமே', roman: 'ime', meaning: 'இவர்கள்/இவைகள்' },
    { devanagari: 'ஜனாதிபாஃ', roman: 'janādhipāḥ', meaning: 'அரசர்கள்' },
    { devanagari: 'ந சைவ', roman: 'na caiva', meaning: 'மேலும் இல்லையெனவும்' },
    { devanagari: 'பவிஷ்யாமஃ', roman: 'bhaviṣyāmaḥ', meaning: 'நாம் இல்லை ஆகமாட்டோம்' },
    { devanagari: 'ஸர்வே வயம்', roman: 'sarve vayam', meaning: 'நாம் அனைவரும்' },
    { devanagari: 'அதஃ பரம்', roman: 'ataḥ param', meaning: 'எதிர்காலத்திலும்' }
  ]
},
{
  id: 12,
  title: 'கீதா 2.13',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'உடலில் உள்ள ஆத்மா இவ்வுடலில் பால்யம், இளமை, முதுமை என மாறுவது போல மரணத்தின் போது மற்றொரு உடலை அடைகிறது; இதனைப் புரிந்த நிலைமையானவன் குழம்பமாட்டான்.',
  text: 'தேஹினோʼஸ்மिन् யதா தேஹே கௌமாரம் யௌவனம் ஜரா ததா தேஹாந்தர-ப்ராப்திர் தீரஸ்தத்ர ந முஹ்யதி',
  words: [
    { devanagari: 'தேஹின:', roman: 'dehinaḥ', meaning: 'உடலுடையவன் (ஆத்மா)' },
    { devanagari: 'அஸ்மின் தேஹே', roman: 'asmin dehe', meaning: 'இந்த உடலில்' },
    { devanagari: 'யதா', roman: 'yathā', meaning: 'எப்படி' },
    { devanagari: 'கௌமாரம்', roman: 'kaumāram', meaning: 'பால்யம்' },
    { devanagari: 'யௌவனம்', roman: 'yauvanam', meaning: 'இளமை' },
    { devanagari: 'ஜரா', roman: 'jarā', meaning: 'முதுமை' },
    { devanagari: 'ததா', roman: 'tathā', meaning: 'அப்படியே' },
    { devanagari: 'தேஹாந்தர-ப்ராப்தி:', roman: 'dehāntara-prāptiḥ', meaning: 'மற்றொரு உடலை அடைதல்' },
    { devanagari: 'தீர:', roman: 'dhīraḥ', meaning: 'நிலைத்த அறிவாளர்' },
    { devanagari: 'தத்ர', roman: 'tatra', meaning: 'அப்படிப்பட்ட மாற்றத்தில்' },
    { devanagari: 'ந முஹ்யதி', roman: 'na muhyati', meaning: 'குழம்பமாட்டான்' }
  ]
},
{
  id: 13,
  title: 'கீதா 2.14',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'கௌந்தேயா! குளிர்/வெயில் போல வரும் சந்தோஷம்–துன்பம் ஆகியவை இந்திரிய ஸ்பர்ஶங்களால் தோன்று மறையும் — அவை நிலையற்றவை; ஓ பாரதா, அவற்றை மனம் கலங்காமல் பொறுத்துக் கற்று கொள்ளு.',
  text: 'மாத்ராஸ்பர்ஶாஸ்து கௌந்தேய ஶீதோஷ்ண-ஸுக-துஃகதாஃ ஆகமாபாயினோʼநித்யாஸ் தாஞ் ஸ்திதிக்ஷஸ்வ பாரத',
  words: [
    { devanagari: 'மாத்ரா-ஸ்பர்ஶாஃ', roman: 'mātrā-sparśāḥ', meaning: 'இந்திரிய ஸ்பர்ஶங்கள்' },
    { devanagari: 'கௌந்தேய', roman: 'kaunteya', meaning: 'குந்தியின் மகனே' },
    { devanagari: 'ஶீத-உஷ்ண', roman: 'śīta-uṣṇa', meaning: 'குளிரும் வெயிலும்' },
    { devanagari: 'ஸுக-துஃக-தாஃ', roman: 'sukha-duḥkha-dāḥ', meaning: 'சுக/துக்கத்தை தருபவை' },
    { devanagari: 'ஆகம-ஆபாயின:', roman: 'āgama-apāyinaḥ', meaning: 'வருவதும் மறைவதும்' },
    { devanagari: 'அநித்யாஃ', roman: 'anityāḥ', meaning: 'நிலையற்றவை' },
    { devanagari: 'தாந்', roman: 'tān', meaning: 'அவற்றை' },
    { devanagari: 'ஸ்திதிக்ஷஸ்வ', roman: 'titikṣasva', meaning: 'பொறுத்துக் கற்று கொள்' },
    { devanagari: 'பாரத', roman: 'bhārata', meaning: 'ஓ பாரதா' }
  ]
},
{
  id: 14,
  title: 'கீதா 2.15',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'சுக–துஃகங்களில் கலங்காது சமநிலையோடு இருப்பவன், மனிதர்களில் சிறந்தவனே, நிச்சயமாக மோக்ஷத்திற்கு தகுதியானவன்.',
  text: 'யம் ஹி ந வ்யதயந்த்யேதே புருஷம் புருஷர்ஷப ஸம-துஃக-ஸுகம் தீரம் ஸோʼம்ருதத்வாய கல்பதே',
  words: [
    { devanagari: 'யம்', roman: 'yam', meaning: 'யாரை' },
    { devanagari: 'ஹி', roman: 'hi', meaning: 'நிச்சயமாக' },
    { devanagari: 'ந வ்யதயந்தி ஏதே', roman: 'na vyathayanti ete', meaning: 'இவையால் கலங்காதவர்' },
    { devanagari: 'புருஷம்', roman: 'puruṣam', meaning: 'ஒரு மனிதனை' },
    { devanagari: 'புருஷர்ஷப', roman: 'puruṣarṣabha', meaning: 'மனிதர்களில் சிறந்தவனே' },
    { devanagari: 'ஸம-துஃக-ஸுகம்', roman: 'sama-duḥkha-sukham', meaning: 'துன்ப–சுகத்தில் சமநிலை' },
    { devanagari: 'தீரம்', roman: 'dhīram', meaning: 'நிலைத்த மனம் உடையவன்' },
    { devanagari: 'ச:' , roman: 'saḥ', meaning: 'அவன்' },
    { devanagari: 'அம்ருதத்வாய', roman: 'amṛtatvāya', meaning: 'மோக்ஷத்திற்கு/அமரத்துவத்திற்கு' },
    { devanagari: 'கல்பதே', roman: 'kalpate', meaning: 'தகுதி பெறுகிறான்' }
  ]
},
{
  id: 15,
  title: 'கீதா 2.16',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'அசத்து (இல்லாதது)க்கு நிலை இல்லை; சத்து (இருப்பது/நித்யம்)க்கு நாசம் இல்லை — இவ்விரண்டின் எல்லை/தீர்ப்பு தத்த்வத்தை அறிந்தவர்கள் கண்டறிந்தது.',
  text: 'நாஸதோ வித்யதே பாவோ நாபாவோ வித்யதே ஸதஃ உபயோரபி த்ருஷ்டோʼந்தஸ்த்வநயோஸ் தத்த்வதர்ஶிபிஃ',
  words: [
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை' },
    { devanagari: 'அசத:', roman: 'asataḥ', meaning: 'இல்லாமை/அசத்து' },
    { devanagari: 'வித்யதே', roman: 'vidyate', meaning: 'உள்ளது' },
    { devanagari: 'பாவ:', roman: 'bhāvaḥ', meaning: 'நிலை/இருப்பு' },
    { devanagari: 'நாபாவ:', roman: 'nābhāvaḥ', meaning: 'நாசம் இல்லை' },
    { devanagari: 'ஸத:', roman: 'sataḥ', meaning: 'சத்து/நித்யம்' },
    { devanagari: 'உபயோ:', roman: 'ubhayoḥ', meaning: 'இரண்டிற்கும்' },
    { devanagari: 'அபி', roman: 'api', meaning: 'கூட' },
    { devanagari: 'த்ருஷ்ட:', roman: 'dṛṣṭaḥ', meaning: 'கண்டறியப்பட்டது' },
    { devanagari: 'அந்த:', roman: 'antaḥ', meaning: 'எல்லை/தீர்ப்பு' },
    { devanagari: 'து', roman: 'tu', meaning: 'ஆனால்' },
    { devanagari: 'அநயோ:', roman: 'anayoḥ', meaning: 'இவை இரண்டின்' },
    { devanagari: 'தத்த்வ-தர்ஶிபிஃ', roman: 'tattva-darśibhiḥ', meaning: 'தத்துவத்தை உணர்ந்த ஞானிகளால்' }
  ]
},
  {
  id: 16,
  title: 'கீதா 2.17',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'இந்த உடல் முழுவதையும் ஊடுருவி நிற்கும் அதே ஆத்மா அவிநாஶி — அழியாதவன் என்பதை அறிந்து கொள். அந்த நித்தியனுக்கு நாசம் செய்ய யாருக்கும் இயலாது.',
  text: 'அவிநாஶி து தத் வித்தி யேன ஸர்வமிதம் ததம் விநாஶமவ்யயஸ்யாஸ்ய ந கஶ்சித் கர்தும் அர்ஹதி',
  words: [
    { devanagari: 'அவிநாஶி', roman: 'avināśi', meaning: 'அழியாதவன்/நாசமில்லாதது' },
    { devanagari: 'து', roman: 'tu', meaning: 'ஆனால்/என்றால்' },
    { devanagari: 'தத்', roman: 'tat', meaning: 'அதனை' },
    { devanagari: 'வித்தி', roman: 'viddhi', meaning: 'அறிந்து கொள்' },
    { devanagari: 'யேன', roman: 'yena', meaning: 'யாரணால்/எதனால்' },
    { devanagari: 'ஸர்வம் இதம்', roman: 'sarvam idaṃ', meaning: 'இந்த அனைத்தும்' },
    { devanagari: 'ததம்', roman: 'tatam', meaning: 'பரவி நிற்கும்' },
    { devanagari: 'விநாஶம்', roman: 'vināśam', meaning: 'அழிவை' },
    { devanagari: 'அவ்யயஸ்ய அஸ்ய', roman: 'avyayasya asya', meaning: 'இந்த அழியாதவற்கு' },
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை/முடியாது' },
    { devanagari: 'கஶ்சித்', roman: 'kaścit', meaning: 'யாரும்' },
    { devanagari: 'கர்தும்', roman: 'kartum', meaning: 'செய்ய' },
    { devanagari: 'அர்ஹதி', roman: 'arhati', meaning: 'இயலாது/சாத்தியமில்லை' }
  ]
},
{
  id: 17,
  title: 'கீதா 2.18',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'நித்திய ஆத்மாவுக்கு உடல் மட்டும் அழிவதற்குரியது; ஆத்மா அழியாததும் அளவிட முடியாததும் ஆகும். ஆகையால், ஓ பாரதா, யுத்தம் செய்.',
  text: 'அந்தவந்த இமே தேஹா நித்யஸ்யோக்தாஃ ஶரீரிணஃ அனாஶினோʼப்ரமேயஸ்ய தஸ்மாத் யுயுத்தஸ்வ பாரத',
  words: [
    { devanagari: 'அந்தவந்த:', roman: 'antavantaḥ', meaning: 'முடிவுடைய/அழியும்' },
    { devanagari: 'இமே தேஹா:', roman: 'ime dehāḥ', meaning: 'இந்த உடல்கள்' },
    { devanagari: 'நித்யஸ்ய', roman: 'nityasya', meaning: 'நித்தியனுடைய (ஆத்மாவின்)' },
    { devanagari: 'உக்தா:', roman: 'uktāḥ', meaning: 'என்று கூறப்பட்டுள்ளன' },
    { devanagari: 'ஶரீரிண:', roman: 'śarīriṇaḥ', meaning: 'உடலுடையவனின் (ஆத்மாவின்)' },
    { devanagari: 'அநாஶிந:', roman: 'anāśinaḥ', meaning: 'அழியாதவன்' },
    { devanagari: 'அப்ரமேயஸ்ய', roman: 'aprameyasya', meaning: 'அளவிட முடியாதவன்' },
    { devanagari: 'தஸ்மாத்', roman: 'tasmāt', meaning: 'எனவே' },
    { devanagari: 'யுயுத்தஸ்வ', roman: 'yudhyasva', meaning: 'யுத்தம் செய்' },
    { devanagari: 'பாரத', roman: 'bhārata', meaning: 'ஓ பாரதா' }
  ]
},
{
  id: 18,
  title: 'கீதா 2.19',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஆத்மா கொல்லுகிறான் என்றும், அவன் கொல்லப்படுகிறான் என்றும் நினைப்பவன் இருவரும் அறியாதவர்கள். இந்த ஆத்மா யாரையும் கொல்வதில்லை; அவனும் கொல்லப்படமாட்டான்.',
  text: 'ய ஏனம் வேத்தி ஹந்தாரம் யஶ்சைனம் மன்யதே ஹதம் உபௌ தௌ ந விஜாநீதோ நாயம் ஹந்தி ந ஹன்யதே',
  words: [
    { devanagari: 'ய:', roman: 'yaḥ', meaning: 'யாராவது' },
    { devanagari: 'ஏனம்', roman: 'enam', meaning: 'இவனை (ஆத்மையை)' },
    { devanagari: 'வேத்தி', roman: 'vetti', meaning: 'அறிவான்/என்று கருதுவான்' },
    { devanagari: 'ஹந்தாரம்', roman: 'hantāram', meaning: 'கொல்லுபவன்' },
    { devanagari: 'யஶ்ச', roman: 'yaś ca', meaning: 'மற்றும் யார்' },
    { devanagari: 'மன்யதே', roman: 'manyate', meaning: 'நினைப்பான்' },
    { devanagari: 'ஹதம்', roman: 'hatam', meaning: 'கொல்லப்பட்டது' },
    { devanagari: 'உபௌ தௌ', roman: 'ubhau tau', meaning: 'இருவரும்' },
    { devanagari: 'ந விஜாநீத:', roman: 'na vijānītaḥ', meaning: 'அறியாதவர்கள்' },
    { devanagari: 'நாயம் ஹந்தி', roman: 'nāyaṃ hanti', meaning: 'இவன் (ஆத்மா) கொல்லமாட்டான்' },
    { devanagari: 'ந ஹன்யதே', roman: 'na hanyate', meaning: 'கொல்லப்படமாட்டான்' }
  ]
},
{
  id: 19,
  title: 'கீதா 2.20',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஆத்மாவிற்கு பிறப்பு இல்லை, மரணம் இல்லை; இருந்தவன் இல்லாமலாக மாட்டான். அவன் அஜன், நித்தியன், சாஶ்வதன், புராணன்; உடல் கொல்லப்படும் போது அவன் கொல்லப்படமாட்டான்.',
  text: 'ந ஜாயதே ம்ரியதே வா கதாசின் நாயம் பூத்வா பவிதா வா ந பூய: அஜோ நித்ய: ஶாஶ்வதோʼயம் புராணோ ந ஹன்யதே ஹன்யமாநே ஶரீரே',
  words: [
    { devanagari: 'ந ஜாயதே', roman: 'na jāyate', meaning: 'பிறப்பதில்லை' },
    { devanagari: 'ம்ரியதே', roman: 'mriyate', meaning: 'இறப்பதில்லை' },
    { devanagari: 'கதாசித்', roman: 'kadācit', meaning: 'ஒரு காலத்திலும்' },
    { devanagari: 'நாயம்', roman: 'nāyam', meaning: 'இவன் (ஆத்மா)' },
    { devanagari: 'பூத்வா/பவிதா', roman: 'bhūtvā/bhavitā', meaning: 'இருந்தவன்/ஆகுபவன்' },
    { devanagari: 'ந பூய:', roman: 'na bhūyaḥ', meaning: 'மீண்டும் இல்லை ஆகமாட்டான்' },
    { devanagari: 'அஜ:', roman: 'ajaḥ', meaning: 'பிறவியற்றவன்' },
    { devanagari: 'நித்ய:', roman: 'nityaḥ', meaning: 'நித்தியன்' },
    { devanagari: 'ஶாஶ்வத:', roman: 'śāśvataḥ', meaning: 'நிலையானவன்' },
    { devanagari: 'அயம் புராண:', roman: 'ayaṃ purāṇaḥ', meaning: 'இந்தப் பழமையான (முதன்மையான)வன்' },
    { devanagari: 'ந ஹன்யதே', roman: 'na hanyate', meaning: 'கொல்லப்படமாட்டான்' },
    { devanagari: 'ஹன்யமானே ஶரீரே', roman: 'hanyamāne śarīre', meaning: 'உடல் கொல்லப்படும் போதும்' }
  ]
},
{
  id: 20,
  title: 'கீதா 2.21',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஓ பார்த்தா, ஆத்மா அழியாதவன், அஜன், நித்தியன், மாறாதவன் என்று அறிந்தவன் யாரை கொல்ல முடியும்? யாரைக் கொலை செய்யச் செய்ய முடியும்?',
  text: 'வேதாʼவிநாஶினம் நித்யம் ய ஏநமஜமவ்யயம் கதம் ஸ புருஷ: பார்த்த கம் ஘ாதயதி ஹந்தி கம்',
  words: [
    { devanagari: 'வேத', roman: 'veda', meaning: 'அறிந்தவன்' },
    { devanagari: 'அவிநாஶினம்', roman: 'avināśinam', meaning: 'அழியாதவன்' },
    { devanagari: 'நித்யம்', roman: 'nityam', meaning: 'நித்தியன்' },
    { devanagari: 'ய:', roman: 'yaḥ', meaning: 'யார்' },
    { devanagari: 'ஏநம்', roman: 'enam', meaning: 'இந்த ஆத்மையை' },
    { devanagari: 'அஜம்', roman: 'ajam', meaning: 'பிறவியற்றவன்' },
    { devanagari: 'அவ்யயம்', roman: 'avyayam', meaning: 'மாறாதவன்/குறைவில்லாதவன்' },
    { devanagari: 'கதம்', roman: 'katham', meaning: 'எப்படி' },
    { devanagari: 'ச:', roman: 'saḥ', meaning: 'அவன்' },
    { devanagari: 'புருஷ:', roman: 'puruṣaḥ', meaning: 'மனுஷ்யன்' },
    { devanagari: 'பார்த்த', roman: 'pārtha', meaning: 'ஓ பார்த்தா' },
    { devanagari: 'கம்/கம்', roman: 'kaṃ/kam', meaning: 'யாரை' },
    { devanagari: '஘ாதயதி', roman: 'ghātayati', meaning: 'கொலை செய்யச் செய்கிறான்' },
    { devanagari: 'ஹந்தி', roman: 'hanti', meaning: 'கொல்லுகிறான்' }
  ]
},
  {
  id: 21,
  title: 'கீதா 2.22',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஒருவர் பழைய உடைகளை விட்டு புதியவற்றை அணிவது போலவே, உடலுடையவன் (ஆத்மா) பழைய உடலை விட்டு, புதிய உடலை ஏற்றுக்கொள்கிறான்.',
  text: 'வாஸாஞ்சி ஜீர்ணாணி யதா விஹாய நவாநி கிருஹ்ணாதி நரோʼபராணி ததா ஶரீராணி விஹாய ஜீர்ணாண்யன்ன்யாணி ஸம்யாதி நவாநி தேஹீ',
  words: [
    { devanagari: 'வாஸாஞ்சி', roman: 'vāsāṃsi', meaning: 'உடைகள்' },
    { devanagari: 'ஜீர்ணாணி', roman: 'jīrṇāni', meaning: 'சேிந்த/பழுதான' },
    { devanagari: 'யதா', roman: 'yathā', meaning: 'எப்படி' },
    { devanagari: 'விஹாய', roman: 'vihāya', meaning: 'விட்டு' },
    { devanagari: 'நவாநி', roman: 'navāni', meaning: 'புதியவற்றை' },
    { devanagari: 'கிருஹ்ணாதி', roman: 'gṛhṇāti', meaning: 'அணிகிறான்/ஏற்றுக்கொள்கிறான்' },
    { devanagari: 'நர:', roman: 'naraḥ', meaning: 'மனுஷ்யன்' },
    { devanagari: 'அபராணி', roman: 'aparāṇi', meaning: 'மற்ற (புதிய)வற்றை' },
    { devanagari: 'ததா', roman: 'tathā', meaning: 'அப்படியே' },
    { devanagari: 'ஶரீராணி', roman: 'śarīrāṇi', meaning: 'உடல்கள்' },
    { devanagari: 'விஹாய', roman: 'vihāya', meaning: 'விட்டு' },
    { devanagari: 'ஜீர்ணாணி', roman: 'jīrṇāni', meaning: 'பழையவற்றை' },
    { devanagari: 'அன்ன்யாணி', roman: 'anyāni', meaning: 'பிறவற்றை' },
    { devanagari: 'ஸம்யாதி', roman: 'saṃyāti', meaning: 'அணைகிறான்/செல்கிறான்' },
    { devanagari: 'தேஹீ', roman: 'dehī', meaning: 'உடலுடையவன் (ஆத்மா)' }
  ]
},
{
  id: 22,
  title: 'கீதா 2.23',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'இந்த ஆத்மாவை எந்த ஆயுதமும் துண்டாக்க முடியாது; தீ எரிக்க முடியாது; நீர் நனைக்க முடியாது; காற்று உலர்த்த முடியாது.',
  text: 'நைனஂ ச்ஷிந்தந்தி ஶஸ்த்ராணி நைனஂ தஹதி பாவக: ந சைனம் க்லேதயந்த்யாபோ ந ஶோஷயதி மாருத:',
  words: [
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை/முடியாது' },
    { devanagari: 'ஏனம்', roman: 'enam', meaning: 'இவனை (ஆத்மையை)' },
    { devanagari: 'ச்ஷிந்தந்தி', roman: 'chindanti', meaning: 'துண்டாக்குகின்றன' },
    { devanagari: 'ஶஸ்த்ராணி', roman: 'śastrāṇi', meaning: 'ஆயுதங்கள்' },
    { devanagari: 'தஹதி', roman: 'dahati', meaning: 'எரிக்கிறது' },
    { devanagari: 'பாவக:', roman: 'pāvakaḥ', meaning: 'தீ' },
    { devanagari: 'க்லேதயந்தி', roman: 'kledayanti', meaning: 'நனைக்கின்றன' },
    { devanagari: 'ஆப:', roman: 'āpaḥ', meaning: 'நீர்' },
    { devanagari: 'ஶோஷயதி', roman: 'śoṣayati', meaning: 'உலர்க்கிறது' },
    { devanagari: 'மாருத:', roman: 'mārutaḥ', meaning: 'காற்று' }
  ]
},
{
  id: 23,
  title: 'கீதா 2.24',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'இந்த ஆத்மா உடைக்க இயலாதவன், எரிக்க இயலாதவன், நனைக்க இயலாதவன், உலர்க்க இயலாதவன்; நித்தியன், அனைத்திலும் பரவியவன், நிலைமாறாதவன், அசையாதவன், சநாதனன்.',
  text: 'அச்சேத்தியோʼயம் அதாஹ்யோʼயம் அக்லேத்யோʼஶோஷ்ய ஏவ ச நித்ய: ஸர்வகத: ஸ்தாணுரச்சலோʼயம் ஸநாதன:',
  words: [
    { devanagari: 'அச்சேத்திய:', roman: 'acchedyaḥ', meaning: 'உடைக்க முடியாதவன்' },
    { devanagari: 'அதாஹ்ய:', roman: 'adāhyaḥ', meaning: 'எரிக்க முடியாதவன்' },
    { devanagari: 'அக்லேத்ய:', roman: 'akledyaḥ', meaning: 'நனைக்க முடியாதவன்' },
    { devanagari: 'அஶோஷ்ய:', roman: 'aśoṣyaḥ', meaning: 'உலர்த்த முடியாதவன்' },
    { devanagari: 'நித்ய:', roman: 'nityaḥ', meaning: 'நித்தியன்' },
    { devanagari: 'ஸர்வகத:', roman: 'sarva-gataḥ', meaning: 'எங்கும் பரவி இருப்பவன்' },
    { devanagari: 'ஸ்தாணு:', roman: 'sthāṇuḥ', meaning: 'நிலையானவன்' },
    { devanagari: 'அசல:', roman: 'acalaḥ', meaning: 'அசையாதவன்' },
    { devanagari: 'ஸநாதன:', roman: 'sanātanaḥ', meaning: 'சநாதனன்/நித்தியன்' }
  ]
},
{
  id: 24,
  title: 'கீதா 2.25',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'இந்த ஆத்மா கண்ணுக்குப் புலப்படாதவன், சிந்திக்க முடியாதவன், மாற்றமற்றவன் என்று சொல்லப்படுகிறது. இதனை அறிந்து, நீ உடலுக்காகத் துயரப்பட வேண்டாம்.',
  text: 'அவ்யக்தோʼயம் அசிந்த்யோʼயம் அவிகார்யோʼயமுச்யதே தஸ்மாதேவம் விதித்வைனம் நானுஶோசிதுமர்ஹஸி',
  words: [
    { devanagari: 'அவ்யக்த:', roman: 'avyaktaḥ', meaning: 'புலப்படாதவன்/அருவம்' },
    { devanagari: 'அசிந்த்ய:', roman: 'acintyaḥ', meaning: 'சிந்திக்கமுடியாதவன்' },
    { devanagari: 'அவிகார்ய:', roman: 'avikāryaḥ', meaning: 'மாற்றமற்றவன்' },
    { devanagari: 'உச்யதே', roman: 'ucyate', meaning: 'என்று சொல்லப்படுகிறது' },
    { devanagari: 'தஸ்மாத்', roman: 'tasmāt', meaning: 'எனவே' },
    { devanagari: 'ஏவம் விதித்வா', roman: 'evaṃ viditvā', meaning: 'இவ்வாறு அறிந்து' },
    { devanagari: 'ஏனம்', roman: 'enam', meaning: 'இவனை/ஆத்மையை' },
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை/செய்யாதே' },
    { devanagari: 'அனுஶோசிதும்', roman: 'anuśocitum', meaning: 'துயரப்பட' },
    { devanagari: 'அர்ஹஸி', roman: 'arhasi', meaning: 'நீயேற்றதல்ல' }
  ]
},
{
  id: 25,
  title: 'கீதா 2.26',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஆத்மா எப்போதும் பிறக்கிறான், எப்போதும் இறக்கிறான் என நீ நினைத்தாலும் கூட, ஓ மகாபாகுவே, அதற்காக நீ துயரப்படத் தேவையில்லை.',
  text: 'அத சைனம் நித்யஜாதம் நித்யம் வா மன்யஸே ம்ருதம் ததாபி த்வம் மஹாபாஹோ நைனம் ஶோசிதுமர்ஹசி',
  words: [
    { devanagari: 'அத', roman: 'atha', meaning: 'அப்படியென்றாலும்' },
    { devanagari: 'ச', roman: 'ca', meaning: 'மற்றும்' },
    { devanagari: 'ஏனம்', roman: 'enam', meaning: 'இவனை (ஆத்மையை)' },
    { devanagari: 'நித்யஜாதம்', roman: 'nitya-jātam', meaning: 'எப்போதும் பிறப்பவன்' },
    { devanagari: 'நித்யம்', roman: 'nityam', meaning: 'எப்போதும்' },
    { devanagari: 'வா', roman: 'vā', meaning: 'அல்லது' },
    { devanagari: 'மன்யஸே', roman: 'manyase', meaning: 'நீ நினைத்தாலும்' },
    { devanagari: 'ம்ருதம்', roman: 'mṛtam', meaning: 'இறந்தவன்' },
    { devanagari: 'ததாபி', roman: 'tathāpi', meaning: 'அப்படியேனினும்' },
    { devanagari: 'த்வம்', roman: 'tvam', meaning: 'நீ' },
    { devanagari: 'மஹாபாஹோ', roman: 'mahā-bāho', meaning: 'மிகப் பலம் கொண்டவனே' },
    { devanagari: 'நைனம்', roman: 'na enam', meaning: 'இவனைப் பற்றி அல்ல' },
    { devanagari: 'ஶோசிதும்', roman: 'śocitum', meaning: 'துயரப்பட' },
    { devanagari: 'அர்ஹஸி', roman: 'arhasi', meaning: 'நீயேற்றதல்ல' }
  ]
},
{
  id: 26,
  title: 'கீதா 2.27',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'பிறந்தவருக்கு மரணம் நிச்சயம்; இறந்தவருக்கு பிறப்பு நிச்சயம். ஆகவே தவிர்க்க முடியாத கடமையில் நீ துயரப்படாதே.',
  text: 'ஜாதஸ்ய ஹி தருவோ மருத்யுர் தருவம் ஜன்ம மருதஸ்ய ச தஸ்மாத் அபரிஹார்யேʼர்த்தே ந த்வம் ஶோசிதுமர்ஹசி',
  words: [
    { devanagari: 'ஜாதஸ்ய', roman: 'jātasya', meaning: 'பிறந்தவனுக்கு' },
    { devanagari: 'ஹி', roman: 'hi', meaning: 'நிச்சயம்' },
    { devanagari: 'த்ருவ:', roman: 'dhruvaḥ', meaning: 'நிலைத்த/நிச்சயம்' },
    { devanagari: 'மருத்யு:', roman: 'mṛtyuḥ', meaning: 'மரணம்' },
    { devanagari: 'த்ருவம்', roman: 'dhruvam', meaning: 'நிச்சயம்' },
    { devanagari: 'ஜன்ம', roman: 'janma', meaning: 'பிறப்பு' },
    { devanagari: 'மருதஸ்ய', roman: 'mṛtasya', meaning: 'இறந்தவனுக்கு' },
    { devanagari: 'ச', roman: 'ca', meaning: 'மேலும்' },
    { devanagari: 'தஸ்மாத்', roman: 'tasmāt', meaning: 'எனவே' },
    { devanagari: 'அபரிஹார்யே அர்த்தே', roman: 'aparihārye arthe', meaning: 'தவிர்க்க இயலாத செயலில்' },
    { devanagari: 'ந த்வம்', roman: 'na tvam', meaning: 'நீ அல்ல' },
    { devanagari: 'ஶோசிதும்', roman: 'śocitum', meaning: 'துயரப்பட' },
    { devanagari: 'அர்ஹசி', roman: 'arhasi', meaning: 'வேண்டாம்/ஏற்றதல்ல' }
  ]
}
,
{
  id: 27,
  title: 'கீதா 2.28',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'பிறப்பு முன் அனைத்துப் பாவனைகளும் (ஜீவன்களும்) அவ்யக்தம்; நடுநிலையில் வ்யக்தம்; முடிவில் மீண்டும் அவ்யக்தம். ஆகையால் இவ்விஷயத்தில் ஏன் துயரப்பட வேண்டும்?',
  text: 'அவ்யக்தாதீனி பூதானி வ்யக்தமத்யானி பாரத அவ்யக்தநிதனாந்யேவ தத்ர கா பரிதேவனா',
  words: [
    { devanagari: 'அவ்யக்தாதீனி', roman: 'avyaktādīni', meaning: 'ஆரம்பத்தில் அவ்யக்தமானவை' },
    { devanagari: 'பூதானி', roman: 'bhūtāni', meaning: 'உருவான அனைத்து ஜீவன்களும்' },
    { devanagari: 'வ்யக்த', roman: 'vyakta', meaning: 'வ்யக்தம்/புலப்படும்' },
    { devanagari: 'மத்யானி', roman: 'madhyāni', meaning: 'நடுநிலையில்' },
    { devanagari: 'பாரத', roman: 'bhārata', meaning: 'ஓ பாரதா' },
    { devanagari: 'அவ்யக்த', roman: 'avyakta', meaning: 'அவ்யக்தம்/புலப்படாத' },
    { devanagari: 'நிதனாநி', roman: 'nidhanāni', meaning: 'முடிவில் (அழிவில்) அப்படியே' },
    { devanagari: 'ஏவ', roman: 'eva', meaning: 'தான்/உண்மையிலே' },
    { devanagari: 'தத்ர', roman: 'tatra', meaning: 'அப்படியானால்/அதில்' },
    { devanagari: 'கா', roman: 'kā', meaning: 'என்ன (எதற்காக)' },
    { devanagari: 'பரிதேவனா', roman: 'paridevanā', meaning: 'துயர்ப்பாடு/புலம்பல்' }
  ]
},
{
  id: 28,
  title: 'கீதா 2.29',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'யாரோ ஆத்மாவைப் அதிசயமாகக் காண்கிறார்கள்; யாரோ அதிசயமாய் விவரிக்கிறார்கள்; யாரோ அதிசயமாய் கேட்கிறார்கள்; கேட்ட பிறகும் பலருக்குத் தெளிவாகப் புரியாது.',
  text: 'ஆஶ்சர்யவத் பஶ்யதி கஶ்சித்எனம் ஆஶ்சர்யவத் வடதி ததைவ சாந்ய: ஆஶ்சர்யவச்சைநமன்ய: ஶ்ருணோதி ஶ்ருத்வாப்யேனம் வேத ந சைவ கஶ்சித்',
  words: [
    { devanagari: 'ஆஶ்சர்யவத்', roman: 'āścaryavat', meaning: 'அதிசயமாய்' },
    { devanagari: 'பஶ்யதி', roman: 'paśyati', meaning: 'காண்கிறான்' },
    { devanagari: 'கஶ்சித்', roman: 'kaścit', meaning: 'யாரோ/சிலர்' },
    { devanagari: 'எனம்', roman: 'enam', meaning: 'இந்த ஆத்மாவை' },
    { devanagari: 'வடதி', roman: 'vadati', meaning: 'பேசுகிறார்/விவரிக்கிறார்' },
    { devanagari: 'ததா ஏவ', roman: 'tathā eva', meaning: 'அப்படியே' },
    { devanagari: 'அந்ய:', roman: 'anyaḥ', meaning: 'மற்றொருவர்' },
    { devanagari: 'ஶ்ருணோதி', roman: 'śṛṇoti', meaning: 'கேட்கிறான்' },
    { devanagari: 'ஶ்ருத்வா அப்பி', roman: 'śrutvā api', meaning: 'கேட்ட பிறகும்' },
    { devanagari: 'வேத ந', roman: 'veda na', meaning: 'அறியமாட்டான்' },
    { devanagari: 'சைவ', roman: 'caiva', meaning: 'மேலும் கூட' },
    { devanagari: 'கஶ்சித்', roman: 'kaścit', meaning: 'யாரோ/யாருமே' }
  ]
},
{
  id: 29,
  title: 'கீதா 2.30',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஓ பாரதா, உடலுள் வசிக்கும் தேஹி நித்தியன்; அவனை ஒருபோதும் கொல்ல முடியாது. ஆகவே எந்த ஜீவனுக்காகவும் நீ துயரப்பட வேண்டாம்.',
  text: 'தேஹீ நித்யமவத்யோʼயம் தேஹே ஸர்வஸ்ய பாரத தஸ்மாத் ஸர்வாணி பூதானி ந த்வம் ஶோசிதுமர்ஹசி',
  words: [
    { devanagari: 'தேஹீ', roman: 'dehī', meaning: 'உடலுடையவன் (ஆத்மா)' },
    { devanagari: 'நித்யம்', roman: 'nityam', meaning: 'நித்தியன்' },
    { devanagari: 'அவத்ய:', roman: 'avadhyaḥ', meaning: 'கொல்லமுடியாதவன்' },
    { devanagari: 'அயம்', roman: 'ayam', meaning: 'இவன்' },
    { devanagari: 'தேஹே ஸர்வஸ்ய', roman: 'dehe sarvasya', meaning: 'எல்லோரின் உடலிலும்' },
    { devanagari: 'பாரத', roman: 'bhārata', meaning: 'ஓ பாரதா' },
    { devanagari: 'தஸ்மாத்', roman: 'tasmāt', meaning: 'எனவே' },
    { devanagari: 'ஸர்வாணி பூதானி', roman: 'sarvāṇi bhūtāni', meaning: 'அனைத்து ஜீவராசிகளும்' },
    { devanagari: 'ந த்வம்', roman: 'na tvam', meaning: 'நீ அல்ல' },
    { devanagari: 'ஶோசிதும்', roman: 'śocitum', meaning: 'துயரப்பட' },
    { devanagari: 'அர்ஹசி', roman: 'arhasi', meaning: 'ஏற்றதல்ல' }
  ]
},
{
  id: 30,
  title: 'கீதா 2.31',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'உன் ஸ்வதர்மத்தை நினைத்தாலும், உனக்குத் தயக்கம் இடமில்லை. தர்மமான யுத்தத்தைவிட க்ஷத்ரியனுக்குப் பெரிய கற்றல்/கடமை இல்லை.',
  text: 'ஸ்வதர்மமபி சாவேக்ஷ்ய ந விகம்பிதுமர்ஹசி தர்ம்யாத் ஹி யுத்தாத் ஶ்ரேயோʼன்யத் க்ஷத்ரியஸ்ய ந வித்யதே',
  words: [
    { devanagari: 'ஸ்வதர்மம்', roman: 'svadharmam', meaning: 'தன் இயல்பு-கடமை' },
    { devanagari: 'அபி ச', roman: 'api ca', meaning: 'மேலும் கூட' },
    { devanagari: 'ஆவேக்ஷ்ய', roman: 'āvekṣya', meaning: 'கருதி/கருதிப் பார்த்து' },
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை' },
    { devanagari: 'விகம்பிதும்', roman: 'vikampitum', meaning: 'தயங்க' },
    { devanagari: 'அர்ஹசி', roman: 'arhasi', meaning: 'நீயேற்றதல்ல' },
    { devanagari: 'தர்ம்யாத்', roman: 'dharmyāt', meaning: 'தர்மமான' },
    { devanagari: 'ஹி', roman: 'hi', meaning: 'உண்மையில்' },
    { devanagari: 'யுத்தாத்', roman: 'yuddhāt', meaning: 'யுத்தத்திலிருந்து' },
    { devanagari: 'ஶ்ரேய:', roman: 'śreyaḥ', meaning: 'மேன்மை/உயர்ச்சி' },
    { devanagari: 'அன்யத்', roman: 'anyat', meaning: 'வேறு ஒன்று' },
    { devanagari: 'க்ஷத்ரியஸ்ய', roman: 'kṣatriyasya', meaning: 'க்ஷத்ரியனுக்கு' },
    { devanagari: 'ந வித்யதே', roman: 'na vidyate', meaning: 'இல்லை' }
  ]
},
{
  id: 31,
  title: 'கீதா 2.32',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஓ பார்த்தா, தானாக வந்து, சொர்க்கத்தின் கதவைத் தாழ்வின்றி திறக்கும் இத்தகைய யுத்த வாய்ப்பு கிடைப்பது க்ஷத்ரியருக்கு பேரானந்தம்.',
  text: 'யத்ருச்சயா சோபபந்நம் ஸ்வர்கத்வாரம் அபாவ்ருதம் ஸுகினஃ க்ஷத்ரியாஃ பார்த்த லபந்தே யுத்தமீத்ரஶம்',
  words: [
    { devanagari: 'யத்ருச்சயா', roman: 'yadṛcchayā', meaning: 'தானாக/சந்தர்ப்பமாக' },
    { devanagari: 'உபபந்நம்', roman: 'upapannam', meaning: 'வந்து சேர்ந்தது' },
    { devanagari: 'ஸ்வர்க-த்வாரம்', roman: 'svarga-dvāram', meaning: 'சொர்க்கத்தின் வாயில்' },
    { devanagari: 'அபாவ்ருதம்', roman: 'apāvṛtam', meaning: 'திறந்திருக்குவது' },
    { devanagari: 'ஸுகினஃ', roman: 'sukhinaḥ', meaning: 'பேரானந்தமடைவர்' },
    { devanagari: 'க்ஷத்ரியாஃ', roman: 'kṣatriyāḥ', meaning: 'க்ஷத்ரியர்கள்' },
    { devanagari: 'பார்த்த', roman: 'pārtha', meaning: 'ஓ பார்த்தா' },
    { devanagari: 'லபந்தே', roman: 'labhante', meaning: 'பெறுகின்றனர்' },
    { devanagari: 'யுத்தம்', roman: 'yuddham', meaning: 'யுத்த வாய்ப்பு' },
    { devanagari: 'ஈத்ரஶம்', roman: 'īdṛśam', meaning: 'இத்தகைய' }
  ]
}
,
{
  id: 32,
  title: 'கீதா 2.33',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'இவ்வாறு தர்மமான இந்தப் போரில் நீ ஈடுபடாவிட்டால், உன் ஸ்வதர்மத்தையும் கீர்த்தியையும் கைவிட்டு பாபத்தை அடைவாய்.',
  text: 'அத செத்த்வமிமம் தர்ம்யம் ஸங்க்ராமம் ந கரிஷ்யஸி ததஃ ஸ்வதர்மம் கீர்திம் ச ஹித்வா பாபமவாப்ஸ்யஸி',
  words: [
    { devanagari: 'அத', roman: 'atha', meaning: 'அப்படியெனில்/அல்லையெனில்' },
    { devanagari: 'செத்', roman: 'cet', meaning: 'என்றால்' },
    { devanagari: 'த்வம்', roman: 'tvam', meaning: 'நீ' },
    { devanagari: 'இமம்', roman: 'imam', meaning: 'இந்த' },
    { devanagari: 'தர்ம்யம்', roman: 'dharmyam', meaning: 'தர்மமான (நியாயமான)' },
    { devanagari: 'ஸங்க்ராமம்', roman: 'saṅgrāmam', meaning: 'போர்' },
    { devanagari: 'ந கரிஷ்யசி', roman: 'na kariṣyasi', meaning: 'செய்யாவிட்டால்' },
    { devanagari: 'ததஃ', roman: 'tataḥ', meaning: 'அப்பொழுது' },
    { devanagari: 'ஸ்வதர்மம்', roman: 'svadharmam', meaning: 'உன் சொந்த தர்மம்' },
    { devanagari: 'கீர்திம்', roman: 'kīrtim', meaning: 'கீர்த்தி' },
    { devanagari: 'ச', roman: 'ca', meaning: 'மற்றும்' },
    { devanagari: 'ஹித்வா', roman: 'hitvā', meaning: 'கைவிட்டு' },
    { devanagari: 'பாபம்', roman: 'pāpam', meaning: 'பாபம்' },
    { devanagari: 'அவாப்ஸ்யசி', roman: 'avāpsyasi', meaning: 'அடைவோய்' }
  ]
},
{
  id: 33,
  title: 'கீதா 2.34',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'உன் அகீர்த்தியை மக்கள் எப்போதும் பேசிக்கொண்டே இருப்பார்கள்; மதிப்புக் கண்டவர்க்கு அகீர்த்தி மரணத்தைவிட வேதனைமானது.',
  text: 'அகீர்திம் சாபி பூதானி கதயிஷ்யந்தி தேʼஅவ்யயாம் ஸம்பாவிதஸ்ய சாகீர்திர்மரணாததிரிச்சதே',
  words: [
    { devanagari: 'அகீர்திம்', roman: 'akīrtim', meaning: 'அகீர்த்தி/தீக்கீர்த்தி' },
    { devanagari: 'ச ஆபி', roman: 'ca api', meaning: 'மேலும் கூட' },
    { devanagari: 'பூதானி', roman: 'bhūtāni', meaning: 'மக்கள் அனைவரும்' },
    { devanagari: 'கதயிஷ்யந்தி', roman: 'kathayiṣyanti', meaning: 'பேசுவார்கள்' },
    { devanagari: 'தே', roman: 'te', meaning: 'உன்னைப் பற்றி' },
    { devanagari: 'அவ்யயாம்', roman: 'avyayām', meaning: 'என்றும் நீங்காத' },
    { devanagari: 'ஸம்பாவிதஸ்ய', roman: 'sambhāvitasya', meaning: 'மதிப்புக் கண்டவனுக்கு' },
    { devanagari: 'ச', roman: 'ca', meaning: 'மேலும்' },
    { devanagari: 'அகீர்திஃ', roman: 'akīrtiḥ', meaning: 'அகீர்த்தி' },
    { devanagari: 'மரணாத்', roman: 'maraṇāt', meaning: 'மரணத்தைவிட' },
    { devanagari: 'அதிரிச்சதே', roman: 'atiricyate', meaning: 'மேலோங்கியது/மேலும் கஷ்டமானது' }
  ]
},
{
  id: 34,
  title: 'கீதா 2.35',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'மகா ரதர்கள் — உன்னை உயர்ந்து மதித்தவர்களே — பயத்தால் போர்க்களத்தை விட்டு ஓடியதாக நினைப்பார்கள்; அதனால் உன் மதிப்பு குறைந்துவிடும்.',
  text: 'பயாத் ரணாத் உபரதம் மந்ஸ்யந்தே த்வாம் மஹாரதாஃ யேஷாம் ச த்வம் பகுமதோ பூத்வா யாஸ்யசி லாகவம்',
  words: [
    { devanagari: 'பயாத்', roman: 'bhayāt', meaning: 'பயத்தால்' },
    { devanagari: 'ரணாத்', roman: 'raṇāt', meaning: 'போர்க்களத்திலிருந்து' },
    { devanagari: 'உபரதம்', roman: 'uparatam', meaning: 'விலகினவன்/நிறுத்தியவன்' },
    { devanagari: 'மந்ஸ்யந்தே', roman: 'maṁsyante', meaning: 'என்று நினைப்பார்கள்' },
    { devanagari: 'த்வாம்', roman: 'tvām', meaning: 'உன்னை' },
    { devanagari: 'மஹாரதாஃ', roman: 'mahārathāḥ', meaning: 'மிகப் பெரிய ரதசாரிகள்/முன்னணி வீரர்கள்' },
    { devanagari: 'யேஷாம்', roman: 'yeṣām', meaning: 'யாரிடம்' },
    { devanagari: 'ச', roman: 'ca', meaning: 'மேலும்' },
    { devanagari: 'த்வம்', roman: 'tvam', meaning: 'நீ' },
    { devanagari: 'பஹுமத:', roman: 'bahu-mataḥ', meaning: 'மிக மதிக்கப்படுபவன்' },
    { devanagari: 'பூத்வா', roman: 'bhūtvā', meaning: 'ஆகி' },
    { devanagari: 'யாஸ்யசி', roman: 'yāsyasi', meaning: 'சென்று விடுவாய்/வருவாய்' },
    { devanagari: 'லாகவம்', roman: 'lāghavam', meaning: 'லாகவம் (மதிப்பு குறைதல்/லேசான நிலை)' }
  ]
},
{
  id: 35,
  title: 'கீதா 2.36',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'உன் எதிரிகள் பல அவமதிப்புக் கூறுகளை உன்னைப் பற்றி கூறுவார்கள்; உன் திறனை இழிவுபடுத்துவார்கள் — அதைவிட வேதனை எது?',
  text: 'அவாச்யவாதான்ஶ்ச பகூன் வதிஷ்யந்தி தவாஹிதாஃ நிந்தந்தஸ்தவ ஸாமர்த்யம் ததஃ துஃக்தரம் நு கிம்',
  words: [
    { devanagari: 'அவாச்ய-வாதான்', roman: 'avācya-vādān', meaning: 'அவமதிப்புக் கூறுகள்/சொல்லக் கூடாத சொற்கள்' },
    { devanagari: 'பகூன்', roman: 'bahūn', meaning: 'பலவற்றை' },
    { devanagari: 'வதிஷ்யந்தி', roman: 'vadiṣyanti', meaning: 'சொல்வார்கள்' },
    { devanagari: 'தவ', roman: 'tava', meaning: 'உன்னைப் பற்றி' },
    { devanagari: 'அஹிதாஃ', roman: 'ahitāḥ', meaning: 'எதிரிகள்' },
    { devanagari: 'நிந்தந்த:', roman: 'nindantaḥ', meaning: 'இழிவுபடுத்தி' },
    { devanagari: 'ஸாமர்த்யம்', roman: 'sāmarthyam', meaning: 'திறன்/சாமர்த்தியம்' },
    { devanagari: 'ததஃ', roman: 'tataḥ', meaning: 'அதற்கு மேல்' },
    { devanagari: 'துஃக்தரம்', roman: 'duḥkhataram', meaning: 'மேலும் துன்பமானது' },
    { devanagari: 'நு கிம்', roman: 'nu kim', meaning: 'எது இருக்க முடியும்?' }
  ]
},
{
  id: 36,
  title: 'கீதா 2.37',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'கொல்லப்பட்டால் சொர்க்கம் பெறுவாய்; வென்றால் பூமியை அனுபவிப்பாய். ஆகவே, கௌந்தேயா, உறுதி செய்து எழுந்து யுத்தம் செய்.',
  text: 'ஹதோ வா ப்ராப்ஸ்யசி ஸ்வர்கம் ஜித்வா வா போக்ஷ்யசே மஹீம் தஸ்மாதுத்திஷ்ட கௌந்தேய யுத்தாய க்ருதநிச்சயஃ',
  words: [
    { devanagari: 'ஹதஃ', roman: 'hataḥ', meaning: 'கொல்லப்பட்டால்' },
    { devanagari: 'வா', roman: 'vā', meaning: 'அல்லது' },
    { devanagari: 'ப்ராப்ஸ்யசி', roman: 'prāpsyasi', meaning: 'பெறுவாய்' },
    { devanagari: 'ஸ்வர்கம்', roman: 'svargam', meaning: 'சொர்க்கம்' },
    { devanagari: 'ஜித்வா', roman: 'jitvā', meaning: 'வென்று' },
    { devanagari: 'போக்ஷ்யசே', roman: 'bhokṣyase', meaning: 'அனுபவிப்பாய்' },
    { devanagari: 'மஹீம்', roman: 'mahīm', meaning: 'பூமியை/ராஜ்யத்தை' },
    { devanagari: 'தஸ்மாத்', roman: 'tasmāt', meaning: 'எனவே' },
    { devanagari: 'உத்திஷ்ட', roman: 'uttiṣṭha', meaning: 'எழுந்திரு' },
    { devanagari: 'கௌந்தேய', roman: 'kaunteya', meaning: 'குந்தியின் மகனே' },
    { devanagari: 'யுத்தாய', roman: 'yuddhāya', meaning: 'யுத்தத்திற்காக' },
    { devanagari: 'க்ருத-நிச்சயஃ', roman: 'kṛta-niścayaḥ', meaning: 'உறுதி செய்தவனாய்' }
  ]
},
 {
  id: 37,
  title: 'கீதா 2.38',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'சுக–துக்கம், லாப–அலாபம், ஜயம்–அஜயம் ஆகியவற்றில் சமநிலை கொண்டு, யுத்தத்தை யுத்தம் என்பதற்காகவே செய்; அப்படிச் செய்தால் பாபம் உனக்குப் படராது.',
  text: 'ஸுகதுஃகே ஸமே க்ருத்வா லாபாலாபௌ ஜயாஜயௌ ததஃ யுத்தாய யுஜ்யஸ்வ நைவம் பாபமவாப்ஸ்யஸி',
  words: [
    { devanagari: 'ஸுக', roman: 'sukha', meaning: 'சுகம்' },
    { devanagari: 'துஃகே', roman: 'duḥkhe', meaning: 'துன்பத்தில்' },
    { devanagari: 'ஸமே', roman: 'same', meaning: 'சமநிலையில்' },
    { devanagari: 'க்ருத்வா', roman: 'kṛtvā', meaning: 'இப்படிச் செய்து' },
    { devanagari: 'லாப', roman: 'lābha', meaning: 'லாபம்' },
    { devanagari: 'அலாபௌ', roman: 'alābhau', meaning: 'அலாபம் (இழப்பு)' },
    { devanagari: 'ஜய', roman: 'jaya', meaning: 'வெற்றி' },
    { devanagari: 'அஜயௌ', roman: 'ajayau', meaning: 'தோல்வி' },
    { devanagari: 'ததஃ', roman: 'tataḥ', meaning: 'பின்னர்/அதனால்' },
    { devanagari: 'யுத்தாய', roman: 'yuddhāya', meaning: 'யுத்தத்திற்காக' },
    { devanagari: 'யுஜ்யஸ்வ', roman: 'yujyasva', meaning: 'யுத்தத்தில் ஈடுபடு' },
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை' },
    { devanagari: 'ஏவம்', roman: 'evaṃ', meaning: 'இவ்வாறாக' },
    { devanagari: 'பாபம்', roman: 'pāpam', meaning: 'பாபம்' },
    { devanagari: 'அவாப்ஸ்யஸி', roman: 'avāpsyasi', meaning: 'உனக்குப் படராது/அடைய மாட்டாய்' }
  ]
},
{
  id: 38,
  title: 'கீதா 2.39',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'இதுவரை சாங்க்ய(தத்துவ) அறிவைப் பற்றி சொன்னேன். இப்போது கர்மயோக அறிவைக் கேள்; அதனால், பார்த்தா, அந்தப் புத்தியுடன் நடந்து கொண்டால் கர்மபந்தத்திலிருந்து விடுபடுவாய்.',
  text: 'ஏஷா தேʼபிஹிதா ஸாங்க்யே புத்திர்யோகே த்விமாம் ஶ்ருணு புத்த்யா யுக்தோ யயா பார்த்த கர்மபந்தம் ப்ரஹாஸ்யஸி',
  words: [
    { devanagari: 'ஏஷா', roman: 'eṣā', meaning: 'இது (இதுவரை கூறியது)' },
    { devanagari: 'தே அபிஹிதா', roman: 'te abhihitā', meaning: 'உனக்குச் சொல்லப்பட்டது' },
    { devanagari: 'ஸாங்க்யே', roman: 'sāṅkhye', meaning: 'சாங்க்யத்தில் (தத்துவ விரிவாய்வு)' },
    { devanagari: 'புத்தி:', roman: 'buddhiḥ', meaning: 'புத்தி/அறிவு' },
    { devanagari: 'யோகே', roman: 'yoge', meaning: 'கர்மயோகத்தில்' },
    { devanagari: 'து', roman: 'tu', meaning: 'ஆனால்/இப்போது' },
    { devanagari: 'இமாம் ஶ்ருணு', roman: 'imām śṛṇu', meaning: 'இதைக் கேள்' },
    { devanagari: 'புத்த்யா யுக்த:', roman: 'buddhyā yuktaḥ', meaning: 'அத்தகைய புத்தியுடன் இணைந்து' },
    { devanagari: 'யயா', roman: 'yayā', meaning: 'எந்த (புத்தியால்)' },
    { devanagari: 'பார்த்த', roman: 'pārtha', meaning: 'ஓ பார்த்தா' },
    { devanagari: 'கர்மபந்தம்', roman: 'karma-bandham', meaning: 'கர்மப் பந்தம்' },
    { devanagari: 'ப்ரஹாஸ்யஸி', roman: 'prahāsyasi', meaning: 'விடுவாய்/விடுபடுவாய்' }
  ]
},
{
  id: 39,
  title: 'கீதா 2.40',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'இந்த (யோக) முயற்சியில் இழப்பு இல்லை; பின்விளைவு இல்லை. இதன் தர்மத்தில் சிறிதளவும் முன்னேற்றம் பெரும் பயமிலிருந்து காப்பாற்றும்.',
  text: 'நேஹாபிக்ரமநாஶோʼஸ்தி பிரத்யவாயோ ந வித்யதே ஸ்வல்பமப்யஸ்ய தர்மஸ்ய த்ராயதே மஹதோ பயாத்',
  words: [
    { devanagari: 'ந இஹ', roman: 'na iha', meaning: 'இங்கே இல்லை' },
    { devanagari: 'அபிக்ரம-நாஶ:', roman: 'abhikrama-nāśaḥ', meaning: 'முயற்சி வீண் ஆகுதல்' },
    { devanagari: 'ப்ரத்யவாய:', roman: 'pratyavāyaḥ', meaning: 'பின்விளைவு/தீங்கு' },
    { devanagari: 'ந வித்யதே', roman: 'na vidyate', meaning: 'இல்லை' },
    { devanagari: 'ஸ்வல்பம் அபி', roman: 'svalpam api', meaning: 'சிறிதளவாயினும்' },
    { devanagari: 'அஸ்ய தர்மஸ்ய', roman: 'asya dharmasya', meaning: 'இந்த தர்மத்தின்' },
    { devanagari: 'த்ராயதே', roman: 'trāyate', meaning: 'காப்பாற்றும்' },
    { devanagari: 'மஹத:', roman: 'mahataḥ', meaning: 'மிகப் பெரிய' },
    { devanagari: 'பயாத்', roman: 'bhayāt', meaning: 'பயத்திலிருந்து' }
  ]
},
{
  id: 40,
  title: 'கீதா 2.41',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'இந்தப் பாதையில் உள்ளோரின் புத்தி ஒரே குறிக்கோளில் நிலைபெற்றது. ஓ குருநந்தனா, நிலைபெறாதோரின் புத்தி பல கிளைகளாகப் பிதுங்கும்.',
  text: 'வ்யவசாயாத்மிகா புத்திரேகேஹ குருநந்தந பஹுஷாகா ஹ்யநந்தாஶ்ச புத்தயோʼவ்யவசாயினாம்',
  words: [
    { devanagari: 'வ்யவசாயாத்மிகா புத்தி:', roman: 'vyavasāyātmikā buddhiḥ', meaning: 'உறுதியான/நிலைபெற்ற புத்தி' },
    { devanagari: 'ஏகா இஹ', roman: 'ekā iha', meaning: 'இங்கே ஒன்றே' },
    { devanagari: 'குருநந்தந', roman: 'kuru-nandana', meaning: 'ஓ குரு வம்சப் பொன்னானவா' },
    { devanagari: 'பஹு-ஶாகா', roman: 'bahu-śākhā', meaning: 'பல கிளைகள்' },
    { devanagari: 'ஹி அநந்தா:', roman: 'hi anantāḥ', meaning: 'மிக அதிகமானவை' },
    { devanagari: 'புத்தய:', roman: 'buddhayaḥ', meaning: 'புத்திகள்/சிந்தனைகள்' },
    { devanagari: 'அவ்யவசாயிநாம்', roman: 'avyavasāyinām', meaning: 'உறுதியற்றோரின்' }
  ]
},
{
  id: 41,
  title: 'கீதா 2.42–2.43',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'குறைந்த அறிவுடையவர்கள் வேதத்தின் பூப்பொலிவு சொற்களில் மயங்கி, சொர்க்கம், நல்ல பிறப்பு, பலன் தரும் கிரியைகள் போன்ற இன்ப–ஐஸ்வர்யங்களைப் பேசிச் சொல்லி “இதற்கு மேல் எதுவும் இல்லை” என்கிறார்கள்.',
  text: 'யாமிமாம் புஷ்பிதாம் வாசம் ப்ரவதந்த்யவிபஶ்சித: வேதவாதரதா: பார்த்த நாந்யதஸ்தீதி வாதின: காமாத்மான: ஸ்வர்கபரா ஜன்மகர்மபலப்ரதாம் கிரியாவிஶேஷபஹுலாம் போகஐஶ்வர்யகதிம் ப்ரதி',
  words: [
    { devanagari: 'யாம் இமாம் புஷ்பிதாம் வாசம்', roman: 'yām imāṃ puṣpitāṃ vācam', meaning: 'பூப்பொலிவு கொண்ட அந்தச் சொற்கள்' },
    { devanagari: 'ப்ரவதந்தி', roman: 'pravadanti', meaning: 'சொல்கின்றனர்' },
    { devanagari: 'அவிபஶ்சித:', roman: 'avipaścitaḥ', meaning: 'அறிவு குறைந்தவர்கள்' },
    { devanagari: 'வேதவாத-ரதா:', roman: 'veda-vāda-ratāḥ', meaning: 'வேத வாதத்தில் மயங்கியோர்' },
    { devanagari: 'பார்த்த', roman: 'pārtha', meaning: 'ஓ பார்த்தா' },
    { devanagari: 'நாந்யத் அஸ்தி இதி வாதின:', roman: 'nānyad asti iti vādinaḥ', meaning: '“இதற்கு மேல் எதுவும் இல்லை” என வாதிப்பவர்கள்' },
    { devanagari: 'காமாத்மான:', roman: 'kāmātmānaḥ', meaning: 'இன்பாசையில் ஆழ்ந்தவர்கள்' },
    { devanagari: 'ஸ்வர்கபரா:', roman: 'svarga-parāḥ', meaning: 'சொர்க்கமே குறிக்கோள்' },
    { devanagari: 'ஜன்ம-கர்ம-பல-ப்ரதாம்', roman: 'janma-karma-phala-pradām', meaning: 'நல்ல பிறப்பு/கர்மபலன் தருவனென்று சொல்லும்' },
    { devanagari: 'கிரியா-விஶேஷ-பஹுலாம்', roman: 'kriyā-viśeṣa-bahulām', meaning: 'விழாவித்த கிரியைகள் நிறைந்த' },
    { devanagari: 'போக-ஐஶ்வர்ய-கதிம் ப்ரதி', roman: 'bhoga-aiśvarya-gatiṃ prati', meaning: 'போகமும் ஐஶ்வர்யமும் நோக்கி' }
  ]
}
,
{
  id: 42,
  title: 'கீதா 2.44',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'போகமும் ஐஶ்வர்யமும் மேல் மிகைப்ட்ட ஆசை கொண்டு, அவையால் மனம் கவரப்பட்டவர்களுக்குத் திடமான சமாதி-புத்தி (ஒருமுனைப்புத் தீர்மானம்) உண்டாகாது.',
  text: 'போகஐஶ்வர்ய-ப்ரசக்தாநாம் தயா அபஹ்ருத-சேதஸாம் வ்யவசாயாத்மிகா புத்தி: சமாதௌ ந விதீயதே',
  words: [
    { devanagari: 'போக', roman: 'bhoga', meaning: 'இன்ப அனுபவம்' },
    { devanagari: 'ஐஶ்வர்ய', roman: 'aiśvarya', meaning: 'ஐஶ்வர்யம்/செல்வழகு' },
    { devanagari: 'ப்ரசக்தானாம்', roman: 'prasaktānām', meaning: 'அவற்றில் பற்றுடன் மாட்டியோருக்கு' },
    { devanagari: 'தயா', roman: 'tayā', meaning: 'அவற்றாலே' },
    { devanagari: 'அபஹ்ருத-சேதஸாம்', roman: 'apahṛta-cetasām', meaning: 'மனம் கொள்ளை கொள்ளப்பட்டோருக்குப்' },
    { devanagari: 'வ்யவசாயாத்மிகா', roman: 'vyavasāyātmikā', meaning: 'திடமான/ஒருமுனைப்பான' },
    { devanagari: 'புத்தி:', roman: 'buddhiḥ', meaning: 'புத்தி' },
    { devanagari: 'ஸமாதௌ', roman: 'samādhau', meaning: 'சமாதியில்/ஒருமனப்பாங்கில்' },
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை' },
    { devanagari: 'விதீயதே', roman: 'vidhīyate', meaning: 'நடை பெறுவதில்லை' }
  ]
},
{
  id: 43,
  title: 'கீதா 2.45',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'வேதங்கள் பெரும்பாலும் மூன்று குணங்களின் விஷயங்களைப் பேசுகின்றன. ஓ அர்ஜுனா, நீ அந்தக் குணங்களைத் தாண்டி நிர்குண நிலையைக் கடைபிடி; இரண்டுகளிலிருந்து விடுபட்டு, நித்திய சத்த்வத்தில் நிலைத்து, அடைவு-பாதுகாப்பு பற்றில்லாமல், ஆத்மநிஷ்டனாக இரு.',
  text: 'த்ரைகுண்ய-விஷயா வேதா: நிஸ்த்ரைகுண்யோ பவார்ஜுன நிர்த்வந்த்வோ நித்ய-ஸத்த்வஸ்தோ நிர்யோகக்ஷேம ஆத்மவான்',
  words: [
    { devanagari: 'த்ரைகுண்ய-விஷயா வேதா:', roman: 'trai-guṇya-viṣayā vedāḥ', meaning: 'மூன்று குண விஷயங்களைப் பேசும் வேதங்கள்' },
    { devanagari: 'நிஸ்த்ரைகுண்ய:', roman: 'nistraiguṇyaḥ', meaning: 'குணங்களைத் தாண்டிய நிலை' },
    { devanagari: 'பவ', roman: 'bhava', meaning: 'இரு/ஆகு' },
    { devanagari: 'அர்ஜுன', roman: 'arjuna', meaning: 'அர்ஜுனா' },
    { devanagari: 'நிர்த்வந்த்வ:', roman: 'nirdvandvaḥ', meaning: 'இரண்டுகளிலிருந்து (சூடு/சீர்) விடுபட்டு' },
    { devanagari: 'நித்ய-ஸத்த்வ-ஸ்த:', roman: 'nitya-sattva-sthaḥ', meaning: 'நித்திய சத்த்வத்தில் நிலைபெற்று' },
    { devanagari: 'நிர்யோக-க்ஷேம:', roman: 'nir-yoga-kṣemaḥ', meaning: 'அடைவு-பாதுகாப்பு பற்றில்லாமல்' },
    { devanagari: 'ஆத்மவான்', roman: 'ātmavān', meaning: 'ஆத்மநிஷ்டன்/ஆத்மாவில் நிலைபெற்றவன்' }
  ]
},
{
  id: 44,
  title: 'கீதா 2.46',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'சிறு கிணற்றின் பயன்பாடு எவ்வளவு என்று பெரிய ஏரியில் நிறைவாக கிடைப்பது போல, வேதங்களின் எல்லாப் பயன்களும் அவற்றின் தாத்த்விக நோக்கை உணர்ந்த ஞானிக்கு தானாகக் கைவந்துவிடும்.',
  text: 'யாவானர்த்த உதபானே ஸர்வதஃ ஸம்ப்லுதோதகே தாவான் ஸர்வேஷு வேதேஷு ப்ராஹ்மணஸ்ய விஜாநதஃ',
  words: [
    { devanagari: 'யாவான் அர்த்த:', roman: 'yāvān arthaḥ', meaning: 'எவ்வளவு பயன்பாடு' },
    { devanagari: 'உதபானே', roman: 'udapāne', meaning: 'சிறு கிணற்றில்' },
    { devanagari: 'ஸர்வதஃ ஸம்ப்லுத-உதகே', roman: 'sarvataḥ sampluta-udake', meaning: 'எங்கும் நிரம்பிய பெரிய நீர்நிலையிலோ' },
    { devanagari: 'தாவான்', roman: 'tāvān', meaning: 'அதுவே அளவு' },
    { devanagari: 'ஸர்வேஷு வேதேஷு', roman: 'sarveṣu vedeṣu', meaning: 'எல்லா வேதங்களிலும்' },
    { devanagari: 'ப்ராஹ்மணஸ்ய விஜாநத:', roman: 'brāhmaṇasya vijānataḥ', meaning: 'பரமபிரம்மத்தை உணர்ந்த ஞானிக்குப்' }
  ]
},
{
  id: 45,
  title: 'கீதா 2.47',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'உனக்குரிய உரிமை செயலில் மட்டுமே; பலன்களில் ஒருபோதும் இல்லை. செயற்பலனின் காரணம் நானென நினைக்காதே; செய்லாமைக்கு பற்றும் பெறாதே.',
  text: 'கர்மண்யேவாதிகாரஸ்தே மா பலேஷு கதாசந மா கர்மபலஹேதுர்பூர் மா தே ஸங்கோʼஸ்த்வகர்மணி',
  words: [
    { devanagari: 'கர்மணி ஏவ அதிகார:', roman: 'karmaṇi eva adhikāraḥ', meaning: 'செயலில் மட்டுமே உனக்கு உரிமை' },
    { devanagari: 'மா பலேஷு கதாசன', roman: 'mā phaleṣu kadācana', meaning: 'பலன்களில் ஒருபோதும் (உரிமை) இல்லை' },
    { devanagari: 'மா கர்மபல-ஹேதுர் பூ:', roman: 'mā karma-phala-hetur bhūḥ', meaning: 'செயற்பலனின் காரணம் நானென ஆகாதே' },
    { devanagari: 'மா தே ஸங்க:', roman: 'mā te saṅgaḥ', meaning: 'உனக்கு பற்றும் இருக்காதே' },
    { devanagari: 'அகர்மணி', roman: 'akarmaṇi', meaning: 'செய்யாமையில்' }
  ]
},
{
  id: 46,
  title: 'கீதா 2.48',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'யோகத்தில் நிலைபெற்று உன் கடமையைச் செய்; வெற்றி–தோல்விகளில் பற்றை விடு, தனஞ்ஜயா. இப்படிப் சமநிலைதான் “யோகம்” எனப்படுகிறது.',
  text: 'யோகஸ்தஃ குரு கர்மாணி ஸங்கம் த்யக்த்வா தனஞ்சய ஸித்த்யஸித்த்யோஃ சமோ பூத்வா சமத்வம் யோக உச்யதே',
  words: [
    { devanagari: 'யோகஸ்த:', roman: 'yoga-sthaḥ', meaning: 'யோகத்தில் நிலைபெற்றவன்' },
    { devanagari: 'குரு கர்மாணி', roman: 'kuru karmāṇi', meaning: 'கடமைகளைச் செய்' },
    { devanagari: 'ஸங்கம் த்யக்த்வா', roman: 'saṅgaṃ tyaktvā', meaning: 'பற்றை விட்டு' },
    { devanagari: 'தனஞ்சய', roman: 'dhanañjaya', meaning: 'தனஞ்சயா (அர்ஜுனா)' },
    { devanagari: 'ஸித்தி-அஸித்த்யோஃ சம:', roman: 'siddhi-asiddhyoḥ samaḥ', meaning: 'வெற்றி–தோல்விகளில் சமநிலை' },
    { devanagari: 'பூத்வா', roman: 'bhūtvā', meaning: 'அப்படியே இருந்து' },
    { devanagari: 'ஸமத்வம்', roman: 'samatvam', meaning: 'சமநிலை' },
    { devanagari: 'யோகம் உச்யதே', roman: 'yogaḥ ucyate', meaning: 'யோகம் எனப்படுகிறது' }
  ]
},
 {
  id: 47,
  title: 'கீதா 2.49',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'தனஞ்சயா, பலன் ஆசை கொண்ட கர்மம் — புத்தியோகத்தைவிடத் தாழ்ந்தது; அதைத் தொலைவிலே விட்டு, அந்த புத்தியில் (நிஷ்காம புத்தி) சரணமடை. பலனையே காரணமாகக் காண்போர் “கிருபணர்” (சிறுமனம்) ஆவர்.',
  text: 'தூரேண ஹ்யவரம் கர்ம புத்தியோகாத் தனஞ்சய புத்தௌ சரணமன்விச்ச கிருபணாஃ பலஹேதவஃ',
  words: [
    { devanagari: 'தூரேண', roman: 'dūreṇa', meaning: 'தொலைவிலே விட்டு/தள்ளி' },
    { devanagari: 'ஹி', roman: 'hi', meaning: 'உண்மையில்/நிச்சயமாக' },
    { devanagari: 'அவரம் கர்ம', roman: 'avaraṃ karma', meaning: 'தாழ்ந்த கர்மம் (பலாசை கர்மம்)' },
    { devanagari: 'புத்தி-யோகாத்', roman: 'buddhi-yogāt', meaning: 'புத்தியோகத்தைப் போல் அல்ல' },
    { devanagari: 'தனஞ்சய', roman: 'dhanañjaya', meaning: 'ஓ தனஞ்சயா' },
    { devanagari: 'புத்தௌ சரணம் அன்விச்ச', roman: 'buddhau śaraṇam anviccha', meaning: 'அந்தப் புத்தியில் சரணமடை/அடைக்கலம் தேடு' },
    { devanagari: 'கிருபணாஃ', roman: 'kṛpaṇāḥ', meaning: 'சிறுமனதினர்/கஞ்சர்கள்' },
    { devanagari: 'பல-ஹேதவஃ', roman: 'phala-hetavaḥ', meaning: 'பலனையே காரணமாகக் காண்போர்' }
  ]
},
{
  id: 48,
  title: 'கீதா 2.50',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'புத்தியோகத்தில் நிலைபெற்றவன் இவ்வாழ்க்கையிலேயே நல்லதும் கெட்டதும் இரண்டின் பிணைப்பையும் களைவான். ஆகவே யோகத்திற்கு உன்னை இணை — “யோகம்” என்பதே செயலில் நுணுக்கம்.',
  text: 'புத்தியுக்தோ ஜஹாதீஹ உபே ஸுக்ருத துஷ்க்ருதே தஸ்மாத் யோகாய யுஜ்யஸ்வ யோஃக கர்மஸு கௌஶலம்',
  words: [
    { devanagari: 'புத்தி-யுக்த:', roman: 'buddhi-yuktaḥ', meaning: 'புத்தியோகத்தில் இணைந்தவன்' },
    { devanagari: 'ஜஹாதி இஹ', roman: 'jahāti iha', meaning: 'இங்கேயே களைவான்/விடுவான்' },
    { devanagari: 'உபே', roman: 'ubhe', meaning: 'இரண்டையும்' },
    { devanagari: 'ஸுக்ருத', roman: 'sukṛta', meaning: 'நல்ல கர்மத்தின் பலன்' },
    { devanagari: 'துஷ்க்ருதே', roman: 'duṣkṛte', meaning: 'கெட்ட கர்மத்தின் பலன்' },
    { devanagari: 'தஸ்மாத்', roman: 'tasmāt', meaning: 'எனவே' },
    { devanagari: 'யோகாய', roman: 'yogāya', meaning: 'யோகத்திற்காக' },
    { devanagari: 'யுஜ்யஸ்வ', roman: 'yujyasva', meaning: 'இணை/ஈடுபடு' },
    { devanagari: 'யோஃக:', roman: 'yogaḥ', meaning: 'யோகம்' },
    { devanagari: 'கர்மஸு', roman: 'karmasu', meaning: 'எல்லா செயல்களிலும்' },
    { devanagari: 'கௌஶலம்', roman: 'kauśalam', meaning: 'நுணுக்கம்/கலை' }
  ]
},
{
  id: 49,
  title: 'கீதா 2.51',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஞானிகள் புத்தியோகத்தில் நிலைபெற்று, கர்மபலத்தைத் துறந்து, ஜனன–மரண பந்தத்திலிருந்து விடுபட்டு, அனைத்து துன்பங்களும் இன்றிய அந்த நிலையைக் கடைப்பிடிக்கின்றனர்.',
  text: 'கர்மஜம் புத்தியுக்தா ஹி பலம் த்யக்த்வா மணீஷிணஃ ஜன்மபந்த விநிர்முக்தாஃ பதம் கச்சந்த்யனாமயம்',
  words: [
    { devanagari: 'கர்மஜம் பலம்', roman: 'karma-jam phalam', meaning: 'கர்மத்தால் உண்டான பலன்' },
    { devanagari: 'புத்தி-யுக்தாஃ', roman: 'buddhi-yuktāḥ', meaning: 'புத்தியோகத்தில் இணைந்தோர்' },
    { devanagari: 'ஹி', roman: 'hi', meaning: 'உண்மையில்' },
    { devanagari: 'த்யக்த்வா', roman: 'tyaktvā', meaning: 'துறந்து' },
    { devanagari: 'மணீஷிணஃ', roman: 'manīṣiṇaḥ', meaning: 'ஞானிகள்/முனிவர்கள்' },
    { devanagari: 'ஜன்ம-பந்த', roman: 'janma-bandha', meaning: 'பிறப்பு–பிணைப்பு' },
    { devanagari: 'விநிர்முக்தாஃ', roman: 'vinirmuktāḥ', meaning: 'முழுமையாக விடுபட்டோர்' },
    { devanagari: 'பதம்', roman: 'padam', meaning: 'நிலை/பதவி (பரமப் பதம்)' },
    { devanagari: 'கச்சந்தி', roman: 'gacchanti', meaning: 'அடைகிறார்கள்' },
    { devanagari: 'அனாமயம்', roman: 'anāmayam', meaning: 'நோயற்ற/துன்பமற்ற' }
  ]
},
{
  id: 52,
  title: 'கீதா 2.52',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'உன் புத்தி மாயை என்ற அடர்ந்த காடைத் தாண்டும்போது, ஏற்கெனவே கேட்டதிலும், கேட்க வேண்டியதிலும் நீ விரக்தி பெறுவாய்.',
  text: 'யதா தே மோஹ-கலிலம் புத்திர்வ்யதிதரிஷ்யதி ததா கண்டாசி நிர்வேதம் ஶ்ரோத்தவ்யஸ்ய ஶ்ருதஸ்ய ச',
  words: [
    { devanagari: 'யதா', roman: 'yadā', meaning: 'எப்போது' },
    { devanagari: 'தே', roman: 'te', meaning: 'உன்' },
    { devanagari: 'மோஹ-கலிலம்', roman: 'moha-kalilam', meaning: 'மாயை எனும் அடர்ந்த காடு' },
    { devanagari: 'புத்தி:', roman: 'buddhiḥ', meaning: 'புத்தி' },
    { devanagari: 'வ்யதிதரிஷ்யதி', roman: 'vyatitariṣyati', meaning: 'தாண்டி விடும்/மீறும்' },
    { devanagari: 'ததா', roman: 'tadā', meaning: 'அப்போது' },
    { devanagari: 'கந்தாசி', roman: 'gantāsi', meaning: 'நீ அடைவாய்/செல்வாய்' },
    { devanagari: 'நிர்வேதம்', roman: 'nirvedam', meaning: 'விரக்தி/அலட்சியம்' },
    { devanagari: 'ஶ்ரோத்தவ்யஸ்ய', roman: 'śrotavyasya', meaning: 'கேட்கப்பட வேண்டியவற்றின் மீது' },
    { devanagari: 'ஶ்ருதஸ்ய', roman: 'śrutasya', meaning: 'ஏற்கெனவே கேட்டவற்றின் மீது' },
    { devanagari: 'ச', roman: 'ca', meaning: 'மேலும்/மற்றும்' }
  ]
}
,
{
  id: 53,
  title: 'கீதா 2.53',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'வேதங்களின் கலைச்சொற்களால் மனம் சஞ்சலமில்லாமல், உறுதியான சமாதியில் நிலைபெற்றால், அப்போது நீ யோகத்தை (ஆத்மஞான நிலை) அடைவாய்.',
  text: 'ஶ்ருதி விப்ரதிபந்நா தே யதா ஸ்தாஸ்யதி நிஸ்சலா ஸமாதாவச்சலா புத்திஸ்ததா யோகம் அவாப்ஸ்யஸி',
  words: [
    { devanagari: 'ஶ்ருதி', roman: 'śruti', meaning: 'வேதம்/வெதப் பிரமாணம்' },
    { devanagari: 'விப்ரதிபன்னா', roman: 'vipratipannā', meaning: 'வேத பலாசை வார்த்தையால் சஞ்சலமடைந்த' },
    { devanagari: 'தே', roman: 'te', meaning: 'உன்' },
    { devanagari: 'யதா', roman: 'yadā', meaning: 'எப்போது' },
    { devanagari: 'ஸ்தாஸ்யதி', roman: 'sthāsyati', meaning: 'நிலைத்திருக்கும்' },
    { devanagari: 'நிஸ்சலா', roman: 'niścalā', meaning: 'அசையாத/நிலைத்த' },
    { devanagari: 'ஸமாதௌ', roman: 'samādhau', meaning: 'சமாதியில்/யோக நிலையில்' },
    { devanagari: 'அசலா', roman: 'acalā', meaning: 'நிலையிலிருந்து அசையாத' },
    { devanagari: 'புத்தி:', roman: 'buddhiḥ', meaning: 'புத்தி/ஞானம்' },
    { devanagari: 'ததா', roman: 'tadā', meaning: 'அப்போது' },
    { devanagari: 'யோகம்', roman: 'yogam', meaning: 'ஆத்மஞானம்/யோகம்' },
    { devanagari: 'அவாப்ஸ்யஸி', roman: 'avāpsyasi', meaning: 'அடைவாய்' }
  ]
},
{
  id: 54,
  title: 'கீதா 2.54',
  subtitle: 'அர்ஜுன உவாச',
  meaning: 'அர்ஜுனன் கேட்டான்: நிலைத்த புத்தியுடையவர் (ஸ்திதப்ரஜ்ஞர்) எந்தச் சின்னங்களை உடையவர்? அவர் எப்படிப் பேசுவார்? எப்படிச் சும்மா இருப்பார்? எப்படிச் செல்வார்?',
  text: 'அர்ஜுன உவாச ஸ்திதப்ரஜ்ஞஸ்ய கா பாஷா ஸமாதிஸ்தஸ்ய கேஶவ ஸ்திததீஃ கிம் ப்ரபாஷேத கிமாஸீத வ்ரஜேத்கிம்',
  words: [
    { devanagari: 'அர்ஜுன', roman: 'arjuna', meaning: 'அர்ஜுனன்' },
    { devanagari: 'உவாச', roman: 'uvāca', meaning: 'சொன்னான்' },
    { devanagari: 'ஸ்திதப்ரஜ்ஞஸ்ய', roman: 'sthita-prajñasya', meaning: 'நிலைத்த புத்தியுடையவர்' },
    { devanagari: 'கா', roman: 'kā', meaning: 'என்ன' },
    { devanagari: 'பாஷா', roman: 'bhāṣā', meaning: 'மொழி/அடையாளம்' },
    { devanagari: 'ஸமாதிஸ்தஸ்ய', roman: 'samādhi-sthasya', meaning: 'சமாதியில் நிலைபெற்றவர்' },
    { devanagari: 'கேஶவ', roman: 'keśava', meaning: 'ஓ கேஶவா' },
    { devanagari: 'ஸ்திததீஃ', roman: 'sthita-dhīḥ', meaning: 'நிலையான புத்தியுடையவர்' },
    { devanagari: 'கிம்', roman: 'kim', meaning: 'எப்படித்/என்ன' },
    { devanagari: 'ப்ரபாஷேத', roman: 'prabhāṣeta', meaning: 'பேசுவார்' },
    { devanagari: 'கிம்', roman: 'kim', meaning: 'எப்படித்' },
    { devanagari: 'ஆஸீத', roman: 'āsīta', meaning: 'இருப்பார்' },
    { devanagari: 'வ்ரஜேத்', roman: 'vrajet', meaning: 'செல்வார்' },
    { devanagari: 'கிம்', roman: 'kim', meaning: 'எப்படித்' }
  ]
},
{
  id: 55,
  title: 'கீதா 2.55',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'பார்த்தா, மனக் கற்பனையால் உருவான எல்லா காமங்களையும் கைவிட்டு, ஆன்மாவிலேயே திருப்தி அடைந்திருப்பவன் ஸ்திதப்ரஜ்ஞன் என்று கூறப்படுகிறான்.',
  text: 'ஸ்ரீபகவானுவாச ப்ரஜஹாதி யதா காமான் ஸர்வான் பார்த மனோகதான் ஆத்மன்யேவாத்மனா துஷ்ட: ஸ்திதப்ரஜ்ஞஸ்ததோச்யதே',
  words: [
    { devanagari: 'ஸ்ரீபகவான்', roman: 'śrī-bhagavān', meaning: 'பரமாத்மா/பகவான்' },
    { devanagari: 'உவாச', roman: 'uvāca', meaning: 'சொன்னார்' },
    { devanagari: 'ப்ரஜஹாதி', roman: 'prajahāti', meaning: 'விட்டுவிடுகிறான்' },
    { devanagari: 'யதா', roman: 'yadā', meaning: 'எப்போது' },
    { devanagari: 'காமான்', roman: 'kāmān', meaning: 'காம ஆசைகள்' },
    { devanagari: 'ஸர்வான்', roman: 'sarvān', meaning: 'அனைத்தையும்' },
    { devanagari: 'பார்த', roman: 'pārtha', meaning: 'ஓ பார்தா' },
    { devanagari: 'மனோகதான்', roman: 'mano-gatān', meaning: 'மனதில் தோன்றிய' },
    { devanagari: 'ஆத்மனி', roman: 'ātmani', meaning: 'ஆத்மாவில்' },
    { devanagari: 'ஏவ', roman: 'eva', meaning: 'மட்டும்' },
    { devanagari: 'ஆத்மனா', roman: 'ātmanā', meaning: 'ஆத்மாவின் மூலம்' },
    { devanagari: 'துஷ்ட:', roman: 'tuṣṭaḥ', meaning: 'திருப்தி அடைந்தவன்' },
    { devanagari: 'ஸ்திதப்ரஜ்ஞ:', roman: 'sthita-prajñaḥ', meaning: 'நிலையான புத்தியுடையவன்' },
    { devanagari: 'ததா', roman: 'tadā', meaning: 'அப்போது' },
    { devanagari: 'உச்யதே', roman: 'ucyate', meaning: 'என்று கூறப்படுகிறான்' }
  ]
},
{
  id: 56,
  title: 'கீதா 2.56',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'மூன்று வகைத் துன்பங்களிலும் மனம் கலங்காதவன், இன்பத்தில் ஆசையில்லாதவன், ராகம், பயம், கோபம் இன்றி இருப்பவன் — அவன் நிலையான புத்தியுடைய முனிவன் என்று அழைக்கப்படுகிறான்.',
  text: 'துஃகேஷ்வனுத்விக்னமனா: ஸுகேஷு விகதஸ்ப்ருஹ: வீதராகபயக்ரோத: ஸ்திததீர்முனிருச்யதே',
  words: [
    { devanagari: 'துஃகேஷு', roman: 'duḥkeṣu', meaning: 'துன்பங்களில்' },
    { devanagari: 'அனுத்விக்ன-மனா:', roman: 'anudvigna-manāḥ', meaning: 'மனம் கலங்காதவன்' },
    { devanagari: 'ஸுகேஷு', roman: 'sukheṣu', meaning: 'இன்பத்தில்' },
    { devanagari: 'விகத-ஸ்ப்ருஹ:', roman: 'vigata-spṛhaḥ', meaning: 'ஆசையில்லாதவன்' },
    { devanagari: 'வீத-ராக', roman: 'vīta-rāga', meaning: 'பற்று இல்லாதவன்' },
    { devanagari: 'பய', roman: 'bhaya', meaning: 'பயம்' },
    { devanagari: 'க்ரோத:', roman: 'krodhaḥ', meaning: 'கோபம்' },
    { devanagari: 'ஸ்திததீ:', roman: 'sthita-dhīḥ', meaning: 'நிலையான புத்தியுடையவன்' },
    { devanagari: 'முனி:', roman: 'muniḥ', meaning: 'முனிவன்/ஞானி' },
    { devanagari: 'உச்யதே', roman: 'ucyate', meaning: 'என்று கூறப்படுகிறான்' }
  ]
},
{
  id: 57,
  title: 'கீதா 2.57',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'எந்த இடத்திலும் பற்று இல்லாதவன், நல்லதோ கெட்டதோ வந்தாலும் மகிழாமலும் வெறுக்காமலும் இருப்பவன் — அவனுடைய ஞானம் உறுதியானது.',
  text: 'யஃ ஸர்வத்ரானபிஸ்நேஹஸ்தத்தத்ப்ராப்ய ஶுபாஶுபம் நாபிநந்ததி ந த்வேஷ்டி தஸ்ய ப்ரஜ்ஞா ப்ரதிஷ்டிதா',
  words: [
    { devanagari: 'யஃ', roman: 'yaḥ', meaning: 'யார்/அவன்' },
    { devanagari: 'ஸர்வத்ர', roman: 'sarvatra', meaning: 'எங்கும்' },
    { devanagari: 'அனபிஸ்நேஹ:', roman: 'anabhisnehaḥ', meaning: 'பற்று இல்லாதவன்' },
    { devanagari: 'தத்-தத்', roman: 'tat-tat', meaning: 'எதையும் எதையும்' },
    { devanagari: 'ப்ராப்ய', roman: 'prāpya', meaning: 'பெற்றாலும்' },
    { devanagari: 'ஶுபம்', roman: 'śubham', meaning: 'நல்லது' },
    { devanagari: 'அஶுபம்', roman: 'aśubham', meaning: 'கெட்டது' },
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை/செய்யாது' },
    { devanagari: 'அபிநந்ததி', roman: 'abhinandati', meaning: 'மகிழ்வான்' },
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை/செய்யாது' },
    { devanagari: 'த்வேஷ்டி', roman: 'dveṣṭi', meaning: 'வெறுக்கிறான்' },
    { devanagari: 'தஸ்ய', roman: 'tasya', meaning: 'அவருடைய' },
    { devanagari: 'ப்ரஜ்ஞா', roman: 'prajñā', meaning: 'ஞானம்' },
    { devanagari: 'ப்ரதிஷ்டிதா', roman: 'pratiṣṭhitā', meaning: 'உறுதியானது' }
  ]
},
 {
  id: 58,
  title: 'கீதா 2.58',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஆமை தன் அங்கங்களைச் சிப்பிக்குள் இழுப்பதுபோல், இంద్రியங்களைப் பொருட்களிலிருந்து உள்வாங்கிக் கொள்பவன் உண்மையிலே நிலைபெற்ற ஞானம் உடையவன் என்று அறியப்படுகிறான்.',
  text: 'யதா ஸಂஹரதே சாயம் கூர்மோʼங்கானீவ ஸர்வஶ: இந்த்ரியாணீந்திரியார்த்தேப்யஸ் தஸ்ய ப்ரஜ்ஞா பிரதிஷ்டிதா',
  words: [
    { devanagari: 'யதா', roman: 'yadā', meaning: 'எப்போது' },
    { devanagari: 'ஸංஹரதே', roman: 'saṁharate', meaning: 'உள்வாங்கிக் கொள்கிறான்/இழுக்கிறான்' },
    { devanagari: 'ச', roman: 'ca', meaning: 'மேலும்' },
    { devanagari: 'அயம்', roman: 'ayam', meaning: 'இவன்/அவன்' },
    { devanagari: 'கூர்ம:', roman: 'kūrmaḥ', meaning: 'ஆமை' },
    { devanagari: 'அங்கானி', roman: 'aṅgāni', meaning: 'அங்கங்கள்' },
    { devanagari: 'இவ', roman: 'iva', meaning: 'போல' },
    { devanagari: 'ஸர்வஶ:', roman: 'sarvaśaḥ', meaning: 'முழுவதும்' },
    { devanagari: 'இந்த்ரியானி', roman: 'indriyāṇi', meaning: 'இന്ദ്രியங்கள்' },
    { devanagari: 'இந்திரியார்த்தேப்ய:', roman: 'indriyārthebhyaḥ', meaning: 'இன்றியப் பொருட்களிலிருந்து' },
    { devanagari: 'தஸ்ய', roman: 'tasya', meaning: 'அவனுடைய' },
    { devanagari: 'ப்ரஜ்ஞா', roman: 'prajñā', meaning: 'ஞானம்/சித்தம்' },
    { devanagari: 'ப்ரதிஷ்டிதா', roman: 'pratiṣṭhitā', meaning: 'நிலைத்தது' }
  ]
},
{
  id: 59,
  title: 'கீதா 2.59',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'உடம்புடையவனிடத்தில், வீரவிரதம் முதலான தடைகளால் விஷயங்கள் விலகலாம்; ஆனால் சுவை மட்டும் இருக்கும். பரமமான சுவையை அனுபவித்தால் அந்த (கீழ்) சுவையும் விலகிவிடும்.',
  text: 'விஷயா வினிவர்தந்தே நிராஹாரஸ்ய தேஹின: ரசவர்ஜம் ரசோʼப்யஸ்ய பரம் த்ருஷ்ட்வா நிவர்ததே',
  words: [
    { devanagari: 'விஷயாஃ', roman: 'viṣayāḥ', meaning: 'இன்றியப் பொருட்கள்' },
    { devanagari: 'வினிவர்தந்தே', roman: 'vinivartante', meaning: 'விலகிப் போகின்றன' },
    { devanagari: 'நிராஹாரஸ்ய', roman: 'nirāhārasya', meaning: 'விலக்கால்/தடுக்கலால்' },
    { devanagari: 'தேஹின:', roman: 'dehinaḥ', meaning: 'உடம்புடையவனிடத்தில்' },
    { devanagari: 'ரசவர்ஜம்', roman: 'rasa-varjam', meaning: 'சுவையைத் தவிர' },
    { devanagari: 'ரச:', roman: 'rasaḥ', meaning: 'ருசி/ஆசைச் சுவை' },
    { devanagari: 'அபி', roman: 'api', meaning: 'கூட' },
    { devanagari: 'அஸ்ய', roman: 'asya', meaning: 'அவனுடைய' },
    { devanagari: 'பரம்', roman: 'param', meaning: 'உயர்ந்த (தெய்வீக) ஆனந்தம்' },
    { devanagari: 'த்ருஷ்ட்வா', roman: 'dṛṣṭvā', meaning: 'அனுபவித்தால்/கண்டால்' },
    { devanagari: 'நிவர்ததே', roman: 'nivartate', meaning: 'விலகிவிடும்' }
  ]
},
{
  id: 60,
  title: 'கீதா 2.60',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'கௌந்தேயா, முயன்று கட்டுப்படுத்தினாலும், இன்றியங்கள் வலிமையும் ஆவேசமும் உடையவை; அவை விவேகமுள்ளவரின் மனத்தையே பலவந்தமாக இழுத்துச் செல்கின்றன.',
  text: 'யததோ ஹ்யபி கௌந்தேய புருஷஸ்ய விபஶ்சித: இந்த்ரியானி ப்ரமாதீனி ஹரந்தி ப்ரஸபம் மன: ',
  words: [
    { devanagari: 'யதத:', roman: 'yatataḥ', meaning: 'முயற்சிப்பதின்போதும்' },
    { devanagari: 'ஹி', roman: 'hi', meaning: 'நிச்சயமாக' },
    { devanagari: 'அபி', roman: 'api', meaning: 'கூட' },
    { devanagari: 'கௌந்தேய', roman: 'kaunteya', meaning: 'ஓ கௌந்தேயா (அர்ஜுனா)' },
    { devanagari: 'புருஷஸ்ய', roman: 'puruṣasya', meaning: 'மனிதனின்' },
    { devanagari: 'விபஶ்சித:', roman: 'vipaścitaḥ', meaning: 'விவேகமுள்ளவனின்' },
    { devanagari: 'இந்த்ரியானி', roman: 'indriyāṇi', meaning: 'இன்றியங்கள்' },
    { devanagari: 'ப்ரமாதீனி', roman: 'pramāthīni', meaning: 'ஆவேசமுள்ள/கொள்ளை கொள்ளும்' },
    { devanagari: 'ஹரந்தி', roman: 'haranti', meaning: 'இழுத்துச் செல்கின்றன' },
    { devanagari: 'ப்ரஸபம்', roman: 'prasabham', meaning: 'பலவந்தமாக' },
    { devanagari: 'மன:', roman: 'manaḥ', meaning: 'மனதை' }
  ]
},
{
  id: 61,
  title: 'கீதா 2.61',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'அந்த இன்றியங்களை எல்லாம் அடக்கி, என்னை குறிக்கோளாகக் கொண்டு யோகத்தில் நிலைபெற்று இருப்பவன்—அவனுடைய இன்றியங்கள் வசமாயின், அவனுடைய ஞானம் உறுதியாக நிலைபெற்றதே.',
  text: 'தானி ஸர்வாணி ஸம்யம்ய யுக்த ஆசீத மத்பர: வசே ஹி யஸ்ய இந்த்ரியானி தஸ்ய ப்ரஜ்ஞா பிரதிஷ்டிதா',
  words: [
    { devanagari: 'தானி', roman: 'tāni', meaning: 'அவை (இன்றியங்கள்)' },
    { devanagari: 'ஸர்வாணி', roman: 'sarvāṇi', meaning: 'அனைத்தையும்' },
    { devanagari: 'ஸம்யம்ய', roman: 'saṁyamya', meaning: 'அடக்கி/கட்டுப்படுத்து' },
    { devanagari: 'யுக்த:', roman: 'yuktaḥ', meaning: 'யோகவானாய்' },
    { devanagari: 'ஆசீத', roman: 'āsīta', meaning: 'இருக்கிறார்' },
    { devanagari: 'மத்பர:', roman: 'mat-paraḥ', meaning: 'என்னை இலக்காகக் கொண்ட' },
    { devanagari: 'வசே', roman: 'vaśe', meaning: 'வசப்படுத்தப்பட்ட' },
    { devanagari: 'ஹி', roman: 'hi', meaning: 'உண்மைக்கு' },
    { devanagari: 'யஸ்ய', roman: 'yasya', meaning: 'எவருக்கு' },
    { devanagari: 'இந்த்ரியானி', roman: 'indriyāṇi', meaning: 'இன்றியங்கள்' },
    { devanagari: 'தஸ்ய', roman: 'tasya', meaning: 'அவருடைய' },
    { devanagari: 'ப்ரஜ்ஞா', roman: 'prajñā', meaning: 'ஞானம்/புத்தி' },
    { devanagari: 'ப்ரதிஷ்டிதா', roman: 'pratiṣṭhitā', meaning: 'உறுதியாக நிலைபெற்றது' }
  ]
},
{
  id: 62,
  title: 'கீதா 2.62',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'விஷயங்களைத் தியானிக்கத் தியானிக்கும் போது அவற்றில் பற்றுதல் உருவாகும்; பற்றிலிருந்து ஆசை, ஆசையிலிருந்து கோபம் தோன்றும்.',
  text: 'த்யாயதோ விஷயான் புங்ஸ: ஸங்கஸ்தேஷூபஜாயதே ஸங்காத் ஸஞ்சாயதே காம: காமாத் க்ரோதோʼபிஜாயதே',
  words: [
    { devanagari: 'த்யாயத:', roman: 'dhyāyataḥ', meaning: 'தியானித்துக் கொண்டிருக்கும் போது' },
    { devanagari: 'விஷயான்', roman: 'viṣayān', meaning: 'இன்றியப் பொருட்களை' },
    { devanagari: 'புஂஸ:', roman: 'puṁsaḥ', meaning: 'மனிதனுக்கு' },
    { devanagari: 'ஸங்க:', roman: 'saṅgaḥ', meaning: 'பற்றுதல்' },
    { devanagari: 'தேஷு', roman: 'teṣu', meaning: 'அவற்றில்' },
    { devanagari: 'உபஜாயதே', roman: 'upajāyate', meaning: 'உருவாகிறது' },
    { devanagari: 'ஸங்காத்', roman: 'saṅgāt', meaning: 'பற்றிலிருந்து' },
    { devanagari: 'ஸஞ்சாயதே', roman: 'sañjāyate', meaning: 'பிறக்கிறது' },
    { devanagari: 'காம:', roman: 'kāmaḥ', meaning: 'ஆசை/காமம்' },
    { devanagari: 'காமாத்', roman: 'kāmāt', meaning: 'ஆசையிலிருந்து' },
    { devanagari: 'க்ரோத:', roman: 'krodhaḥ', meaning: 'கோபம்' },
    { devanagari: 'அபிஜாயதே', roman: 'abhijāyate', meaning: 'தோன்றுகிறது/உருவாகிறது' }
  ]
},
 {
  id: 63,
  title: 'கீதா 2.63',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'கோபத்திலிருந்து மயக்கம்; மயக்கத்திலிருந்து ஸ்மிருதியின் குழப்பம்; ஸ்மிருதி குலைந்தால் புத்தி நாசம்; புத்தி நாசமாயின் அவன் வீழ்ச்சி அடைகிறான்.',
  text: 'க்ரோதாத் பவதி சம்மோஹ: சம்மோஹாத் ஸ்ம்ருதி-ப்ரம்ஶ: ஸ்ம்ருதி-ப்ரம்ஶாத் புத்திநாஶோ புத்திநாஶாத் ப்ரணஷ்யதி',
  words: [
    { devanagari: 'க்ரோதாத்', roman: 'krodhāt', meaning: 'கோபத்திலிருந்து' },
    { devanagari: 'பவதி', roman: 'bhavati', meaning: 'ஏற்படும்/உண்டாகும்' },
    { devanagari: 'சம்மோஹ:', roman: 'sammohaḥ', meaning: 'மயக்கம்/வித்யாசம்' },
    { devanagari: 'சம்மோஹாத்', roman: 'sammohāt', meaning: 'மயக்கத்திலிருந்து' },
    { devanagari: 'ஸ்ம்ருதி', roman: 'smṛti', meaning: 'நினைவு/ஸ்மிருதி' },
    { devanagari: 'விப்ரம:', roman: 'vibhramaḥ', meaning: 'குழப்பம்' },
    { devanagari: 'ஸ்ம்ருதி-ப்ரம்ஶாத்', roman: 'smṛti-bhraṁśāt', meaning: 'ஸ்மிருதி குலைந்ததால்' },
    { devanagari: 'புத்தி-நாஶ:', roman: 'buddhi-nāśaḥ', meaning: 'புத்திநாசம்' },
    { devanagari: 'புத்தி-நாஶாத்', roman: 'buddhi-nāśāt', meaning: 'புத்திநாசத்தால்' },
    { devanagari: 'ப்ரணஷ்யதி', roman: 'praṇaśyati', meaning: 'வீழ்ச்சி அடைகிறான்/அழிகிறான்' }
  ]
},
{
  id: 64,
  title: 'கீதா 2.64',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஆசையும் வெறுப்பும் நீங்கிப், இன்றியங்களை சுயக் கட்டுப்பாட்டில் வைத்து பொருள்களோடு நடப்பவன் ஆண்டவனின் அருளை அடைகிறான்.',
  text: 'ராகத்வேஷவிமுக்தைஸ்து விஷயானிந்திரியைஶ்சரன் ஆத்மவஶ்யைர்விதேயாத்மா ப்ரசாதமதிகச்சதி',
  words: [
    { devanagari: 'ராக', roman: 'rāga', meaning: 'பற்று/ஆசை' },
    { devanagari: 'த்வேஷ', roman: 'dveṣa', meaning: 'வெறுப்பு' },
    { devanagari: 'விமுக்தைः', roman: 'vimuktaiḥ', meaning: 'விடுபட்டவர்' },
    { devanagari: 'து', roman: 'tu', meaning: 'ஆனால்/உண்மையில்' },
    { devanagari: 'விஷயான்', roman: 'viṣayān', meaning: 'இன்றியப் பொருட்களை' },
    { devanagari: 'இந்திரியை:', roman: 'indriyaiḥ', meaning: 'இன்றியங்களால்' },
    { devanagari: 'சரன்', roman: 'caran', meaning: 'நடந்து (உரையாடி) கொள்ளுதல்' },
    { devanagari: 'ஆத்ம-வஶ்யை:', roman: 'ātma-vaśyaiḥ', meaning: 'சுயக் கட்டுப்பாட்டில்' },
    { devanagari: 'விதேயஆத்மா', roman: 'vidheyātmā', meaning: 'ஒழுங்கு பின்பற்றும் மனம் உடையவன்' },
    { devanagari: 'ப்ரசாதம்', roman: 'prasādam', meaning: 'அருள்/அமைதி' },
    { devanagari: 'அதிகச்சதி', roman: 'adhigacchati', meaning: 'அடைகிறான்' }
  ]
},
{
  id: 65,
  title: 'கீதா 2.65',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'அந்த அருள்நிலையிலே, எல்லா துன்பங்களும் குறையும்; மனம் தெளிந்தவனின் புத்தி விரைவில் நிச்சலமாய் நிலைபெறும்.',
  text: 'ப்ரசாதே ஸர்வதுஃகானாம் ஹானிரஸ்யோபஜாயதே ப்ரசன்னசேதசோ ஹ்யாஶு புத்தி: பர்யவதிஷ்டதே',
  words: [
    { devanagari: 'ப்ரசாதே', roman: 'prasāde', meaning: 'அருள்/அமைதி நிலை அடைந்தால்' },
    { devanagari: 'ஸர்வ-துஃகானாம்', roman: 'sarva-duḥkhānām', meaning: 'அனைத்து துன்பங்களும்' },
    { devanagari: 'ஹானி:', roman: 'hāniḥ', meaning: 'குறைவு/நீங்கு' },
    { devanagari: 'அஸ்ய', roman: 'asya', meaning: 'அவனுக்குப்' },
    { devanagari: 'உபஜாயதே', roman: 'upajāyate', meaning: 'ஏற்படும்' },
    { devanagari: 'ப்ரசன்ன-சேதச:', roman: 'prasanna-cetasaḥ', meaning: 'தெளிந்த மனமுடையவனுக்கு' },
    { devanagari: 'ஹி', roman: 'hi', meaning: 'உண்மையே' },
    { devanagari: 'ஆஶு', roman: 'āśu', meaning: 'விரைவில்' },
    { devanagari: 'புத்தி:', roman: 'buddhiḥ', meaning: 'புத்தி' },
    { devanagari: 'பர்யவதிஷ்டதே', roman: 'paryavatiṣṭhate', meaning: 'நிலையாகிறது' }
  ]
},
{
  id: 66,
  title: 'கீதா 2.66',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'யோகத்தில் (ஆத்மநிஷ்டையில்) இல்லாதவனுக்கு நிலையான புத்தி இல்லை; அவனுக்கு தியான மனப்பாங்கும் இல்லை. அவனுக்குப் சமாதானம் இல்லை; சமாதானமில்லாதவனுக்கு இன்பம் எங்கிருந்து?',
  text: 'நாஸ்தி புத்திரயுக்தஸ்ய ந சாயுக்தஸ்ய பாவனா ந சாபாவயத: ஶாந்திரஶாந்தஸ்ய குத: ஸுகம்',
  words: [
    { devanagari: 'நாஸ்தி', roman: 'nāsti', meaning: 'இல்லை' },
    { devanagari: 'புத்தி:', roman: 'buddhiḥ', meaning: 'நிலையான புத்தி' },
    { devanagari: 'அயுக்தஸ்ய', roman: 'ayuktasya', meaning: 'யோகத்தில் இல்லாதவனுக்கு' },
    { devanagari: 'ந ச', roman: 'na ca', meaning: 'மேலும் இல்லை' },
    { devanagari: 'அயுக்தஸ்ய', roman: 'ayuktasya', meaning: 'யோகம் இல்லாதவனுக்கு' },
    { devanagari: 'பாவனா', roman: 'bhāvanā', meaning: 'தியான மனப்பாங்கு' },
    { devanagari: 'ந ச', roman: 'na ca', meaning: 'மேலும் இல்லை' },
    { devanagari: 'அபாவயத:', roman: 'abhāvayataḥ', meaning: 'அப்படிச் சிந்திக்காதவனுக்கு' },
    { devanagari: 'ஶாந்தி:', roman: 'śāntiḥ', meaning: 'சமாதானம்/அமைதி' },
    { devanagari: 'அஶாந்தஸ்ய', roman: 'aśāntasya', meaning: 'அமைதியற்றவனுக்கோ' },
    { devanagari: 'குத:', roman: 'kutaḥ', meaning: 'எங்கிருந்து' },
    { devanagari: 'ஸுகம்', roman: 'sukham', meaning: 'இன்பம்' }
  ]
},
 {
  id: 67,
  title: 'கீதா 2.67',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'நீர்மேல் போகும் படகை புயல் காற்று அடித்து எறிவது போல, இன்றியங்களில் ஓன்றுக்கே மனம் இணைந்தாலும் அது மனிதனின் புத்தியை இழுத்துச் செல்லும்.',
  text: 'இந்த்ரியானாம் ஹி சரதாம் யன்மனோʼனுவிதீயதே ததஸ்ய ஹரதி ப்ரஜ்ஞாம் வாயுர்நாவமிவாம்பஸி',
  words: [
    { devanagari: 'இந்த்ரியானாம்', roman: 'indriyāṇām', meaning: 'இன்றியங்களின்' },
    { devanagari: 'ஹி', roman: 'hi', meaning: 'நிச்சயமாக' },
    { devanagari: 'சரதாம்', roman: 'caratām', meaning: 'அலைந்து திரியும் போது' },
    { devanagari: 'யத்', roman: 'yat', meaning: 'எது' },
    { devanagari: 'மன:', roman: 'manaḥ', meaning: 'மனம்' },
    { devanagari: 'அனுவிதீயதே', roman: 'anuvidhīyate', meaning: 'தொடர்ந்து ஒட்டிக்கொள்கிறது' },
    { devanagari: 'தத்', roman: 'tat', meaning: 'அது' },
    { devanagari: 'அஸ்ய', roman: 'asya', meaning: 'அவனுடைய' },
    { devanagari: 'ஹரதி', roman: 'harati', meaning: 'எடுத்துச் செல்கிறது' },
    { devanagari: 'ப்ரஜ்ஞாம்', roman: 'prajñām', meaning: 'புத்தி/ஞானச்சக்தி' },
    { devanagari: 'வாயு:', roman: 'vāyuḥ', meaning: 'காற்று' },
    { devanagari: 'நாவம்', roman: 'nāvam', meaning: 'படகை' },
    { devanagari: 'இவ', roman: 'iva', meaning: 'போல' },
    { devanagari: 'அம்பஸி', roman: 'ambhasi', meaning: 'நீர்மேல்' }
  ]
},
{
  id: 68,
  title: 'கீதா 2.68',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஆகையால், ஓ மஹாபாகுவே, தன் இன்றியங்களை எல்லாம் விஷயங்களிலிருந்து அடக்கினவன்—அவனுடைய புத்தி உறுதியாக நிலைபெற்றதே.',
  text: 'தஸ்மாத்யஸ்ய மஹாபாஹோ நிக்ருஹீதானி ஸர்வஶ: இந்த்ரியானீந்திரியார்த்தேப்யஸ்தஸ்ய ப்ரஜ்ஞா பிரதிஷ்டிதா',
  words: [
    { devanagari: 'தஸ்மாத்', roman: 'tasmāt', meaning: 'எனவே/ஆகையால்' },
    { devanagari: 'யஸ்ய', roman: 'yasya', meaning: 'எவருக்கு' },
    { devanagari: 'மஹாபாஹோ', roman: 'mahā-bāho', meaning: 'ஓ வலிமையான கரங்களையுடையவனே' },
    { devanagari: 'நிக்ருஹீதானி', roman: 'nigṛhītāni', meaning: 'அடக்கப்பட்ட' },
    { devanagari: 'ஸர்வஶ:', roman: 'sarvaśaḥ', meaning: 'முழுதும்' },
    { devanagari: 'இந்த்ரியானி', roman: 'indriyāṇi', meaning: 'இன்றியங்கள்' },
    { devanagari: 'இந்திரியார்த்தேப்ய:', roman: 'indriyārthebhyaḥ', meaning: 'விஷயங்களிலிருந்து' },
    { devanagari: 'தஸ்ய', roman: 'tasya', meaning: 'அவருடைய' },
    { devanagari: 'ப்ரஜ்ஞா', roman: 'prajñā', meaning: 'புத்தி/ஞானம்' },
    { devanagari: 'ப்ரதிஷ்டிதா', roman: 'pratiṣṭhitā', meaning: 'உறுதியாக நிலைபெற்றது' }
  ]
},
{
  id: 69,
  title: 'கீதா 2.69',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'எல்லா ஜீவராசிகளுக்கும் “இரவு” ஆகியது சுயகட்டுப்பாட்டுள்ளவருக்குச் “விழிப்பு”. அவர்கள் விழிப்பென்று கருதுவது, தன்னுள் நோக்கும் முனிவனுக்குப் “இரவு”.',
  text: 'யா நிஷா ஸர்வபூதானாம் தஸ்யாம் ஜாகர்தி ஸயமீ யஸ்யாம் ஜாக்ரதி பூதானி ஸா நிஷா பஶ்யதோ முநே:',
  words: [
    { devanagari: 'யா', roman: 'yā', meaning: 'எது' },
    { devanagari: 'நிஷா', roman: 'niśā', meaning: 'இரவு/அறியாமை' },
    { devanagari: 'ஸர்வ-பூதானாம்', roman: 'sarva-bhūtānām', meaning: 'அனைத்து ஜீவராசிகளுக்குமான' },
    { devanagari: 'தஸ்யாம்', roman: 'tasyām', meaning: 'அதில்' },
    { devanagari: 'ஜாகர்தி', roman: 'jāgarti', meaning: 'விழித்திருப்பான்' },
    { devanagari: 'ஸயமீ', roman: 'saṃyamī', meaning: 'சுயகட்டுப்பாட்டாளர்' },
    { devanagari: 'யஸ்யாம்', roman: 'yasyām', meaning: 'எதில்' },
    { devanagari: 'ஜாக்ரதி', roman: 'jāgrati', meaning: 'விழிப்பதாக நினைப்பர்' },
    { devanagari: 'பூதானி', roman: 'bhūtāni', meaning: 'ஜீவர்கள்' },
    { devanagari: 'ஸா', roman: 'sā', meaning: 'அது' },
    { devanagari: 'நிஷா', roman: 'niśā', meaning: 'இரவு/அறியாமை' },
    { devanagari: 'பஶ்யத:', roman: 'paśyataḥ', meaning: 'தன்னுள் நோக்கும்' },
    { devanagari: 'முனே:', roman: 'muneḥ', meaning: 'முனிவனுக்கு' }
  ]
},
{
  id: 70,
  title: 'கீதா 2.70',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'ஆறுகள் எப்போதும் நிரப்பினாலும் அசையாத சமுத்திரம் போல், எண்ணற்ற ஆசைகள் மனக்கடலில் வந்து விழுந்தாலும் அசையாதவன் தான் அமைதியை அடைவான்; ஆசைகளை நிறைவேற்ற ஓடுபவன் அன்று.',
  text: 'ஆபூர்யமாணமசலப்ரதிஷ்டம் சமுத்ரமாப: ப்ரவிஶந்தி யத்வத் தத்வத் காமா யம் ப்ரவிஶந்தி ஸர்வே ஸ ஶாந்திமாப்னோதி ந காமகாமீ',
  words: [
    { devanagari: 'ஆபூர்யமாணம்', roman: 'āpūryamāṇam', meaning: 'நிரம்பிக் கொண்டே இருக்கும்' },
    { devanagari: 'அசல-ப்ரதிஷ்டம்', roman: 'acala-pratiṣṭham', meaning: 'அசையாத நிலைபெற்ற' },
    { devanagari: 'ஸமுத்ரம்', roman: 'samudram', meaning: 'சமுத்திரம்' },
    { devanagari: 'ஆப:', roman: 'āpaḥ', meaning: 'நீர்கள்' },
    { devanagari: 'ப்ரவிஶந்தி', roman: 'praviśanti', meaning: 'உள் நுழைகின்றன' },
    { devanagari: 'யத்வத்', roman: 'yadvat', meaning: 'எப்படியோ' },
    { devanagari: 'தத்வத்', roman: 'tadvat', meaning: 'அப்படியே' },
    { devanagari: 'காமா:', roman: 'kāmāḥ', meaning: 'ஆசைகள்' },
    { devanagari: 'யம்', roman: 'yam', meaning: 'யாரிடமும்' },
    { devanagari: 'ப்ரவிஶந்தி', roman: 'praviśanti', meaning: 'வந்து சேருகின்றன' },
    { devanagari: 'ஸர்வே', roman: 'sarve', meaning: 'எல்லாவற்றும்' },
    { devanagari: 'ஸ:', roman: 'saḥ', meaning: 'அவன்' },
    { devanagari: 'ஶாந்திம்', roman: 'śāntim', meaning: 'அமைதி' },
    { devanagari: 'ஆப்னோதி', roman: 'āpnoti', meaning: 'அடைகிறான்' },
    { devanagari: 'ந', roman: 'na', meaning: 'அன்று/இல்லை' },
    { devanagari: 'காம-காமீ', roman: 'kāma-kāmī', meaning: 'ஆசைகளைச் சாதிக்கப் பின்தொடர்பவன்' }
  ]
},
{
  id: 71,
  title: 'கீதா 2.71',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'எல்லா காமங்களையும் கைவிட்டு, பற்றில்லாமல், “இது எனது” என்ற மமதையும் “நான்” என்ற அகங்காரமும் நீக்கி வாழ்பவன் — அவனே பரிபூரண அமைதியை அடைகிறான்.',
  text: 'விஹாய காமாந்யஃ ஸர்வான் புமாஞ்சரதி நிஸ்ப்ருஹ: நிர்மமோ நிரஹங்கார: ஸ ஶாந்திமதிகச்சதி',
  words: [
    { devanagari: 'விஹாய', roman: 'vihāya', meaning: 'கைவிட்டு/விட்டு' },
    { devanagari: 'காமான்', roman: 'kāmān', meaning: 'காமங்கள்/ஆசைகள்' },
    { devanagari: 'ய:', roman: 'yaḥ', meaning: 'யார்/அவன்' },
    { devanagari: 'ஸர்வான்', roman: 'sarvān', meaning: 'அனைத்தையும்' },
    { devanagari: 'புமான்', roman: 'pumān', meaning: 'மனிதன்' },
    { devanagari: 'சரதி', roman: 'carati', meaning: 'வாழ்கிறான்/நடக்கிறான்' },
    { devanagari: 'நிஸ்ப்ருஹ:', roman: 'niḥspṛhaḥ', meaning: 'பற்றில்லாதவன்' },
    { devanagari: 'நிர்மம:', roman: 'nirmamaḥ', meaning: 'எனது என்ற பற்று இன்றி' },
    { devanagari: 'நிரஹங்கார:', roman: 'nirahaṅkāraḥ', meaning: 'அகங்காரம் இன்றி' },
    { devanagari: 'ஸ:', roman: 'saḥ', meaning: 'அவன்' },
    { devanagari: 'ஶாந்திம்', roman: 'śāntim', meaning: 'அமைதியை' },
    { devanagari: 'அதிகச்சதி', roman: 'adhigacchati', meaning: 'அடைகிறான்' }
  ]
},
{
  id: 72,
  title: 'கீதா 2.72',
  subtitle: 'ஸ்ரீபகவானுவாச',
  meaning: 'இதுவே ப்ராஹ்மி (ஆத்மீக) நிலை. இதை அடைந்தவனுக்கு மயக்கம் இல்லை. இந்நிலையிலேயே உறுதியாய் இருந்தால், இறுதி நேரத்திலும் பரப்ரம்ம நிர்வாணத்தை அடைகிறான்.',
  text: 'ஏஷா ப்ராஹ்மீ ஸ்திதி: பார்த நைனம் ப்ராப்ய விமுஹ்யதி ஸ்தித்வாஸ்யாமந்த காலேʼபி ப்ரஹ்ம நிர்வாணம்ருச்சதி',
  words: [
    { devanagari: 'ஏஷா', roman: 'eṣā', meaning: 'இதுவே' },
    { devanagari: 'ப்ராஹ்மீ ஸ்திதி:', roman: 'brāhmī sthitiḥ', meaning: 'ஆத்மீக நிலை' },
    { devanagari: 'பார்த', roman: 'pārtha', meaning: 'ஓ பார்தா' },
    { devanagari: 'ந', roman: 'na', meaning: 'இல்லை' },
    { devanagari: 'ஏநாம்', roman: 'enām', meaning: 'இந்த நிலையை' },
    { devanagari: 'ப்ராப்ய', roman: 'prāpya', meaning: 'அடைந்தபின்' },
    { devanagari: 'விமுஹ்யதி', roman: 'vimuhyati', meaning: 'மயங்கமாட்டான்' },
    { devanagari: 'ஸ்தித்வா', roman: 'sthitvā', meaning: 'நிலைபெற்று இருந்து' },
    { devanagari: 'அஸ்யாம்', roman: 'asyām', meaning: 'இதிலே' },
    { devanagari: 'அந்த-காலேʼபி', roman: 'anta-kāle\'pi', meaning: 'இறுதி நேரத்திலும்' },
    { devanagari: 'ப்ரஹ்ம-நிர்வாணம்', roman: 'brahma-nirvāṇam', meaning: 'பரப்ரம்ம நிர்வாணம்' },
    { devanagari: '஋ச்சதி', roman: 'ṛcchati', meaning: 'அடைகிறான்' }
  ]
}
];
}
