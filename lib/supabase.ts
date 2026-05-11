import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

export const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null as any;

export const createBrowserClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase configuration missing');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export type Database = {
  public: {
    Tables: {
      tracked_pages: {
        Row: {
          id: string;
          user_id: string;
          page_id: string;
          page_name: string;
          page_category: string | null;
          fan_count: number;
          followers_count: number;
          about: string | null;
          profile_picture: string | null;
          added_at: string;
          last_synced: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          page_id: string;
          page_name: string;
          page_category?: string | null;
          fan_count?: number;
          followers_count?: number;
          about?: string | null;
          profile_picture?: string | null;
          added_at?: string;
          last_synced?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          page_id?: string;
          page_name?: string;
          page_category?: string | null;
          fan_count?: number;
          followers_count?: number;
          about?: string | null;
          profile_picture?: string | null;
          added_at?: string;
          last_synced?: string | null;
        };
      };
      page_posts: {
        Row: {
          id: string;
          page_id: string;
          post_id: string;
          message: string | null;
          story: string | null;
          created_time: string | null;
          likes_count: number;
          comments_count: number;
          shares_count: number;
          reactions_count: number;
          post_type: string;
          full_picture: string | null;
          permalink_url: string | null;
          fetched_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          post_id: string;
          message?: string | null;
          story?: string | null;
          created_time?: string | null;
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
          reactions_count?: number;
          post_type?: string;
          full_picture?: string | null;
          permalink_url?: string | null;
          fetched_at?: string;
        };
        Update: {
          id?: string;
          page_id?: string;
          post_id?: string;
          message?: string | null;
          story?: string | null;
          created_time?: string | null;
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
          reactions_count?: number;
          post_type?: string;
          full_picture?: string | null;
          permalink_url?: string | null;
          fetched_at?: string;
        };
      };
      post_comments: {
        Row: {
          id: string;
          post_id: string;
          comment_id: string;
          message: string | null;
          like_count: number;
          commenter_name: string | null;
          created_time: string | null;
          sentiment: string;
          fetched_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          comment_id: string;
          message?: string | null;
          like_count?: number;
          commenter_name?: string | null;
          created_time?: string | null;
          sentiment?: string;
          fetched_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          comment_id?: string;
          message?: string | null;
          like_count?: number;
          commenter_name?: string | null;
          created_time?: string | null;
          sentiment?: string;
          fetched_at?: string;
        };
      };
      page_insights: {
        Row: {
          id: string;
          page_id: string;
          recorded_date: string;
          fan_count: number | null;
          followers_count: number | null;
        };
        Insert: {
          id?: string;
          page_id: string;
          recorded_date: string;
          fan_count?: number | null;
          followers_count?: number | null;
        };
        Update: {
          id?: string;
          page_id?: string;
          recorded_date?: string;
          fan_count?: number | null;
          followers_count?: number | null;
        };
      };
    };
  };
};
