'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CompareChartProps {
  data: Array<{
    date: string;
    [key: string]: string | number;
  }>;
  pages: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

export function CompareChart({ data, pages }: CompareChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Follower Growth Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {pages.map((page) => (
              <Line
                key={page.id}
                type="monotone"
                dataKey={page.id}
                stroke={page.color}
                strokeWidth={2}
                name={page.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
