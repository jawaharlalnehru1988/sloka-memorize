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
      title: 'Gītā 3.1',
      subtitle: 'अर्जुन उवाच',
      description: 'Arjuna questions Krishna about the apparent contradiction between knowledge and action.',
      lines: [
        {
          devanagari: 'अर्जुन उवाच',
          roman: 'arjuna uvāca',
          meaning: 'Arjuna said:',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        },
        {
          devanagari: 'ज्यायसी चेत्कर्मणस्ते मता बुद्धिर्जनार्दन',
          roman: 'jyāyasī cet karmaṇas te matā buddhir janārdana',
          meaning: 'O Janārdana, if You think intelligence is better than fruitive work,',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        },
        {
          devanagari: 'तत्किं कर्मणि घोरे मां नियोजयसि केशव',
          roman: 'tat kiṁ karmaṇi ghore māṁ niyojayasi keśava',
          meaning: 'then why do You urge me to engage in this ghastly action, O Keśava?',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        }
      ]
    },
    {
      id: 2,
      title: 'Gītā 3.2',
      subtitle: 'अर्जुन उवाच',
      description: 'Arjuna requests Krishna to clarify the most beneficial path due to confusion from mixed instructions.',
      lines: [
        {
          devanagari: 'व्यामिश्रेणेव वाक्येन बुद्धिं मोहयसीव मे',
          roman: 'vyāmiśreṇeva vākyena buddhiṁ mohayasīva me',
          meaning: 'My intelligence is bewildered by Your equivocal instructions.',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        },
        {
          devanagari: 'तदेकं वद निश्चित्य येन श्रेयोऽहमाप्नुयाम्',
          roman: 'tad ekaṁ vada niścitya yena śreyo \'ham āpnuyām',
          meaning: 'Therefore, please tell me decisively what is most beneficial for me.',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        }
      ]
    },
    {
      id: 3,
      title: 'Gītā 3.3',
      subtitle: 'श्रीभगवानुवाच',
      description: 'Krishna explains the two paths for self-realization: through knowledge and through action.',
      lines: [
        {
          devanagari: 'श्रीभगवानुवाच',
          roman: 'śrī-bhagavān uvāca',
          meaning: 'The Blessed Lord said:',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        },
        {
          devanagari: 'लोकेऽस्मिन् द्विविधा निष्ठा पुरा प्रोक्ता मयानघ',
          roman: 'loke \'smin dvi-vidhā niṣṭhā purā proktā mayānagha',
          meaning: 'O sinless one, in this world there are two kinds of faith, as I have explained before.',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        },
        {
          devanagari: 'ज्ञानयोगेन सांख्यानां कर्मयोगेन योगिनाम्',
          roman: 'jñāna-yogena sāṅkhyānāṁ karma-yogena yoginām',
          meaning: 'By the linking process of knowledge for the empiric philosophers, and by the linking process of devotion for the devotees.',
          attempts: [],
          successfulAttempts: 0,
          mastered: false
        }
      ]
    },
    
  ];
}
