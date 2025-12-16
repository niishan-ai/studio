'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { DateTime } from '@/components/dashboard/date-time';
import { Weather } from '@/components/dashboard/weather';
import { News } from '@/components/dashboard/news';
import { Horoscope } from '@/components/dashboard/horoscope';
import { NepaliCalendar } from '@/components/dashboard/nepali-calendar';
import { MusicPlayer } from '@/components/dashboard/music-player';
import { SecurityCamera } from '@/components/dashboard/security-camera';
import { Radio } from '@/components/dashboard/radio';
import { DataRefresh } from '@/components/dashboard/data-refresh';
import { ThemeToggle } from '@/components/theme-toggle';
import { Events } from '@/components/dashboard/events';
import { BackgroundUploader } from '@/components/dashboard/background-uploader';

export default function Home() {
  const { theme } = useTheme();
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedBg = localStorage.getItem('dashboardBackground');
      if (savedBg) {
        setBackgroundUrl(savedBg);
      }
    } catch (error) {
        console.error("Could not access local storage for background image.", error);
    }
  }, []);

  const handleBackgroundChange = (newUrl: string) => {
     setBackgroundUrl(newUrl);
     try {
        localStorage.setItem('dashboardBackground', newUrl);
     } catch (error) {
        console.error("Could not save background image to local storage.", error);
     }
  };
  
  const showBackground = isMounted && theme === 'light' && backgroundUrl;

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {showBackground && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
              style={{ backgroundImage: `url(${backgroundUrl})` }}
            ></div>
            <div className="absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-sm"></div>
          </>
      )}
      <main className="p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="mb-8 flex justify-end items-center gap-4">
          <BackgroundUploader onBackgroundChange={handleBackgroundChange} />
          <DataRefresh />
          <ThemeToggle />
        </header>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-4 xl:col-span-5">
            <DateTime />
          </div>
          
          <Weather />
          <Horoscope />
          <Radio />
          <NepaliCalendar />
          <Events />
          
          <div className="sm:col-span-2 lg:col-span-4 xl:col-span-5 grid grid-cols-1 xl:grid-cols-5 gap-6">
            <div className="xl:col-span-2 h-full">
              <MusicPlayer />
            </div>
            <div className="xl:col-span-3">
              <News />
            </div>
          </div>
          
          <div className="sm:col-span-2 lg:col-span-4 xl:col-span-5">
            <SecurityCamera />
          </div>
        </div>
      </main>
    </div>
  );
}
