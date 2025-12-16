import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { calendarEvents } from "@/lib/data";
import { CalendarCheck } from "lucide-react";

export function CalendarEvents() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
        <CalendarCheck className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {calendarEvents.map(event => (
            <li key={event.id} className="flex items-center justify-between">
              <span className="font-medium text-sm">{event.name}</span>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">{event.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
