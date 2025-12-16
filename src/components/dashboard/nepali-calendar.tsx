"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { calendarEvents } from "@/lib/data";
import { Calendar } from "lucide-react";

const daysOfWeek = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];
const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);
const emptyDays = Array.from({ length: 1 }, (_, i) => i); // Poush 1, 2082 starts on a Tuesday

const eventsMap = new Map(calendarEvents.map(e => [e.date, e.name]));

export function NepaliCalendar() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">पुष २०८२</CardTitle>
        <Calendar className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {daysOfWeek.map(day => (
            <div key={day} className="font-semibold text-muted-foreground">{day}</div>
          ))}
          {emptyDays.map(day => (
            <div key={`empty-${day}`}></div>
          ))}
          {monthDays.map(day => {
            const dayStr = day.toString();
            const event = eventsMap.get(dayStr);
            const isToday = day === 1;
            const isHoliday = dayStr === '10' || dayStr === '15' || dayStr === '27';
            const isSaturday = (day + 1) % 7 === 0;

            return (
              <div 
                key={day} 
                className={`relative flex items-center justify-center h-8 w-8 rounded-full text-sm
                  ${isToday ? 'bg-primary text-primary-foreground font-bold' : ''}
                  ${!isToday && (isHoliday || event) ? 'bg-accent/80 text-accent-foreground font-semibold' : ''}
                  ${!isToday && !isHoliday && !event && isSaturday ? 'text-red-500' : ''}
                  ${!isToday && !isHoliday && !event && !isSaturday ? '' : ''}
                `}
                title={event || ''}
              >
                {day}
                {event && (
                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
