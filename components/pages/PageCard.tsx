'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

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

export function PageCard({ page }: PageCardProps) {
  return (
    <Link href={`/pages/${page.page_id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="flex flex-row items-center gap-4">
          {page.profile_picture && (
            <img 
              src={page.profile_picture} 
              alt={page.page_name}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <CardTitle className="text-lg">{page.page_name}</CardTitle>
            {page.page_category && (
              <Badge variant="secondary" className="mt-1">
                {page.page_category}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{page.followers_count.toLocaleString()} followers</span>
            </div>
            {page.last_synced && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Updated {formatDistanceToNow(new Date(page.last_synced), { addSuffix: true })}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
