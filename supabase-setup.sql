-- NBMC Analytics Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Tracked pages table
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

-- Enable Row Level Security
ALTER TABLE tracked_pages ENABLE ROW LEVEL SECURITY;

-- Create RLS Policy
CREATE POLICY "Users see own pages" ON tracked_pages 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_tracked_pages_user_id ON tracked_pages(user_id);
CREATE INDEX idx_page_posts_page_id ON page_posts(page_id);
CREATE INDEX idx_page_posts_created_time ON page_posts(created_time);
CREATE INDEX idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX idx_page_insights_page_id ON page_insights(page_id);
CREATE INDEX idx_page_insights_date ON page_insights(recorded_date);
