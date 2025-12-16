import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { securityCameras } from "@/lib/data";
import Image from "next/image";
import { Video } from 'lucide-react';

export function SecurityCamera() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Security Cameras</CardTitle>
        <Video className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {securityCameras.map(camera => (
            <div key={camera.id} className="relative aspect-video overflow-hidden rounded-lg group">
              <Image
                src={camera.imageUrl}
                alt={camera.name}
                width={400}
                height={300}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={camera.imageHint}
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-2 left-2 text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                <p>{camera.name}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
