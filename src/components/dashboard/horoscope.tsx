"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { horoscopeData, zodiacSigns } from "@/lib/data";
import type { ZodiacSign } from '@/lib/types';
import { Sparkles } from 'lucide-react';

const zodiacEmojis: Record<ZodiacSign, string> = {
  "मेष": '♈', "वृष": '♉', "मिथुन": '♊', "कर्कट": '♋', "सिंह": '♌', "कन्या": '♍',
  "तुला": '♎', "वृश्चिक": '♏', "धनु": '♐', "मकर": '♑', "कुम्भ": '♒', "मीन": '♓'
};

export function Horoscope() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign>('मेष');

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">दैनिक राशिफल</CardTitle>
            <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div className="pt-2">
            <Select onValueChange={(value: ZodiacSign) => setSelectedSign(value)} defaultValue={selectedSign}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="आफ्नो राशि छान्नुहोस्" />
                </SelectTrigger>
                <SelectContent>
                    {zodiacSigns.map(sign => (
                        <SelectItem key={sign} value={sign}>
                           <span className="mr-2">{zodiacEmojis[sign]}</span> {sign}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center text-4xl mb-4">{zodiacEmojis[selectedSign]}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {horoscopeData[selectedSign]}
        </p>
      </CardContent>
    </Card>
  );
}
