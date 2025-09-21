'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MovieCard } from '@/components/app/movie-card';
import { Search } from 'lucide-react';
import { searchMedia } from '@/lib/tmdb';
import type { Media, MediaType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchPage() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MediaType | 'any'>('any');
  const [results, setResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    setSearched(true);
    const searchType = type === 'any' ? 'multi' : type;
    const searchResults = await searchMedia(title, searchType);
    setResults(searchResults);
    setLoading(false);
  };

  return (
    <div className="space-y-12">
      <section id="search">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-accent">
              Search for Movies & Series
            </CardTitle>
            <CardDescription>
              Find your next favorite thing to watch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSearch}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end"
            >
              <div className="lg:col-span-2 space-y-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  placeholder="e.g., The Matrix"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="type">Type</label>
                <Select
                  value={type}
                  onValueChange={(value) => setType(value as MediaType | 'any')}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="movie">Movie</SelectItem>
                    <SelectItem value="tv">Series</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  <Search className="mr-2 h-4 w-4" />{' '}
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <section id="results">
        <h2 className="text-3xl font-headline mb-6 text-center">
          {searched ? 'Search Results' : 'Popular Now'}
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
               <Card key={i}>
                <Skeleton className="h-[400px] w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                   <Skeleton className="h-4 w-1/4" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {results.map((media) => (
              <MovieCard key={media.id} media={media} />
            ))}
          </div>
        )}
         {searched && !loading && results.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No results found for your search.</p>
        )}
      </section>
    </div>
  );
}
