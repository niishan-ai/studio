import { DateTime } from '@/components/dashboard/date-time';
import { Weather } from '@/components/dashboard/weather';
import { News } from '@/components/dashboard/news';
import { Horoscope } from '@/components/dashboard/horoscope';
import { CalendarEvents } from '@/components/dashboard/calendar-events';
import { MusicPlayer } from '@/components/dashboard/music-player';
import { SecurityCamera } from '@/components/dashboard/security-camera';
import { Radio } from '@/components/dashboard/radio';
import { DataRefresh } from '@/components/dashboard/data-refresh';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-4 sm:p-6 lg:p-8">
        <header className="mb-8 flex justify-end">
          <DataRefresh />
        </header>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-4 xl:col-span-5">
            <DateTime />
          </div>
          
          <Weather />
          <Horoscope />
          <CalendarEvents />
          <Radio />
          
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
