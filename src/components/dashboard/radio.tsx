import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fmStations } from "@/lib/data";
import { Radio as RadioIcon } from "lucide-react";

export function Radio() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">एफएम रेडियो</CardTitle>
        <RadioIcon className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {fmStations.map(station => (
            <li key={station.id} className="flex items-center justify-between">
              <span className="font-medium text-sm">{station.name}</span>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">{station.frequency}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
