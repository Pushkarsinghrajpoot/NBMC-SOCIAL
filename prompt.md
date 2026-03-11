SECTION 1: THE MASTER BUILD PROMPT
Copy and paste this entire prompt into your AI coding assistant (Cursor, v0, Bolt, Claude, etc.) to scaffold the full application:

[ MASTER PROMPT — COPY EVERYTHING BELOW THIS LINE ]
Build a full-stack Social Media Analytics SaaS called "NBMC Analytics" (nbmcanalytics.com).

TECH STACK:
- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts
- Backend: Supabase (PostgreSQL database, Auth, Row-Level Security, Edge Functions)
- Meta Integration: Facebook Graph API (Page Public Content Access, pages_read_engagement)
- Authentication: Supabase Auth with Facebook OAuth

PROJECT GOAL:
Allow users to track any PUBLIC Facebook Page's posts, engagement, comments, and follower growth — including competitor pages they do not own. This justifies Meta's "Page Public Content Access" permission.

===========================
DATABASE SCHEMA (Supabase)
===========================

Create these tables in Supabase SQL editor:

-- Users table (auto-managed by Supabase Auth)

-- Tracked pages
CREATE TABLE tracked_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  page_id TEXT NOT NULL,
  page_name TEXT NOT NULL,
  page_category TEXT,
  fan_count INTEGER DEFAULT 0,
  followers_count INTEGER DEFAULT 0,
  about TEXT,
  profile_picture TEXT,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_synced TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, page_id)
);

-- Page posts cache
CREATE TABLE page_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id TEXT NOT NULL,
  post_id TEXT UNIQUE NOT NULL,
  message TEXT,
  story TEXT,
  created_time TIMESTAMP WITH TIME ZONE,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  reactions_count INTEGER DEFAULT 0,
  post_type TEXT DEFAULT 'post',
  full_picture TEXT,
  permalink_url TEXT,
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post comments cache
CREATE TABLE post_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id TEXT REFERENCES page_posts(post_id) ON DELETE CASCADE,
  comment_id TEXT UNIQUE NOT NULL,
  message TEXT,
  like_count INTEGER DEFAULT 0,
  commenter_name TEXT,
  created_time TIMESTAMP WITH TIME ZONE,
  sentiment TEXT DEFAULT 'neutral',
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page insights history (for growth charts)
CREATE TABLE page_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id TEXT NOT NULL,
  recorded_date DATE NOT NULL,
  fan_count INTEGER,
  followers_count INTEGER,
  UNIQUE(page_id, recorded_date)
);

-- Enable RLS
ALTER TABLE tracked_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own pages" ON tracked_pages FOR ALL USING (auth.uid() = user_id);

===========================
ENVIRONMENT VARIABLES (.env.local)
===========================

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
META_ACCESS_TOKEN=your_long_lived_page_access_token

===========================
FOLDER STRUCTURE
===========================

/app
  /dashboard              → Main analytics dashboard
  /pages/[pageId]         → Individual page deep-dive
  /compare                → Competitor comparison view
  /auth/callback          → OAuth callback
/components
  /charts                 → EngagementChart, FollowerGrowthChart, SentimentPie
  /pages                  → PageCard, PageSearch, AddPageModal
  /posts                  → PostFeed, PostCard, CommentPanel
  /compare                → CompareTable, CompareChart
/lib
  /meta.ts                → All Meta Graph API functions
  /supabase.ts            → Supabase client
  /sentiment.ts           → Simple sentiment classifier
/api
  /meta/pages/route.ts    → Search public pages
  /meta/posts/route.ts    → Fetch page posts
  /meta/comments/route.ts → Fetch post comments
  /sync/route.ts          → Sync all tracked pages

===========================
META API IMPLEMENTATION (/lib/meta.ts)
===========================

const BASE = 'https://graph.facebook.com/v19.0';
const TOKEN = process.env.META_ACCESS_TOKEN;

// Search for any public page by name
export async function searchPublicPages(query: string) {
  const res = await fetch(
    `${BASE}/pages/search?q=${encodeURIComponent(query)}&fields=id,name,fan_count,category,picture&access_token=${TOKEN}`
  );
  return res.json();
}

// Get full page details
export async function getPageDetails(pageId: string) {
  const fields = 'id,name,about,fan_count,followers_count,category,picture';
  const res = await fetch(`${BASE}/${pageId}?fields=${fields}&access_token=${TOKEN}`);
  return res.json();
}

// Get recent posts from any public page
export async function getPagePosts(pageId: string, limit = 20) {
  const fields = 'id,message,story,created_time,full_picture,permalink_url,likes.summary(true),comments.summary(true),shares,reactions.summary(true)';
  const res = await fetch(
    `${BASE}/${pageId}/posts?fields=${fields}&limit=${limit}&access_token=${TOKEN}`
  );
  return res.json();
}

// Get comments on a specific post
export async function getPostComments(postId: string) {
  const fields = 'id,message,like_count,from,created_time';
  const res = await fetch(
    `${BASE}/${postId}/comments?fields=${fields}&limit=50&access_token=${TOKEN}`
  );
  return res.json();
}

===========================
KEY PAGES TO BUILD
===========================

1. DASHBOARD PAGE (/app/dashboard/page.tsx)
   - Show all tracked pages as cards (name, logo, followers, last post date)
   - "Add Page" button that opens search modal
   - Summary stats: Total pages tracked, Total posts analyzed, Avg engagement
   - Quick engagement chart for the last 30 days across all pages

2. ADD PAGE MODAL (component)
   - Input field: "Search any Facebook Page..."
   - On type: call /api/meta/pages?q={query}
   - Show results with page name, category, follower count
   - "Track This Page" button → saves to Supabase tracked_pages table
   - Show confirmation with page thumbnail

