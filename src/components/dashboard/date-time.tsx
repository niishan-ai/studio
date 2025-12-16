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

  const nepaliDate = "२०८१ जेठ २२"; 
  const nepaliDay = "बुधबार"; 
  
  const day = time ? time.toLocaleDateString('ne-NP', { weekday: 'long' }) : '...';
  const formattedTime = time ? time.toLocaleTimeString('ne-NP', { hour: 'numeric', minute: 'numeric', hour12: true }) : '...';

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
    </Card>
  );
}
