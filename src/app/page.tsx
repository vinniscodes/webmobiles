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
import { mockSearchResults } from '@/lib/data';
import { Search } from 'lucide-react';

export default function SearchPage() {
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
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="lg:col-span-2 space-y-2">
                <label htmlFor="title">Title</label>
                <Input id="title" placeholder="e.g., The Matrix" />
              </div>
              <div className="space-y-2">
                <label htmlFor="type">Type</label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="movie">Movie</SelectItem>
                    <SelectItem value="series">Series</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="tmdbId">TMDB ID</label>
                <Input
                  id="tmdbId"
                  placeholder="e.g., 603"
                  className="font-code"
                />
              </div>
              <div className="lg:col-span-4">
                <Button type="submit" className="w-full">
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <section id="results">
        <h2 className="text-3xl font-headline mb-6 text-center">
          Search Results
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockSearchResults.map((media) => (
            <MovieCard key={media.id} media={media} />
          ))}
        </div>
      </section>
    </div>
  );
}
