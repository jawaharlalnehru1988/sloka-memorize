import { Injectable } from '@angular/core';

export interface AudioRecording {
  id: string;
  slokaId: number;
  stepNumber: number;
  timestamp: number;
  duration: number;
  audioBlob: Blob;
  accuracy?: number;
  mode: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private dbName = 'KramaPracticeDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDatabase();
  }

  // Initialize IndexedDB
  private async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        console.error('Failed to open IndexedDB');
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB initialized successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object store for audio recordings
        if (!db.objectStoreNames.contains('recordings')) {
          const store = db.createObjectStore('recordings', { keyPath: 'id' });
          store.createIndex('slokaId', 'slokaId', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('stepNumber', 'stepNumber', { unique: false });
        }
      };
    });
  }

  // Request microphone access and start recording
  async startRecording(): Promise<boolean> {
    try {
      // Request microphone permission
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
          channelCount: 1
        } 
      });

      // Clear previous audio chunks
      this.audioChunks = [];

      // Create MediaRecorder instance
      const options: MediaRecorderOptions = {};
      
      // Try different MIME types for better compatibility
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        options.mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/webm')) {
        options.mimeType = 'audio/webm';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        options.mimeType = 'audio/mp4';
      } else if (MediaRecorder.isTypeSupported('audio/wav')) {
        options.mimeType = 'audio/wav';
      }

      this.mediaRecorder = new MediaRecorder(this.stream, options);

      // Handle data available event
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      // Start recording
      this.mediaRecorder.start(100); // Collect data every 100ms
      console.log('Recording started');
      return true;

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions and try again.');
      return false;
    }
  }

  // Stop recording and return the audio blob
  async stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        // Create blob from recorded chunks
        const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';
        const audioBlob = new Blob(this.audioChunks, { type: mimeType });
        
        // Stop all tracks
        if (this.stream) {
          this.stream.getTracks().forEach(track => track.stop());
          this.stream = null;
        }

        console.log('Recording stopped, blob size:', audioBlob.size, 'bytes');
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  // Save audio recording to IndexedDB
  async saveRecording(recording: Omit<AudioRecording, 'id'>): Promise<string> {
    if (!this.db) {
      await this.initDatabase();
    }

    const id = `recording_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fullRecording: AudioRecording = { ...recording, id };

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction(['recordings'], 'readwrite');
      const store = transaction.objectStore('recordings');
      const request = store.add(fullRecording);

      request.onsuccess = () => {
        console.log('Recording saved to IndexedDB with ID:', id);
        this.saveToLocalStorage(fullRecording);
        resolve(id);
      };

      request.onerror = () => {
        console.error('Failed to save recording to IndexedDB');
        reject(request.error);
      };
    });
  }

  // Save recording metadata to localStorage (without blob for size reasons)
  private saveToLocalStorage(recording: AudioRecording): void {
    try {
      const recordings = this.getRecordingsFromLocalStorage();
      const metadata = {
        id: recording.id,
        slokaId: recording.slokaId,
        stepNumber: recording.stepNumber,
        timestamp: recording.timestamp,
        duration: recording.duration,
        accuracy: recording.accuracy,
        mode: recording.mode,
        size: recording.audioBlob.size
      };
      
      recordings.push(metadata);
      localStorage.setItem('kramaRecordings', JSON.stringify(recordings));
      console.log('Recording metadata saved to localStorage');
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  // Get all recordings from IndexedDB
  async getAllRecordings(): Promise<AudioRecording[]> {
    if (!this.db) {
      await this.initDatabase();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction(['recordings'], 'readonly');
      const store = transaction.objectStore('recordings');
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Get recordings by sloka ID
  async getRecordingsBySloka(slokaId: number): Promise<AudioRecording[]> {
    if (!this.db) {
      await this.initDatabase();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction(['recordings'], 'readonly');
      const store = transaction.objectStore('recordings');
      const index = store.index('slokaId');
      const request = index.getAll(slokaId);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Get recording metadata from localStorage
  getRecordingsFromLocalStorage(): any[] {
    try {
      const stored = localStorage.getItem('kramaRecordings');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get recordings from localStorage:', error);
      return [];
    }
  }

  // Delete a recording
  async deleteRecording(id: string): Promise<boolean> {
    if (!this.db) {
      await this.initDatabase();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction(['recordings'], 'readwrite');
      const store = transaction.objectStore('recordings');
      const request = store.delete(id);

      request.onsuccess = () => {
        // Also remove from localStorage
        const recordings = this.getRecordingsFromLocalStorage();
        const filtered = recordings.filter(r => r.id !== id);
        localStorage.setItem('kramaRecordings', JSON.stringify(filtered));
        resolve(true);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Create audio URL from blob for playback
  createAudioUrl(blob: Blob): string {
    return URL.createObjectURL(blob);
  }

  // Release audio URL
  releaseAudioUrl(url: string): void {
    URL.revokeObjectURL(url);
  }

  // Check if recording is currently in progress
  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }

  // Get storage usage information
  async getStorageInfo(): Promise<{ used: number; quota?: number }> {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        return {
          used: estimate.usage || 0,
          quota: estimate.quota
        };
      }
    } catch (error) {
      console.error('Failed to get storage info:', error);
    }
    
    return { used: 0 };
  }

  // Clear all recordings (for cleanup)
  async clearAllRecordings(): Promise<boolean> {
    try {
      if (!this.db) {
        await this.initDatabase();
      }

      return new Promise((resolve, reject) => {
        if (!this.db) {
          reject('Database not initialized');
          return;
        }

        const transaction = this.db.transaction(['recordings'], 'readwrite');
        const store = transaction.objectStore('recordings');
        const request = store.clear();

        request.onsuccess = () => {
          localStorage.removeItem('kramaRecordings');
          console.log('All recordings cleared');
          resolve(true);
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Failed to clear recordings:', error);
      return false;
    }
  }
}
