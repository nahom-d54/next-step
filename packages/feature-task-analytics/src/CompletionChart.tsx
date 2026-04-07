import React from 'react';
import { Card } from '@next-step/ui-components';
import { formatDate } from '@next-step/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { date: '2026-04-01T00:00:00Z', tasks: 2 },
  { date: '2026-04-02T00:00:00Z', tasks: 5 },
  { date: '2026-04-03T00:00:00Z', tasks: 12 },
  { date: '2026-04-04T00:00:00Z', tasks: 8 },
  { date: '2026-04-05T00:00:00Z', tasks: 15 },
];

export function CompletionChart() {
  return (
    <Card title="Task Completion Over Time">
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(val) => formatDate(val)} />
            <YAxis />
            <Tooltip labelFormatter={(val) => formatDate(val as string)} />
            <Line type="monotone" dataKey="tasks" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
