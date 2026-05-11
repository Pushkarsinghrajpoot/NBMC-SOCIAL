import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getPageDetails, getPagePosts } from '@/lib/meta';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const { data: trackedPages, error: fetchError } = await supabaseAdmin
      .from('tracked_pages')
      .select('*')
      .eq('user_id', userId);

    if (fetchError) {
      throw fetchError;
    }

    const results = [];

    for (const page of trackedPages || []) {
      try {
        const pageDetails = await getPageDetails(page.page_id);
        
        await supabaseAdmin
          .from('tracked_pages')
          .update({
            fan_count: pageDetails.fan_count || 0,
            followers_count: pageDetails.followers_count || 0,
            last_synced: new Date().toISOString(),
          })
          .eq('id', page.id);

        const today = new Date().toISOString().split('T')[0];
        await supabaseAdmin.from('page_insights').upsert({
          page_id: page.page_id,
          recorded_date: today,
          fan_count: pageDetails.fan_count || 0,
          followers_count: pageDetails.followers_count || 0,
        }, {
          onConflict: 'page_id,recorded_date'
        });

        const postsData = await getPagePosts(page.page_id, 20);
        
        if (postsData.data && Array.isArray(postsData.data)) {
          for (const post of postsData.data) {
            await supabaseAdmin.from('page_posts').upsert({
              page_id: page.page_id,
              post_id: post.id,
              message: post.message,
              story: post.story,
              created_time: post.created_time,
              likes_count: post.likes?.summary?.total_count || 0,
              comments_count: post.comments?.summary?.total_count || 0,
              shares_count: post.shares?.count || 0,
              reactions_count: post.reactions?.summary?.total_count || 0,
              full_picture: post.full_picture,
              permalink_url: post.permalink_url,
            }, {
              onConflict: 'post_id'
            });
          }
        }

        results.push({
          pageId: page.page_id,
          pageName: page.page_name,
          status: 'synced',
          postsCount: postsData.data?.length || 0,
        });
      } catch (error) {
        console.error(`Error syncing page ${page.page_id}:`, error);
        results.push({
          pageId: page.page_id,
          pageName: page.page_name,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Error in sync API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to sync pages' },
      { status: 500 }
    );
  }
}
