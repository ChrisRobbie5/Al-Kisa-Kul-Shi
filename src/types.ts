export type Tab = 'home' | 'quran' | 'duas' | 'prayers' | 'qibla' | 'tasbih' | 'settings' | 'favorites';

export interface PrayerTimeData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}
