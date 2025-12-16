export type WeatherData = {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
};

export type NewsArticle = {
  id: number;
  headline: string;
  source: string;
  url: string;
};

export type ZodiacSign = 'मेष' | 'वृष' | 'मिथुन' | 'कर्कट' | 'सिंह' | 'कन्या' | 'तुला' | 'वृश्चिक' | 'धनु' | 'मकर' | 'कुम्भ' | 'मीन';

export type HoroscopeData = {
  [key in ZodiacSign]: string;
};

export type CalendarEvent = {
  id: number;
  name: string;
  date: string;
};

export type FmStation = {
  id: number;
  name: string;
  frequency: string;
  streamUrl: string;
};

export type SecurityCamera = {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
};
