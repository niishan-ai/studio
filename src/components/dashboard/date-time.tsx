"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CalendarDays } from 'lucide-react';

export function DateTime() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const nepaliDate = "2081 Jestha 22"; // Mock Nepali Date
  const nepaliDay = "Wednesday"; // Mock day for the mock date
  
  const day = time ? time.toLocaleDateString('en-US', { weekday: 'long' }) : '...';

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 w-full">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              <p className="text-4xl font-bold tracking-tighter">
                {time ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '...'}
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
    </Card>
  );
}
