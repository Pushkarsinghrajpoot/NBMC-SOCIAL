'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, MessageCircle, Facebook } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

function HomePageContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Bypass authentication and go directly to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-lg text-gray-600">Loading NBMC Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            NBMC Analytics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track, analyze, and compare Facebook Page performance with powerful analytics and insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <Card className="shadow-xl">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-semibold">Welcome to NBMC Analytics</h2>
                <p className="text-lg text-muted-foreground">
                  Redirecting to your dashboard with sample data...
                </p>
                <div className="pt-4">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <BarChart3 className="w-12 h-12 text-blue-600 mb-2" />
              <CardTitle>Post Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track likes, comments, shares, and reactions for every post
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-green-600 mb-2" />
              <CardTitle>Growth Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitor follower growth and engagement trends over time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageCircle className="w-12 h-12 text-purple-600 mb-2" />
              <CardTitle>Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Understand audience sentiment with AI-powered comment analysis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-12 h-12 text-orange-600 mb-2" />
              <CardTitle>Competitor Compare</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Compare multiple pages side-by-side to benchmark performance
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">📊 Comprehensive Analytics</h3>
              <p className="text-muted-foreground">
                Access detailed metrics for any public Facebook Page, including engagement rates, post performance, and audience insights.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">🔍 Competitor Tracking</h3>
              <p className="text-muted-foreground">
                Track competitor pages and compare their performance with yours to stay ahead of the competition.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">💬 Comment Analysis</h3>
              <p className="text-muted-foreground">
                Analyze comment sentiment to understand how your audience feels about your content.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">📈 Historical Data</h3>
              <p className="text-muted-foreground">
                View historical trends and track how pages grow over time with interactive charts.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-muted-foreground">
          <p>&copy; 2024 NBMC Analytics. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SearchParamsHandler() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const error = searchParams.get('error');
      if (error) {
        toast.error('Authentication failed. Please try again.');
      }
    }
  }, [searchParams, mounted]);

  return null;
}

export default function Home() {
  return (
    <>
      <Suspense>
        <SearchParamsHandler />
      </Suspense>
      <HomePageContent />
    </>
  );
}
