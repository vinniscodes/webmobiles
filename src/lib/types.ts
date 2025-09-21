export interface Media {
  id: string;
  tmdbId: string;
  title: string;
  year: string;
  posterUrl: string;
  posterImageHint: string;
  type: 'movie' | 'series';
  rating: number;
  synopsis: string;
  genres: string[];
}

export interface SavedMedia extends Media {
  status: 'watched' | 'pending';
  userRating: number | null;
  notes: string | null;
}
