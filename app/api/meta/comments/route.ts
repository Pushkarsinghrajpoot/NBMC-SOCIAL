import { NextRequest, NextResponse } from 'next/server';
import { getPostComments } from '@/lib/meta';
import { classifySentiment } from '@/lib/sentiment';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'postId parameter required' }, { status: 400 });
    }

    const data = await getPostComments(postId);
    
    if (data.data && Array.isArray(data.data)) {
      const commentsWithSentiment = data.data.map((comment: any) => ({
        ...comment,
        sentiment: classifySentiment(comment.message || ''),
      }));

      for (const comment of commentsWithSentiment) {
        await supabaseAdmin.from('post_comments').upsert({
          post_id: postId,
          comment_id: comment.id,
          message: comment.message,
          like_count: comment.like_count || 0,
          commenter_name: comment.from?.name || 'Unknown',
          created_time: comment.created_time,
          sentiment: comment.sentiment,
        }, {
          onConflict: 'comment_id'
        });
      }

      return NextResponse.json({ ...data, data: commentsWithSentiment });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in comments API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get comments' },
      { status: 500 }
    );
  }
}
