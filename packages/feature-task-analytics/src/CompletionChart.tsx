import React from 'react';
import { Card } from '@next-step/ui-components';
import { formatDate } from '@next-step/utils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';

export interface ChartDataPoint {
  date: string;
  tasks: number;
}

export interface CompletionChartProps {
  data?: ChartDataPoint[];
}

const defaultData: ChartDataPoint[] = [
  { date: '2026-04-01T00:00:00Z', tasks: 2 },
  { date: '2026-04-02T00:00:00Z', tasks: 5 },
  { date: '2026-04-03T00:00:00Z', tasks: 12 },
  { date: '2026-04-04T00:00:00Z', tasks: 8 },
  { date: '2026-04-05T00:00:00Z', tasks: 15 },
  { date: '2026-04-06T00:00:00Z', tasks: 10 },
  { date: '2026-04-07T00:00:00Z', tasks: 20 },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length > 0) {
    return (
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '12px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{ margin: 0, fontWeight: 600, color: '#4a5568' }}>
          {formatDate(label as string)}
        </p>
        <p style={{ margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#6366f1', borderRadius: '50%' }}></span>
          <span style={{ fontWeight: 700, color: '#1a202c' }}>{payload[0].value}</span>
          <span style={{ color: '#718096', fontSize: '0.875rem' }}>tasks completed</span>
        </p>
      </div>
    );
  }
  return null;
};

export function CompletionChart({ data = defaultData }: CompletionChartProps) {
  return (
    <Card title="Task Completion Over Time">
      <div style={{ width: '100%', height: 320, marginTop: '16px' }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(val) => formatDate(val)} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#718096', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#718096', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="tasks" 
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTasks)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#6366f1' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
