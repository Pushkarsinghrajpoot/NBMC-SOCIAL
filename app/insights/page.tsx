'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Clock,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Eye,
  Award,
  Star,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { toast } from 'sonner';
import { dummyTrackedPages, dummyPosts, dummyComments, dummyInsights } from '@/lib/dummyData';
import { AppLayout } from '../components/AppLayout';

function InsightsContent() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [insightType, setInsightType] = useState('all');

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-lg text-gray-600">Loading Insights...</p>
        </div>
      </div>
    );
  }

  const getAIInsights = () => {
    return [
      {
        type: 'opportunity',
        title: 'Peak Engagement Window Identified',
        description: 'Your audience is most active between 2-4 PM on Tuesdays and Wednesdays. Posts during this time get 45% higher engagement.',
        impact: 'high',
        confidence: 92,
        actionable: true,
        pages: ['All Pages'],
        data: 'Based on analysis of 1,247 posts over the last 30 days'
      },
      {
        type: 'warning',
        title: 'Content Fatigue Detected',
        description: 'Coca-Cola\'s engagement rate has dropped 23% over the last 2 weeks. Consider varying content types.',
        impact: 'medium',
        confidence: 87,
        actionable: true,
        pages: ['Coca-Cola'],
        data: 'ER dropped from 3.2% to 2.5% between Feb 28 - Mar 12'
      },
      {
        type: 'success',
        title: 'Viral Content Pattern Found',
        description: 'Posts asking questions generate 3.2x more comments. Nike\'s "What\'s your fitness goal?" post got 2,341 comments.',
        impact: 'high',
        confidence: 95,
        actionable: true,
        pages: ['Nike'],
        data: 'Analyzed 89 question-based posts vs 342 statement posts'
      },
      {
        type: 'trend',
        title: 'Weekend Performance Surge',
        description: 'Saturday posts show 67% higher share rates across all pages. Consider weekend content strategy.',
        impact: 'medium',
        confidence: 78,
        actionable: true,
        pages: ['McDonald\'s', 'Pepsi'],
        data: 'Weekend avg share rate: 4.2% vs weekday: 2.5%'
      },
      {
        type: 'optimization',
        title: 'Image-Text Ratio Optimized',
        description: 'Posts with 80-120 characters of text + image perform best. Apple\'s sweet spot: 95 chars.',
        impact: 'low',
        confidence: 71,
        actionable: true,
        pages: ['Apple'],
        data: 'Correlation analysis of 523 posts with text length vs engagement'
      }
    ];
  };

  const getPredictiveAnalytics = () => {
    return [
      {
        metric: 'Follower Growth',
        current: 108500000,
        predicted: 112000000,
        timeframe: '30 days',
        confidence: 88,
        trend: 'up',
        page: 'Coca-Cola'
      },
      {
        metric: 'Engagement Rate',
        current: 2.8,
        predicted: 3.1,
        timeframe: '30 days',
        confidence: 76,
        trend: 'up',
        page: 'Nike'
      },
      {
        metric: 'Post Reach',
        current: 450000,
        predicted: 420000,
        timeframe: '30 days',
        confidence: 82,
        trend: 'down',
        page: 'Pepsi'
      },
      {
        metric: 'Comment Rate',
        current: 1.2,
        predicted: 1.4,
        timeframe: '30 days',
        confidence: 79,
        trend: 'up',
        page: 'Apple'
      }
    ];
  };

  const getCompetitorInsights = () => {
    return [
      {
        competitor: 'Coca-Cola vs Pepsi',
        insight: 'Coca-Cola dominates in video content (78% higher engagement)',
        opportunity: 'Pepsi should increase video content by 40%',
        data: 'Coke: 3.4% avg video ER vs Pepsi: 1.9%'
      },
      {
        competitor: 'Nike vs Apple',
        insight: 'Nike excels at community engagement (2.3x more comments)',
        opportunity: 'Apple should implement more interactive content',
        data: 'Nike: 156 avg comments/post vs Apple: 68'
      },
      {
        competitor: 'All Pages Combined',
        insight: 'Best posting time varies by industry',
        opportunity: 'Food & Beverage: 12-2 PM, Tech: 5-7 PM',
        data: 'Industry-specific optimal posting windows identified'
      }
    ];
  };

  const getContentInsights = () => {
    const contentTypePerformance = [
      { type: 'Video', engagement: 4.2, posts: 89, trend: 'up' },
      { type: 'Image', engagement: 2.8, posts: 234, trend: 'stable' },
      { type: 'Text Only', engagement: 1.2, posts: 156, trend: 'down' },
      { type: 'Carousel', engagement: 3.6, posts: 45, trend: 'up' },
      { type: 'Link', engagement: 1.8, posts: 78, trend: 'stable' }
    ];

    const topPerformingContent = [
      {
        type: 'Question Posts',
        performance: '3.2x higher comments',
        example: 'Nike: "What\'s your fitness goal this week?"',
        recommendation: 'Use 1-2 questions per week'
      },
      {
        type: 'Behind-the-Scenes',
        performance: '2.8x higher shares',
        example: 'Coca-Cola: "See how your favorite drink is made"',
        recommendation: 'Show production process monthly'
      },
      {
        type: 'User-Generated Content',
        performance: '4.1x higher engagement',
        example: 'McDonald\'s: Customer meal photos',
        recommendation: 'Feature UGC 2-3 times per week'
      }
    ];

    return { contentTypePerformance, topPerformingContent };
  };

  const getAudienceInsights = () => {
    return [
      {
        metric: 'Peak Activity Hours',
        insight: '2-4 PM weekdays, 6-8 PM weekends',
        recommendation: 'Schedule 60% of posts during peak hours',
        impact: '45% engagement increase'
      },
      {
        metric: 'Demographic Preferences',
        insight: '18-24 prefers video, 25-34 prefers educational content',
        recommendation: 'Tailor content by age group',
        impact: '32% better engagement'
      },
      {
        metric: 'Device Usage',
        insight: '78% mobile, 22% desktop',
        recommendation: 'Optimize for mobile-first viewing',
        impact: 'Better user experience'
      }
    ];
  };

  const getTrendingTopics = () => {
    return [
      { topic: 'Sustainability', mentions: 234, sentiment: 'positive', growth: '+45%' },
      { topic: 'New Product Launch', mentions: 189, sentiment: 'neutral', growth: '+120%' },
      { topic: 'Customer Stories', mentions: 156, sentiment: 'positive', growth: '+23%' },
      { topic: 'Seasonal Campaigns', mentions: 134, sentiment: 'positive', growth: '+67%' },
      { topic: 'Behind the Scenes', mentions: 98, sentiment: 'positive', growth: '+34%' }
    ];
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'trend': return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'optimization': return <Zap className="w-5 h-5 text-purple-500" />;
      default: return <Brain className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI-Powered Insights</h1>
            <p className="text-muted-foreground">Intelligent analytics and predictive insights</p>
          </div>
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
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>
      </div>

      {/* Key Insights Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Insights</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Brain className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Generated this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Opportunities</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Lightbulb className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">High impact actions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Predictions</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">30-day forecasts</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Prediction accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Insights Content */}
      <Tabs defaultValue="ai-insights" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="competitor">Competitor</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-insights" className="space-y-4">
          <div className="space-y-4">
            {getAIInsights().map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={insight.impact === 'high' ? 'destructive' : 'secondary'}>
                            {insight.impact} impact
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {insight.confidence}% confidence
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">{insight.data}</p>
                          <div className="flex gap-1">
                            {insight.pages.map((page, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {page}
                              </span>
                            ))}
                          </div>
                        </div>
                        {insight.actionable && (
                          <Button size="sm" variant="outline">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>30-Day Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getPredictiveAnalytics().map((prediction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {prediction.page.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{prediction.page}</p>
                        <p className="text-sm text-muted-foreground">{prediction.metric}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">{prediction.current.toLocaleString()}</span>
                        {getTrendIcon(prediction.trend)}
                        <span className="text-lg font-bold">{prediction.predicted.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{prediction.timeframe}</span>
                        <span>•</span>
                        <span>{prediction.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitor" className="space-y-4">
          <div className="space-y-4">
            {getCompetitorInsights().map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{insight.competitor}</h3>
                    <Badge variant="outline">Competitive Analysis</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{insight.insight}</p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                    <p className="font-medium text-blue-800">Opportunity:</p>
                    <p className="text-blue-700">{insight.opportunity}</p>
                    <p className="text-xs text-blue-600 mt-1">{insight.data}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Type Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getContentInsights().contentTypePerformance.map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{content.type}</span>
                        {getTrendIcon(content.trend)}
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{content.engagement}% ER</p>
                        <p className="text-xs text-muted-foreground">{content.posts} posts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getContentInsights().topPerformingContent.map((content, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">{content.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{content.performance}</p>
                      <p className="text-xs text-gray-600 italic mb-2">"{content.example}"</p>
                      <p className="text-sm font-medium text-blue-600">{content.recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Behavior Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getAudienceInsights().map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">{insight.metric}</span>
                    </div>
                    <p className="text-muted-foreground mb-2">{insight.insight}</p>
                    <div className="bg-green-50 border-l-4 border-green-500 p-3">
                      <p className="font-medium text-green-800">Recommendation:</p>
                      <p className="text-green-700">{insight.recommendation}</p>
                      <p className="text-xs text-green-600 mt-1">Expected impact: {insight.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getTrendingTopics().map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{topic.topic}</span>
                      <Badge variant={topic.sentiment === 'positive' ? 'default' : 'secondary'}>
                        {topic.sentiment}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{topic.mentions} mentions</p>
                      <p className="text-sm text-green-600">{topic.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <AppLayout>
      <InsightsContent />
    </AppLayout>
  );
}
