import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { weatherData } from "@/lib/data";
import { Thermometer, Wind, Droplets, Cloudy } from "lucide-react";

export function Weather() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Kathmandu Weather</CardTitle>
        <Cloudy className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
          {weatherData.temperature}°C
        </div>
        <p className="text-xs text-muted-foreground mt-1">{weatherData.condition}</p>
        <div className="mt-4 grid grid-cols-1 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-muted-foreground" />
            <span>Humidity: {weatherData.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-muted-foreground" />
            <span>Wind: {weatherData.windSpeed} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
