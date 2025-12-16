"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CalendarDays } from 'lucide-react';
import { textToSpeech } from '@/ai/flows/tts-flow';

export function DateTime() {
  const [time, setTime] = useState<Date | null>(null);
  const lastAnnouncedHour = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = async () => {
      const now = new Date();
      setTime(now);

      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      if (currentMinute === 0 && lastAnnouncedHour.current !== currentHour) {
        lastAnnouncedHour.current = currentHour;
        const announcement = `अहिले ${now.toLocaleTimeString('ne-NP', { hour: 'numeric', hour12: true})} बज्यो।`;
        try {
          const response = await textToSpeech(announcement);
          setAudioSrc(response.media);
        } catch (error) {
          console.error("Failed to generate time announcement:", error);
        }
      }
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (audioSrc && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [audioSrc]);

  const nepaliDate = "२०८२ पुष १"; 
  const nepaliDay = "मंगलबार"; 
  
  const day = time ? time.toLocaleDateString('en-US', { weekday: 'long' }) : '...';
  const formattedTime = time ? time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : '...';

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-teal-50 dark:from-orange-900/20 dark:to-teal-900/20 w-full">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              <p className="text-4xl font-bold tracking-tighter">
                {formattedTime}
              </p>
            </div>
            <p className="text-muted-foreground mt-1">{day}</p>
          </div>
          <div className="text-left sm:text-right">
            <div className="flex items-center gap-2 text-primary justify-start sm:justify-end">
              <CalendarDays className="w-5 h-5" />
              <p className="font-semibold text-lg">{nepaliDate}</p>
            </div>
            <p className="text-muted-foreground">{nepaliDay}</p> 
          </div>
        </div>
      </CardContent>
      {audioSrc && <audio ref={audioRef} src={audioSrc} />}
    </Card>
  );
}
