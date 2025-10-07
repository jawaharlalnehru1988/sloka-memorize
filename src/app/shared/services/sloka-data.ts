import { Injectable, signal, computed } from '@angular/core';

export interface Word {
  devanagari: string;
  tamilword: string;
  roman: string;
  meaning: string;
  originalIndex: number;
  used?: boolean;
  correct?: boolean;
}

export interface Line {
  devanagari: string;
  tamilword: string;
  roman: string;
  meaning: string;
  words: Word[];
}

export interface Sloka {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: string;
  lines: Line[];
}

export interface TrainingMode {
  type: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  locked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SlokaDataService {

  // Signal for all slokas
  private _slokas = signal<Sloka[]>([
    {
      id: 1,
      title: 'கீதா 5.1',
      subtitle: 'अर्जुन उवाच',
      description: 'செயலைத் துறக்கும் நிலை (சந்நியாசம்) மற்றும் பக்தியுடன் செயல் (கர்மயோகம்) எது சிறந்தது என்று அர்ஜுனன் கேட்கும் பகுதி.',
      difficulty: 'ஆரம்ப நிலை',
      lines: [
        {
          devanagari: 'अर्जुन उवाच: संन्यासं कर्मणां कृष्ण पुनर्योगं च शंससि। यच्छ्रेय एतयोरेकं तन्मे ब्रूहि सु-निश्चितम्॥',
          tamilword: 'அர்ஜுன உவாச: ஸந்யாஸம் கர்மணாம் க்ருஷ்ண புனர்யோகம் ச ஷம்ஸஸி । யச்ச்ரேய ஏதயோரேகம் தன்மே ப்ரூஹி ஸு-நிஸ்சிதம் ॥',
          roman: 'arjuna uvāca: saṃnyāsaṃ karmaṇāṃ kṛṣṇa punar yogaṃ ca śaṃsasi, yac chreya etayor ekaṃ tan me brūhi su-niścitam',
          meaning: 'அர்ஜுனன் கூறினான்: கிருஷ்ணா, முதலில் செயலைத் துறக்கவும், பிறகு பக்தியுடன் செயலாற்றவும் உபதேசிக்கிறாய். இவையிரண்டில் எது சிறந்ததென்று தயவு செய்து விளக்குவாயாக.',
          words: [
            { devanagari: 'अर्जुन', tamilword: 'அர்ஜுன', roman: 'arjuna', meaning: 'அர்ஜுனன்', originalIndex: 0 },
            { devanagari: 'उवाच', tamilword: 'உவாச', roman: 'uvāca', meaning: 'கூறினான்', originalIndex: 1 },
            { devanagari: 'संन्यासम्', tamilword: 'ஸந்யாஸம்', roman: 'saṃnyāsam', meaning: 'செயலைத் துறத்தல்', originalIndex: 2 },
            { devanagari: 'कर्मणाम्', tamilword: 'கர்மணாம்', roman: 'karmaṇām', meaning: 'செயல்கள்', originalIndex: 3 },
            { devanagari: 'कृष्ण', tamilword: 'க்ருஷ்ண', roman: 'kṛṣṇa', meaning: 'ஓ கிருஷ்ணா', originalIndex: 4 },
            { devanagari: 'पुनः', tamilword: 'புன:', roman: 'punaḥ', meaning: 'மீண்டும்', originalIndex: 5 },
            { devanagari: 'योगम्', tamilword: 'யோகம்', roman: 'yogam', meaning: 'பக்தியுடன் செயல் (கர்மயோகம்)', originalIndex: 6 },
            { devanagari: 'च', tamilword: 'ச', roman: 'ca', meaning: 'மற்றும்', originalIndex: 7 },
            { devanagari: 'शंससि', tamilword: 'ஷம்ஸஸி', roman: 'śaṃsasi', meaning: 'உபதேசிக்கிறாய்', originalIndex: 8 },
            { devanagari: 'यत्', tamilword: 'யத்', roman: 'yat', meaning: 'எது', originalIndex: 9 },
            { devanagari: 'श्रेयः', tamilword: 'ஶ்ரேய:', roman: 'śreyaḥ', meaning: 'சிறந்தது / உயர்ந்தது', originalIndex: 10 },
            { devanagari: 'एतयोः', tamilword: 'ஏதயோ:', roman: 'etayoḥ', meaning: 'இவையிரண்டில்', originalIndex: 11 },
            { devanagari: 'एकम्', tamilword: 'ஏகம்', roman: 'ekam', meaning: 'ஒன்று', originalIndex: 12 },
            { devanagari: 'तत्', tamilword: 'தத்', roman: 'tat', meaning: 'அதை', originalIndex: 13 },
            { devanagari: 'मे', tamilword: 'மே', roman: 'me', meaning: 'எனக்கு', originalIndex: 14 },
            { devanagari: 'ब्रूहि', tamilword: 'ப்ரூஹி', roman: 'brūhi', meaning: 'தயவு செய்து கூறு', originalIndex: 15 },
            { devanagari: 'सु-निश्चितम्', tamilword: 'ஸு-நிஸ்சிதம்', roman: 'su-niścitam', meaning: 'தெளிவாக / உறுதியாக', originalIndex: 16 }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'கீதா 5.2',
      subtitle: 'श्री भगवान उवाच',
      description: 'செயலைத் துறப்பதும், பக்தியுடன் செயற்படுவதும் இரண்டுமே விடுதலைக்கு உகந்தவையே - ஆனால் இவை இரண்டில், செயலைத் துறப்பதைவிட, பக்தித்தொண்டில் செயல்படுவதே மேலானது.',
      difficulty: 'ஆரம்ப நிலை',
      lines: [
        {
          devanagari: 'श्री भगवान उवाच: संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ। तयोस्तु कर्म संन्यासात् कर्मयोगो विशिष्यते॥',
          tamilword: 'ஸ்ரீ பகவான் உவாச: ஸந்யாஸ: கர்மயோகஸ் ச நி:ஷ்ரேயஸ கராவுபெள । தயோஸ்து கர்ம ஸந்யாஸாத் கர்மயோகோ விஷிஷ்யதே ॥',
          roman: 'śrī bhagavān uvāca: saṃnyāsaḥ karmayogaś ca niḥśreyasa-karāv ubhau, tayos tu karma-saṃnyāsāt karmayogo viśiṣyate',
          meaning: 'இறைவன் கூறினார்: செயலைத் துறப்பதும், பக்தியுடன் செயற்படுவதும் இரண்டுமே விடுதலைக்கு உகந்தவையே - ஆனால் இவை இரண்டில், செயலைத் துறப்பதைவிட, பக்தித்தொண்டில் செயல்படுவதே மேலானது.',
          words: [
            { devanagari: 'श्री', tamilword: 'ஸ்ரீ', roman: 'śrī', meaning: 'பெருமை வாய்ந்த', originalIndex: 0 },
            { devanagari: 'भगवान', tamilword: 'பகவான்', roman: 'bhagavān', meaning: 'இறைவன்', originalIndex: 1 },
            { devanagari: 'उवाच', tamilword: 'உவாச', roman: 'uvāca', meaning: 'கூறினார்', originalIndex: 2 },
            { devanagari: 'संन्यासः', tamilword: 'ஸந்யாஸ:', roman: 'saṃnyāsaḥ', meaning: 'செயலைத் துறப்பது', originalIndex: 3 },
            { devanagari: 'कर्मयोगः', tamilword: 'கர்மயோக:', roman: 'karmayogaḥ', meaning: 'பக்தியுடன் செயற்படுவது', originalIndex: 4 },
            { devanagari: 'च', tamilword: 'ச', roman: 'ca', meaning: 'மற்றும்', originalIndex: 5 },
            { devanagari: 'निःश्रेयसकरौ', tamilword: 'நி:ஷ்ரேயஸ கரௌ', roman: 'niḥśreyasa-karau', meaning: 'விடுதலைக்கு உகந்தவை', originalIndex: 6 },
            { devanagari: 'उभौ', tamilword: 'உபௌ', roman: 'ubhau', meaning: 'இரண்டுமே', originalIndex: 7 },
            { devanagari: 'तयोः', tamilword: 'தயோ:', roman: 'tayoḥ', meaning: 'இவை இரண்டில்', originalIndex: 8 },
            { devanagari: 'तु', tamilword: 'து', roman: 'tu', meaning: 'ஆனால்', originalIndex: 9 },
            { devanagari: 'कर्म', tamilword: 'கர்ம', roman: 'karma', meaning: 'செயல்', originalIndex: 10 },
            { devanagari: 'संन्यासात्', tamilword: 'ஸந்யாஸாத்', roman: 'saṃnyāsāt', meaning: 'செயலைத் துறப்பதைவிட', originalIndex: 11 },
            { devanagari: 'कर्मयोगः', tamilword: 'கர்மயோக:', roman: 'karmayogaḥ', meaning: 'பக்தியுடன் செயற்படுவது', originalIndex: 12 },
            { devanagari: 'विशिष्यते', tamilword: 'விஷிஷ்யதே', roman: 'viśiṣyate', meaning: 'மேலானது', originalIndex: 13 }
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'கீதா 5.3',
      subtitle: 'க்ஞேய: ஸ நித்ய ஸந்யாஸி',
      description: 'யாரொருவன் செயலின் விளைவுகளில் விருப்பு வெறுப்பற்றவனோ அவனே நிரந்தரமான துறவியாவான். பலம் பொருந்திய புயங்களை உடைய அர்ஜுனா! அத்தகையோன், எல்லா இருமைகளிலிருந்தும் விடுபட்டு, ஜடக் கட்டுக்களை எளிதாய் வென்று, முழுமையாய் விடுதலை பெறுகிறான்.',
      difficulty: 'ஆரம்ப நிலை',
      lines: [
        {
          devanagari: 'ज्ञेयः स नित्यसंन्यासी यो न द्वेष्टि न काङ्क्षति। निर्द्वन्द्वो हि महाबाहो सुखं बन्धात् प्रमुच्यते॥',
          tamilword: 'க்ஞேய: ஸ நித்ய ஸந்யாஸி யோ ந த்வேஷ்டி ந காங்க்ஷதி । நிர்த்வந்த்வோ ஹி மஹாபாஹோ ஸுகம் பந்தாத் ப்ரமுச்யதே ॥',
          roman: 'jñeyaḥ sa nitya-saṃnyāsī yo na dveṣṭi na kāṅkṣati, nirdvandvo hi mahā-bāho sukhaṃ bandhāt pramucyate',
          meaning: 'யாரொருவன் செயலின் விளைவுகளில் விருப்பு வெறுப்பற்றவனோ அவனே நிரந்தரமான துறவியாவான். பலம் பொருந்திய புயங்களை உடைய அர்ஜுனா! அத்தகையோன், எல்லா இருமைகளிலிருந்தும் விடுபட்டு, ஜடக் கட்டுக்களை எளிதாய் வென்று, முழுமையாய் விடுதலை பெறுகிறான்.',
          words: [
            { devanagari: 'ज्ञेयः', tamilword: 'க்ஞேய:', roman: 'jñeyaḥ', meaning: 'அறியப்படவேண்டியவன்', originalIndex: 0 },
            { devanagari: 'स', tamilword: 'ஸ', roman: 'sa', meaning: 'அவன்', originalIndex: 1 },
            { devanagari: 'नित्यसंन्यासी', tamilword: 'நித்ய ஸந்யாஸி', roman: 'nitya-saṃnyāsī', meaning: 'நிரந்தரமான துறவி', originalIndex: 2 },
            { devanagari: 'यः', tamilword: 'ய:', roman: 'yaḥ', meaning: 'யார்', originalIndex: 3 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 4 },
            { devanagari: 'द्वेष्टि', tamilword: 'த்வேஷ்டி', roman: 'dveṣṭi', meaning: 'வெறுப்பது', originalIndex: 5 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 6 },
            { devanagari: 'काङ्क्षति', tamilword: 'காங்க்ஷதி', roman: 'kāṅkṣati', meaning: 'விரும்புவது', originalIndex: 7 },
            { devanagari: 'निर्द्वन्द्वः', tamilword: 'நிர்த்வந்த்வ:', roman: 'nirdvandvaḥ', meaning: 'இருமைகளிலிருந்து விடுபட்டவன்', originalIndex: 8 },
            { devanagari: 'हि', tamilword: 'ஹி', roman: 'hi', meaning: 'நிச்சயமாக', originalIndex: 9 },
            { devanagari: 'महाबाहो', tamilword: 'மஹாபாஹோ', roman: 'mahā-bāho', meaning: 'பலம் பொருந்திய புயங்களை உடையவரே', originalIndex: 10 },
            { devanagari: 'सुखम्', tamilword: 'ஸுகம்', roman: 'sukham', meaning: 'எளிதாக', originalIndex: 11 },
            { devanagari: 'बन्धात्', tamilword: 'பந்தாத்', roman: 'bandhāt', meaning: 'பந்தத்திலிருந்து', originalIndex: 12 },
            { devanagari: 'प्रमुच्यते', tamilword: 'ப்ரமுச்யதே', roman: 'pramucyate', meaning: 'விடுதலை பெறுகிறான்', originalIndex: 13 }
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'கீதா 5.4',
      subtitle: 'ஸாங்க்ய யோகௌ ப்ருதக் பாலா:',
      description: 'ஜட உலகின் ஆய்வறிவு (ஸாங்க்யம்) என்பது கர்மயோகம், பக்தித் தொண்டு இவற்றினின்றும் வேறானதென்று அறிவற்றோரே கூறுவர். உண்மையில் அறிவு சான்றோர், இவையிரண்டில் எதனை முழுமையாய் பின்பற்றினும் இரண்டின் பலனையும் அடையலாமென்றே புகல்வர்',
      difficulty: 'ஆரம்ப நிலை',
      lines: [
        {
          devanagari: 'साङ्ख्य योगौ पृथक् बाला: प्रवदन्ति न पण्डिता: । एकमप्यास्तित: सम्यक् उभयोर् विन्दते फलम् ॥',
          tamilword: 'ஸாங்க்ய யோகௌ ப்ருதக் பாலா: ப்ரவதந்தி ந பண்டிதா: । ஏகமப்யாஸ்தித: ஸம்யக் உபயோர் விந்ததே ஃபலம் ॥',
          roman: 'sāṅkhya yogau pṛthak bālāḥ pravadanti na paṇḍitāḥ, ekam apy āsthitaḥ samyak ubhayor vindate phalam',
          meaning: 'ஜட உலகின் ஆய்வறிவு (ஸாங்க்யம்) என்பது கர்மயோகம், பக்தித் தொண்டு இவற்றினின்றும் வேறானதென்று அறிவற்றோரே கூறுவர். உண்மையில் அறிவு சான்றோர், இவையிரண்டில் எதனை முழுமையாய் பின்பற்றினும் இரண்டின் பலனையும் அடையலாமென்றே புகல்வர்',
          words: [
            { devanagari: 'साङ्ख्य', tamilword: 'ஸாங்க்ய', roman: 'sāṅkhya', meaning: 'ஆய்வறிவு', originalIndex: 0 },
            { devanagari: 'योगौ', tamilword: 'யோகௌ', roman: 'yogau', meaning: 'யோகம் மற்றும்', originalIndex: 1 },
            { devanagari: 'पृथक्', tamilword: 'ப்ருதக்', roman: 'pṛthak', meaning: 'வேறானது', originalIndex: 2 },
            { devanagari: 'बाला:', tamilword: 'பாலா:', roman: 'bālāḥ', meaning: 'அறிவற்றோர்', originalIndex: 3 },
            { devanagari: 'प्रवदन्ति', tamilword: 'ப்ரவதந்தி', roman: 'pravadanti', meaning: 'கூறுவர்', originalIndex: 4 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 5 },
            { devanagari: 'पण्डिता:', tamilword: 'பண்டிதா:', roman: 'paṇḍitāḥ', meaning: 'சான்றோர்', originalIndex: 6 },
            { devanagari: 'एकम्', tamilword: 'ஏகம்', roman: 'ekam', meaning: 'ஒன்றை', originalIndex: 7 },
            { devanagari: 'अपि', tamilword: 'அபி', roman: 'api', meaning: 'கூட', originalIndex: 8 },
            { devanagari: 'आस्तित:', tamilword: 'ஆஸ்தித:', roman: 'āsthitaḥ', meaning: 'பின்பற்றினால்', originalIndex: 9 },
            { devanagari: 'सम्यक्', tamilword: 'ஸம்யக்', roman: 'samyak', meaning: 'முழுமையாய்', originalIndex: 10 },
            { devanagari: 'उभयोर्', tamilword: 'உபயோர்', roman: 'ubhayor', meaning: 'இரண்டின்', originalIndex: 11 },
            { devanagari: 'विन्दते', tamilword: 'விந்ததே', roman: 'vindate', meaning: 'அடைகிறான்', originalIndex: 12 },
            { devanagari: 'फलम्', tamilword: 'ஃபலம்', roman: 'phalam', meaning: 'பலனை', originalIndex: 13 }
          ]
        }
      ]
    },
    {
      id: 5,
      title: 'கீதா 5.5',
      subtitle: 'யத்ஸாங்க்யை: ப்ராப்யதே ஸ்தானம்',
      description: 'துறவினால் அடையக் கூடிய அதே நிலை, பக்திமயமான தொண்டினாலும் அடையக் கூடியதே என்று எவன் அறிகிறானோ- செயல்முறை வழியும், துறவுமுறை வழியும் ஒன்றென்று காண்கிறானோ- அவனே உண்மையில் உள்ளதை உள்ளபடி காண்பவனாகின்றான்.',
      difficulty: 'ஆரம்ப நிலை',
      lines: [
        {
          devanagari: 'यत्साङ्ख्यै: प्राप्यते स्थानम् तत् योगैरपि गम्यते । एकम् साङ्ख्यम् च योगम् च य: पश्यति स पश्यति ॥',
          tamilword: 'யத்ஸாங்க்யை: ப்ராப்யதே ஸ்தானம் தத் யோகைரபி கம்யதே । ஏகம் ஸாங்க்யம் ச யோகம் ச ய: பஷ்யதி ஸ பஷ்யதி ॥',
          roman: 'yat sāṅkhyaiḥ prāpyate sthānam tat yogair api gamyate, ekam sāṅkhyam ca yogam ca yaḥ paśyati sa paśyati',
          meaning: 'துறவினால் அடையக் கூடிய அதே நிலை, பக்திமயமான தொண்டினாலும் அடையக் கூடியதே என்று எவன் அறிகிறானோ- செயல்முறை வழியும், துறவுமுறை வழியும் ஒன்றென்று காண்கிறானோ- அவனே உண்மையில் உள்ளதை உள்ளபடி காண்பவனாகின்றான்.',
          words: [
            { devanagari: 'यत्', tamilword: 'யத்', roman: 'yat', meaning: 'எது', originalIndex: 0 },
            { devanagari: 'साङ्ख्यै:', tamilword: 'ஸாங்க்யை:', roman: 'sāṅkhyaiḥ', meaning: 'ஸாங்க்யத்தால்', originalIndex: 1 },
            { devanagari: 'प्राप्यते', tamilword: 'ப்ராப்யதே', roman: 'prāpyate', meaning: 'அடையப்படுகிறது', originalIndex: 2 },
            { devanagari: 'स्थानम्', tamilword: 'ஸ்தானம்', roman: 'sthānam', meaning: 'நிலை', originalIndex: 3 },
            { devanagari: 'तत्', tamilword: 'தத்', roman: 'tat', meaning: 'அது', originalIndex: 4 },
            { devanagari: 'योगैः', tamilword: 'யோகை:', roman: 'yogaiḥ', meaning: 'யோகத்தால்', originalIndex: 5 },
            { devanagari: 'अपि', tamilword: 'அபி', roman: 'api', meaning: 'கூட', originalIndex: 6 },
            { devanagari: 'गम्यते', tamilword: 'கம்யதே', roman: 'gamyate', meaning: 'அடையப்படுகிறது', originalIndex: 7 },
            { devanagari: 'एकम्', tamilword: 'ஏகம்', roman: 'ekam', meaning: 'ஒன்று', originalIndex: 8 },
            { devanagari: 'साङ्ख्यम्', tamilword: 'ஸாங்க்யம்', roman: 'sāṅkhyam', meaning: 'ஸாங்க்யம்', originalIndex: 9 },
            { devanagari: 'च', tamilword: 'ச', roman: 'ca', meaning: 'மற்றும்', originalIndex: 10 },
            { devanagari: 'योगम्', tamilword: 'யோகம்', roman: 'yogam', meaning: 'யோகம்', originalIndex: 11 },
            { devanagari: 'च', tamilword: 'ச', roman: 'ca', meaning: 'மற்றும்', originalIndex: 12 },
            { devanagari: 'य:', tamilword: 'ய:', roman: 'yaḥ', meaning: 'யார்', originalIndex: 13 },
            { devanagari: 'पश्यति', tamilword: 'பஷ்யதி', roman: 'paśyati', meaning: 'காண்கிறான்', originalIndex: 14 },
            { devanagari: 'स', tamilword: 'ஸ', roman: 'sa', meaning: 'அவன்', originalIndex: 15 },
            { devanagari: 'पश्यति', tamilword: 'பஷ்யதி', roman: 'paśyati', meaning: 'காண்கிறான்', originalIndex: 16 }
          ]
        }
      ]
    },
    {
      id: 6,
      title: 'கீதா 5.6',
      subtitle: 'ஸந்யாஸஸ் து மஹாபாஹோ',
      description: 'இறைவனின் அன்புத் தொண்டில் ஈடுபடாதவரை வெறுமே செயல்களைத் துறப்பதால் ஒருவன் மகிழ்ச்சியடைய முடியாது. முனிவர்கள் பக்திச் செயல்களால் தூய்மைப்படுத்தப்பட்டு தாமதமின்றி பரத்தை அடைகின்றனர்.',
      difficulty: 'ஆரம்ப நிலை',
      lines: [
        {
          devanagari: 'सन्यासस् तु महाबाहो दुःखमाप्तुम् अयोगत: । योगयुक्तो मुनि: ब्रह्म न चिरेणाधिगच्छति ॥',
          tamilword: 'ஸந்யாஸஸ் து மஹாபாஹோ துக்கமாப்தும் அயோகத: । யோகயுக்தோ முனி: ப்ரஹ்ம ந சிரேணாதிகச்சதி ॥',
          roman: 'saṃnyāsas tu mahā-bāho duḥkham āptum ayogataḥ, yogayukto muniḥ brahma na cireṇādhigacchati',
          meaning: 'இறைவனின் அன்புத் தொண்டில் ஈடுபடாதவரை வெறுமே செயல்களைத் துறப்பதால் ஒருவன் மகிழ்ச்சியடைய முடியாது. முனிவர்கள் பக்திச் செயல்களால் தூய்மைப்படுத்தப்பட்டு தாமதமின்றி பரத்தை அடைகின்றனர்.',
          words: [
            { devanagari: 'सन्यासः', tamilword: 'ஸந்யாஸ:', roman: 'saṃnyāsaḥ', meaning: 'துறவு', originalIndex: 0 },
            { devanagari: 'तु', tamilword: 'து', roman: 'tu', meaning: 'ஆனால்', originalIndex: 1 },
            { devanagari: 'महाबाहो', tamilword: 'மஹாபாஹோ', roman: 'mahā-bāho', meaning: 'பலம் பொருந்திய புயங்களை உடையவரே', originalIndex: 2 },
            { devanagari: 'दुःखम्', tamilword: 'துக்கம்', roman: 'duḥkham', meaning: 'துன்பம்', originalIndex: 3 },
            { devanagari: 'आप्तुम्', tamilword: 'ஆப்தும்', roman: 'āptum', meaning: 'அடைவதற்கு', originalIndex: 4 },
            { devanagari: 'अयोगत:', tamilword: 'அயோகத:', roman: 'ayogataḥ', meaning: 'யோகமின்றி', originalIndex: 5 },
            { devanagari: 'योगयुक्तः', tamilword: 'யோகயுக்தோ', roman: 'yogayuktaḥ', meaning: 'யோகத்துடன் இணைந்தவன்', originalIndex: 6 },
            { devanagari: 'मुनि:', tamilword: 'முனி:', roman: 'muniḥ', meaning: 'முனிவன்', originalIndex: 7 },
            { devanagari: 'ब्रह्म', tamilword: 'ப்ரஹ்ம', roman: 'brahma', meaning: 'பரம்பொருள்', originalIndex: 8 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 9 },
            { devanagari: 'चिरेण', tamilword: 'சிரேண', roman: 'cireṇa', meaning: 'தாமதமாக', originalIndex: 10 },
            { devanagari: 'अधिगच्छति', tamilword: 'அதிகச்சதி', roman: 'adhigacchati', meaning: 'அடைகிறான்', originalIndex: 11 }
          ]
        }
      ]
    },
    {
      id: 7,
      title: 'கீதா 5.7',
      subtitle: 'யோகயுக்தோ விஷுத்தாத்மா',
      description: 'பக்தியுடன் செயல்களில் ஈடுபடும் தூய்மையான ஆத்மா. மனதையும், புலன்களையும் கட்டுப்படுத்தி எல்லோரிடமும் அன்பு கொண்டவனாகவும் எல்லோராலும் அன்பு கொள்ளப்படுபவனாகவும் ஆகின்றான். எப்போதும் செயலில் ஈடுபட்டாலும் கூட அத்தகு மனிதன் கட்டுப்படுவதில்லை.',
      difficulty: 'ஆரம்ப நிலை',
      lines: [
        {
          devanagari: 'योगयुक्तो विशुद्धात्मा विजितात्मा जितेन्द्रिय: । सर्वभूतात्म भूतात्मा कुर्वन्नपि न लिप्यते ॥',
          tamilword: 'யோகயுக்தோ விஷுத்தாத்மா விஜிதாத்மா ஜிதேந்த்ரிய: । ஸர்வபூதாத்ம பூதாத்மா குர்வன்னபி ந லிப்யதே ॥',
          roman: 'yogayukto viśuddhātmā vijitātmā jitendriyaḥ, sarvabhūtātma-bhūtātmā kurvann api na lipyate',
          meaning: 'பக்தியுடன் செயல்களில் ஈடுபடும் தூய்மையான ஆத்மா. மனதையும், புலன்களையும் கட்டுப்படுத்தி எல்லோரிடமும் அன்பு கொண்டவனாகவும் எல்லோராலும் அன்பு கொள்ளப்படுபவனாகவும் ஆகின்றான். எப்போதும் செயலில் ஈடுபட்டாலும் கூட அத்தகு மனிதன் கட்டுப்படுவதில்லை.',
          words: [
            { devanagari: 'योगयुक्तः', tamilword: 'யோகயுக்தோ', roman: 'yogayuktaḥ', meaning: 'யோகத்துடன் இணைந்தவன்', originalIndex: 0 },
            { devanagari: 'विशुद्धात्मा', tamilword: 'விஷுத்தாத்மா', roman: 'viśuddhātmā', meaning: 'தூய்மையான ஆத்மா', originalIndex: 1 },
            { devanagari: 'विजितात्मा', tamilword: 'விஜிதாத்மா', roman: 'vijitātmā', meaning: 'மனதை வென்றவன்', originalIndex: 2 },
            { devanagari: 'जितेन्द्रिय:', tamilword: 'ஜிதேந்த்ரிய:', roman: 'jitendriyaḥ', meaning: 'புலன்களை வென்றவன்', originalIndex: 3 },
            { devanagari: 'सर्वभूतात्म', tamilword: 'ஸர்வபூதாத்ம', roman: 'sarvabhūtātma', meaning: 'எல்லா உயிர்களின் ஆத்மா', originalIndex: 4 },
            { devanagari: 'भूतात्मा', tamilword: 'பூதாத்மா', roman: 'bhūtātmā', meaning: 'உயிர்களின் ஆத்மா', originalIndex: 5 },
            { devanagari: 'कुर्वन्', tamilword: 'குர்வன்', roman: 'kurvan', meaning: 'செய்கிறான்', originalIndex: 6 },
            { devanagari: 'अपि', tamilword: 'அபி', roman: 'api', meaning: 'கூட', originalIndex: 7 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 8 },
            { devanagari: 'लिप्यते', tamilword: 'லிப்யதே', roman: 'lipyate', meaning: 'கட்டுப்படுகிறான்', originalIndex: 9 }
          ]
        }
      ]
    },
    {
      id: 8,
      title: 'கீதா 5.8-9',
      subtitle: 'நைவ கிஞ்சித் கரோமி',
      description: 'தெய்வீக உணர்வில் இருப்பவன், கேட்டல், பார்த்தல், தொடுதல், நுகர்தல், உண்ணுதல், செல்லுதல், உறங்குதல், சுவாசித்தல், இவற்றில் ஈடுபட்டிருப்பினும் உண்மையில் தான் ஒன்றுமே செய்வதில்லை என்பதை எப்போதும் தனக்குள் அறிபவனாக இருக்கின்றான். ஏனெனில் பேசும்போதும், கழிக்கும் போதும், கண்களை மூடித்திறக்கும் போதும், பெறும் போதும் ஜடப்புலன்களே அவற்றின் விஷயங்களுடன் ஈடுபட்டுக் கொண்டிருக்கின்றன என்றும் தான் அவற்றினின்றும் வேறுபட்டவன் என்றும் அவன் எப்போதும் அறிகின்றான்.',
      difficulty: 'நடுநிலை',
      lines: [
        {
          devanagari: 'नैव किञ्चित् करोमि इति युक्तो मन्येत तत्त्ववित् । पश्यन् श्रुण्वन् स्पृशन् जिघ्रन् अश्नन् गच्छन् स्वपन् श्वसन् ॥ प्रलपन् विसृजन् गृह्णन् उन्मिषन् निमिषन्नपि । इन्द्रियाणि इन्द्रियार्थेषु वर्तन्त इति धारयन् ॥',
          tamilword: 'நைவ கிஞ்சித் கரோமி இதி யுக்தோ மன்யேத தத்வவித் । பஷ்யன் ஸ்ருண்வன் ஸ்ப்ருஷன் ஜிக்ருனன் அஷ்னன் கச்சன் ஸ்வபன் ஷ்வஸன் ॥ ப்ரலபன் விஸ்ருஜன் க்ருஹ்ணன் உன்மிஷன் நிமிஷன்னபி । இந்த்ரியாணி இந்த்ரியார்த்தேஷு வர்தந்த இதி தாரயன் ॥',
          roman: 'naiva kiñcit karomi iti yukto manyeta tattvavit, paśyan śṛṇvan spṛśan jighran aśnan gacchan svapan śvasan, pralapan visṛjan gṛhṇan unmiṣan nimiṣann api, indriyāṇi indriyārtheṣu vartanta iti dhārayan',
          meaning: 'தெய்வீக உணர்வில் இருப்பவன், கேட்டல், பார்த்தல், தொடுதல், நுகர்தல், உண்ணுதல், செல்லுதல், உறங்குதல், சுவாசித்தல், இவற்றில் ஈடுபட்டிருப்பினும் உண்மையில் தான் ஒன்றுமே செய்வதில்லை என்பதை எப்போதும் தனக்குள் அறிபவனாக இருக்கின்றான். ஏனெனில் பேசும்போதும், கழிக்கும் போதும், கண்களை மூடித்திறக்கும் போதும், பெறும் போதும் ஜடப்புலன்களே அவற்றின் விஷயங்களுடன் ஈடுபட்டுக் கொண்டிருக்கின்றன என்றும் தான் அவற்றினின்றும் வேறுபட்டவன் என்றும் அவன் எப்போதும் அறிகின்றான்.',
          words: [
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 0 },
            { devanagari: 'एव', tamilword: 'ஏவ', roman: 'eva', meaning: 'நிச்சயமாக', originalIndex: 1 },
            { devanagari: 'किञ्चित्', tamilword: 'கிஞ்சித்', roman: 'kiñcit', meaning: 'எதையும்', originalIndex: 2 },
            { devanagari: 'करोमि', tamilword: 'கரோமி', roman: 'karomi', meaning: 'செய்கிறேன்', originalIndex: 3 },
            { devanagari: 'इति', tamilword: 'இதி', roman: 'iti', meaning: 'என்று', originalIndex: 4 },
            { devanagari: 'युक्तः', tamilword: 'யுக்தோ', roman: 'yuktaḥ', meaning: 'இணைந்தவன்', originalIndex: 5 },
            { devanagari: 'मन्येत', tamilword: 'மன்யேத', roman: 'manyeta', meaning: 'நினைக்கிறான்', originalIndex: 6 },
            { devanagari: 'तत्त्ववित्', tamilword: 'தத்வவித்', roman: 'tattvavit', meaning: 'உண்மையை அறிபவன்', originalIndex: 7 },
            { devanagari: 'पश्यन्', tamilword: 'பஷ்யன்', roman: 'paśyan', meaning: 'பார்க்கும்போது', originalIndex: 8 },
            { devanagari: 'श्रुण्वन्', tamilword: 'ஸ்ருண்வன்', roman: 'śṛṇvan', meaning: 'கேட்கும்போது', originalIndex: 9 },
            { devanagari: 'स्पृशन्', tamilword: 'ஸ்ப்ருஷன்', roman: 'spṛśan', meaning: 'தொடும்போது', originalIndex: 10 },
            { devanagari: 'जिघ्रन्', tamilword: 'ஜிக்ருன்', roman: 'jighran', meaning: 'நுகரும்போது', originalIndex: 11 },
            { devanagari: 'अश्नन्', tamilword: 'அஷ்னன்', roman: 'aśnan', meaning: 'உண்ணும்போது', originalIndex: 12 },
            { devanagari: 'गच्छन्', tamilword: 'கச்சன்', roman: 'gacchan', meaning: 'செல்லும்போது', originalIndex: 13 },
            { devanagari: 'स्वपन्', tamilword: 'ஸ்வபன்', roman: 'svapan', meaning: 'தூங்கும்போது', originalIndex: 14 },
            { devanagari: 'श्वसन्', tamilword: 'ஷ்வஸன்', roman: 'śvasan', meaning: 'சுவாசிக்கும்போது', originalIndex: 15 },
            { devanagari: 'प्रलपन्', tamilword: 'ப்ரலபன்', roman: 'pralapan', meaning: 'பேசும்போது', originalIndex: 16 },
            { devanagari: 'विसृजन्', tamilword: 'விஸ்ருஜன்', roman: 'visṛjan', meaning: 'கழிக்கும்போது', originalIndex: 17 },
            { devanagari: 'गृह्णन्', tamilword: 'க்ருஹ்ணன்', roman: 'gṛhṇan', meaning: 'பெறும்போது', originalIndex: 18 },
            { devanagari: 'उन्मिषन्', tamilword: 'உன்மிஷன்', roman: 'unmiṣan', meaning: 'கண் திறக்கும்போது', originalIndex: 19 },
            { devanagari: 'निमिषन्', tamilword: 'நிமிஷன்', roman: 'nimiṣan', meaning: 'கண் மூடும்போது', originalIndex: 20 },
            { devanagari: 'अपि', tamilword: 'அபி', roman: 'api', meaning: 'கூட', originalIndex: 21 },
            { devanagari: 'इन्द्रियाणि', tamilword: 'இந்த்ரியாணி', roman: 'indriyāṇi', meaning: 'புலன்கள்', originalIndex: 22 },
            { devanagari: 'इन्द्रियार्थेषु', tamilword: 'இந்த்ரியார்த்தேஷு', roman: 'indriyārtheṣu', meaning: 'புலன் விஷயங்களில்', originalIndex: 23 },
            { devanagari: 'वर्तन्ते', tamilword: 'வர்தந்தே', roman: 'vartante', meaning: 'செயல்படுகின்றன', originalIndex: 24 },
            { devanagari: 'इति', tamilword: 'இதி', roman: 'iti', meaning: 'என்று', originalIndex: 25 },
            { devanagari: 'धारयन्', tamilword: 'தாரயன்', roman: 'dhārayan', meaning: 'கருதுபவன்', originalIndex: 26 }
          ]
        }
      ]
    },
    {
      id: 9,
      title: 'கீதா 5.10',
      subtitle: 'ப்ரஹ்மண் ஆதாய கர்மாணி',
      description: 'பற்றின்றி கடமைகளை செய்து, பலன்களை பரமபுருஷ பகவானுக்கு அர்ப்பணிப்பவன் தாமரை இலை எவ்வாறு நீரால் பாதிக்கப் படுவதில்லையோ அதுபோல, பாவ விளைவுகளால் பாதிக்கப்படுவதே இல்லை.',
      difficulty: 'ஆரம்ப நிலை',
      lines: [
        {
          devanagari: 'ब्रह्मण् आधाय कर्माणि सङ्गम् त्यक्त्वा करोति य: । लिप्यते न स पापेन पद्मपत्रम् इवाम्भसा ॥',
          tamilword: 'ப்ரஹ்மண் ஆதாய கர்மாணி ஸங்கம் த்யக்த்வா கரோதி ய: । லிப்யதே ந ஸ பாபேன பத்மபத்ரம் இவாம்பஸா ॥',
          roman: 'brahmaṇy ādhāya karmāṇi saṅgaṃ tyaktvā karoti yaḥ, lipyate na sa pāpena padmapatram ivāmbhasā',
          meaning: 'பற்றின்றி கடமைகளை செய்து, பலன்களை பரமபுருஷ பகவானுக்கு அர்ப்பணிப்பவன் தாமரை இலை எவ்வாறு நீரால் பாதிக்கப் படுவதில்லையோ அதுபோல, பாவ விளைவுகளால் பாதிக்கப்படுவதே இல்லை.',
          words: [
            { devanagari: 'ब्रह्मणि', tamilword: 'ப்ரஹ்மணி', roman: 'brahmaṇi', meaning: 'பரம்பொருளில்', originalIndex: 0 },
            { devanagari: 'आधाय', tamilword: 'ஆதாய', roman: 'ādhāya', meaning: 'அர்ப்பணித்து', originalIndex: 1 },
            { devanagari: 'कर्माणि', tamilword: 'கர்மாணி', roman: 'karmāṇi', meaning: 'செயல்களை', originalIndex: 2 },
            { devanagari: 'सङ्गम्', tamilword: 'ஸங்கம்', roman: 'saṅgam', meaning: 'பற்றை', originalIndex: 3 },
            { devanagari: 'त्यक्त्वा', tamilword: 'த்யக்த்வா', roman: 'tyaktvā', meaning: 'துறந்து', originalIndex: 4 },
            { devanagari: 'करोति', tamilword: 'கரோதி', roman: 'karoti', meaning: 'செய்கிறான்', originalIndex: 5 },
            { devanagari: 'य:', tamilword: 'ய:', roman: 'yaḥ', meaning: 'யார்', originalIndex: 6 },
            { devanagari: 'लिप्यते', tamilword: 'லிப்யதே', roman: 'lipyate', meaning: 'பாதிக்கப்படுகிறான்', originalIndex: 7 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 8 },
            { devanagari: 'स', tamilword: 'ஸ', roman: 'sa', meaning: 'அவன்', originalIndex: 9 },
            { devanagari: 'पापेन', tamilword: 'பாபேன', roman: 'pāpena', meaning: 'பாவத்தால்', originalIndex: 10 },
            { devanagari: 'पद्मपत्रम्', tamilword: 'பத்மபத்ரம்', roman: 'padmapatram', meaning: 'தாமரை இலை', originalIndex: 11 },
            { devanagari: 'इव', tamilword: 'இவ', roman: 'iva', meaning: 'போல', originalIndex: 12 },
            { devanagari: 'अम्भसा', tamilword: 'அம்பஸா', roman: 'ambhasā', meaning: 'நீரால்', originalIndex: 13 }
          ]
        }
      ]
    },
    {
      id: 10,
      title: 'கீதா 5.11',
      subtitle: 'காயேன மனஸா புத்யா',
      description: 'பற்றைத் துறந்து, உடல், மனம், அறிவு மற்றும் புலன்களால் கூட, தூய்மையடையும் நோக்கத்துடன் யோகிகள் செயற்படுகின்றனர்.',
      difficulty: 'ஆரம்ப நிலை',
      lines: [
        {
          devanagari: 'कायेन मनसा बुद्ध्या केवलै: इन्द्रियैरपि । योगिन: कर्म कुर्वन्ति सङ्गम् त्यक्त्वा आत्म शुद्धये ॥',
          tamilword: 'காயேன மனஸா புத்யா கேவலை: இந்த்ரியைரபி । யோகின: கர்ம குர்வந்தி ஸங்கம் த்யக்த்வா ஆத்ம ஸுத்தயே ॥',
          roman: 'kāyena manasā buddhyā kevalaiḥ indriyair api, yoginaḥ karma kurvanti saṅgaṃ tyaktvā ātma-śuddhaye',
          meaning: 'பற்றைத் துறந்து, உடல், மனம், அறிவு மற்றும் புலன்களால் கூட, தூய்மையடையும் நோக்கத்துடன் யோகிகள் செயற்படுகின்றனர்.',
          words: [
            { devanagari: 'कायेन', tamilword: 'காயேன', roman: 'kāyena', meaning: 'உடலால்', originalIndex: 0 },
            { devanagari: 'मनसा', tamilword: 'மனஸா', roman: 'manasā', meaning: 'மனதால்', originalIndex: 1 },
            { devanagari: 'बुद्ध्या', tamilword: 'புத்யா', roman: 'buddhyā', meaning: 'அறிவால்', originalIndex: 2 },
            { devanagari: 'केवलै:', tamilword: 'கேவலை:', roman: 'kevalaiḥ', meaning: 'மட்டுமே', originalIndex: 3 },
            { devanagari: 'इन्द्रियै:', tamilword: 'இந்த்ரியை:', roman: 'indriyaiḥ', meaning: 'புலன்களால்', originalIndex: 4 },
            { devanagari: 'अपि', tamilword: 'அபி', roman: 'api', meaning: 'கூட', originalIndex: 5 },
            { devanagari: 'योगिन:', tamilword: 'யோகின:', roman: 'yoginaḥ', meaning: 'யோகிகள்', originalIndex: 6 },
            { devanagari: 'कर्म', tamilword: 'கர்ம', roman: 'karma', meaning: 'செயல்', originalIndex: 7 },
            { devanagari: 'कुर्वन्ति', tamilword: 'குர்வந்தி', roman: 'kurvanti', meaning: 'செய்கிறார்கள்', originalIndex: 8 },
            { devanagari: 'सङ्गम्', tamilword: 'ஸங்கம்', roman: 'saṅgam', meaning: 'பற்றை', originalIndex: 9 },
            { devanagari: 'त्यक्त्वा', tamilword: 'த்யக்த்வா', roman: 'tyaktvā', meaning: 'துறந்து', originalIndex: 10 },
            { devanagari: 'आत्म', tamilword: 'ஆத்ம', roman: 'ātma', meaning: 'ஆத்மா', originalIndex: 11 },
            { devanagari: 'शुद्धये', tamilword: 'ஸுத்தயே', roman: 'śuddhaye', meaning: 'தூய்மைக்காக', originalIndex: 12 }
          ]
        }
      ]
    },
    {
      id: 11,
      title: 'கீதா 5.12',
      subtitle: 'யுக்த: கர்மஃபலம் த்யக்த்வா',
      description: 'உறுதியான பக்தி கொண்ட ஆன்மா, கலப்பற்ற அமைதியை அடைகிறான். ஏனெனில் அவன் எல்லாச் செயல்களின் விளைவுகளையும் எனக்கே அர்ப்பணம் செய்கிறான். ஆனால் தெய்வீகத்துடன் இணையாதவனோ, தன் முயற்சிகளின் பலன்களில் பெருவிருப்புற்று, சிக்கிக் கொள்கிறான்.',
      difficulty: 'ஆரம்ப நிலை',
      lines: [
        {
          devanagari: 'युक्त: कर्मफलम् त्यक्त्वा शान्तिमाप्नोति नैष्ठिकीम् । अयुक्त: कामकारेण फले सक्तो निबध्यते ॥',
          tamilword: 'யுக்த: கர்மஃபலம் த்யக்த்வா ஷாந்திமாப்னோதி நைஷ்டிகீம் । அயுக்த: காமகாரேண ஃபலே ஸக்தோ நிபத்யதே ॥',
          roman: 'yuktaḥ karmaphalaṃ tyaktvā śāntim āpnoti naiṣṭhikīm, ayuktaḥ kāmakāreṇa phale sakto nibadhyate',
          meaning: 'உறுதியான பக்தி கொண்ட ஆன்மா, கலப்பற்ற அமைதியை அடைகிறான். ஏனெனில் அவன் எல்லாச் செயல்களின் விளைவுகளையும் எனக்கே அர்ப்பணம் செய்கிறான். ஆனால் தெய்வீகத்துடன் இணையாதவனோ, தன் முயற்சிகளின் பலன்களில் பெருவிருப்புற்று, சிக்கிக் கொள்கிறான்.',
          words: [
            { devanagari: 'युक्त:', tamilword: 'யுக்த:', roman: 'yuktaḥ', meaning: 'இணைந்தவன்', originalIndex: 0 },
            { devanagari: 'कर्मफलम्', tamilword: 'கர்மஃபலம்', roman: 'karmaphalam', meaning: 'செயல் பலன்களை', originalIndex: 1 },
            { devanagari: 'त्यक्त्वा', tamilword: 'த்யக்த்வா', roman: 'tyaktvā', meaning: 'துறந்து', originalIndex: 2 },
            { devanagari: 'शान्तिम्', tamilword: 'ஷாந்திம்', roman: 'śāntim', meaning: 'அமைதியை', originalIndex: 3 },
            { devanagari: 'आप्नोति', tamilword: 'ஆப்னோதி', roman: 'āpnoti', meaning: 'அடைகிறான்', originalIndex: 4 },
            { devanagari: 'नैष्ठिकीम्', tamilword: 'நைஷ்டிகீம்', roman: 'naiṣṭhikīm', meaning: 'நிரந்தரமான', originalIndex: 5 },
            { devanagari: 'अयुक्त:', tamilword: 'அயுக்த:', roman: 'ayuktaḥ', meaning: 'இணையாதவன்', originalIndex: 6 },
            { devanagari: 'कामकारेण', tamilword: 'காமகாரேண', roman: 'kāmakāreṇa', meaning: 'ஆசையால்', originalIndex: 7 },
            { devanagari: 'फले', tamilword: 'ஃபலே', roman: 'phale', meaning: 'பலனில்', originalIndex: 8 },
            { devanagari: 'सक्तः', tamilword: 'ஸக்தோ', roman: 'saktaḥ', meaning: 'பற்றுள்ளவன்', originalIndex: 9 },
            { devanagari: 'निबध्यते', tamilword: 'நிபத்யதே', roman: 'nibadhyate', meaning: 'கட்டுப்படுகிறான்', originalIndex: 10 }
          ]
        }
      ]
    },
    {
      id: 12,
      title: 'கீதா 5.13',
      subtitle: 'ஸர்வ கர்மாணி மனஸா',
      description: 'உடல் கொண்ட ஆன்மா தன் இயற்கையைக் கட்டுப்படுத்தி மனதால் எல்லாச் செயல்களையும் துறந்துவிடும் போது, ஒன்பது கதவுகளைக் கொண்ட நகரில், செய்யாமலும் செயற்காரணமாகாமலும் இன்பமாய் வசிக்கின்றான்.',
      difficulty: 'நடுநிலை',
      lines: [
        {
          devanagari: 'सर्व कर्माणि मनसा सन्यस्यास्ते सुखम् वशी । नवद्वारे पुरे देही नैव कुर्वन् न कारयन् ॥',
          tamilword: 'ஸர்வ கர்மாணி மனஸா ஸன்யஸ்யாஸ்தே ஸுகம் வஷி । நவத்வாரே புரே தேஹி நைவ குர்வன் ந காரயன் ॥',
          roman: 'sarva karmāṇi manasā saṃnyasyāste sukhaṃ vaśī, navadvāre pure dehī naiva kurvan na kārayan',
          meaning: 'உடல் கொண்ட ஆன்மா தன் இயற்கையைக் கட்டுப்படுத்தி மனதால் எல்லாச் செயல்களையும் துறந்துவிடும் போது, ஒன்பது கதவுகளைக் கொண்ட நகரில், செய்யாமலும் செயற்காரணமாகாமலும் இன்பமாய் வசிக்கின்றான்.',
          words: [
            { devanagari: 'सर्व', tamilword: 'ஸர்வ', roman: 'sarva', meaning: 'எல்லா', originalIndex: 0 },
            { devanagari: 'कर्माणि', tamilword: 'கர்மாணி', roman: 'karmāṇi', meaning: 'செயல்களை', originalIndex: 1 },
            { devanagari: 'मनसा', tamilword: 'மனஸா', roman: 'manasā', meaning: 'மனதால்', originalIndex: 2 },
            { devanagari: 'सन्यस्य', tamilword: 'ஸன்யஸ்ய', roman: 'saṃnyasya', meaning: 'துறந்து', originalIndex: 3 },
            { devanagari: 'आस्ते', tamilword: 'ஆஸ்தே', roman: 'āste', meaning: 'வசிக்கிறான்', originalIndex: 4 },
            { devanagari: 'सुखम्', tamilword: 'ஸுகம்', roman: 'sukham', meaning: 'இன்பமாக', originalIndex: 5 },
            { devanagari: 'वशी', tamilword: 'வஷி', roman: 'vaśī', meaning: 'கட்டுப்பாட்டுடன்', originalIndex: 6 },
            { devanagari: 'नवद्वारे', tamilword: 'நவத்வாரே', roman: 'navadvāre', meaning: 'ஒன்பது கதவுகள்', originalIndex: 7 },
            { devanagari: 'पुरे', tamilword: 'புரே', roman: 'pure', meaning: 'நகரில்', originalIndex: 8 },
            { devanagari: 'देही', tamilword: 'தேஹி', roman: 'dehī', meaning: 'உடலுடையவன்', originalIndex: 9 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 10 },
            { devanagari: 'एव', tamilword: 'ஏவ', roman: 'eva', meaning: 'நிச்சயமாக', originalIndex: 11 },
            { devanagari: 'कुर्वन्', tamilword: 'குர்வன்', roman: 'kurvan', meaning: 'செய்யாமல்', originalIndex: 12 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 13 },
            { devanagari: 'कारयन्', tamilword: 'காரயன்', roman: 'kārayan', meaning: 'செய்விக்காமல்', originalIndex: 14 }
          ]
        }
      ]
    },
    {
      id: 13,
      title: 'கீதா 5.14',
      subtitle: 'ந கர்த்ருத்வம் ந கர்மாணி',
      description: 'உடல்கொண்ட, தனது உடல் நகரத்தின் நாயகனான ஆத்மா செயல்களை உண்டாக்குவதுமில்லை, எவரையும் செயற்படத் தூண்டுவது மில்லை, செயல்களின் பலன்களையும் உண்டாக்குவதில்லை. இவையெல்லாம் ஜட இயற்கைக் குணங்களால் நடிக்கப்படுபவையே.',
      difficulty: 'நடுநிலை',
      lines: [
        {
          devanagari: 'न कर्तृत्वम् न कर्माणि लोकस्य सृजति प्रभु: । न कर्मफल सम्योगम् स्वभावस् तु प्रवर्तते ॥',
          tamilword: 'ந கர்த்ருத்வம் ந கர்மாணி லோகஸ்ய ஸ்ருஜதி ப்ரபு: । ந கர்மஃபல ஸம்யோகம் ஸ்வபாவஸ் து ப்ரவர்த்ததே ॥',
          roman: 'na kartṛtvaṃ na karmāṇi lokasya sṛjati prabhuḥ, na karmaphala-saṃyogaṃ svabhāvas tu pravartate',
          meaning: 'உடல்கொண்ட, தனது உடல் நகரத்தின் நாயகனான ஆத்மா செயல்களை உண்டாக்குவதுமில்லை, எவரையும் செயற்படத் தூண்டுவது மில்லை, செயல்களின் பலன்களையும் உண்டாக்குவதில்லை. இவையெல்லாம் ஜட இயற்கைக் குணங்களால் நடிக்கப்படுபவையே.',
          words: [
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 0 },
            { devanagari: 'कर्तृत्वम्', tamilword: 'கர்த்ருத்வம்', roman: 'kartṛtvam', meaning: 'செயலாளராக', originalIndex: 1 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 2 },
            { devanagari: 'कर्माणि', tamilword: 'கர்மாணி', roman: 'karmāṇi', meaning: 'செயல்களை', originalIndex: 3 },
            { devanagari: 'लोकस्य', tamilword: 'லோகஸ்ய', roman: 'lokasya', meaning: 'உலகின்', originalIndex: 4 },
            { devanagari: 'सृजति', tamilword: 'ஸ்ருஜதி', roman: 'sṛjati', meaning: 'உண்டாக்குகிறான்', originalIndex: 5 },
            { devanagari: 'प्रभु:', tamilword: 'ப்ரபு:', roman: 'prabhuḥ', meaning: 'நாயகன்', originalIndex: 6 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 7 },
            { devanagari: 'कर्मफल', tamilword: 'கர்மஃபல', roman: 'karmaphala', meaning: 'செயல் பலன்', originalIndex: 8 },
            { devanagari: 'सम्योगम्', tamilword: 'ஸம்யோகம்', roman: 'saṃyogam', meaning: 'இணைப்பை', originalIndex: 9 },
            { devanagari: 'स्वभावः', tamilword: 'ஸ்வபாவ:', roman: 'svabhāvaḥ', meaning: 'இயற்கை', originalIndex: 10 },
            { devanagari: 'तु', tamilword: 'து', roman: 'tu', meaning: 'ஆனால்', originalIndex: 11 },
            { devanagari: 'प्रवर्तते', tamilword: 'ப்ரவர்த்ததே', roman: 'pravartate', meaning: 'செயல்படுகிறது', originalIndex: 12 }
          ]
        }
      ]
    },
    {
      id: 14,
      title: 'கீதா 5.15',
      subtitle: 'நாதத்தே கஸ்ய சித்பாபம்',
      description: 'எவரது பாவ, புண்ணியத்தையும் பரமாத்மா ஏற்பதுமில்லை. இருப்பினும் தங்களது உண்மை ஞானத்தை மறைக்கும் அஞ்ஞானத்தாலேயே ஆத்மாக்கள் மயங்குகின்றன.',
      difficulty: 'நடுநிலை',
      lines: [
        {
          devanagari: 'नादत्ते कस्य चित्पापम् न चैव सुकृतम् विभु: । अज्ञानेनावृतम् ज्ञानम् तेन मुह्यन्ति जन्तव: ॥',
          tamilword: 'நாதத்தே கஸ்ய சித்பாபம் ந சைவ ஸுக்ருதம் விபு: । அக்ஞானேனாவ்ருதம் ஞானம் தேன முஹ்யந்தி ஐந்தவ: ॥',
          roman: 'nādatte kasyacit pāpaṃ na caiva sukṛtaṃ vibhuḥ, ajñānenāvṛtaṃ jñānaṃ tena muhyanti jantavaḥ',
          meaning: 'எவரது பாவ, புண்ணியத்தையும் பரமாத்மா ஏற்பதுமில்லை. இருப்பினும் தங்களது உண்மை ஞானத்தை மறைக்கும் அஞ்ஞானத்தாலேயே ஆத்மாக்கள் மயங்குகின்றன.',
          words: [
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 0 },
            { devanagari: 'आदत्ते', tamilword: 'ஆதத்தே', roman: 'ādatte', meaning: 'ஏற்கிறான்', originalIndex: 1 },
            { devanagari: 'कस्य', tamilword: 'கஸ்ய', roman: 'kasya', meaning: 'யாருடைய', originalIndex: 2 },
            { devanagari: 'चित्', tamilword: 'சித்', roman: 'cit', meaning: 'எவரது', originalIndex: 3 },
            { devanagari: 'पापम्', tamilword: 'பாபம்', roman: 'pāpam', meaning: 'பாவத்தை', originalIndex: 4 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 5 },
            { devanagari: 'च', tamilword: 'ச', roman: 'ca', meaning: 'மற்றும்', originalIndex: 6 },
            { devanagari: 'एव', tamilword: 'ஏவ', roman: 'eva', meaning: 'நிச்சயமாக', originalIndex: 7 },
            { devanagari: 'सुकृतम्', tamilword: 'ஸுக்ருதம்', roman: 'sukṛtam', meaning: 'புண்ணியத்தை', originalIndex: 8 },
            { devanagari: 'विभु:', tamilword: 'விபு:', roman: 'vibhuḥ', meaning: 'பரமாத்மா', originalIndex: 9 },
            { devanagari: 'अज्ञानेन', tamilword: 'அக்ஞானேன', roman: 'ajñānena', meaning: 'அஞ்ஞானத்தால்', originalIndex: 10 },
            { devanagari: 'आवृतम्', tamilword: 'ஆவ்ருதம்', roman: 'āvṛtam', meaning: 'மறைக்கப்பட்ட', originalIndex: 11 },
            { devanagari: 'ज्ञानम्', tamilword: 'ஞானம்', roman: 'jñānam', meaning: 'ஞானம்', originalIndex: 12 },
            { devanagari: 'तेन', tamilword: 'தேன', roman: 'tena', meaning: 'அதனால்', originalIndex: 13 },
            { devanagari: 'मुह्यन्ति', tamilword: 'முஹ்யந்தி', roman: 'muhyanti', meaning: 'மயங்குகின்றன', originalIndex: 14 },
            { devanagari: 'जन्तव:', tamilword: 'ஜந்தவ:', roman: 'jantavaḥ', meaning: 'உயிர்கள்', originalIndex: 15 }
          ]
        }
      ]
    },
    {
      id: 15,
      title: 'கீதா 5.16',
      subtitle: 'ஞானேன து ததக்ஞானம்',
      description: 'இருப்பினும், அஞ்ஞானத்தை அழிக்கும் ஞானத்தால் ஒருவன் பிரகாசப்படுத்தப்படும் போது, பகல் நேரத்தில் சூரியன் எல்லாவற்றையும் வெளிச்சப்படுத்துவது போலவே, அவனது ஞானம் எல்லாவற்றையும் வெளிப்படுத்துகின்றது.',
      difficulty: 'நடுநிலை',
      lines: [
        {
          devanagari: 'ज्ञानेन तु तदज्ञानम् येषाम् नाशितमात्मन: । तेषाम् आदित्यवत् ज्ञानम् प्रकाशयति तत्परम् ॥',
          tamilword: 'ஞானேன து ததக்ஞானம் யேஷாம் நாஷிதமாத்மன: । தேஷாம் ஆதித்யவத் ஞானம் ப்ரகாஷயதி தத்பரம் ॥',
          roman: 'jñānena tu tad ajñānaṃ yeṣāṃ nāśitam ātmanaḥ, teṣām ādityavat jñānaṃ prakāśayati tat param',
          meaning: 'இருப்பினும், அஞ்ஞானத்தை அழிக்கும் ஞானத்தால் ஒருவன் பிரகாசப்படுத்தப்படும் போது, பகல் நேரத்தில் சூரியன் எல்லாவற்றையும் வெளிச்சப்படுத்துவது போலவே, அவனது ஞானம் எல்லாவற்றையும் வெளிப்படுத்துகின்றது.',
          words: [
            { devanagari: 'ज्ञानेन', tamilword: 'ஞானேன', roman: 'jñānena', meaning: 'ஞானத்தால்', originalIndex: 0 },
            { devanagari: 'तु', tamilword: 'து', roman: 'tu', meaning: 'ஆனால்', originalIndex: 1 },
            { devanagari: 'तत्', tamilword: 'தத்', roman: 'tat', meaning: 'அந்த', originalIndex: 2 },
            { devanagari: 'अज्ञानम्', tamilword: 'அஞ்ஞானம்', roman: 'ajñānam', meaning: 'அஞ்ஞானம்', originalIndex: 3 },
            { devanagari: 'येषाम्', tamilword: 'யேஷாம்', roman: 'yeṣām', meaning: 'யாருடைய', originalIndex: 4 },
            { devanagari: 'नाशितम्', tamilword: 'நாஷிதம்', roman: 'nāśitam', meaning: 'அழிக்கப்பட்டது', originalIndex: 5 },
            { devanagari: 'आत्मन:', tamilword: 'ஆத்மன:', roman: 'ātmanaḥ', meaning: 'ஆத்மாவின்', originalIndex: 6 },
            { devanagari: 'तेषाम्', tamilword: 'தேஷாம்', roman: 'teṣām', meaning: 'அவர்களுடைய', originalIndex: 7 },
            { devanagari: 'आदित्यवत्', tamilword: 'ஆதித்யவத்', roman: 'ādityavat', meaning: 'சூரியனைப் போல', originalIndex: 8 },
            { devanagari: 'ज्ञानम्', tamilword: 'ஞானம்', roman: 'jñānam', meaning: 'ஞானம்', originalIndex: 9 },
            { devanagari: 'प्रकाशयति', tamilword: 'ப்ரகாஷயதி', roman: 'prakāśayati', meaning: 'வெளிச்சப்படுத்துகிறது', originalIndex: 10 },
            { devanagari: 'तत्', tamilword: 'தத்', roman: 'tat', meaning: 'அந்த', originalIndex: 11 },
            { devanagari: 'परम्', tamilword: 'பரம்', roman: 'param', meaning: 'பரம்பொருள்', originalIndex: 12 }
          ]
        }
      ]
    },
    {
      id: 16,
      title: 'கீதா 5.17',
      subtitle: 'தத்புத்தய: ததாத்மான:',
      description: 'அறிவு, மனம், நம்பிக்கை, இவற்றைப் பரத்தில் நிலைநிறுத்திச் சரணடைந்தவன் ஞானத்தால் களங்கங்கள் முற்றிலும் தூய்மையாக்கப் பட்டு, விடுதலை வழியில் நேராக முன்னேறுகிறான்.',
      difficulty: 'நடுநிலை',
      lines: [
        {
          devanagari: 'तद्बुद्धय: तदात्मान: तन्निष्ठा: तत्परायणा: । गच्छन्ति अपुनरावृत्तिम् ज्ञान निर्धूत कल्मषा: ॥',
          tamilword: 'தத்புத்தய: ததாத்மான: தன்னிஷ்டா: தத்பராயணா: । கச்சந்தி அபுனராவ்ருத்திம் ஞான நிர்தூத கல்மஷா: ॥',
          roman: 'tad-buddhayaḥ tad-ātmānaḥ tan-niṣṭhāḥ tat-parāyaṇāḥ, gacchanty apunar-āvṛttim jñāna-nirdhūta-kalmaṣāḥ',
          meaning: 'அறிவு, மனம், நம்பிக்கை, இவற்றைப் பரத்தில் நிலைநிறுத்திச் சரணடைந்தவன் ஞானத்தால் களங்கங்கள் முற்றிலும் தூய்மையாக்கப் பட்டு, விடுதலை வழியில் நேராக முன்னேறுகிறான்.',
          words: [
            { devanagari: 'तद्बुद्धय:', tamilword: 'தத்புத்தய:', roman: 'tad-buddhayaḥ', meaning: 'அறிவை அதில் நிலைநிறுத்தியவர்கள்', originalIndex: 0 },
            { devanagari: 'तदात्मान:', tamilword: 'ததாத்மான:', roman: 'tad-ātmānaḥ', meaning: 'மனதை அதில் நிலைநிறுத்தியவர்கள்', originalIndex: 1 },
            { devanagari: 'तन्निष्ठा:', tamilword: 'தன்னிஷ்டா:', roman: 'tan-niṣṭhāḥ', meaning: 'அதில் நம்பிக்கை கொண்டவர்கள்', originalIndex: 2 },
            { devanagari: 'तत्परायणा:', tamilword: 'தத்பராயணா:', roman: 'tat-parāyaṇāḥ', meaning: 'அதையே சரணடைந்தவர்கள்', originalIndex: 3 },
            { devanagari: 'गच्छन्ति', tamilword: 'கச்சந்தி', roman: 'gacchanti', meaning: 'செல்கிறார்கள்', originalIndex: 4 },
            { devanagari: 'अपुनरावृत्तिम्', tamilword: 'அபுனராவ்ருத்திம்', roman: 'apunar-āvṛttim', meaning: 'மீண்டும் திரும்பாத நிலைக்கு', originalIndex: 5 },
            { devanagari: 'ज्ञान', tamilword: 'ஞான', roman: 'jñāna', meaning: 'ஞானத்தால்', originalIndex: 6 },
            { devanagari: 'निर्धूत', tamilword: 'நிர்தூத', roman: 'nirdhūta', meaning: 'நீக்கப்பட்ட', originalIndex: 7 },
            { devanagari: 'कल्मषा:', tamilword: 'கல்மஷா:', roman: 'kalmaṣāḥ', meaning: 'களங்கங்கள்', originalIndex: 8 }
          ]
        }
      ]
    },
    {
      id: 17,
      title: 'கீதா 5.18',
      subtitle: 'வித்யா வினய ஸம்பன்னே',
      description: 'அடக்கமுள்ள சாது, உண்மை ஞானத்தின் வாயிலாக கற்றறிந்த தன்னடக்கமுள்ள அந்தணன், பசு, யானை, நாய், நாயைத் தின்னுபவன் இவர்களெல்லோரையும் சம நோக்கில் பார்க்கின்றான்.',
      difficulty: 'நடுநிலை',
      lines: [
        {
          devanagari: 'विद्या विनय सम्पन्ने ब्राह्मणे गविहस्तिनि । शुनि चैव श्वपाके च पण्डिता: समदर्शिन: ॥',
          tamilword: 'வித்யா வினய ஸம்பன்னே ப்ராஹ்மணே கவிஹஸ்தினி । ஷுனி சைவ ஸ்வபாகே ச பண்டிதா: ஸமதர்சின: ॥',
          roman: 'vidyā-vinaya-sampanne brāhmaṇe gavi hastini, śuni caiva śvapāke ca paṇḍitāḥ sama-darśinaḥ',
          meaning: 'அடக்கமுள்ள சாது, உண்மை ஞானத்தின் வாயிலாக கற்றறிந்த தன்னடக்கமுள்ள அந்தணன், பசு, யானை, நாய், நாயைத் தின்னுபவன் இவர்களெல்லோரையும் சம நோக்கில் பார்க்கின்றான்.',
          words: [
            { devanagari: 'विद्या', tamilword: 'வித்யா', roman: 'vidyā', meaning: 'கல்வி', originalIndex: 0 },
            { devanagari: 'विनय', tamilword: 'வினய', roman: 'vinaya', meaning: 'அடக்கம்', originalIndex: 1 },
            { devanagari: 'सम्पन्ने', tamilword: 'ஸம்பன்னே', roman: 'sampanne', meaning: 'நிறைந்த', originalIndex: 2 },
            { devanagari: 'ब्राह्मणे', tamilword: 'ப்ராஹ்மணே', roman: 'brāhmaṇe', meaning: 'அந்தணனை', originalIndex: 3 },
            { devanagari: 'गवि', tamilword: 'கவி', roman: 'gavi', meaning: 'பசுவை', originalIndex: 4 },
            { devanagari: 'हस्तिनि', tamilword: 'ஹஸ்தினி', roman: 'hastini', meaning: 'யானையை', originalIndex: 5 },
            { devanagari: 'शुनि', tamilword: 'ஷுனி', roman: 'śuni', meaning: 'நாயை', originalIndex: 6 },
            { devanagari: 'च', tamilword: 'ச', roman: 'ca', meaning: 'மற்றும்', originalIndex: 7 },
            { devanagari: 'एव', tamilword: 'ஏவ', roman: 'eva', meaning: 'நிச்சயமாக', originalIndex: 8 },
            { devanagari: 'श्वपाके', tamilword: 'ஸ்வபாகே', roman: 'śvapāke', meaning: 'நாயைத் தின்பவனை', originalIndex: 9 },
            { devanagari: 'च', tamilword: 'ச', roman: 'ca', meaning: 'மற்றும்', originalIndex: 10 },
            { devanagari: 'पण्डिता:', tamilword: 'பண்டிதா:', roman: 'paṇḍitāḥ', meaning: 'சான்றோர்', originalIndex: 11 },
            { devanagari: 'समदर्शिन:', tamilword: 'ஸமதர்சின:', roman: 'sama-darśinaḥ', meaning: 'சமமாகப் பார்ப்பவர்கள்', originalIndex: 12 }
          ]
        }
      ]
    },
    {
      id: 18,
      title: 'கீதா 5.19',
      subtitle: 'இஹைவ தை: ஜித: ஸர்கோ',
      description: 'ஒருமையிலும், சமத்துவத்திலும் மனம் நிலைபெற்றவர்கள் ஏற்கெனவே பிறப்பு, இறப்பின் நியதிகளை வென்றுவிடுகின்றனர். ப்ரஹ்மத்தில் நிலைபெற்றதால் அவர்கள் ப்ரஹ்மத்தைப் போன்றே குற்றமற்றவர்களாய் இருக்கின்றனர்.',
      difficulty: 'நடுநிலை',
      lines: [
        {
          devanagari: 'इहैव तै: जित: सर्गो येषाम् साम्ये स्थितम् मन: । निर्दोषम् हि समम् ब्रह्म तस्मात् ब्रह्मणि ते स्थिता: ॥',
          tamilword: 'இஹைவ தை: ஜித: ஸர்கோ யேஷாம் ஸாம்யே ஸ்திதம் மன: । நிர்தோஷம் ஹி ஸமம் ப்ரஹ்ம தஸ்மாத் ப்ரஹ்மணி தே ஸ்திதா: ॥',
          roman: 'ihaiva taiḥ jitaḥ sargo yeṣāṃ sāmye sthitaṃ manaḥ, nirdoṣaṃ hi samaṃ brahma tasmāt brahmaṇi te sthitāḥ',
          meaning: 'ஒருமையிலும், சமத்துவத்திலும் மனம் நிலைபெற்றவர்கள் ஏற்கெனவே பிறப்பு, இறப்பின் நியதிகளை வென்றுவிடுகின்றனர். ப்ரஹ்மத்தில் நிலைபெற்றதால் அவர்கள் ப்ரஹ்மத்தைப் போன்றே குற்றமற்றவர்களாய் இருக்கின்றனர்.',
          words: [
            { devanagari: 'इह', tamilword: 'இஹ', roman: 'iha', meaning: 'இங்கேயே', originalIndex: 0 },
            { devanagari: 'एव', tamilword: 'ஏவ', roman: 'eva', meaning: 'நிச்சயமாக', originalIndex: 1 },
            { devanagari: 'तै:', tamilword: 'தை:', roman: 'taiḥ', meaning: 'அவர்களால்', originalIndex: 2 },
            { devanagari: 'जित:', tamilword: 'ஜித:', roman: 'jitaḥ', meaning: 'வெல்லப்பட்டது', originalIndex: 3 },
            { devanagari: 'सर्गः', tamilword: 'ஸர்கோ', roman: 'sargaḥ', meaning: 'பிறப்பு', originalIndex: 4 },
            { devanagari: 'येषाम्', tamilword: 'யேஷாம்', roman: 'yeṣām', meaning: 'யாருடைய', originalIndex: 5 },
            { devanagari: 'साम्ये', tamilword: 'ஸாம்யே', roman: 'sāmye', meaning: 'சமத்துவத்தில்', originalIndex: 6 },
            { devanagari: 'स्थितम्', tamilword: 'ஸ்திதம்', roman: 'sthitam', meaning: 'நிலைபெற்ற', originalIndex: 7 },
            { devanagari: 'मन:', tamilword: 'மன:', roman: 'manaḥ', meaning: 'மனம்', originalIndex: 8 },
            { devanagari: 'निर्दोषम्', tamilword: 'நிர்தோஷம்', roman: 'nirdoṣam', meaning: 'குற்றமற்ற', originalIndex: 9 },
            { devanagari: 'हि', tamilword: 'ஹி', roman: 'hi', meaning: 'நிச்சயமாக', originalIndex: 10 },
            { devanagari: 'समम्', tamilword: 'ஸமம்', roman: 'samam', meaning: 'சமமான', originalIndex: 11 },
            { devanagari: 'ब्रह्म', tamilword: 'ப்ரஹ்ம', roman: 'brahma', meaning: 'பரம்பொருள்', originalIndex: 12 },
            { devanagari: 'तस्मात्', tamilword: 'தஸ்மாத்', roman: 'tasmāt', meaning: 'அதனால்', originalIndex: 13 },
            { devanagari: 'ब्रह्मणि', tamilword: 'ப்ரஹ்மணி', roman: 'brahmaṇi', meaning: 'பரம்பொருளில்', originalIndex: 14 },
            { devanagari: 'ते', tamilword: 'தே', roman: 'te', meaning: 'அவர்கள்', originalIndex: 15 },
            { devanagari: 'स्थिता:', tamilword: 'ஸ்திதா:', roman: 'sthitāḥ', meaning: 'நிலைபெற்றவர்கள்', originalIndex: 16 }
          ]
        }
      ]
    },
    {
      id: 19,
      title: 'கீதா 5.20',
      subtitle: 'ந ப்ரஹ்ருஷ்யேத் ப்ரியம் ப்ராப்ய',
      description: 'விரும்பியவற்றை அடைவதால் மகிழ்வும், விரும்பாதவற்றை அடைவதால் துயரமும் கொள்ளாமல், சுய அறிவுடனும், மயங்காமலும், இறை விஞ்ஞானத்தை அறிபவனாகவும் இருப்பவன் உன்னதத்தில் நிலை பெற்றவனாக அறியப்படுகிறான்.',
      difficulty: 'நடுநிலை',
      lines: [
        {
          devanagari: 'न प्रहृष्येत् प्रियम् प्राप्य नोद्विजेत् प्राप्य चाप्रियम् । स्थिर बुद्धिर् असम्मूढो ब्रह्मविद् ब्रह्मणि स्थित: ॥',
          tamilword: 'ந ப்ரஹ்ருஷ்யேத் ப்ரியம் ப்ராப்ய நோத்விஜேத் ப்ராப்ய சாப்ரியம் । ஸ்திர புத்திர் அஸம்மூடோ ப்ரஹ்மவித் ப்ரஹ்மணி ஸ்தித: ॥',
          roman: 'na prahṛṣyet priyaṃ prāpya nodvijet prāpya cāpriyam, sthira-buddhir asammūḍho brahmavid brahmaṇi sthitaḥ',
          meaning: 'விரும்பியவற்றை அடைவதால் மகிழ்வும், விரும்பாதவற்றை அடைவதால் துயரமும் கொள்ளாமல், சுய அறிவுடனும், மயங்காமலும், இறை விஞ்ஞானத்தை அறிபவனாகவும் இருப்பவன் உன்னதத்தில் நிலை பெற்றவனாக அறியப்படுகிறான்.',
          words: [
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 0 },
            { devanagari: 'प्रहृष्येत्', tamilword: 'ப்ரஹ்ருஷ்யேத்', roman: 'prahṛṣyet', meaning: 'மகிழ்கிறான்', originalIndex: 1 },
            { devanagari: 'प्रियम्', tamilword: 'ப்ரியம்', roman: 'priyam', meaning: 'விரும்பியதை', originalIndex: 2 },
            { devanagari: 'प्राप्य', tamilword: 'ப்ராப்ய', roman: 'prāpya', meaning: 'அடைந்து', originalIndex: 3 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 4 },
            { devanagari: 'उद्विजेत्', tamilword: 'உத்விஜேத்', roman: 'udvijet', meaning: 'துயருறுகிறான்', originalIndex: 5 },
            { devanagari: 'प्राप्य', tamilword: 'ப்ராப்ய', roman: 'prāpya', meaning: 'அடைந்து', originalIndex: 6 },
            { devanagari: 'च', tamilword: 'ச', roman: 'ca', meaning: 'மற்றும்', originalIndex: 7 },
            { devanagari: 'अप्रियम्', tamilword: 'அப்ரியம்', roman: 'apriyam', meaning: 'விரும்பாததை', originalIndex: 8 },
            { devanagari: 'स्थिर', tamilword: 'ஸ்திர', roman: 'sthira', meaning: 'உறுதியான', originalIndex: 9 },
            { devanagari: 'बुद्धि:', tamilword: 'புத்தி:', roman: 'buddhiḥ', meaning: 'அறிவுடையவன்', originalIndex: 10 },
            { devanagari: 'असम्मूढ:', tamilword: 'அஸம்மூடோ', roman: 'asammūḍhaḥ', meaning: 'மயங்காதவன்', originalIndex: 11 },
            { devanagari: 'ब्रह्मवित्', tamilword: 'ப்ரஹ்மவித்', roman: 'brahmavit', meaning: 'பரம்பொருளை அறிந்தவன்', originalIndex: 12 },
            { devanagari: 'ब्रह्मणि', tamilword: 'ப்ரஹ்மணி', roman: 'brahmaṇi', meaning: 'பரம்பொருளில்', originalIndex: 13 },
            { devanagari: 'स्थित:', tamilword: 'ஸ்தித:', roman: 'sthitaḥ', meaning: 'நிலைபெற்றவன்', originalIndex: 14 }
          ]
        }
      ]
    },
    {
      id: 20,
      title: 'கீதா 5.21',
      subtitle: 'பாஹ்ய ஸ்பர்ஷேஷு அஸக்தாத்மா',
      description: 'இத்தகு விடுதலைபெற்ற ஆத்மா ஜடப் புலன் இன்பங்களாலும், புறப் பொருட்களாலும் கவரப்படுவதே இல்லை. ஆனால் தன்னுள்ளே இன்பத்தில் திளைத்து ஆழ்பவனாய் இருக்கின்றான். இவ்விதமாக, பரத்தில் கருத்துச் செலுத்துவதால், அளவற்ற இன்பத்தைத் தன்னுணர்வு உடையோன் அனுபவிக்கின்றனான்.',
      difficulty: 'மேம்பட்ட நிலை',
      lines: [
        {
          devanagari: 'बाह्य स्पर्शेषु असक्तात्मा विन्दति आत्मनि यत्सुखम् । स ब्रह्मयोग युक्तात्मा सुखम् अक्षयम् अश्नुते ॥',
          tamilword: 'பாஹ்ய ஸ்பர்ஷேஷு அஸக்தாத்மா விந்ததி ஆத்மனி யத்ஸுகம் । ஸ ப்ரஹ்மயோக யுக்தாத்மா ஸுகம் அக்ஷயம் அஸ்னுதே ॥',
          roman: 'bāhya-sparśeṣv asakta-ātmā vindati ātmani yat sukham, sa brahmayoga-yuktātmā sukham akṣayam aśnute',
          meaning: 'இத்தகு விடுதலைபெற்ற ஆத்மா ஜடப் புலன் இன்பங்களாலும், புறப் பொருட்களாலும் கவரப்படுவதே இல்லை. ஆனால் தன்னுள்ளே இன்பத்தில் திளைத்து ஆழ்பவனாய் இருக்கின்றான். இவ்விதமாக, பரத்தில் கருத்துச் செலுத்துவதால், அளவற்ற இன்பத்தைத் தன்னுணர்வு உடையோன் அனுபவிக்கின்றனான்.',
          words: [
            { devanagari: 'बाह्य', tamilword: 'பாஹ்ய', roman: 'bāhya', meaning: 'புற', originalIndex: 0 },
            { devanagari: 'स्पर्शेषु', tamilword: 'ஸ்பர்ஷேஷு', roman: 'sparśeṣu', meaning: 'தொடுதல்களில்', originalIndex: 1 },
            { devanagari: 'असक्तात्मा', tamilword: 'அஸக்தாத்மா', roman: 'asakta-ātmā', meaning: 'பற்றற்ற ஆத்மா', originalIndex: 2 },
            { devanagari: 'विन्दति', tamilword: 'விந்ததி', roman: 'vindati', meaning: 'அடைகிறான்', originalIndex: 3 },
            { devanagari: 'आत्मनि', tamilword: 'ஆத்மனி', roman: 'ātmani', meaning: 'ஆத்மாவில்', originalIndex: 4 },
            { devanagari: 'यत्', tamilword: 'யத்', roman: 'yat', meaning: 'எந்த', originalIndex: 5 },
            { devanagari: 'सुखम्', tamilword: 'ஸுகம்', roman: 'sukham', meaning: 'இன்பத்தை', originalIndex: 6 },
            { devanagari: 'स', tamilword: 'ஸ', roman: 'sa', meaning: 'அவன்', originalIndex: 7 },
            { devanagari: 'ब्रह्मयोग', tamilword: 'ப்ரஹ்மயோக', roman: 'brahmayoga', meaning: 'பரம்பொருள் யோகத்தில்', originalIndex: 8 },
            { devanagari: 'युक्तात्मा', tamilword: 'யுக்தாத்மா', roman: 'yuktātmā', meaning: 'இணைந்த ஆத்மா', originalIndex: 9 },
            { devanagari: 'सुखम्', tamilword: 'ஸுகம்', roman: 'sukham', meaning: 'இன்பத்தை', originalIndex: 10 },
            { devanagari: 'अक्षयम्', tamilword: 'அக்ஷயம்', roman: 'akṣayam', meaning: 'அழியாத', originalIndex: 11 },
            { devanagari: 'अश्नुते', tamilword: 'அஸ்னுதே', roman: 'aśnute', meaning: 'அனுபவிக்கிறான்', originalIndex: 12 }
          ]
        }
      ]
    },
    {
      id: 21,
      title: 'கீதா 5.22',
      subtitle: 'யே ஹி ஸம்ஸ்பர்ஷஜா போகா:',
      description: 'துன்பங்களுக்கு மூலமான ஜடப்புலன்களின் விஷயத் தொடர்பில் அறிவுடையோன் பங்குகொள்வதில்லை. குந்திமகனே, இத்தகு இன்பங்களுக்கு ஆரம்பமும், முடிவும், இருப்பதால் அறிவுடையோன் இவற்றில் ஆர்வம் கொள்வதில்லை.',
      difficulty: 'நடுநிலை',
      lines: [
        {
          devanagari: 'ये हि संस्पर्शजा भोगा: दुःखयोनय एव ते । आद्यन्त वन्त: कौन्तेय न तेषु रमते बुध: ॥',
          tamilword: 'யே ஹி ஸம்ஸ்பர்ஷஜா போகா: துக்கயோனய ஏவ தே । ஆத்யந்த வன்த: கௌந்தேய ந தேஷு ரமதே புத: ॥',
          roman: 'ye hi saṃsparśajā bhogāḥ duḥkha-yonaya eva te, ādy-anta-vantaḥ kaunteya na teṣu ramate budhaḥ',
          meaning: 'துன்பங்களுக்கு மூலமான ஜடப்புலன்களின் விஷயத் தொடர்பில் அறிவுடையோன் பங்குகொள்வதில்லை. குந்திமகனே, இத்தகு இன்பங்களுக்கு ஆரம்பமும், முடிவும், இருப்பதால் அறிவுடையோன் இவற்றில் ஆர்வம் கொள்வதில்லை.',
          words: [
            { devanagari: 'ये', tamilword: 'யே', roman: 'ye', meaning: 'எந்த', originalIndex: 0 },
            { devanagari: 'हि', tamilword: 'ஹி', roman: 'hi', meaning: 'நிச்சயமாக', originalIndex: 1 },
            { devanagari: 'संस्पर्शजा:', tamilword: 'ஸம்ஸ்பர்ஷஜா:', roman: 'saṃsparśajāḥ', meaning: 'தொடர்பால் உண்டானவை', originalIndex: 2 },
            { devanagari: 'भोगा:', tamilword: 'போகா:', roman: 'bhogāḥ', meaning: 'இன்பங்கள்', originalIndex: 3 },
            { devanagari: 'दुःखयोनय:', tamilword: 'துக்கயோனய:', roman: 'duḥkha-yonayaḥ', meaning: 'துன்பத்தின் மூலம்', originalIndex: 4 },
            { devanagari: 'एव', tamilword: 'ஏவ', roman: 'eva', meaning: 'நிச்சயமாக', originalIndex: 5 },
            { devanagari: 'ते', tamilword: 'தே', roman: 'te', meaning: 'அவை', originalIndex: 6 },
            { devanagari: 'आद्यन्त', tamilword: 'ஆத்யந்த', roman: 'ādy-anta', meaning: 'ஆரம்பமும் முடிவும்', originalIndex: 7 },
            { devanagari: 'वन्त:', tamilword: 'வன்த:', roman: 'vantaḥ', meaning: 'உடையவை', originalIndex: 8 },
            { devanagari: 'कौन्तेय', tamilword: 'கௌந்தேய', roman: 'kaunteya', meaning: 'குந்திமகனே', originalIndex: 9 },
            { devanagari: 'न', tamilword: 'ந', roman: 'na', meaning: 'இல்லை', originalIndex: 10 },
            { devanagari: 'तेषु', tamilword: 'தேஷு', roman: 'teṣu', meaning: 'அவற்றில்', originalIndex: 11 },
            { devanagari: 'रमते', tamilword: 'ரமதே', roman: 'ramate', meaning: 'மகிழ்கிறான்', originalIndex: 12 },
            { devanagari: 'बुध:', tamilword: 'புத:', roman: 'budhaḥ', meaning: 'அறிவுடையோன்', originalIndex: 13 }
          ]
        }
      ]
    },
    {
      id: 22,
      title: 'கீதா 5.23',
      subtitle: 'ஷக்னோதீஹைவ ய: ஸோடும்',
      description: 'தற்போதைய உடலை நீக்குமுன்பு, ஒருவனால் ஜடப்புலன்களின் உந்துதல்களைப் பொறுத்துக் கொள்ளவும் ஆசை, கோபம் இவற்றைக் கட்டுப்படுத்தவும் முடிந்தால் அவனே யோகியாவான். அவன் இவ்வுலகில் மகிழ்ச்சியுடனிருப்பான்.',
      difficulty: 'நடுநிலை',
      lines: [
        {
          devanagari: 'शक्नोतीहैव य: सोढुम् प्राक्शरीर विमोक्षणात् । काम क्रोधोद्भवम् वेगम् स युक्त: स सुखी नर: ॥',
          tamilword: 'ஷக்னோதீஹைவ ய: ஸோடும் ப்ராக்ஷரீர விமோக்ஷணாத் । காம க்ரோதோத்பவம் வேகம் ஸ யுக்த: ஸ ஸுகீ நர: ॥',
          roman: 'śaknotīhaiva yaḥ soḍhuṃ prāk śarīra-vimokṣaṇāt, kāma-krodhodbhavaṃ vegaṃ sa yuktaḥ sa sukhī naraḥ',
          meaning: 'தற்போதைய உடலை நீக்குமுன்பு, ஒருவனால் ஜடப்புலன்களின் உந்துதல்களைப் பொறுத்துக் கொள்ளவும் ஆசை, கோபம் இவற்றைக் கட்டுப்படுத்தவும் முடிந்தால் அவனே யோகியாவான். அவன் இவ்வுலகில் மகிழ்ச்சியுடனிருப்பான்.',
          words: [
            { devanagari: 'शक्नोति', tamilword: 'ஷக்னோதி', roman: 'śaknoti', meaning: 'முடிகிறது', originalIndex: 0 },
            { devanagari: 'इह', tamilword: 'இஹ', roman: 'iha', meaning: 'இங்கே', originalIndex: 1 },
            { devanagari: 'एव', tamilword: 'ஏவ', roman: 'eva', meaning: 'நிச்சயமாக', originalIndex: 2 },
            { devanagari: 'य:', tamilword: 'ய:', roman: 'yaḥ', meaning: 'யார்', originalIndex: 3 },
            { devanagari: 'सोढुम्', tamilword: 'ஸோடும்', roman: 'soḍhum', meaning: 'பொறுக்க', originalIndex: 4 },
            { devanagari: 'प्राक्', tamilword: 'ப்ராக்', roman: 'prāk', meaning: 'முன்பு', originalIndex: 5 },
            { devanagari: 'शरीर', tamilword: 'ஷரீர', roman: 'śarīra', meaning: 'உடல்', originalIndex: 6 },
            { devanagari: 'विमोक्षणात्', tamilword: 'விமோக்ஷணாத்', roman: 'vimokṣaṇāt', meaning: 'விடுதலையிலிருந்து', originalIndex: 7 },
            { devanagari: 'काम', tamilword: 'காம', roman: 'kāma', meaning: 'ஆசை', originalIndex: 8 },
            { devanagari: 'क्रोध', tamilword: 'க்ரோத', roman: 'krodha', meaning: 'கோபம்', originalIndex: 9 },
            { devanagari: 'उद्भवम्', tamilword: 'உத்பவம்', roman: 'udbhavam', meaning: 'பிறப்பை', originalIndex: 10 },
            { devanagari: 'वेगम्', tamilword: 'வேகம்', roman: 'vegam', meaning: 'உந்துதலை', originalIndex: 11 },
            { devanagari: 'स', tamilword: 'ஸ', roman: 'sa', meaning: 'அவன்', originalIndex: 12 },
            { devanagari: 'युक्त:', tamilword: 'யுக்த:', roman: 'yuktaḥ', meaning: 'யோகி', originalIndex: 13 },
            { devanagari: 'स', tamilword: 'ஸ', roman: 'sa', meaning: 'அவன்', originalIndex: 14 },
            { devanagari: 'सुखी', tamilword: 'ஸுகீ', roman: 'sukhī', meaning: 'மகிழ்ச்சியுடையவன்', originalIndex: 15 },
            { devanagari: 'नर:', tamilword: 'நர:', roman: 'naraḥ', meaning: 'மனிதன்', originalIndex: 16 }
          ]
        }
      ]
    },
    {
      id: 23,
      title: 'கீதா 5.24',
      subtitle: 'யோந்த: ஸுகோ அந்தராராம:',
      description: 'எவனொருவன் தனக்குள் இன்பமடைபவனாய், தனக்குள் செயற்படுபவனாய், உள்ளே மகிழ்ந்து ஒளி வீசுகின்றானோ அவனே உண்மையில் முழு யோகியாவான். பரத்தில் விடுதலைபெற்று அவன் பரத்தையே அடைகின்றான்.',
      difficulty: 'மேம்பட்ட நிலை',
      lines: [
        {
          devanagari: 'योन्त: सुखो अन्तराराम: तथान्तर् ज्योतिरेव य: । स योगी ब्रह्म निर्वाणम् ब्रह्म भूतोधि गच्छति ॥',
          tamilword: 'யோந்த: ஸுகோ அந்தராராம: ததாந்தர் ஜ்யோதிரேவ ய: । ஸ யோகீ ப்ரஹ்ம நிர்வாணம் ப்ரஹ்ம பூதோதி கச்சதி ॥',
          roman: 'yo\'ntaḥ-sukho\'ntar-ārāmas tathāntar-jyotir eva yaḥ, sa yogī brahma-nirvāṇaṃ brahma-bhūto\'dhigacchati',
          meaning: 'எவனொருவன் தனக்குள் இன்பமடைபவனாய், தனக்குள் செயற்படுபவனாய், உள்ளே மகிழ்ந்து ஒளி வீசுகின்றானோ அவனே உண்மையில் முழு யோகியாவான். பரத்தில் விடுதலைபெற்று அவன் பரத்தையே அடைகின்றான்.',
          words: [
            { devanagari: 'य:', tamilword: 'ய:', roman: 'yaḥ', meaning: 'யார்', originalIndex: 0 },
            { devanagari: 'अन्त: सुख:', tamilword: 'அந்த: ஸுக:', roman: 'antaḥ-sukhaḥ', meaning: 'உள்ளே இன்பமுடையவன்', originalIndex: 1 },
            { devanagari: 'अन्तराराम:', tamilword: 'அந்தராராம:', roman: 'antar-ārāmaḥ', meaning: 'உள்ளே மகிழ்பவன்', originalIndex: 2 },
            { devanagari: 'तथा', tamilword: 'ததா', roman: 'tathā', meaning: 'அதுபோல', originalIndex: 3 },
            { devanagari: 'अन्तर्', tamilword: 'அந்தர்', roman: 'antar', meaning: 'உள்ளே', originalIndex: 4 },
            { devanagari: 'ज्योति:', tamilword: 'ஜ்யோதி:', roman: 'jyotiḥ', meaning: 'ஒளி', originalIndex: 5 },
            { devanagari: 'एव', tamilword: 'ஏவ', roman: 'eva', meaning: 'நிச்சயமாக', originalIndex: 6 },
            { devanagari: 'य:', tamilword: 'ய:', roman: 'yaḥ', meaning: 'யார்', originalIndex: 7 },
            { devanagari: 'स', tamilword: 'ஸ', roman: 'sa', meaning: 'அவன்', originalIndex: 8 },
            { devanagari: 'योगी', tamilword: 'யோகீ', roman: 'yogī', meaning: 'யோகி', originalIndex: 9 },
            { devanagari: 'ब्रह्म', tamilword: 'ப்ரஹ்ம', roman: 'brahma', meaning: 'பரம்பொருள்', originalIndex: 10 },
            { devanagari: 'निर्वाणम्', tamilword: 'நிர்வாணம்', roman: 'nirvāṇam', meaning: 'விடுதலை', originalIndex: 11 },
            { devanagari: 'ब्रह्म', tamilword: 'ப்ரஹ்ம', roman: 'brahma', meaning: 'பரம்பொருள்', originalIndex: 12 },
            { devanagari: 'भूत:', tamilword: 'பூத:', roman: 'bhūtaḥ', meaning: 'ஆனவன்', originalIndex: 13 },
            { devanagari: 'अधिगच्छति', tamilword: 'அதிகச்சதி', roman: 'adhigacchati', meaning: 'அடைகிறான்', originalIndex: 14 }
          ]
        }
      ]
    },
    {
      id: 24,
      title: 'கீதா 5.25',
      subtitle: 'லபந்தே ப்ரஹ்ம நிர்வாணம்',
      description: 'இருமை, ஐயம் இவற்றினின்றும் அப்பாற்பட்டவன், மனம் உள்நோக்கி ஈடுபட்டு, எல்லா உயிர்களின் நலத்திற்குமாய் பாடுபட்டு பாவங்களிலிருந்து விடுபட்டு பரத்தில் விடுதலை பெறுகிறான்.',
      difficulty: 'மேம்பட்ட நிலை',
      lines: [
        {
          devanagari: 'लभन्ते ब्रह्म निर्वाणम् ऋषय: क्षीण कल्मषा: । छिन्नद्वैधा यतात्मान: सर्व भूत हिते रता: ॥',
          tamilword: 'லபந்தே ப்ரஹ்ம நிர்வாணம் ருஷய: ஷீண கல்மஷா: । சின்னத்வைதா யதாத்மான: ஸர்வ பூத ஹிதே ரதா: ॥',
          roman: 'labhante brahma-nirvāṇam ṛṣayaḥ kṣīṇa-kalmaṣāḥ, chinna-dvaidhā yatātmānaḥ sarva-bhūta-hite ratāḥ',
          meaning: 'இருமை, ஐயம் இவற்றினின்றும் அப்பாற்பட்டவன், மனம் உள்நோக்கி ஈடுபட்டு, எல்லா உயிர்களின் நலத்திற்குமாய் பாடுபட்டு பாவங்களிலிருந்து விடுபட்டு பரத்தில் விடுதலை பெறுகிறான்.',
          words: [
            { devanagari: 'लभन्ते', tamilword: 'லபந்தே', roman: 'labhante', meaning: 'அடைகிறார்கள்', originalIndex: 0 },
            { devanagari: 'ब्रह्म', tamilword: 'ப்ரஹ்ம', roman: 'brahma', meaning: 'பரம்பொருள்', originalIndex: 1 },
            { devanagari: 'निर्वाणम्', tamilword: 'நிர்வாணம்', roman: 'nirvāṇam', meaning: 'விடுதலை', originalIndex: 2 },
            { devanagari: 'ऋषय:', tamilword: 'ருஷய:', roman: 'ṛṣayaḥ', meaning: 'முனிவர்கள்', originalIndex: 3 },
            { devanagari: 'क्षीण', tamilword: 'ஷீண', roman: 'kṣīṇa', meaning: 'நீக்கப்பட்ட', originalIndex: 4 },
            { devanagari: 'कल्मषा:', tamilword: 'கல்மஷா:', roman: 'kalmaṣāḥ', meaning: 'பாவங்கள்', originalIndex: 5 },
            { devanagari: 'छिन्नद्वैधा:', tamilword: 'சின்னத்வைதா:', roman: 'chinna-dvaidhāḥ', meaning: 'இருமை அறுக்கப்பட்டவர்கள்', originalIndex: 6 },
            { devanagari: 'यतात्मान:', tamilword: 'யதாத்மான:', roman: 'yatātmānaḥ', meaning: 'மனம் கட்டுப்பட்டவர்கள்', originalIndex: 7 },
            { devanagari: 'सर्व', tamilword: 'ஸர்வ', roman: 'sarva', meaning: 'எல்லா', originalIndex: 8 },
            { devanagari: 'भूत', tamilword: 'பூத', roman: 'bhūta', meaning: 'உயிர்களின்', originalIndex: 9 },
            { devanagari: 'हिते', tamilword: 'ஹிதே', roman: 'hite', meaning: 'நலத்தில்', originalIndex: 10 },
            { devanagari: 'रता:', tamilword: 'ரதா:', roman: 'ratāḥ', meaning: 'ஈடுபட்டவர்கள்', originalIndex: 11 }
          ]
        }
      ]
    },
    {
      id: 25,
      title: 'கீதா 5.26',
      subtitle: 'காம க்ரோத விமுக்தானாம்',
      description: 'புலனிச்சைகளிலிருந்தும், கோபத்திலிருந்தும் விடுபட்ட, தன்னுணர்வும், தன்னொழுக்கமும் நிறைந்த, தொடர்ந்து முழுமைக்காய் பாடுபடும் சாதகன் விரைவிலேயே பரத்தில் விடுதலை அடைகிறான்.',
      difficulty: 'மேம்பட்ட நிலை',
      lines: [
        {
          devanagari: 'काम क्रोध विमुक्तानाम् यतीनाम् यत चेतसाम् अभितो ब्रह्म निर्वाणम् वर्तते विदितात्मनाम् ॥',
          tamilword: 'காம க்ரோத விமுக்தானாம் யதீனாம் யத சேதஸாம் அபிதோ ப்ரஹ்ம நிர்வாணம் வர்ததே விதிதாத்மனாம் ॥',
          roman: 'kāma-krodha-vimuktānāṃ yatīnāṃ yata-cetasām, abhito brahma-nirvāṇaṃ vartate viditātmanām',
          meaning: 'புலனிச்சைகளிலிருந்தும், கோபத்திலிருந்தும் விடுபட்ட, தன்னுணர்வும், தன்னொழுக்கமும் நிறைந்த, தொடர்ந்து முழுமைக்காய் பாடுபடும் சாதகன் விரைவிலேயே பரத்தில் விடுதலை அடைகிறான்.',
          words: [
            { devanagari: 'काम', tamilword: 'காம', roman: 'kāma', meaning: 'ஆசை', originalIndex: 0 },
            { devanagari: 'क्रोध', tamilword: 'க்ரோத', roman: 'krodha', meaning: 'கோபம்', originalIndex: 1 },
            { devanagari: 'विमुक्तानाम्', tamilword: 'விமுக்தானாம்', roman: 'vimuktānām', meaning: 'விடுபட்டவர்களுக்கு', originalIndex: 2 },
            { devanagari: 'यतीनाम्', tamilword: 'யதீனாம்', roman: 'yatīnām', meaning: 'முயற்சியுடையவர்கள்', originalIndex: 3 },
            { devanagari: 'यत', tamilword: 'யத', roman: 'yata', meaning: 'கட்டுப்படுத்தப்பட்ட', originalIndex: 4 },
            { devanagari: 'चेतसाम्', tamilword: 'சேதஸாம்', roman: 'cetasām', meaning: 'மனதுடையவர்கள்', originalIndex: 5 },
            { devanagari: 'अभित:', tamilword: 'அபித:', roman: 'abhitaḥ', meaning: 'அருகில்', originalIndex: 6 },
            { devanagari: 'ब्रह्म', tamilword: 'ப்ரஹ்ம', roman: 'brahma', meaning: 'பரம்பொருள்', originalIndex: 7 },
            { devanagari: 'निर्वाणम्', tamilword: 'நிர்வாணம்', roman: 'nirvāṇam', meaning: 'விடுதலை', originalIndex: 8 },
            { devanagari: 'वर्तते', tamilword: 'வர்ததே', roman: 'vartate', meaning: 'இருக்கிறது', originalIndex: 9 },
            { devanagari: 'विदितात्मनाम्', tamilword: 'விதிதாத்மனாம்', roman: 'viditātmanām', meaning: 'ஆத்மாவை அறிந்தவர்களுக்கு', originalIndex: 10 }
          ]
        }
      ]
    },
    {
      id: 26,
      title: 'கீதா 5.27-28',
      subtitle: 'ஸ்பர்ஷான் க்ருத்வா பஹிர் பாஹ்யாம்ஸ்',
      description: 'எல்லாப் புறப்புலன் விஷயங்களையும் வெளியே நிறுத்தி, புருவ மத்தியில் கண்களையும், பார்வையையும் நிறுத்தி, நாசிக்குள் உள் வெளிச் சுவாசங்களை நிறுத்தி, மனம், புலன்கள், அறிவு இவற்றைக் கட்டுப்படுத்தி, ஆன்மீகன் ஆசை, பயம், கோபம் இவற்றினின்றும் விடுபடுகிறான். இந்நிலையில் எப்போதும் நிரந்தரமாயிருப்பவன் நிச்சயமாய் விடுதலை அடைந்தவனே.',
      difficulty: 'மேம்பட்ட நிலை',
      lines: [
        {
          devanagari: 'स्पर्शान् कृत्वा बहिर् बाह्यांश् चक्षुश् चैवान्तरे भ्रुवो: प्राणापानौ समौ कृत्वा नासाभ्यन्तरचारिणौ । यतेन्द्रिय मनो बुद्धि: मुनि: मोक्ष परायण: विगतेच्छा भय क्रोधो य: सदामुक्त एव स: ॥',
          tamilword: 'ஸ்பர்ஷான் க்ருத்வா பஹிர் பாஹ்யாம்ஸ் சக்ஷுஸ் சைவாந்தரே ப்ருவோ: ப்ராணாபானௌ ஸமௌ க்ருத்வா நாஸாப்யந்தரசாரிணெள । யதேந்த்ரிய மனோ புத்தி: முனி: மோக்ஷ பராயண: விகதேச்சா பய க்ரோதோ ய: ஸதாமுக்த ஏவ ஸ: ॥',
          roman: 'sparśān kṛtvā bahir bāhyāṃś cakṣuś caivāntare bhruvoḥ, prāṇāpānau samau kṛtvā nāsābhyantara-cāriṇau, yatendriya-mano-buddhir munir mokṣa-parāyaṇaḥ, vigatechchhā-bhaya-krodho yaḥ sadā mukta eva saḥ',
          meaning: 'எல்லாப் புறப்புலன் விஷயங்களையும் வெளியே நிறுத்தி, புருவ மத்தியில் கண்களையும், பார்வையையும் நிறுத்தி, நாசிக்குள் உள் வெளிச் சுவாசங்களை நிறுத்தி, மனம், புலன்கள், அறிவு இவற்றைக் கட்டுப்படுத்தி, ஆன்மீகன் ஆசை, பயம், கோபம் இவற்றினின்றும் விடுபடுகிறான். இந்நிலையில் எப்போதும் நிரந்தரமாயிருப்பவன் நிச்சயமாய் விடுதலை அடைந்தவனே.',
          words: [
            { devanagari: 'स्पर्शान्', tamilword: 'ஸ்பர்ஷான்', roman: 'sparśān', meaning: 'தொடுதல்களை', originalIndex: 0 },
            { devanagari: 'कृत्वा', tamilword: 'க்ருத்வா', roman: 'kṛtvā', meaning: 'செய்து', originalIndex: 1 },
            { devanagari: 'बहि:', tamilword: 'பஹி:', roman: 'bahiḥ', meaning: 'வெளியே', originalIndex: 2 },
            { devanagari: 'बाह्यान्', tamilword: 'பாஹ்யான்', roman: 'bāhyān', meaning: 'புறத்தை', originalIndex: 3 },
            { devanagari: 'चक्षु:', tamilword: 'சக்ஷு:', roman: 'cakṣuḥ', meaning: 'கண்களை', originalIndex: 4 },
            { devanagari: 'च', tamilword: 'ச', roman: 'ca', meaning: 'மற்றும்', originalIndex: 5 },
            { devanagari: 'एव', tamilword: 'ஏவ', roman: 'eva', meaning: 'நிச்சயமாக', originalIndex: 6 },
            { devanagari: 'अन्तरे', tamilword: 'அந்தரே', roman: 'antare', meaning: 'இடையில்', originalIndex: 7 },
            { devanagari: 'भ्रुवो:', tamilword: 'ப்ருவோ:', roman: 'bhruvoḥ', meaning: 'புருவங்களின்', originalIndex: 8 },
            { devanagari: 'प्राणापानौ', tamilword: 'ப்ராணாபானௌ', roman: 'prāṇāpānau', meaning: 'உள் வெளிச் சுவாசங்களை', originalIndex: 9 },
            { devanagari: 'समौ', tamilword: 'ஸமௌ', roman: 'samau', meaning: 'சமமாக', originalIndex: 10 },
            { devanagari: 'कृत्वा', tamilword: 'க்ருத்வா', roman: 'kṛtvā', meaning: 'செய்து', originalIndex: 11 },
            { devanagari: 'नासाभ्यन्तर', tamilword: 'நாஸாப்யந்தர', roman: 'nāsābhyantara', meaning: 'நாசிக்குள்', originalIndex: 12 },
            { devanagari: 'चारिणौ', tamilword: 'சாரிணௌ', roman: 'cāriṇau', meaning: 'செல்லும்', originalIndex: 13 },
            { devanagari: 'यतेन्द्रिय', tamilword: 'யதேந்த்ரிய', roman: 'yatendriya', meaning: 'புலன்களை கட்டுப்படுத்தி', originalIndex: 14 },
            { devanagari: 'मनो', tamilword: 'மனோ', roman: 'mano', meaning: 'மனதை', originalIndex: 15 },
            { devanagari: 'बुद्धि:', tamilword: 'புத்தி:', roman: 'buddhiḥ', meaning: 'அறிவை', originalIndex: 16 },
            { devanagari: 'मुनि:', tamilword: 'முனி:', roman: 'muniḥ', meaning: 'முனிவன்', originalIndex: 17 },
            { devanagari: 'मोक्ष', tamilword: 'மோக்ஷ', roman: 'mokṣa', meaning: 'விடுதலை', originalIndex: 18 },
            { devanagari: 'परायण:', tamilword: 'பராயண:', roman: 'parāyaṇaḥ', meaning: 'நோக்கமுடையவன்', originalIndex: 19 },
            { devanagari: 'विगत', tamilword: 'விகத', roman: 'vigata', meaning: 'விடுபட்ட', originalIndex: 20 },
            { devanagari: 'इच्छा', tamilword: 'இச்சா', roman: 'ichchhā', meaning: 'ஆசை', originalIndex: 21 },
            { devanagari: 'भय', tamilword: 'பய', roman: 'bhaya', meaning: 'பயம்', originalIndex: 22 },
            { devanagari: 'क्रोध:', tamilword: 'க்ரோத:', roman: 'krodhaḥ', meaning: 'கோபம்', originalIndex: 23 },
            { devanagari: 'य:', tamilword: 'ய:', roman: 'yaḥ', meaning: 'யார்', originalIndex: 24 },
            { devanagari: 'सदा', tamilword: 'ஸதா', roman: 'sadā', meaning: 'எப்போதும்', originalIndex: 25 },
            { devanagari: 'मुक्त:', tamilword: 'முக்த:', roman: 'muktaḥ', meaning: 'விடுதலை பெற்றவன்', originalIndex: 26 },
            { devanagari: 'एव', tamilword: 'ஏவ', roman: 'eva', meaning: 'நிச்சயமாக', originalIndex: 27 },
            { devanagari: 'स:', tamilword: 'ஸ:', roman: 'saḥ', meaning: 'அவன்', originalIndex: 28 }
          ]
        }
      ]
    },
    {
      id: 27,
      title: 'கீதா 5.29',
      subtitle: 'போக்தாரம் யக்ஞ தபஸாம்',
      description: 'எல்லா யக்ஞங்களுக்கும், தவங்களுக்கும் இறுதி லட்சியமாகவும், எல்லா கிரகங்கள் மற்றும் தேவதைகளின் பரம ஈஸ்வரனாகவும், எல்லா ஜீவன்களின் உற்ற நண்பனாகவும் என்னை அறிந்து, சான்றோர் ஜடத்துயரங்களிலிருந்து விடுபட்டு அமைதி பெறுகின்றனர்.',
      difficulty: 'மேம்பட்ட நிலை',
      lines: [
        {
          devanagari: 'भोक्तारम् यज्ञ तपसाम् सर्व लोक महेश्वरम् । सुह्रुदम् सर्वभूतानाम् ज्ञात्वामाम् शान्ति म्रुच्छति ॥',
          tamilword: 'போக்தாரம் யக்ஞ தபஸாம் ஸர்வ லோக மஹேஸ்வரம் । ஸுஹ்ருதம் ஸர்வபூதானாம் ஞாத்வாமாம் சாந்தி ம்ருச்சதி ॥',
          roman: 'bhoktāraṃ yajña-tapasāṃ sarva-loka-maheśvaram, suhṛdaṃ sarvabhūtānāṃ jñātvā māṃ śāntim ṛcchati',
          meaning: 'எல்லா யக்ஞங்களுக்கும், தவங்களுக்கும் இறுதி லட்சியமாகவும், எல்லா கிரகங்கள் மற்றும் தேவதைகளின் பரம ஈஸ்வரனாகவும், எல்லா ஜீவன்களின் உற்ற நண்பனாகவும் என்னை அறிந்து, சான்றோர் ஜடத்துயரங்களிலிருந்து விடுபட்டு அமைதி பெறுகின்றனர்.',
          words: [
            { devanagari: 'भोक्तारम्', tamilword: 'போக்தாரம்', roman: 'bhoktāram', meaning: 'அனுபவிப்பவன்', originalIndex: 0 },
            { devanagari: 'यज्ञ', tamilword: 'யக்ஞ', roman: 'yajña', meaning: 'யாகங்களின்', originalIndex: 1 },
            { devanagari: 'तपसाम्', tamilword: 'தபஸாம்', roman: 'tapasām', meaning: 'தவங்களின்', originalIndex: 2 },
            { devanagari: 'सर्व', tamilword: 'ஸர்வ', roman: 'sarva', meaning: 'எல்லா', originalIndex: 3 },
            { devanagari: 'लोक', tamilword: 'லோக', roman: 'loka', meaning: 'உலகங்களின்', originalIndex: 4 },
            { devanagari: 'महेश्वरम्', tamilword: 'மஹேஸ்வரம்', roman: 'maheśvaram', meaning: 'பரம ஈஸ்வரன்', originalIndex: 5 },
            { devanagari: 'सुह्रुदम्', tamilword: 'ஸுஹ்ருதம்', roman: 'suhṛdam', meaning: 'நண்பன்', originalIndex: 6 },
            { devanagari: 'सर्वभूतानाम्', tamilword: 'ஸர்வபூதானாம்', roman: 'sarvabhūtānām', meaning: 'எல்லா உயிர்களின்', originalIndex: 7 },
            { devanagari: 'ज्ञात्वा', tamilword: 'ஞாத்வா', roman: 'jñātvā', meaning: 'அறிந்து', originalIndex: 8 },
            { devanagari: 'माम्', tamilword: 'மாம்', roman: 'mām', meaning: 'என்னை', originalIndex: 9 },
            { devanagari: 'शान्तिम्', tamilword: 'சாந்திம்', roman: 'śāntim', meaning: 'அமைதியை', originalIndex: 10 },
            { devanagari: 'ऋच्छति', tamilword: 'ருச்சதி', roman: 'ṛcchati', meaning: 'அடைகிறான்', originalIndex: 11 }
          ]
        }
      ]
    }

    // Add more slokas as needed
  ]);

  // Signal for currently selected sloka
  private _selectedSloka = signal<Sloka | null>(null);

  // Computed signal for readonly access to slokas
  readonly slokas = this._slokas.asReadonly();

  // Computed signal for readonly access to selected sloka
  readonly selectedSloka = this._selectedSloka.asReadonly();

  constructor() {}

  // Method to get a sloka by ID
  getSlokaById(id: number): Sloka | undefined {
    return this._slokas().find(sloka => sloka.id === id);
  }

  // Method to set the selected sloka
  setSelectedSloka(sloka: Sloka | null): void {
    this._selectedSloka.set(sloka);
  }

  // Method to select sloka by ID
  selectSlokaById(id: number): void {
    const sloka = this.getSlokaById(id);
    this.setSelectedSloka(sloka || null);
  }

  // Method to clear selection
  clearSelection(): void {
    this._selectedSloka.set(null);
  }
}
