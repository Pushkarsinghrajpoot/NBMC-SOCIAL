# NBMC Analytics - Complete Setup Guide

## Overview
NBMC Analytics is a full-stack Social Media Analytics SaaS platform that allows users to track, analyze, and compare any public Facebook Page's performance, engagement, and growth metrics.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts
- **Backend**: Supabase (PostgreSQL, Auth, Row-Level Security)
- **Meta Integration**: Facebook Graph API v19.0
- **Authentication**: Supabase Auth with Facebook OAuth

---

## Step 1: Supabase Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name it `nbmc-analytics` (or your preferred name)
4. Choose a database password and region
5. Wait for project creation to complete

### 1.2 Run Database Schema
1. Navigate to SQL Editor in your Supabase dashboard
2. Copy the contents of `supabase-setup.sql`
3. Paste and execute the SQL
4. Verify all tables are created successfully

### 1.3 Get Supabase Credentials
1. Go to Project Settings → API
2. Copy your **Project URL**
3. Copy your **anon/public key**
4. Copy your **service_role key** (keep this secret!)

---

## Step 2: Meta App Configuration

### 2.1 Create Facebook App
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Click "My Apps" → "Create App"
3. Choose "Business" app type
4. Name it "NBMC Analytics" (or your preferred name)
5. Complete the app creation

### 2.2 Add Facebook Login Product
1. In your app dashboard, click "Add Product"
2. Find "Facebook Login" and click "Set Up"
3. Choose "Web" as platform
4. Enter your site URL (for development: `http://localhost:3000`)

### 2.3 Configure OAuth Redirect URIs
1. Go to Facebook Login → Settings
2. Add Valid OAuth Redirect URIs:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://yourdomain.com/auth/callback`
   - **Important**: Also add your Supabase callback URL from the next section

### 2.4 Get App Credentials
1. Go to Settings → Basic
2. Copy your **App ID**
3. Copy your **App Secret** (click "Show")

### 2.5 Generate Access Token
1. Go to Graph API Explorer
2. Select your app
3. Click "Generate Access Token"
4. Request these permissions:
   - `pages_read_engagement`
   - `pages_show_list`
5. Generate token and extend it to a long-lived token (60 days)
6. Save this as your `META_ACCESS_TOKEN`

---

## Step 3: Enable Supabase Facebook Auth

### 3.1 Configure in Supabase
1. Go to Authentication → Providers in Supabase
2. Enable Facebook provider
3. Enter your Meta **App ID**
4. Enter your Meta **App Secret**
5. Copy the **Callback URL** shown (format: `https://[project-id].supabase.co/auth/v1/callback`)

### 3.2 Update Meta App
1. Go back to your Meta App → Facebook Login → Settings
2. Add the Supabase callback URL to Valid OAuth Redirect URIs
3. Save changes

---

## Step 4: Environment Configuration

### 4.1 Create .env.local
Create a `.env.local` file in the project root with the following:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Meta App Configuration
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
META_ACCESS_TOKEN=your_long_lived_access_token
```

### 4.2 Verify Environment Variables
- Never commit `.env.local` to version control
- Double-check all values are correct
- Ensure no extra spaces or quotes

---

## Step 5: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 16
- React 19
- Supabase client libraries
- shadcn/ui components
- Recharts for data visualization
- Lucide React for icons
- date-fns for date formatting

---

## Step 6: Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

---

## Step 7: Testing the Application

### 7.1 Test Authentication
1. Navigate to `http://localhost:3000`
2. Click "Continue with Facebook"
3. Authorize the application
4. You should be redirected to `/dashboard`

### 7.2 Test Page Tracking
1. Click "Add Page" button
2. Search for a public Facebook page (e.g., "Coca Cola")
3. Click "Track This Page"
4. Page should appear in your dashboard

### 7.3 Test Data Sync
1. Click "Sync All" button in dashboard
2. Wait for sync to complete
3. Navigate to a tracked page
4. Verify posts, engagement data, and charts are displayed

### 7.4 Test Comparison
1. Track at least 2 pages
2. Navigate to `/compare`
3. Select pages to compare
4. Verify comparison table and charts display correctly

---

## Step 8: Production Deployment

