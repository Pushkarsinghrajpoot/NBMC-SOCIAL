'use client';

import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ThumbsUp, User, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  message: string;
  like_count: number;
  from: {
    name: string;
  };
  created_time: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

interface CommentPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string | null;
}

export function CommentPanel({ open, onOpenChange, postId }: CommentPanelProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && postId) {
      fetchComments();
    }
  }, [open, postId]);

  const fetchComments = async () => {
    if (!postId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/meta/comments?postId=${encodeURIComponent(postId)}`);
      const data = await response.json();
      setComments(data.data || []);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500';
      case 'negative':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No comments found</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-sm">{comment.from.name}</span>
                  </div>
                  {comment.sentiment && (
                    <Badge 
                      variant="outline" 
                      className={`${getSentimentColor(comment.sentiment)} text-white border-none`}
                    >
                      {comment.sentiment}
                    </Badge>
                  )}
                </div>

                <p className="text-sm">{comment.message}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{comment.like_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      {formatDistanceToNow(new Date(comment.created_time), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
