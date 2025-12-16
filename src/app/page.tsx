import { DateTime } from '@/components/dashboard/date-time';
import { Weather } from '@/components/dashboard/weather';
import { News } from '@/components/dashboard/news';
import { Horoscope } from '@/components/dashboard/horoscope';
import { CalendarEvents } from '@/components/dashboard/calendar-events';
import { MusicPlayer } from '@/components/dashboard/music-player';
import { SecurityCamera } from '@/components/dashboard/security-camera';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent/80">
            Nepali Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Your daily overview, inspired by Nepal.</p>
        </header>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-3">
            <DateTime />
          </div>
          
          <Weather />
          <Horoscope />
          <CalendarEvents />
          
          <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 h-full">
              <MusicPlayer />
            </div>
            <div className="lg:col-span-3">
              <News />
            </div>
          </div>
          
          <div className="sm:col-span-2 lg:col-span-3">
            <SecurityCamera />
          </div>
        </div>
      </main>
    </div>
  );
}
