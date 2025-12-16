"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Video, CameraOff } from 'lucide-react';
import { securityCameras } from '@/lib/data';
import type { SecurityCamera as SecurityCameraType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function SecurityCamera() {
  const [selectedCamera, setSelectedCamera] = useState<SecurityCameraType | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Only try to get camera permission if the 'live' feed camera is selected
    // For this example, we'll use the first camera as the live one.
    if (selectedCamera?.id === 'camera-1') {
      const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          toast({
            variant: 'destructive',
            title: 'Unsupported Browser',
            description: 'Your browser does not support camera access.',
          });
          setHasCameraPermission(false);
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
            title: 'क्यामेरा पहुँच अस्वीकृत भयो',
            description: 'यो एप प्रयोग गर्न कृपया आफ्नो ब्राउजर सेटिङहरूमा क्यामेरा अनुमतिहरू सक्षम गर्नुहोस्।',
          });
        }
      };

      getCameraPermission();

      return () => {
        // Cleanup: stop the video stream when the component unmounts or dialog closes
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [selectedCamera, toast]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
       setSelectedCamera(null); // This will trigger the useEffect cleanup
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">प्रत्यक्ष क्यामेरा फिड</CardTitle>
        <Video className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <Dialog onOpenChange={handleOpenChange}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityCameras.map((camera) => (
              <DialogTrigger asChild key={camera.id} onClick={() => setSelectedCamera(camera)}>
                <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden flex items-center justify-center cursor-pointer group relative">
                  {camera.id === 'camera-1' ? (
                     <div className="w-full h-full flex flex-col items-center justify-center bg-black">
                        <Video className="w-10 h-10 text-primary" />
                        <p className="text-white font-semibold mt-2">{camera.name} (Live)</p>
                     </div>
                  ) : (
                    <Image
                      src={camera.imageUrl}
                      alt={camera.name}
                      width={600}
                      height={400}
                      data-ai-hint={camera.imageHint}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <p className="text-white font-semibold">{camera.name}</p>
                  </div>
                </div>
              </DialogTrigger>
            ))}
          </div>

          {selectedCamera && (
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedCamera.name}</DialogTitle>
              </DialogHeader>
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden mt-4 flex items-center justify-center">
                 {selectedCamera.id === 'camera-1' ? (
                    <div className="w-full h-full">
                      <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                      {!hasCameraPermission && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white p-4">
                           <CameraOff className="w-16 h-16 mb-4"/>
                            <Alert variant="destructive">
                              <AlertTitle>क्यामेरा पहुँच आवश्यक छ</AlertTitle>
                              <AlertDescription>
                                यो सुविधा प्रयोग गर्न कृपया क्यामेरा पहुँच अनुमति दिनुहोस्।
                              </AlertDescription>
                            </Alert>
                         </div>
                      )}
                    </div>
                 ) : (
                    <Image
                      src={selectedCamera.imageUrl}
                      alt={selectedCamera.name}
                      width={1280}
                      height={720}
                      data-ai-hint={selectedCamera.imageHint}
                      className="w-full h-full object-cover"
                    />
                 )}
              </div>
            </DialogContent>
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
}
