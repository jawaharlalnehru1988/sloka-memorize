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
