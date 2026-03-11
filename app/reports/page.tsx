'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  Users,
  MessageCircle,
  Heart,
  Share2,
  BarChart3,
  PieChart,
  LineChart,
  Eye,
  Clock,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { dummyTrackedPages, dummyPosts, dummyComments, dummyInsights } from '@/lib/dummyData';
import { AppLayout } from '../components/AppLayout';

function ReportsContent() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [reportType, setReportType] = useState('performance');
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-lg text-gray-600">Loading Reports...</p>
        </div>
      </div>
    );
  }

  const generateReport = async () => {
    setGeneratingReport(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratingReport(false);
    toast.success('Report generated successfully!');
  };

  const getPerformanceMetrics = () => {
    return dummyTrackedPages.map(page => {
      const pagePosts = dummyPosts.filter(p => p.page_id === page.page_id);
      const totalEngagement = pagePosts.reduce((sum, post) => 
        sum + post.likes_count + post.comments_count + post.shares_count, 0
      );
      const avgEngagement = pagePosts.length > 0 ? totalEngagement / pagePosts.length : 0;
      
      return {
        pageName: page.page_name,
        followers: page.followers_count,
        posts: pagePosts.length,
        totalEngagement,
        avgEngagement,
        engagementRate: page.followers_count > 0 ? (totalEngagement / pagePosts.length / page.followers_count) * 100 : 0
      };
    });
  };

  const getSentimentAnalysis = () => {
    const sentimentByPage = dummyTrackedPages.map(page => {
      const pageComments = dummyComments.filter(c => 
        dummyPosts.some(p => p.page_id === page.page_id && p.post_id === c.post_id)
      );
      const positive = pageComments.filter(c => c.sentiment === 'positive').length;
      const neutral = pageComments.filter(c => c.sentiment === 'neutral').length;
      const negative = pageComments.filter(c => c.sentiment === 'negative').length;
      
      return {
        pageName: page.page_name,
        total: pageComments.length,
        positive,
        neutral,
        negative,
        sentimentScore: pageComments.length > 0 ? (positive / pageComments.length) * 100 : 0
      };
    });

    return sentimentByPage;
  };

  const getGrowthMetrics = () => {
    return dummyTrackedPages.map(page => {
      const insights = dummyInsights.filter(i => i.page_id === page.page_id);
      if (insights.length < 2) return { pageName: page.page_name, growthRate: 0, totalGrowth: 0 };
      
      const sorted = insights.sort((a, b) => new Date(a.recorded_date).getTime() - new Date(b.recorded_date).getTime());
      const first = sorted[0];
      const last = sorted[sorted.length - 1];
      const growthRate = first.followers_count > 0 ? ((last.followers_count - first.followers_count) / first.followers_count) * 100 : 0;
      
      return {
        pageName: page.page_name,
        growthRate,
        totalGrowth: last.followers_count - first.followers_count
      };
    });
  };

  const getTopPosts = () => {
    return dummyPosts
      .sort((a, b) => (b.likes_count + b.comments_count + b.shares_count) - (a.likes_count + a.comments_count + a.shares_count))
      .slice(0, 10)
      .map(post => {
        const page = dummyTrackedPages.find(p => p.page_id === post.page_id);
        return {
          ...post,
          pageName: page?.page_name || 'Unknown',
          totalEngagement: post.likes_count + post.comments_count + post.shares_count
        };
      });
  };

  const getRecommendations = () => {
    return [
      {
        type: 'improvement',
        title: 'Increase Posting Frequency',
        description: 'Pages posting 3-5 times per week see 23% higher engagement',
        priority: 'high',
        pages: ['Pepsi', 'McDonald\'s']
      },
      {
        type: 'timing',
        title: 'Optimal Posting Time',
        description: 'Best engagement occurs between 2-4 PM on weekdays',
        priority: 'medium',
        pages: ['All Pages']
      },
      {
        type: 'content',
        title: 'Use More Visual Content',
        description: 'Posts with images get 2.3x more engagement than text-only posts',
        priority: 'high',
        pages: ['Apple', 'Nike']
      },
      {
        type: 'engagement',
        title: 'Respond to Comments Faster',
        description: 'Pages responding within 1 hour see 40% higher sentiment scores',
        priority: 'medium',
        pages: ['Coca-Cola', 'Nike']
      }
    ];
  };

  const getHealthScore = (pageName: string) => {
    const performance = getPerformanceMetrics().find(p => p.pageName === pageName);
    const sentiment = getSentimentAnalysis().find(s => s.pageName === pageName);
    const growth = getGrowthMetrics().find(g => g.pageName === pageName);
    
    if (!performance || !sentiment || !growth) return 50;
    
    const engagementScore = Math.min(performance.engagementRate * 10, 40);
    const sentimentScore = sentiment.sentimentScore * 0.3;
    const growthScore = Math.min(growth.growthRate * 2, 30);
    
    return Math.round(engagementScore + sentimentScore + growthScore);
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Reports</h1>
          <p className="text-muted-foreground">Comprehensive reports and insights for your tracked pages</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateReport} disabled={generatingReport}>
            {generatingReport ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="flex gap-2 flex-wrap">
        {['performance', 'sentiment', 'growth', 'health', 'recommendations'].map((type) => (
          <Button
            key={type}
            variant={reportType === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setReportType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      {/* Reports Content */}
      <Tabs value={reportType} className="space-y-4">
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {getPerformanceMetrics().map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{metric.pageName}</h3>
                      <Badge variant={metric.engagementRate > 2 ? 'default' : 'secondary'}>
                        {metric.engagementRate.toFixed(2)}% ER
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Followers</p>
                        <p className="font-medium">{metric.followers.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Posts</p>
                        <p className="font-medium">{metric.posts}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Engagement</p>
                        <p className="font-medium">{metric.totalEngagement.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Engagement</p>
                        <p className="font-medium">{Math.round(metric.avgEngagement)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Sentiment Analysis Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {getSentimentAnalysis().map((analysis, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{analysis.pageName}</h3>
                      <Badge variant={analysis.sentimentScore > 60 ? 'default' : 'secondary'}>
                        {analysis.sentimentScore.toFixed(1)}% Positive
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-muted-foreground">Positive</p>
                          <p className="font-medium">{analysis.positive}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div>
                          <p className="text-muted-foreground">Neutral</p>
                          <p className="font-medium">{analysis.neutral}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div>
                          <p className="text-muted-foreground">Negative</p>
                          <p className="font-medium">{analysis.negative}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Growth Analysis Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {getGrowthMetrics().map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{metric.pageName}</h3>
                      <Badge variant={metric.growthRate > 5 ? 'default' : 'secondary'}>
                        {metric.growthRate.toFixed(1)}% Growth
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Growth Rate</p>
                        <p className="font-medium">{metric.growthRate.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Growth</p>
                        <p className="font-medium">{metric.totalGrowth.toLocaleString()} followers</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Page Health Scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyTrackedPages.map((page, index) => {
                  const healthScore = getHealthScore(page.page_name);
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            {page.page_name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{page.page_name}</h3>
                            <p className="text-sm text-muted-foreground">{page.page_category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">{healthScore}</span>
                            <span className="text-sm text-muted-foreground">/100</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {healthScore >= 80 && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {healthScore >= 60 && healthScore < 80 && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                            {healthScore < 60 && <XCircle className="w-4 h-4 text-red-500" />}
                            <span className="text-xs text-muted-foreground">
                              {healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Needs Improvement'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                AI-Powered Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getRecommendations().map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        rec.priority === 'high' ? 'bg-red-500' : 
                        rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{rec.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {rec.type}
                          </Badge>
                          <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                            {rec.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {rec.pages.map((page, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {page}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Performing Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getTopPosts().map((post, index) => (
              <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <div>
                    <p className="font-medium line-clamp-1">{post.message || 'No text content'}</p>
                    <p className="text-sm text-muted-foreground">{post.pageName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="w-3 h-3" />
                    {post.shares_count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <AppLayout>
      <ReportsContent />
    </AppLayout>
  );
}
