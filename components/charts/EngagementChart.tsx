'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EngagementChartProps {
  data: Array<{
    name: string;
    likes: number;
    comments: number;
    shares: number;
  }>;
}

export function EngagementChart({ data }: EngagementChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="likes" fill="#1E5AA8" />
            <Bar dataKey="comments" fill="#3B82F6" />
            <Bar dataKey="shares" fill="#60A5FA" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
