
import { NextResponse } from 'next/server';
import { searchMedia as tmdbSearch } from '@/lib/tmdb';
import type { MediaType } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const type = (searchParams.get('type') as MediaType | 'multi') || 'multi';

  try {
    const results = await tmdbSearch(query, type);
    return NextResponse.json(results);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar dados do TMDB' },
      { status: 500 }
    );
  }
}
