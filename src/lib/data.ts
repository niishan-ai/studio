import type { WeatherData, NewsArticle, HoroscopeData, CalendarEvent, FmStation, SecurityCamera, ZodiacSign } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const weatherData: WeatherData = {
  city: 'काठमाडौं',
  temperature: 24,
  condition: 'आंशिक बदली',
  humidity: 78,
  windSpeed: 5,
};

export const newsData: NewsArticle[] = [
  { id: 1, headline: "काठमाडौं उपत्यकामा नयाँ पूर्वाधार परियोजनाहरूको घोषणा।", source: "काठमान्डु पोस्ट", url: "#" },
  { id: 2, headline: "महामारीपछि नेपालको पर्यटन क्षेत्रमा उल्लेख्य सुधार।", source: "हिमालयन टाइम्स", url: "#" },
  { id: 3, headline: "आर्थिक आशावादका बीच शेयर बजारले नयाँ उचाइ छोयो।", source: "अनलाइन खबर", url: "#" },
  { id: 4, headline: "वार्षिक मनसुन सुरु, बाढीको चेतावनी जारी।", source: "कान्तिपुर", url: "#" },
];

export const horoscopeData: HoroscopeData = {
  "मेष": "नयाँ सुरुवातको दिन। अवसरहरूको सदुपयोग गर्नुहोस्। ऊर्जा उच्च रहनेछ, शारीरिक गतिविधिको लागि राम्रो दिन छ।",
  "वृष": "आर्थिक मामिलामा आज दिन राम्रो छ। लगानीका लागि राम्रो समय छ। आफ्नो अन्तर्ज्ञानमा ध्यान दिनुहोस्।",
  "मिथुन": "आज संचार महत्त्वपूर्ण छ। गलतफहमीबाट बच्न स्पष्टसँग कुरा गर्नुहोस्। छोटो यात्राको योग छ।",
  "कर्कट": "घर र परिवारमा ध्यान दिनुहोस्। प्रियजनहरूसँग समय बिताउँदा आनन्द मिल्नेछ। पुरानो साथीसँग पुनः सम्पर्क हुन सक्छ।",
  "सिंह": "तपाईंको रचनात्मकता शिखरमा छ। यसलाई व्यावसायिक जीवनमा प्रयोग गर्नुहोस्। तपाईंको नेतृत्व कौशलको कदर हुनेछ।",
  "कन्या": "जीवन व्यवस्थित गर्ने राम्रो दिन। आफ्नो ठाउँ र दिमाग सफा गर्नुहोस्। स्वास्थ्य प्राथमिकतामा राख्नुहोस्।",
  "तुला": "आज सम्बन्धहरू महत्त्वपूर्ण छन्। आफ्नो सम्बन्धलाई सुमधुर बनाउनुहोस्। साझेदारीले सफल उद्यम निम्त्याउन सक्छ।",
  "वृश्चिक": "एक परिवर्तनकारी दिन पर्खिरहेको छ। जेले अब सेवा गर्दैन त्यसलाई छोड्नुहोस्। तपाईंको दृढ संकल्पले चुनौतीहरू पार गर्न मद्दत गर्नेछ।",
  "धनु": "साहसिक कार्यले बोलाउँदैछ! यात्राको योजना बनाउनुहोस् वा केहि नयाँ सिक्नुहोस्। तपाईंको आशावादी दृष्टिकोणले सकारात्मक अनुभवहरू आकर्षित गर्नेछ।",
  "मकर": "आज करियर महत्त्वपूर्ण छ। तपाईंको कडा परिश्रमले फल दिनेछ। लक्ष्यमा अनुशासित र केन्द्रित रहनुहोस्।",
  "कुम्भ": "सामाजिक सम्बन्धहरूमा जोड दिइएको छ। नेटवर्किङले नयाँ ढोका खोल्न सक्छ। तपाईंको नवीन विचारहरूको सराहना हुनेछ।",
  "मीन": "आफ्नो भित्री आवाज सुन्नुहोस्। तपाईंको अन्तर्ज्ञान आज बलियो छ। शान्त र ध्यानात्मक दिनले स्पष्टता पाउन मद्दत गर्नेछ।"
};

export const calendarEvents: CalendarEvent[] = [
    { id: 1, name: "क्रिसमस डे", date: "१०" },
    { id: 2, name: "तमु ल्होसार", date: "१५" },
    { id: 3, name: "राष्ट्रिय एकता दिवस", date: "२७" },
];


export const fmStations: FmStation[] = [
  { id: 1, name: "रेडियो कान्तिपुर", frequency: "९६.१ मेगाहर्ज", streamUrl: "https://streaming.softnep.com:8070/stream" },
  { id: 2, name: "कालिका एफएम", frequency: "९५.२ मेगाहर्ज", streamUrl: "https://streaming.softnep.com:8012/stream" },
  { id: 3, name: "रेडियो मिर्ची", frequency: "९८.३ मेगाहर्ज", streamUrl: "http://peridot.streamguys.com:7150/Mirchi" },
  { id: 4, name: "BBC Radio 1", frequency: "English Hits", streamUrl: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one" },
  { id: 5, name: "हिट्स एफएम", frequency: "९१.२ मेगाहर्ज", streamUrl: "https://streaming.softnep.com:1935/hitsfm/hitsfm/playlist.m3u8" },
  { id: 6, name: "उज्यालो ९० नेटवर्क", frequency: "९०.० मेगाहर्ज", streamUrl: "https://streaming.softnep.com:8032/stream" },
];

export const securityCameras: SecurityCamera[] = PlaceHolderImages.map(img => ({
    id: img.id,
    name: img.description.replace(' Camera Feed', ''),
    imageUrl: img.imageUrl,
    imageHint: img.imageHint,
}));

export const zodiacSigns: ZodiacSign[] = ['मेष', 'वृष', 'मिथुन', 'कर्कट', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुम्भ', 'मीन'];
