import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { newsData } from "@/lib/data";
import { Newspaper } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function News() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Latest Headlines</CardTitle>
        <Newspaper className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {newsData.map((article, index) => (
            <li key={article.id}>
              <a href={article.url} className="group hover:text-primary transition-colors block">
                <p className="font-semibold text-sm leading-snug">{article.headline}</p>
                <p className="text-xs text-muted-foreground">{article.source}</p>
              </a>
              {index < newsData.length - 1 && <Separator className="mt-3" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
