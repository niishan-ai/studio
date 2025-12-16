"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { fmStations } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Radio as RadioIcon, Play, Pause, Volume2, VolumeX } from "lucide-react";
import type { FmStation } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';


export function Radio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState<FmStation | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && currentStation) {
      audio.src = currentStation.streamUrl;
      audio.play().catch(e => {
        console.error("Error playing audio:", e);
        toast({
          variant: "destructive",
          title: "प्लेब्याक त्रुटि",
          description: "यो स्टेशन स्ट्रिम गर्न सकिएन।",
        });
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentStation, toast]);

  useEffect(() => {
    const audio = audioRef.current;
    if(audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted])

  const handlePlayPause = () => {
    if (currentStation) {
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
         toast({
          title: "रेडियो बज्दैछ",
          description: `${currentStation.name} - ${currentStation.frequency}`,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "स्टेशन चयन गरिएको छैन",
        description: "कृपया बजाउनको लागि स्टेशन चयन गर्नुहोस्।",
      });
    }
  };

  const selectStation = (station: FmStation) => {
    if (currentStation?.id === station.id) {
        handlePlayPause();
    } else {
        setCurrentStation(station);
        setIsPlaying(true);
        toast({
          title: "रेडियो बज्दैछ",
          description: `${station.name} - ${station.frequency}`,
        });
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if(isMuted) setIsMuted(false);
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">एफएम रेडियो</CardTitle>
        <RadioIcon className={`w-6 h-6 text-primary ${isPlaying ? 'animate-pulse' : ''}`} />
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
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
        <audio ref={audioRef} crossOrigin="anonymous" />
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col overflow-hidden">
                    <p className="text-sm font-semibold truncate">{currentStation?.name || 'स्टेशन छान्नुहोस्'}</p>
                    <p className="text-xs text-muted-foreground">{currentStation?.frequency || '-'}</p>
                </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handlePlayPause} disabled={!currentStation}>
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  <span className="sr-only">{isPlaying ? 'पज' : 'प्ले'}</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="h-6 w-6">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-muted-foreground" /> : <Volume2 className="w-5 h-5 text-muted-foreground" />}
              </Button>
              <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.05}
                  onValueChange={handleVolumeChange}
              />
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
