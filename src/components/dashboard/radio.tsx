"use client";

import { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { fmStations } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Radio as RadioIcon, Play, Pause, Volume2 } from "lucide-react";
import type { FmStation } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';


export function Radio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState<FmStation | null>(fmStations[0]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handlePlayPause = () => {
    if (currentStation) {
      setIsPlaying(!isPlaying);
      toast({
        title: isPlaying ? "रेडियो पज भयो" : "रेडियो बज्दैछ",
        description: `${currentStation.name} - ${currentStation.frequency}`,
      });
    }
  };

  const selectStation = (station: FmStation) => {
    setCurrentStation(station);
    setIsPlaying(true);
    toast({
      title: "रेडियो बज्दैछ",
      description: `${station.name} - ${station.frequency}`,
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">एफएम रेडियो</CardTitle>
        <RadioIcon className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          {fmStations.map(station => (
            <div
              key={station.id}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${currentStation?.id === station.id ? 'bg-primary/20' : 'hover:bg-muted'}`}
              onClick={() => selectStation(station)}
            >
              <span className="font-medium text-sm">{station.name}</span>
              <span className="text-sm text-muted-foreground">{station.frequency}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="w-full flex items-center justify-between gap-4">
            <div className="flex flex-col">
                <p className="text-sm font-semibold truncate">{currentStation?.name || 'स्टेशन छान्नुहोस्'}</p>
                <p className="text-xs text-muted-foreground">{currentStation?.frequency || '-'}</p>
            </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handlePlayPause} disabled={!currentStation}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              <span className="sr-only">{isPlaying ? 'पज' : 'प्ले'}</span>
            </Button>
            <Volume2 className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
