"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Video } from 'lucide-react';
import { securityCameras } from '@/lib/data';
import type { SecurityCamera as SecurityCameraType } from '@/lib/types';

export function SecurityCamera() {
  const [selectedCamera, setSelectedCamera] = useState<SecurityCameraType | null>(null);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">प्रत्यक्ष क्यामेरा फिड</CardTitle>
        <Video className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <Dialog>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityCameras.map((camera) => (
              <DialogTrigger asChild key={camera.id} onClick={() => setSelectedCamera(camera)}>
                <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden flex items-center justify-center cursor-pointer group relative">
                  <Image
                    src={camera.imageUrl}
                    alt={camera.name}
                    width={600}
                    height={400}
                    data-ai-hint={camera.imageHint}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
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
              <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden mt-4">
                 <Image
                    src={selectedCamera.imageUrl}
                    alt={selectedCamera.name}
                    width={1280}
                    height={720}
                    data-ai-hint={selectedCamera.imageHint}
                    className="w-full h-full object-cover"
                  />
              </div>
            </DialogContent>
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
}
