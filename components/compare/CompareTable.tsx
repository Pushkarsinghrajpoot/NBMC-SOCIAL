'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PageMetrics {
  pageId: string;
  pageName: string;
  followers: number;
  postsThisWeek: number;
  avgLikes: number;
  avgComments: number;
  engagementRate: number;
}

interface CompareTableProps {
  pages: PageMetrics[];
}

export function CompareTable({ pages }: CompareTableProps) {
  const getBestPerformer = (metric: keyof Omit<PageMetrics, 'pageId' | 'pageName'>) => {
    if (pages.length === 0) return null;
    return pages.reduce((best, current) => 
      current[metric] > best[metric] ? current : best
    );
  };

  const isBest = (page: PageMetrics, metric: keyof Omit<PageMetrics, 'pageId' | 'pageName'>) => {
    const best = getBestPerformer(metric);
    return best && best.pageId === page.pageId;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                {pages.map((page) => (
                  <TableHead key={page.pageId}>{page.pageName}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Followers</TableCell>
                {pages.map((page) => (
                  <TableCell key={page.pageId}>
                    <div className="flex items-center gap-2">
                      {page.followers.toLocaleString()}
                      {isBest(page, 'followers') && (
                        <Badge variant="default" className="bg-green-500">Best</Badge>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Posts This Week</TableCell>
                {pages.map((page) => (
                  <TableCell key={page.pageId}>
                    <div className="flex items-center gap-2">
                      {page.postsThisWeek}
                      {isBest(page, 'postsThisWeek') && (
                        <Badge variant="default" className="bg-green-500">Best</Badge>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Avg Likes/Post</TableCell>
                {pages.map((page) => (
                  <TableCell key={page.pageId}>
                    <div className="flex items-center gap-2">
                      {page.avgLikes.toLocaleString()}
                      {isBest(page, 'avgLikes') && (
                        <Badge variant="default" className="bg-green-500">Best</Badge>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Avg Comments</TableCell>
                {pages.map((page) => (
                  <TableCell key={page.pageId}>
                    <div className="flex items-center gap-2">
                      {page.avgComments.toLocaleString()}
                      {isBest(page, 'avgComments') && (
                        <Badge variant="default" className="bg-green-500">Best</Badge>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Engagement Rate</TableCell>
                {pages.map((page) => (
                  <TableCell key={page.pageId}>
                    <div className="flex items-center gap-2">
                      {page.engagementRate.toFixed(2)}%
                      {isBest(page, 'engagementRate') && (
                        <Badge variant="default" className="bg-green-500">Best</Badge>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
