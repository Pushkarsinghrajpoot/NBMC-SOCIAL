'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PostFeed } from '@/components/posts/PostFeed';
import { CommentPanel } from '@/components/posts/CommentPanel';
import { EngagementChart } from '@/components/charts/EngagementChart';
import { FollowerGrowthChart } from '@/components/charts/FollowerGrowthChart';
import { SentimentPie } from '@/components/charts/SentimentPie';
import { ArrowLeft, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface PageDetailProps {
  params: Promise<{ pageId: string }>;
}

export default function PageDetail({ params }: PageDetailProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [commentPanelOpen, setCommentPanelOpen] = useState(false);

  useEffect(() => {
    loadPageData();
  }, [resolvedParams.pageId]);

  const loadPageData = async () => {
    setLoading(true);
    try {
      const { data: page, error: pageError } = await supabase
        .from('tracked_pages')
        .select('*')
        .eq('page_id', resolvedParams.pageId)
        .single();

      if (pageError) throw pageError;
      setPageInfo(page);

      const { data: postsData, error: postsError } = await supabase
        .from('page_posts')
        .select('*')
        .eq('page_id', resolvedParams.pageId)
        .order('created_time', { ascending: false })
        .limit(20);

      if (!postsError) {
        setPosts(postsData || []);
      }

      const postIds = postsData?.map((p: any) => p.post_id) || [];
      if (postIds.length > 0) {
        const { data: commentsData, error: commentsError } = await supabase
          .from('post_comments')
          .select('*')
          .in('post_id', postIds)
          .order('created_time', { ascending: false });

        if (!commentsError) {
          setComments(commentsData || []);
        }
      }

      const { data: insightsData, error: insightsError } = await supabase
        .from('page_insights')
        .select('*')
        .eq('page_id', resolvedParams.pageId)
        .order('recorded_date', { ascending: true })
        .limit(30);

      if (!insightsError) {
        setInsights(insightsData || []);
      }
    } catch (error) {
      console.error('Error loading page data:', error);
      toast.error('Failed to load page data');
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    setCommentPanelOpen(true);
  };

  const topPost = posts.length > 0 
    ? posts.reduce((best: any, current: any) => {
        const bestEngagement = best.likes_count + best.comments_count + best.shares_count;
        const currentEngagement = current.likes_count + current.comments_count + current.shares_count;
        return currentEngagement > bestEngagement ? current : best;
      })
    : null;

  const engagementData = posts.slice(0, 10).reverse().map((post: any, idx: number) => ({
    name: `Post ${idx + 1}`,
    likes: post.likes_count,
    comments: post.comments_count,
    shares: post.shares_count,
  }));

  const followerData = insights.map((insight: any) => ({
    date: new Date(insight.recorded_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    followers: insight.followers_count || 0,
  }));

  const sentimentData = {
    positive: comments.filter((c: any) => c.sentiment === 'positive').length,
    neutral: comments.filter((c: any) => c.sentiment === 'neutral').length,
    negative: comments.filter((c: any) => c.sentiment === 'negative').length,
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-12 w-full mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!pageInfo) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>Page not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" onClick={() => router.push('/dashboard')} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="flex items-start gap-6 mb-8">
        {pageInfo.profile_picture && (
          <img 
            src={pageInfo.profile_picture} 
            alt={pageInfo.page_name}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{pageInfo.page_name}</h1>
          {pageInfo.page_category && (
            <Badge variant="secondary" className="mb-4">{pageInfo.page_category}</Badge>
          )}
          <div className="flex gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{pageInfo.followers_count.toLocaleString()} followers</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {followerData.length > 0 && (
            <FollowerGrowthChart data={followerData} />
          )}

          {engagementData.length > 0 && (
            <EngagementChart data={engagementData} />
          )}

          {topPost && (
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Post</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{topPost.message || topPost.story}</p>
                <div className="flex gap-4 text-sm">
                  <span>{topPost.likes_count} likes</span>
                  <span>{topPost.comments_count} comments</span>
                  <span>{topPost.shares_count} shares</span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="posts">
          <PostFeed 
            posts={posts} 
            loading={false}
            onPostClick={handlePostClick}
          />
        </TabsContent>

        <TabsContent value="comments" className="space-y-6">
          {comments.length > 0 && (
            <SentimentPie data={sentimentData} />
          )}

          <Card>
            <CardHeader>
              <CardTitle>Recent Comments</CardTitle>
            </CardHeader>
            <CardContent>
              {comments.length === 0 ? (
                <p className="text-muted-foreground">No comments yet</p>
              ) : (
                <div className="space-y-4">
                  {comments.slice(0, 20).map((comment) => (
                    <div key={comment.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-semibold text-sm">{comment.commenter_name}</span>
                        <Badge 
                          variant={
                            comment.sentiment === 'positive' ? 'default' :
                            comment.sentiment === 'negative' ? 'destructive' :
                            'secondary'
                          }
                        >
                          {comment.sentiment}
                        </Badge>
                      </div>
                      <p className="text-sm">{comment.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {followerData.length > 0 && (
            <FollowerGrowthChart data={followerData} title="Follower Growth Over Time" />
          )}

          <Card>
            <CardHeader>
              <CardTitle>Engagement Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Average Engagement per Post</p>
                <p className="text-2xl font-bold">
                  {posts.length > 0 
                    ? Math.round(posts.reduce((sum, p) => sum + p.likes_count + p.comments_count + p.shares_count, 0) / posts.length)
                    : 0
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold">
                  {pageInfo.followers_count > 0 && posts.length > 0
                    ? ((posts.reduce((sum, p) => sum + p.likes_count + p.comments_count + p.shares_count, 0) / posts.length / pageInfo.followers_count) * 100).toFixed(2)
                    : 0
                  }%
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CommentPanel 
        open={commentPanelOpen}
        onOpenChange={setCommentPanelOpen}
        postId={selectedPostId}
      />
    </div>
  );
}