3. PAGE DETAIL VIEW (/app/pages/[pageId]/page.tsx)
   - Page header: logo, name, category, follower count
   - Tabs: Overview | Posts | Comments | Insights
   - Overview tab:
       * Follower growth line chart (from page_insights table)
       * Engagement rate bar chart per post (last 20 posts)
       * Top performing post card
   - Posts tab:
       * Feed of recent posts with engagement stats inline
       * Each post shows: text preview, image, likes, comments, shares
       * Click post → opens CommentPanel sidebar
   - Comments tab:
       * List of recent comments across all posts
       * Sentiment badge (Positive/Neutral/Negative) per comment
       * Sentiment pie chart at top
   - Insights tab:
       * Follower growth over time (line chart)
       * Best day/time to post (based on engagement data)
       * Engagement rate trend

4. COMPETITOR COMPARE PAGE (/app/compare/page.tsx)
   - Left panel: Select 2-3 pages from tracked list
   - Comparison table:
       | Metric          | Page A    | Page B    | Page C    |
       |-----------------|-----------|-----------|-----------|
       | Followers       | 120,000   | 85,000    | 200,000   |
       | Posts this week | 5         | 3         | 7         |
       | Avg Likes/Post  | 1,200     | 890       | 2,100     |
       | Avg Comments    | 45        | 23        | 98        |
       | Engagement Rate | 1.0%      | 1.05%     | 1.05%     |
   - Follower growth comparison: Multi-line chart (one line per page, different colors)
   - "Best Performer" highlight card

5. POST COMMENT PANEL (side drawer component)
   - Triggered when user clicks a post
   - Shows: Post content at top, then list of comments below
   - Each comment: commenter name, message, likes, time, sentiment badge
   - Sentiment is computed locally using simple keyword matching

===========================
SENTIMENT CLASSIFIER (/lib/sentiment.ts)
===========================

const POSITIVE = ['great','love','amazing','excellent','awesome','good','best','perfect','wonderful','fantastic','happy','congratulations','well done'];
const NEGATIVE = ['bad','worst','terrible','awful','hate','poor','horrible','disappointing','wrong','failed','useless','scam','fraud','sad'];

export function classifySentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const lower = text.toLowerCase();
  const posScore = POSITIVE.filter(w => lower.includes(w)).length;
  const negScore = NEGATIVE.filter(w => lower.includes(w)).length;
  if (posScore > negScore) return 'positive';
  if (negScore > posScore) return 'negative';
  return 'neutral';
}

===========================
SYNC API ROUTE (/api/sync/route.ts)
===========================
- Called on page load or manually by user
- Fetches all tracked pages from Supabase for current user
- For each page: calls Meta API to get latest posts, saves to page_posts table
- Records today's follower count in page_insights table
- Returns updated data

===========================
SUPABASE FACEBOOK OAUTH SETUP
===========================
1. In Supabase Dashboard → Authentication → Providers → Enable Facebook
2. Add Meta App ID and Secret
3. Add callback URL to Meta App: https://your-project.supabase.co/auth/v1/callback
4. In Next.js, trigger login with:
   supabase.auth.signInWithOAuth({ provider: 'facebook', options: {
     scopes: 'pages_read_engagement,pages_show_list'
   }})

===========================
UI/UX REQUIREMENTS
===========================
- Color scheme: Deep blue (#1E5AA8) primary, white backgrounds, gray-50 cards
- Use shadcn/ui components: Card, Badge, Button, Dialog, Tabs, Table, Select
- Charts: Use Recharts (LineChart for growth, BarChart for engagement, PieChart for sentiment)
- Loading states: Skeleton loaders on all data-fetching components
- Empty states: "No pages tracked yet" with Add Page CTA
- Mobile responsive: Sidebar collapses on mobile, cards stack vertically
- Toast notifications: On page add success/failure, sync complete

===========================
META SCREENCAST DEMO FLOW
===========================
Build a /demo route that shows:
1. Search for "Coca Cola" in Add Page modal → show results appearing
2. Click Track → page card appears in dashboard
3. Click into page → show posts feed with real engagement data
4. Click a post → comment panel slides in with comments + sentiment badges
5. Open Compare tab → add 2 pages → show comparison table and chart
This /demo route is what you show in the Meta review screencast.
 
SECTION 2: STEP-BY-STEP SETUP GUIDE
Step 1: Create Supabase Project
•	Go to supabase.com → New Project → name it 'nbmc-analytics'
•	Copy your Project URL and anon key into .env.local
•	Open SQL Editor → paste the full database schema from the prompt above
•	Run the SQL to create all tables and RLS policies
Step 2: Set Up Meta App
•	Go to developers.facebook.com → Your App (NBMC)
•	App Settings → Basic → Copy App ID and App Secret to .env.local
•	Add Facebook Login product → set Valid OAuth Redirect URIs
•	In Graph API Explorer: generate a long-lived User Access Token with pages_read_engagement permission
•	Save this token as META_ACCESS_TOKEN in your .env.local
Step 3: Initialize Next.js Project
npx create-next-app@latest nbmc-analytics --typescript --tailwind --app
cd nbmc-analytics
npx shadcn-ui@latest init
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs recharts lucide-react
Step 4: Enable Supabase Facebook Auth
•	Supabase Dashboard → Authentication → Providers → Facebook → Enable
•	Enter your Meta App ID and App Secret
•	Copy the Supabase callback URL and add it to your Meta App's Facebook Login settings under Valid OAuth Redirect URIs
Step 5: Deploy & Make Live
•	Deploy to Vercel: vercel deploy
•	Add all environment variables in Vercel dashboard
•	In Meta App Dashboard → switch App Mode from Development to LIVE
•	Verify your app loads at nbmcanalytics.com with real Facebook data
 
