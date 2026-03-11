'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, MessageCircle, Share2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: {
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
  };
  onClick?: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  const engagementRate = ((post.likes_count + post.comments_count + post.shares_count) / 1000).toFixed(2);

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer" 
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {post.created_time && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{formatDistanceToNow(new Date(post.created_time), { addSuffix: true })}</span>
            </div>
          )}

          {post.story && (
            <p className="text-sm text-muted-foreground italic">{post.story}</p>
          )}

          {post.message && (
            <p className="text-sm line-clamp-3">{post.message}</p>
          )}

          {post.full_picture && (
            <img 
              src={post.full_picture} 
              alt="Post" 
              className="w-full rounded-lg object-cover max-h-80"
            />
          )}

          <div className="flex flex-wrap gap-4 pt-2 border-t">
            <div className="flex items-center gap-2 text-sm">
              <ThumbsUp className="w-4 h-4 text-blue-500" />
              <span>{post.likes_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MessageCircle className="w-4 h-4 text-green-500" />
              <span>{post.comments_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Share2 className="w-4 h-4 text-purple-500" />
              <span>{post.shares_count.toLocaleString()}</span>
            </div>
            <div className="ml-auto">
              <Badge variant="outline">
                Engagement: {engagementRate}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
