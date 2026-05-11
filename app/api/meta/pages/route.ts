import { NextRequest, NextResponse } from 'next/server';
import { searchPublicPages } from '@/lib/meta';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
    }

    const data = await searchPublicPages(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in pages API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to search pages' },
      { status: 500 }
    );
  }
}
