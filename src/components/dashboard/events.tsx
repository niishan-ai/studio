"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { calendarEvents } from "@/lib/data";
import { PartyPopper } from "lucide-react";

export function Events() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">बिदा र चाडपर्वहरू</CardTitle>
        <PartyPopper className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 pt-2">
          {calendarEvents.map((event) => (
            <li key={event.id} className="flex items-center justify-between text-sm">
                <span>{event.name}</span>
                <span className="font-semibold text-primary">पुष {event.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
