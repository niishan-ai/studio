'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function DataRefresh() {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  const handleRefresh = () => {
    // In a real app, you would fetch new data here for weather, news, etc.
    const now = new Date();
    setLastUpdated(now);
    toast({
      title: 'डाटा ताजा गरियो',
      description: `मौसम र समाचार प्रति घण्टा ताजा गरिन्छ। अन्य सबै डाटा दैनिक ताजा गरिन्छ।`,
    });
  };

  useEffect(() => {
    // Set initial update time
    const now = new Date();
    setLastUpdated(now);

    // Refresh data every hour for news and weather
    const interval = setInterval(() => {
      handleRefresh();
    }, 1000 * 60 * 60); // 1 hour

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timeAgo = (date: Date | null) => {
    if (!date) return '';
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return 'अहिले भर्खरै';
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' वर्ष पहिले';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' महिना पहिले';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' दिन पहिले';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' घण्टा पहिले';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' मिनेट पहिले';
    return Math.floor(seconds) + ' सेकेन्ड पहिले';
  };

  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-muted-foreground">
        अन्तिम पटक ताजा गरिएको: {timeAgo(lastUpdated)}
      </p>
      <Button variant="outline" size="sm" onClick={handleRefresh}>
        <RotateCw className="w-4 h-4 mr-2" />
        ताजा गर्नुहोस्
      </Button>
    </div>
  );
}
