import React from 'react';
import { Card, Badge, Progress } from '@next-step/ui-components';
import { StatCard } from './StatCard';

/**
 * TaskAnalytics - Shared type representing aggregate task statistics.
 * In a real application this would be fetched from the API.
 */
export interface TaskAnalytics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completionRate: number;
  streakDays: number;
  tasksCompletedToday: number;
  averageCompletionTime: string;
}

export interface AnalyticsDashboardProps {
  /** Analytics data to display. Uses sample data when omitted. */
  data?: TaskAnalytics;
}

const defaultData: TaskAnalytics = {
  totalTasks: 48,
  completedTasks: 32,
  pendingTasks: 12,
  overdueTasks: 4,
  completionRate: 66.7,
  streakDays: 5,
  tasksCompletedToday: 3,
  averageCompletionTime: '2.4 hrs',
};

/**
 * AnalyticsDashboard
 *
 * A composite component that assembles multiple UI primitives (Card, Badge, Progress)
 * to present an overview of task statistics and productivity metrics.
 *
 * CBSD Pattern: Observer Pattern — designed to reactively render whenever
 * the upstream analytics data changes.
 */
export function AnalyticsDashboard({ data = defaultData }: AnalyticsDashboardProps) {
  const overdueStatus = data.overdueTasks > 0 ? 'danger' : 'success';

  return (
    <Card title="Task Analytics Dashboard" className="analytics-dashboard">
      {/* Stat cards row */}
      <div
        className="analytics-stats-row"
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '20px',
        }}
      >
        <StatCard
          title="Total Tasks"
          value={data.totalTasks}
          icon="📋"
          subtitle="across all projects"
        />
        <StatCard
          title="Completed"
          value={data.completedTasks}
          icon="✅"
          trend="up"
          trendValue="+3 today"
        />
        <StatCard
          title="Pending"
          value={data.pendingTasks}
          icon="⏳"
          trend="neutral"
          trendValue="steady"
        />
        <StatCard
          title="Overdue"
          value={data.overdueTasks}
          icon="🚨"
          trend={data.overdueTasks > 0 ? 'down' : 'up'}
          trendValue={data.overdueTasks > 0 ? `${data.overdueTasks} late` : 'none'}
        />
      </div>

      {/* Progress section */}
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px', color: '#2d3748' }}>
          Completion Progress
        </h4>
        <Progress
          value={data.completedTasks}
          max={data.totalTasks}
          label="Overall Completion"
          color="#48bb78"
        />
        <div style={{ marginTop: '12px' }}>
          <Progress
            value={data.tasksCompletedToday}
            max={10}
            label="Daily Goal (10 tasks)"
            color="#6366f1"
          />
        </div>
      </div>

      {/* Summary badges */}
      <div
        className="analytics-badges"
        style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}
      >
        <Badge variant="info">🔥 {data.streakDays}-day streak</Badge>
        <Badge variant="success">⏱ Avg: {data.averageCompletionTime}</Badge>
        <Badge variant={overdueStatus}>
          {data.overdueTasks > 0
            ? `⚠ ${data.overdueTasks} overdue`
            : '✓ No overdue tasks'}
        </Badge>
        <Badge variant="default">📊 Rate: {data.completionRate}%</Badge>
      </div>
    </Card>
  );
}
