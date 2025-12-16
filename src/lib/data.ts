import type { WeatherData, NewsArticle, HoroscopeData, CalendarEvent, FmStation, SecurityCamera, ZodiacSign } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const weatherData: WeatherData = {
  city: 'Kathmandu',
  temperature: 24,
  condition: 'Partly Cloudy',
  humidity: 78,
  windSpeed: 5,
};

export const newsData: NewsArticle[] = [
  { id: 1, headline: "Government announces new infrastructure projects in Kathmandu Valley.", source: "Kathmandu Post", url: "#" },
  { id: 2, headline: "Nepal's tourism sector sees a significant rebound post-pandemic.", source: "Himalayan Times", url: "#" },
  { id: 3, headline: "Stock market reaches new all-time high amidst economic optimism.", source: "Online Khabar", url: "#" },
  { id: 4, headline: "Annual monsoon season begins, authorities issue flood warnings.", source: "Kantipur", url: "#" },
];

export const horoscopeData: HoroscopeData = {
  Aries: "A day of new beginnings. Embrace opportunities that come your way. Your energy levels are high, making it a good day for physical activities.",
  Taurus: "Financial matters look promising today. It's a good time for investments. Pay attention to your intuition, it will guide you well.",
  Gemini: "Communication is key today. Express your thoughts clearly to avoid misunderstandings. A short trip might be on the cards.",
  Cancer: "Focus on your home and family. Spending quality time with loved ones will bring joy. An old friend may reconnect with you.",
  Leo: "Your creativity is at its peak. Use this to your advantage in your professional life. Your leadership skills will be recognized.",
  Virgo: "A good day to organize your life. Declutter your space and your mind. Health should be your priority, so eat well and exercise.",
  Libra: "Relationships are in focus today. Nurture your connections. A partnership could lead to a successful venture.",
  Scorpio: "A transformative day awaits. Let go of what no longer serves you. Your determination will help you overcome challenges.",
  Sagittarius: "Adventure calls! Plan a trip or learn something new. Your optimistic outlook will attract positive experiences.",
  Capricorn: "Career takes center stage. Your hard work will pay off. Stay disciplined and focused on your goals for great results.",
  Aquarius: "Social connections are highlighted. Networking could open new doors. Your innovative ideas will be appreciated.",
  Pisces: "Listen to your inner voice. Your intuition is strong today. A peaceful and meditative day will help you find clarity."
};

export const calendarEvents: CalendarEvent[] = [
  { id: 1, name: "Teej", date: "Aug 26" },
  { id: 2, name: "Indra Jatra", date: "Sep 17" },
  { id: 3, name: "Dashain (Ghatasthapana)", date: "Oct 3" },
  { id: 4, name: "Tihar (Laxmi Puja)", date: "Nov 1" },
];

export const fmStations: FmStation[] = [
  { id: 1, name: "Radio Kantipur", frequency: "96.1 MHz" },
  { id: 2, name: "Kalika FM", frequency: "95.2 MHz" },
  { id: 3, name: "Hits FM", frequency: "91.2 MHz" },
  { id: 4, name: "Ujyaalo 90 Network", frequency: "90.0 MHz" },
];

export const securityCameras: SecurityCamera[] = PlaceHolderImages.map(img => ({
    id: img.id,
    name: img.description.replace(' Camera Feed', ''),
    imageUrl: img.imageUrl,
    imageHint: img.imageHint,
}));

export const zodiacSigns: ZodiacSign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
