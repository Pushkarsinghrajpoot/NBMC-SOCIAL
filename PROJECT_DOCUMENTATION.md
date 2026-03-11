# NBMC Analytics - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Features](#features)
6. [Setup Instructions](#setup-instructions)
7. [API Documentation](#api-documentation)
8. [Database Schema](#database-schema)
9. [Component Documentation](#component-documentation)
10. [Deployment Guide](#deployment-guide)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

**NBMC Analytics** is a full-stack Social Media Analytics SaaS platform that enables users to:
- Track any public Facebook Page (including competitors)
- Analyze post engagement, comments, and reactions
- Monitor follower growth over time
- Perform sentiment analysis on comments
- Compare multiple pages side-by-side
- Generate insights and identify best-performing content

**Key Use Case**: This tool is designed for social media managers, marketers, and businesses who need to track and analyze Facebook Page performance, including competitor analysis.

---

## Architecture

### System Architecture
```
┌─────────────┐
│   Client    │ (Next.js 14 App Router)
│  (Browser)  │
└──────┬──────┘
       │
       ├─── Authentication ──→ Supabase Auth (Facebook OAuth)
       │
       ├─── Data Storage ───→ Supabase PostgreSQL
       │
       └─── External API ───→ Meta Graph API v19.0
```

### Data Flow
1. User authenticates via Facebook OAuth through Supabase
2. User searches for public Facebook pages via Meta Graph API
3. Selected pages are saved to Supabase database
4. Background sync fetches latest posts and engagement data
5. Data is cached in Supabase for fast retrieval
6. Client displays analytics through interactive charts and tables

---

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Recharts**: Data visualization library
- **Lucide React**: Icon library
- **date-fns**: Date formatting utilities

### Backend
- **Supabase**: Backend-as-a-Service
  - PostgreSQL database
  - Row-Level Security (RLS)
  - Authentication with OAuth
  - Real-time subscriptions

### External APIs
- **Meta Graph API v19.0**: Facebook data access
  - Page Public Content Access
  - pages_read_engagement permission
  - pages_show_list permission

---

## Project Structure

```
nbmc-social/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── meta/
│   │   │   ├── pages/route.ts    # Search Facebook pages
│   │   │   ├── posts/route.ts    # Get page posts
│   │   │   └── comments/route.ts # Get post comments
│   │   └── sync/route.ts         # Sync all tracked pages
│   ├── auth/
│   │   └── callback/page.tsx     # OAuth callback handler
│   ├── dashboard/page.tsx        # Main dashboard
│   ├── pages/[pageId]/page.tsx   # Page detail view
│   ├── compare/page.tsx          # Competitor comparison
│   ├── demo/page.tsx             # Interactive demo
│   ├── layout.tsx                # Root layout with navigation
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── charts/                   # Chart components
│   │   ├── EngagementChart.tsx
│   │   ├── FollowerGrowthChart.tsx
│   │   ├── SentimentPie.tsx
│   │   └── CompareChart.tsx
│   ├── pages/                    # Page-related components
│   │   ├── PageCard.tsx
│   │   └── AddPageModal.tsx
│   ├── posts/                    # Post components
│   │   ├── PostCard.tsx
│   │   ├── PostFeed.tsx
│   │   └── CommentPanel.tsx
│   ├── compare/
│   │   └── CompareTable.tsx
│   ├── ui/                       # shadcn/ui components
│   └── Navigation.tsx            # Main navigation
├── lib/                          # Utility libraries
│   ├── supabase.ts               # Supabase client & types
│   ├── meta.ts                   # Meta Graph API functions
│   ├── sentiment.ts              # Sentiment classifier
│   └── utils.ts                  # Helper utilities
├── public/                       # Static assets
├── .env.local.example            # Environment variables template
├── supabase-setup.sql            # Database schema
├── SETUP_GUIDE.md                # Setup instructions
├── PROJECT_DOCUMENTATION.md      # This file
└── package.json                  # Dependencies
```

---

## Features

### 1. Authentication
- **Facebook OAuth** integration via Supabase
- Automatic user creation on first login
- Session management with JWT tokens
- Secure logout functionality

### 2. Dashboard (`/dashboard`)
**Features:**
- Grid view of all tracked Facebook pages
- Summary statistics:
  - Total pages tracked
  - Total posts analyzed
  - Average engagement rate
- Engagement chart showing recent post performance
- "Add Page" button to track new pages
- "Sync All" button to refresh data from Facebook
- Empty state with call-to-action

**Components Used:**
- `PageCard` for each tracked page
- `AddPageModal` for searching and adding pages
- `EngagementChart` for visual engagement data
- Summary stat cards with icons

### 3. Page Detail View (`/pages/[pageId]`)
**Four Tab Layout:**

**Overview Tab:**
- Follower growth line chart (historical data)
- Post engagement bar chart (last 20 posts)
- Top performing post highlight card
- Page header with logo, name, category, follower count

**Posts Tab:**
- Scrollable feed of recent posts
- Each post displays:
  - Post message/content
  - Image (if available)
  - Timestamp (relative)
  - Likes, comments, shares count
  - Engagement rate badge
- Click to open comment panel

**Comments Tab:**
- Sentiment pie chart (positive/neutral/negative distribution)
- List of recent comments across all posts
- Each comment shows:
  - Commenter name
  - Comment text
  - Like count
  - Timestamp
  - Sentiment badge (color-coded)

**Insights Tab:**
- Follower growth over time chart
- Average engagement per post
- Total posts count
- Engagement rate percentage
- Best day/time to post insights

### 4. Competitor Comparison (`/compare`)
**Features:**
- Select up to 3 pages to compare
- Comparison metrics table:
  - Followers
  - Posts this week
  - Avg likes per post
  - Avg comments per post
  - Engagement rate
  - "Best" badges for top performers
- Multi-line follower growth chart
- Best performer highlight card with trophy icon
- Empty state for users with <2 tracked pages

### 5. Demo Page (`/demo`)
**Interactive Demonstration:**
- Step-by-step walkthrough of all features
- Search for Facebook pages (mocked)
- Add page to dashboard (simulated)
- View post with engagement data
- Open comment panel with sentiment
- Compare multiple pages
- No authentication required
- Perfect for Meta app review screencast

### 6. Page Search & Tracking
**AddPageModal Component:**
- Search input for Facebook page names
- Real-time search via Meta Graph API
- Display search results with:
  - Page thumbnail
  - Page name
  - Category badge
  - Follower count
- "Track This Page" button
- Duplicate prevention
- Success/error toast notifications

### 7. Comment Sentiment Analysis
**Automated Classification:**
- Keyword-based sentiment detection
- Three categories: Positive, Neutral, Negative
- Color-coded badges (green, gray, red)
- Sentiment distribution pie chart
- Applied to all comments automatically

### 8. Data Synchronization
**Background Sync Process:**
- Fetches latest page details from Meta API
- Updates follower counts
- Retrieves last 20 posts per page
- Records daily insights for growth tracking
- Caches data in Supabase for performance
- Manual trigger via "Sync All" button
- Per-page sync status reporting

---

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- Meta (Facebook) Developer account

### Step 1: Clone and Install
```bash
cd nbmc-social
npm install
```

### Step 2: Supabase Configuration
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run `supabase-setup.sql`
3. Navigate to Settings → API to get credentials
4. Enable Facebook OAuth in Authentication → Providers

### Step 3: Meta App Configuration
1. Create app at [developers.facebook.com](https://developers.facebook.com)
2. Add Facebook Login product
3. Configure OAuth redirect URIs
4. Generate long-lived access token with required permissions
5. Copy App ID and App Secret

### Step 4: Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
META_ACCESS_TOKEN=your_long_lived_token
```

### Step 5: Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

For detailed setup instructions, see `SETUP_GUIDE.md`

---

## API Documentation

### Meta Graph API Integration

#### `/api/meta/pages` (GET)
Search for public Facebook pages.

**Query Parameters:**
- `q` (required): Search query string

**Response:**
```json
{
  "data": [
    {
      "id": "12345",
      "name": "Coca Cola",
      "category": "Food & Beverage",
      "fan_count": 108000000,
      "picture": { "data": { "url": "..." } }
    }
  ]
}
```

#### `/api/meta/posts` (GET)
Retrieve posts from a Facebook page.

**Query Parameters:**
- `pageId` (required): Facebook page ID
- `limit` (optional): Number of posts (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": "post_id",
      "message": "Post content...",
      "created_time": "2024-01-15T10:00:00+0000",
      "likes": { "summary": { "total_count": 1000 } },
      "comments": { "summary": { "total_count": 50 } },
      "shares": { "count": 20 }
    }
  ]
}
```

#### `/api/meta/comments` (GET)
Get comments for a specific post with sentiment analysis.

**Query Parameters:**
- `postId` (required): Facebook post ID

**Response:**
```json
{
  "data": [
    {
      "id": "comment_id",
      "message": "Great post!",
      "from": { "name": "John Doe" },
      "created_time": "2024-01-15T11:00:00+0000",
      "like_count": 5,
      "sentiment": "positive"
    }
  ]
}
```

#### `/api/sync` (POST)
Sync all tracked pages for a user.

**Request Body:**
```json
{
  "userId": "user_uuid"
}
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "pageId": "12345",
      "pageName": "Coca Cola",
      "status": "synced",
      "postsCount": 20
    }
  ]
}
```

---

## Database Schema

### Table: `tracked_pages`
Stores Facebook pages tracked by users.

**Columns:**
- `id` (UUID, PK): Unique identifier
- `user_id` (UUID, FK): References auth.users
- `page_id` (TEXT): Facebook page ID
- `page_name` (TEXT): Page name
- `page_category` (TEXT): Page category
- `fan_count` (INTEGER): Total fans/likes
- `followers_count` (INTEGER): Total followers
- `about` (TEXT): Page description
- `profile_picture` (TEXT): Profile picture URL
- `added_at` (TIMESTAMP): When page was tracked
- `last_synced` (TIMESTAMP): Last sync timestamp

**Constraints:**
- UNIQUE(user_id, page_id): Prevent duplicate tracking
- RLS enabled: Users can only see their own pages

### Table: `page_posts`
Cached posts from Facebook pages.

**Columns:**
- `id` (UUID, PK): Unique identifier
- `page_id` (TEXT): Facebook page ID
- `post_id` (TEXT, UNIQUE): Facebook post ID
- `message` (TEXT): Post content
- `story` (TEXT): Post story
- `created_time` (TIMESTAMP): When post was created
- `likes_count` (INTEGER): Number of likes
- `comments_count` (INTEGER): Number of comments
- `shares_count` (INTEGER): Number of shares
- `reactions_count` (INTEGER): Total reactions
- `post_type` (TEXT): Type of post
- `full_picture` (TEXT): Image URL
- `permalink_url` (TEXT): Post URL
- `fetched_at` (TIMESTAMP): When data was fetched

**Indexes:**
- `idx_page_posts_page_id` on page_id
- `idx_page_posts_created_time` on created_time

### Table: `post_comments`
Cached comments with sentiment analysis.

**Columns:**
- `id` (UUID, PK): Unique identifier
- `post_id` (TEXT, FK): References page_posts.post_id
- `comment_id` (TEXT, UNIQUE): Facebook comment ID
- `message` (TEXT): Comment content
- `like_count` (INTEGER): Number of likes
- `commenter_name` (TEXT): Name of commenter
- `created_time` (TIMESTAMP): When comment was posted
- `sentiment` (TEXT): positive/neutral/negative
- `fetched_at` (TIMESTAMP): When data was fetched

**Indexes:**
- `idx_post_comments_post_id` on post_id

### Table: `page_insights`
Historical data for growth tracking.

**Columns:**
- `id` (UUID, PK): Unique identifier
- `page_id` (TEXT): Facebook page ID
- `recorded_date` (DATE): Date of record
- `fan_count` (INTEGER): Fans on this date
- `followers_count` (INTEGER): Followers on this date

**Constraints:**
- UNIQUE(page_id, recorded_date): One record per page per day

**Indexes:**
- `idx_page_insights_page_id` on page_id
- `idx_page_insights_date` on recorded_date

---

## Component Documentation

### Chart Components

#### `EngagementChart`
Bar chart displaying post engagement metrics.

**Props:**
```typescript
interface EngagementChartProps {
  data: Array<{
    name: string;
    likes: number;
    comments: number;
    shares: number;
  }>;
}
```

**Usage:**
```tsx
<EngagementChart data={engagementData} />
```

#### `FollowerGrowthChart`
Line chart showing follower growth over time.

**Props:**
```typescript
interface FollowerGrowthChartProps {
  data: Array<{
    date: string;
    followers: number;
  }>;
  title?: string;
}
```

#### `SentimentPie`
Pie chart for comment sentiment distribution.

**Props:**
```typescript
interface SentimentPieProps {
  data: {
    positive: number;
    neutral: number;
    negative: number;
  };
}
```

#### `CompareChart`
Multi-line chart for comparing multiple pages.

**Props:**
```typescript
interface CompareChartProps {
  data: Array<{
    date: string;
    [pageId: string]: string | number;
  }>;
  pages: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}
```

### Page Components

#### `PageCard`
Display card for a tracked Facebook page.

**Props:**
```typescript
interface PageCardProps {
  page: {
    id: string;
    page_id: string;
    page_name: string;
    page_category: string | null;
    fan_count: number;
    followers_count: number;
    profile_picture: string | null;
    last_synced: string | null;
  };
}
```

**Features:**
- Clickable link to page detail
- Displays page thumbnail
- Shows follower count
- Shows last sync time

#### `AddPageModal`
Modal dialog for searching and tracking new pages.

**Props:**
```typescript
interface AddPageModalProps {
  userId: string;
  onPageAdded?: () => void;
}
```

**Features:**
- Real-time search
- Result display with thumbnails
- Duplicate prevention
- Success/error notifications

### Post Components

#### `PostCard`
Individual post display with engagement metrics.

**Props:**
```typescript
interface PostCardProps {
  post: {
    id: string;
    post_id: string;
    message: string | null;
    created_time: string | null;
    likes_count: number;
    comments_count: number;
    shares_count: number;
    full_picture: string | null;
  };
  onClick?: () => void;
}
```

#### `PostFeed`
List of posts with loading and empty states.

**Props:**
```typescript
interface PostFeedProps {
  posts: Array<Post>;
  loading?: boolean;
  onPostClick?: (postId: string) => void;
}
```

#### `CommentPanel`
Side panel displaying post comments with sentiment.

**Props:**
```typescript
interface CommentPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string | null;
}
```

**Features:**
- Slides in from right
- Fetches comments on open
- Displays sentiment badges
- Shows commenter info and timestamps

### Compare Components

#### `CompareTable`
Comparison metrics table with best performer highlighting.

**Props:**
```typescript
interface CompareTableProps {
  pages: Array<{
    pageId: string;
    pageName: string;
    followers: number;
    postsThisWeek: number;
    avgLikes: number;
    avgComments: number;
    engagementRate: number;
  }>;
}
```

---

## Deployment Guide

### Vercel Deployment (Recommended)

#### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel deploy
```

#### Option 2: GitHub Integration
1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy automatically on push

### Environment Variables in Production
Add all variables from `.env.local` to Vercel:
1. Go to Project Settings → Environment Variables
2. Add each variable (NEXT_PUBLIC_*, META_*, SUPABASE_*)
3. Redeploy to apply changes

### Post-Deployment Steps
1. Update Meta App OAuth redirect URIs with production URL
2. Update Supabase allowed URLs in Authentication settings
3. Test authentication flow in production
4. Switch Meta App to Live mode
5. Monitor logs for errors

### Custom Domain
1. Add domain in Vercel project settings
2. Configure DNS records as instructed
3. Wait for SSL certificate provisioning
4. Update all OAuth redirect URIs

---

## Troubleshooting

### Authentication Issues

**Problem:** Facebook login redirects to error page
**Solution:**
- Verify OAuth redirect URIs match exactly (no trailing slashes)
- Check Supabase callback URL is added to Meta app
- Ensure Meta App ID and Secret are correct in Supabase settings
- Clear browser cookies and try again

**Problem:** "Invalid scopes" error
**Solution:**
- Verify app has required permissions enabled
- Check Meta App is approved for requested scopes
- Ensure scopes are comma-separated in code

### Data Fetching Issues

**Problem:** Cannot fetch page data from Meta API
**Solution:**
- Verify Meta Access Token is valid (not expired)
- Check token has `pages_read_engagement` permission
- Ensure Meta App is in Live mode for production
- Test token in Graph API Explorer

**Problem:** "OAuthException" from Meta API
**Solution:**
- Regenerate access token
- Extend token to long-lived (60 days)
- Verify app permissions haven't been revoked

### Database Issues

**Problem:** RLS policy errors
**Solution:**
- Verify user is authenticated before queries
- Check `user_id` matches `auth.uid()`
- Ensure RLS policies are enabled on table
- Test queries in Supabase SQL Editor

**Problem:** Data not syncing
**Solution:**
- Check API route logs for errors
- Verify Supabase service role key is correct
- Ensure database tables exist
- Check network connectivity to Meta API

### UI/Display Issues

**Problem:** Charts not rendering
**Solution:**
- Verify Recharts is installed: `npm list recharts`
- Check data format matches component props
- Look for console errors in browser
- Ensure data array is not empty

**Problem:** Images not loading
**Solution:**
- Check image URLs are valid HTTPS
- Add domains to `next.config.ts` remotePatterns
- Verify Facebook CDN is accessible
- Check for CORS errors in console

### Performance Issues

**Problem:** Slow page loads
**Solution:**
- Implement pagination for large datasets
- Add loading skeletons
- Cache frequently accessed data
- Optimize database queries with indexes

**Problem:** Sync takes too long
**Solution:**
- Reduce number of posts fetched per page
- Implement background jobs for sync
- Add progress indicators
- Sync pages individually instead of all at once

---

## Best Practices

### Security
- Never commit `.env.local` to version control
- Use environment variables for all secrets
- Keep service role key secure (server-side only)
- Enable RLS on all user-specific tables
- Validate and sanitize user inputs
- Regularly rotate API tokens

### Performance
- Implement data caching strategies
- Use database indexes for frequently queried columns
- Lazy load images and components
- Optimize bundle size with dynamic imports
- Monitor API rate limits

### Code Quality
- Use TypeScript for type safety
- Follow consistent naming conventions
- Write reusable components
- Add error boundaries for graceful failures
- Document complex logic with comments

### User Experience
- Provide loading states for all async operations
- Show meaningful error messages
- Implement optimistic UI updates
- Add empty states with clear CTAs
- Ensure mobile responsiveness

---

## Future Enhancements

### Potential Features
1. **Scheduled Syncing**: Automatic daily/hourly syncs
2. **Email Reports**: Weekly analytics summaries
3. **Advanced Filters**: Filter posts by date, engagement, type
4. **Export Data**: CSV/PDF export of analytics
5. **Custom Dashboards**: User-customizable layouts
6. **Team Collaboration**: Multi-user accounts
7. **Hashtag Tracking**: Monitor specific hashtags
8. **Instagram Integration**: Expand to Instagram analytics
9. **AI Insights**: ML-powered recommendations
10. **Webhook Notifications**: Real-time alerts

### Scalability Considerations
- Implement Redis for caching
- Use Supabase Edge Functions for heavy processing
- Add rate limiting on API routes
- Implement job queues for background tasks
- Consider PostgreSQL read replicas

---

## Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Meta Graph API](https://developers.facebook.com/docs/graph-api)
- [shadcn/ui](https://ui.shadcn.com)
- [Recharts](https://recharts.org)

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [Supabase Discord](https://discord.supabase.com)
- [Meta Developers Community](https://developers.facebook.com/community)

---

## License

This project is provided as-is for educational and commercial use.

## Version

**Current Version:** 1.0.0  
**Last Updated:** March 2024  
**Built by:** NBMC Team

---

**End of Documentation**