### 8.1 Deploy to Vercel
```bash
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

### 8.2 Configure Environment Variables
1. Go to Vercel project settings
2. Add all environment variables from `.env.local`
3. Deploy again to apply changes

### 8.3 Update Callback URLs
1. Update Meta App OAuth redirect URIs with production URL
2. Update Supabase allowed redirect URLs in Authentication settings

### 8.4 Switch Meta App to Live Mode
1. Go to Meta App Dashboard
2. Complete App Review if required (for advanced permissions)
3. Switch from Development to Live mode

---

## Application Features

### Dashboard (`/dashboard`)
- View all tracked Facebook pages
- Summary statistics (total pages, posts analyzed, avg engagement)
- Quick engagement chart across all pages
- Add new pages to track
- Sync all tracked pages

### Page Detail View (`/pages/[pageId]`)
- **Overview Tab**: Follower growth, engagement charts, top performing posts
- **Posts Tab**: Feed of recent posts with engagement metrics
- **Comments Tab**: Comment list with sentiment analysis and pie chart
- **Insights Tab**: Detailed metrics and engagement rate trends

### Competitor Comparison (`/compare`)
- Side-by-side comparison of up to 3 pages
- Metrics: followers, posts per week, avg likes, avg comments, engagement rate
- Follower growth comparison chart
- Best performer highlighting

### Demo (`/demo`)
- Interactive walkthrough of all features
- Perfect for Meta app review screencast
- No authentication required

---

## API Routes

### `/api/meta/pages` (GET)
Search for public Facebook pages
- Query param: `q` (search query)
- Returns: Array of page results

### `/api/meta/posts` (GET)
Get posts from a Facebook page
- Query params: `pageId`, `limit` (optional)
- Returns: Array of posts with engagement data

### `/api/meta/comments` (GET)
Get comments for a specific post
- Query param: `postId`
- Returns: Array of comments with sentiment analysis

### `/api/sync` (POST)
Sync all tracked pages for a user
- Body: `{ userId: string }`
- Returns: Sync results for each page

---

## Database Schema

### `tracked_pages`
Stores user's tracked Facebook pages
- RLS enabled (users can only see their own pages)

### `page_posts`
Cached posts from tracked pages
- Indexed by `page_id` and `created_time`

### `post_comments`
Cached comments with sentiment analysis
- Linked to `page_posts` via `post_id`

### `page_insights`
Historical follower/fan count data
- One record per page per day
- Used for growth charts

---

## Key Components

### Charts (`/components/charts/`)
- `EngagementChart.tsx` - Bar chart for post engagement
- `FollowerGrowthChart.tsx` - Line chart for follower growth
- `SentimentPie.tsx` - Pie chart for comment sentiment
- `CompareChart.tsx` - Multi-line chart for page comparison

### Pages (`/components/pages/`)
- `PageCard.tsx` - Display card for tracked pages
- `AddPageModal.tsx` - Modal for searching and adding pages

### Posts (`/components/posts/`)
- `PostCard.tsx` - Individual post display
- `PostFeed.tsx` - List of posts
- `CommentPanel.tsx` - Side panel for post comments

### Compare (`/components/compare/`)
- `CompareTable.tsx` - Comparison metrics table

---

## Troubleshooting

### Issue: Facebook Login Fails
- Verify OAuth redirect URIs match exactly
- Check that Supabase callback URL is added to Meta app
- Ensure Meta App ID and Secret are correct in Supabase

### Issue: Cannot Fetch Page Data
- Verify Meta Access Token is valid and not expired
- Check that token has required permissions
- Ensure Meta App is in Live mode (for production)

### Issue: RLS Errors
- Verify user is authenticated
- Check RLS policies are enabled on `tracked_pages`
- Ensure `user_id` matches authenticated user

### Issue: Charts Not Displaying
- Verify data exists in database
- Check browser console for errors
- Ensure Recharts is properly installed

---

## Meta App Review (For Production)

### Required for Advanced Permissions
If you need advanced permissions beyond basic public content access:

1. **Prepare App for Review**
   - Complete all app information
   - Add privacy policy URL
   - Add terms of service URL
   - Add app icon (1024x1024)

2. **Create Screencast**
   - Use `/demo` route for demonstration
   - Show all features working
   - Explain use case clearly
   - Keep under 5 minutes

3. **Submit for Review**
   - Request `pages_read_engagement` permission
   - Explain business use case
   - Attach screencast
   - Submit and wait for approval

---

## Support & Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Meta Graph API**: https://developers.facebook.com/docs/graph-api
- **shadcn/ui Components**: https://ui.shadcn.com

---

## Security Best Practices

1. Never commit `.env.local` to version control
2. Use environment variables for all sensitive data
3. Keep service role key secret (never expose to client)
4. Regularly rotate Meta access tokens
5. Enable RLS on all user-specific tables
6. Validate and sanitize all user inputs
7. Use HTTPS in production

---

## License

This project is provided as-is for educational and commercial use.

---

## Credits

Built with Next.js, Supabase, and Meta Graph API.
UI components by shadcn/ui.
