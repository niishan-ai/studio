"use client";

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BackgroundUploaderProps {
  onBackgroundChange: (url: string) => void;
}

export function BackgroundUploader({ onBackgroundChange }: BackgroundUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          variant: 'destructive',
          title: 'अमान्य फाइल प्रकार',
          description: 'कृपया छवि फाइल चयन गर्नुहोस्।',
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onBackgroundChange(result);
         toast({
          title: 'पृष्ठभूमि परिवर्तन भयो',
          description: 'तपाईंको नयाँ पृष्ठभूमि सफलतापूर्वक सेट गरिएको छ।',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <Button variant="outline" size="sm" onClick={handleClick}>
        <ImageIcon className="w-4 h-4 mr-2" />
        पृष्ठभूमि
      </Button>
    </>
  );
}
