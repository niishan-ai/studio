
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Music, ListMusic, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface Song {
  name: string;
  url: string;
}

export function MusicPlayer() {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedPlaylist = localStorage.getItem('playlist');
      if (savedPlaylist) {
        const parsedPlaylist = JSON.parse(savedPlaylist);
        if (Array.isArray(parsedPlaylist)) {
          setPlaylist(parsedPlaylist);
        }
      }
    } catch (error) {
      console.error("Failed to parse playlist from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
        if (playlist.length > 0) {
            localStorage.setItem('playlist', JSON.stringify(playlist));
        }
    } catch (error) {
        console.error("Failed to save playlist to localStorage", error);
    }
  }, [playlist]);
  
  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && currentSong) {
      audio.play().catch(e => {
        console.error("Error playing audio:", e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSongIndex, currentSong]);

  const handlePlayPause = () => {
    if (playlist.length === 0) {
        toast({ title: "कुनै गीत छैन", description: "कृपया पहिले गीत थप्नुहोस्।" });
        return;
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleNext = () => {
    if (playlist.length === 0) return;
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (playlist.length === 0) return;
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newSongs: Song[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('audio/')) {
          const songUrl = URL.createObjectURL(file);
          newSongs.push({ name: file.name, url: songUrl });
        }
      }
      setPlaylist(prev => [...prev, ...newSongs]);
      toast({
        title: "गीतहरू थपियो",
        description: `${newSongs.length} नयाँ गीत(हरू) तपाईंको प्लेलिस्टमा थपियो।`,
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">संगीत प्लेयर</CardTitle>
        <Music className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <input
          type="file"
          accept="audio/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {currentSong ? (
            <>
                <div className="relative w-32 h-32 mb-4">
                    <div className={`absolute inset-0 bg-primary/20 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></div>
                    <div className={`absolute inset-2 bg-primary/30 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{animationDelay: '0.2s'}}></div>
                    <div className="relative w-full h-full flex items-center justify-center bg-background rounded-full shadow-inner">
                        <Music className="w-16 h-16 text-primary" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold truncate w-full max-w-xs">{currentSong.name}</h3>
                <div className="w-full max-w-xs mt-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </>
        ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
                <ListMusic className="w-20 h-20 mb-4" />
                <p>प्लेलिस्ट खाली छ।</p>
                <p>संगीत थप्न तलको बटन थिच्नुहोस्।</p>
            </div>
        )}

        <audio
          ref={audioRef}
          src={currentSong?.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleNext}
          onLoadedMetadata={handleTimeUpdate}
        />

        <div className="flex items-center gap-4 mt-6">
          <Button variant="ghost" size="icon" onClick={handlePrev} disabled={playlist.length < 2}>
            <SkipBack className="w-6 h-6" />
            <span className="sr-only">अघिल्लो गीत</span>
          </Button>
          <Button variant="default" size="icon" className="w-16 h-16 rounded-full shadow-lg" onClick={handlePlayPause}>
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current" />}
            <span className="sr-only">{isPlaying ? 'पज' : 'प्ले'}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNext} disabled={playlist.length < 2}>
            <SkipForward className="w-6 h-6" />
            <span className="sr-only">अर्को गीत</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-2 border-t">
        <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
          <Upload className="w-4 h-4 mr-2" />
          संगीत थप्नुहोस्
        </Button>
      </CardFooter>
    </Card>
  );
}
