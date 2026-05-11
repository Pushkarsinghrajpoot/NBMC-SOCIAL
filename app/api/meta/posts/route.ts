import { NextRequest, NextResponse } from 'next/server';
import { getPagePosts } from '@/lib/meta';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageId = searchParams.get('pageId');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!pageId) {
      return NextResponse.json({ error: 'pageId parameter required' }, { status: 400 });
    }

    const data = await getPagePosts(pageId, limit);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in posts API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get posts' },
      { status: 500 }
    );
  }
}
