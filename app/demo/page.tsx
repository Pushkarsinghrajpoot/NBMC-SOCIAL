'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PostCard } from '@/components/posts/PostCard';
import { CommentPanel } from '@/components/posts/CommentPanel';
import { CompareTable } from '@/components/compare/CompareTable';
import { CompareChart } from '@/components/charts/CompareChart';
import {Input} from '@/components/ui/customInput';
import { Search, Users, CheckCircle } from 'lucide-react';

export default function DemoPage() {
  const [step, setStep] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [commentPanelOpen, setCommentPanelOpen] = useState(false);

  const demoPages = [
    {
      id: '1',
      name: 'Coca Cola',
      category: 'Food & Beverage',
      fan_count: 108000000,
      picture: { data: { url: 'https://via.placeholder.com/100' } },
    },
    {
      id: '2',
      name: 'Pepsi',
      category: 'Food & Beverage',
      fan_count: 37000000,
      picture: { data: { url: 'https://via.placeholder.com/100' } },
    },
  ];

  const demoPost = {
    id: '1',
    post_id: 'demo_post_1',
    message: 'Share a Coke with someone special this summer! ☀️ Tag a friend who deserves a refreshing Coca-Cola.',
    story: null,
    created_time: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    likes_count: 45000,
    comments_count: 3200,
    shares_count: 1200,
    reactions_count: 48000,
    full_picture: 'https://via.placeholder.com/600x400',
    permalink_url: '#',
  };

  const compareMetrics = [
    {
      pageId: '1',
      pageName: 'Coca Cola',
      followers: 108000000,
      postsThisWeek: 7,
      avgLikes: 42000,
      avgComments: 3000,
      engagementRate: 1.05,
    },
    {
      pageId: '2',
      pageName: 'Pepsi',
      followers: 37000000,
      postsThisWeek: 5,
      avgLikes: 18000,
      avgComments: 1200,
      engagementRate: 0.98,
    },
  ];

  const compareChartData = [
    { date: 'Jan 1', '1': 107500000, '2': 36800000 },
    { date: 'Jan 8', '1': 107600000, '2': 36850000 },
    { date: 'Jan 15', '1': 107750000, '2': 36900000 },
    { date: 'Jan 22', '1': 107900000, '2': 36950000 },
    { date: 'Jan 29', '1': 108000000, '2': 37000000 },
  ];

  const comparePages = [
    { id: '1', name: 'Coca Cola', color: '#1E5AA8' },
    { id: '2', name: 'Pepsi', color: '#22C55E' },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">NBMC Analytics Demo</h1>
        <p className="text-muted-foreground">
          Interactive demonstration of Facebook Page analytics features
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">
                1
              </span>
              Search for Any Facebook Page
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Search any Facebook Page..." 
                defaultValue="Coca Cola"
                disabled={step > 1}
              />
              <Button disabled={step > 1}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {step >= 1 && (
              <div className="space-y-3 mt-4">
                {demoPages.map((page) => (
                  <Card key={page.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{page.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="secondary">{page.category}</Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="w-3 h-3" />
                              <span>{page.fan_count.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        {step === 1 ? (
                          <Button onClick={() => setStep(2)}>Track This Page</Button>
                        ) : (
                          <Button disabled>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Tracked
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {step >= 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">
                  2
                </span>
                Page Added to Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <p className="text-green-800 dark:text-green-200">
                  ✓ Coca Cola has been added to your dashboard successfully!
                </p>
              </div>
              <div className="mt-4">
                <Button onClick={() => setStep(3)}>View Page Details</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step >= 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">
                  3
                </span>
                Recent Posts with Real Engagement Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PostCard 
                post={demoPost}
                onClick={() => {
                  setSelectedPostId(demoPost.post_id);
                  setCommentPanelOpen(true);
                  setStep(4);
                }}
              />
            </CardContent>
          </Card>
        )}

        {step >= 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">
                  4
                </span>
                Comment Analysis with Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Click on a post to view comments with sentiment analysis in the side panel →
              </p>
              <Button onClick={() => setStep(5)}>View Comparison</Button>
            </CardContent>
          </Card>
        )}

        {step >= 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">
                  5
                </span>
                Competitor Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CompareTable pages={compareMetrics} />
              <CompareChart data={compareChartData} pages={comparePages} />
            </CardContent>
          </Card>
        )}

        {step < 5 && (
          <div className="text-center py-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setStep(5)}
            >
              Skip to Comparison Demo
            </Button>
          </div>
        )}
      </div>

      <CommentPanel 
        open={commentPanelOpen}
        onOpenChange={setCommentPanelOpen}
        postId={selectedPostId}
      />
    </div>
  );
}
