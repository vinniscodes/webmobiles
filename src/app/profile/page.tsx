'use client';

import { useState } from 'react';
import Image from 'next/image';
import { mockSavedItems } from '@/lib/data';
import type { SavedMedia } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Pencil, Star, Trash2 } from 'lucide-react';
import { EditProfileItemDialog } from '@/components/app/edit-profile-item-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function ProfilePage() {
  const [savedItems, setSavedItems] = useState<SavedMedia[]>(mockSavedItems);
  const [editingItem, setEditingItem] = useState<SavedMedia | null>(null);

  const handleUpdateStatus = (id: string) => {
    setSavedItems(
      savedItems.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'pending' ? 'watched' : 'pending',
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setSavedItems(savedItems.filter((item) => item.id !== id));
  };

  const handleSaveChanges = (updatedItem: SavedMedia) => {
    setSavedItems(
      savedItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setEditingItem(null);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-headline text-accent text-center">Minha Lista</h1>
      {savedItems.length === 0 ? (
        <p className="text-center text-muted-foreground">Sua lista está vazia. Comece salvando alguns filmes ou séries!</p>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {savedItems.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader className="flex-row gap-4 items-start p-4">
              <Image
                src={item.posterUrl}
                alt={`Pôster de ${item.title}`}
                width={100}
                height={150}
                className="rounded-md object-cover"
                data-ai-hint={item.posterImageHint}
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-sm text-muted-foreground">{item.year}</p>
                 <Badge
                    variant={item.status === 'watched' ? 'default' : 'secondary'}
                    className="mt-2"
                  >
                    {item.status === 'watched' ? (
                      <CheckCircle className="mr-1 h-3 w-3" />
                    ) : (
                      <Clock className="mr-1 h-3 w-3" />
                    )}
                    {item.status === 'watched' ? 'Assistido' : 'Pendente'}
                  </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-0">
               {item.userRating && (
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-lg">{item.userRating}</span>
                  <span className="text-sm text-muted-foreground">/ 10</span>
                </div>
              )}
              {item.notes && (
                <p className="text-sm text-foreground/80 italic border-l-2 border-primary pl-3">
                  {item.notes}
                </p>
              )}
             
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="ghost" onClick={() => handleUpdateStatus(item.id)}>
                Mudar Status
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={() => setEditingItem(item)}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remover</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Isso removerá permanentemente "{item.title}" da sua lista.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleRemoveItem(item.id)}>
                        Remover
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      )}
      {editingItem && (
        <EditProfileItemDialog
          item={editingItem}
          isOpen={!!editingItem}
          setIsOpen={() => setEditingItem(null)}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
}
