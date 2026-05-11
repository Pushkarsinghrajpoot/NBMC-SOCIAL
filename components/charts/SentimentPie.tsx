'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SentimentPieProps {
  data: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const COLORS = {
  positive: '#22C55E',
  neutral: '#94A3B8',
  negative: '#EF4444',
};

export function SentimentPie({ data }: SentimentPieProps) {
  const chartData = [
    { name: 'Positive', value: data.positive },
    { name: 'Neutral', value: data.neutral },
    { name: 'Negative', value: data.negative },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comment Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
