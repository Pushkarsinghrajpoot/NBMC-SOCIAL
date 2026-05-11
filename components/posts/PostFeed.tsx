'use client';

import { PostCard } from './PostCard';
import { Skeleton } from '@/components/ui/skeleton';

interface PostFeedProps {
  posts: Array<{
    id: string;
    post_id: string;
    message: string | null;
    story: string | null;
    created_time: string | null;
    likes_count: number;
    comments_count: number;
    shares_count: number;
    reactions_count: number;
    full_picture: string | null;
    permalink_url: string | null;
  }>;
  loading?: boolean;
  onPostClick?: (postId: string) => void;
}

export function PostFeed({ posts, loading, onPostClick }: PostFeedProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No posts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post}
          onClick={() => onPostClick?.(post.post_id)}
        />
      ))}
    </div>
  );
}
