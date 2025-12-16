"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fmStations } from "@/lib/data";
import { Play, Pause, SkipBack, SkipForward, Radio } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);

  const currentStation = fmStations[currentStationIndex];

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => {
    setCurrentStationIndex((prevIndex) => (prevIndex + 1) % fmStations.length);
    setIsPlaying(true);
  };
  const handlePrev = () => {
    setCurrentStationIndex((prevIndex) => (prevIndex - 1 + fmStations.length) % fmStations.length);
    setIsPlaying(true);
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">FM Radio</CardTitle>
        <Radio className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <div className="relative w-32 h-32 mb-4">
            <div className={`absolute inset-0 bg-primary/20 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></div>
            <div className={`absolute inset-2 bg-primary/30 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{animationDelay: '0.2s'}}></div>
            <div className="relative w-full h-full flex items-center justify-center bg-background rounded-full shadow-inner">
                <Radio className="w-16 h-16 text-primary" />
            </div>
        </div>

        <h3 className="text-xl font-semibold">{currentStation.name}</h3>
        <p className="text-muted-foreground">{currentStation.frequency}</p>

        <div className="flex items-center gap-4 mt-6">
          <Button variant="ghost" size="icon" onClick={handlePrev}>
            <SkipBack className="w-6 h-6" />
            <span className="sr-only">Previous Station</span>
          </Button>
          <Button variant="default" size="icon" className="w-16 h-16 rounded-full shadow-lg" onClick={handlePlayPause}>
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current" />}
            <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNext}>
            <SkipForward className="w-6 h-6" />
            <span className="sr-only">Next Station</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
