"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function SecurityCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not supported in this browser.');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Not Supported',
          description: 'Your browser does not support camera access.',
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
    
    // Cleanup function to stop the video stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [toast]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">प्रत्यक्ष क्यामेरा फिड</CardTitle>
        <Video className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
        </div>
        {hasCameraPermission === false && (
            <Alert variant="destructive" className="mt-4">
                <AlertTitle>क्यामेरा पहुँच आवश्यक</AlertTitle>
                <AlertDescription>
                यो सुविधा प्रयोग गर्न कृपया क्यामेरा पहुँच अनुमति दिनुहोस्।
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
