# NBMC Analytics

A full-stack Social Media Analytics SaaS platform that enables users to track, analyze, and compare any public Facebook Page's performance, engagement, and growth metrics.

## 🚀 Features

- **📊 Comprehensive Analytics**: Track likes, comments, shares, and reactions for every post
- **🔍 Competitor Tracking**: Monitor competitor pages and compare performance side-by-side
- **💬 Sentiment Analysis**: AI-powered comment sentiment analysis (positive/neutral/negative)
- **📈 Historical Data**: Track follower growth and engagement trends over time
- **🎯 Real-time Sync**: Automatic data synchronization with Facebook Graph API
- **📱 Responsive Design**: Mobile-friendly interface with modern UI components

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts
- **Backend**: Supabase (PostgreSQL, Auth, Row-Level Security)
- **External API**: Meta Graph API v19.0 (Facebook)
- **Authentication**: Supabase Auth with Facebook OAuth

## 📸 Screenshots

### Dashboard
- View all tracked Facebook pages as cards
- Summary statistics (total pages, posts analyzed, avg engagement)
- Quick engagement chart for recent posts
- Add new pages to track

### Page Detail View
- **Overview**: Follower growth charts, engagement metrics, top posts
- **Posts**: Feed of recent posts with engagement data
- **Comments**: Sentiment analysis and comment breakdown
- **Insights**: Detailed metrics and trends

### Competitor Comparison
- Side-by-side comparison of up to 3 pages
- Metrics table with best performer highlighting
- Multi-line follower growth charts
- Performance benchmarking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Meta (Facebook) Developer account

### 1. Clone & Install
```bash
git clone <repository-url>
cd nbmc-social
npm install
```

### 2. Environment Setup
Copy `.env.local.example` to `.env.local` and fill in your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
META_ACCESS_TOKEN=your_long_lived_page_access_token
```

### 3. Database Setup
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL from `supabase-setup.sql` in the Supabase SQL Editor
3. Enable Facebook OAuth in Authentication → Providers

### 4. Meta App Configuration
1. Create app at [developers.facebook.com](https://developers.facebook.com)
2. Add Facebook Login product
3. Configure OAuth redirect URIs
4. Generate long-lived access token with `pages_read_engagement` permission

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

- **[Setup Guide](./SETUP_GUIDE.md)** - Detailed step-by-step setup instructions
- **[Project Documentation](./PROJECT_DOCUMENTATION.md)** - Comprehensive technical documentation
- **[Database Schema](./supabase-setup.sql)** - SQL schema for Supabase

## 🏗 Project Structure

```
nbmc-social/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── meta/                 # Facebook Graph API endpoints
│   │   └── sync/                 # Data synchronization
│   ├── dashboard/                # Main dashboard
│   ├── pages/[pageId]/           # Page detail view
│   ├── compare/                  # Competitor comparison
│   ├── demo/                     # Interactive demo
│   └── auth/callback/            # OAuth callback
├── components/                   # React components
│   ├── charts/                   # Data visualization
│   ├── pages/                    # Page-related UI
│   ├── posts/                    # Post components
│   ├── compare/                  # Comparison UI
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utility libraries
│   ├── supabase.ts               # Supabase client
│   ├── meta.ts                   # Meta Graph API
│   └── sentiment.ts              # Sentiment analysis
└── public/                       # Static assets
```

## 🔧 API Endpoints

### Meta Graph API Integration
- `GET /api/meta/pages` - Search public Facebook pages
- `GET /api/meta/posts` - Get posts from a Facebook page
- `GET /api/meta/comments` - Get post comments with sentiment analysis
- `POST /api/sync` - Sync all tracked pages

## 📊 Database Schema

### Tables
- `tracked_pages` - User's tracked Facebook pages (RLS enabled)
- `page_posts` - Cached posts with engagement metrics
- `post_comments` - Cached comments with sentiment analysis
- `page_insights` - Historical follower/fan count data

## 🎨 UI Components

### Charts
- `EngagementChart` - Bar chart for post engagement
- `FollowerGrowthChart` - Line chart for follower trends
- `SentimentPie` - Pie chart for comment sentiment
- `CompareChart` - Multi-line comparison chart

### Pages
- `PageCard` - Tracked page display
- `AddPageModal` - Search and add pages
- `PostFeed` - List of posts
- `CommentPanel` - Side panel for comments
- `CompareTable` - Metrics comparison table

## 🔐 Security

- Row-Level Security (RLS) on all user-specific tables
- Environment variables for all secrets
- OAuth 2.0 with Facebook
- Input validation and sanitization
- HTTPS in production

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel deploy
```

### Environment Variables
Add all variables from `.env.local` to your deployment platform.

### Post-Deployment
1. Update Meta App OAuth redirect URIs
2. Switch Meta App to Live mode
3. Test authentication flow

## 🧪 Testing

### Demo Route
Visit `/demo` for an interactive walkthrough without authentication.

### Manual Testing
1. Test Facebook OAuth authentication
2. Search and track a Facebook page
3. Sync page data
4. View analytics and charts
5. Compare multiple pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is provided as-is for educational and commercial use.

## 🆘 Support

- **Issues**: Report bugs and feature requests via GitHub Issues
- **Documentation**: See `SETUP_GUIDE.md` and `PROJECT_DOCUMENTATION.md`
- **Community**: Join our Discord community

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components by [shadcn/ui](https://ui.shadcn.com)
- Backend by [Supabase](https://supabase.com)
- Data from [Meta Graph API](https://developers.facebook.com/docs/graph-api)

---

**NBMC Analytics** © 2024 - Track, analyze, and dominate your social media presence.
