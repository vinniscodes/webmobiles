'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, ThumbsDown, ThumbsUp } from 'lucide-react';
import type { Media } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface MovieCardProps {
  media: Media;
}

export function MovieCard({ media }: MovieCardProps) {
  const { toast } = useToast();

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.preventDefault();
    e.stopPropagation();

    let title = '';
    let description: string | undefined = undefined;

    switch (action) {
      case 'Salvar':
        title = `"${media.title}" salvo na sua lista!`;
        // Aqui você adicionaria a lógica para salvar o item no backend/estado global
        // Por enquanto, apenas exibimos a notificação de sucesso.
        break;
      case 'Gostei':
        title = `Você curtiu "${media.title}"!`;
        break;
      case 'Não Gostei':
        title = `Você não curtiu "${media.title}".`;
        break;
    }

    toast({
      title: title,
      description: description,
    });
  };

  return (
    <Card className="overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
      <Link href={`/media/${media.type}-${media.tmdbId}`} className="block">
        <CardContent className="p-0 relative group">
          <Image
            src={media.posterUrl}
            alt={`Pôster de ${media.title}`}
            width={500}
            height={750}
            className="w-full h-auto object-cover"
            data-ai-hint={media.posterImageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-background/70 hover:bg-accent hover:text-accent-foreground transition-all"
                onClick={(e) => handleAction(e, 'Salvar')}
                aria-label="Salvar"
              >
                <Bookmark />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/70 hover:bg-accent hover:text-accent-foreground transition-all"
                onClick={(e) => handleAction(e, 'Gostei')}
                aria-label="Gostei"
              >
                <ThumbsUp />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/70 hover:bg-accent hover:text-accent-foreground transition-all"
                onClick={(e) => handleAction(e, 'Não Gostei')}
                aria-label="Não Gostei"
              >
                <ThumbsDown />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 flex-col items-start">
          <h3 className="font-semibold text-lg truncate w-full">
            {media.title}
          </h3>
          <p className="text-sm text-muted-foreground">{media.year}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
