import React from 'react';
import { Card, Badge, Progress } from '@next-step/ui-components';

export interface ProductivityScoreProps {
  /** Daily productivity score from 0 to 100 */
  dailyScore: number;
  /** Weekly productivity score from 0 to 100 */
  weeklyScore: number;
  /** The trend compared to the previous period */
  trend: 'up' | 'down' | 'flat';
  /** The absolute value of the trend percentage */
  trendValue: number;
  className?: string;
}

export function ProductivityScore({
  dailyScore,
  weeklyScore,
  trend,
  trendValue,
  className = '',
}: ProductivityScoreProps) {
  const getTrendProps = () => {
    switch (trend) {
      case 'up':
        return { variant: 'success' as const, symbol: '+' };
      case 'down':
        return { variant: 'danger' as const, symbol: '-' };
      default:
        return { variant: 'info' as const, symbol: '' };
    }
  };

  const { variant, symbol } = getTrendProps();
  const getColor = (score: number) => {
    if (score >= 80) return '#48bb78'; // Green
    if (score >= 50) return '#ecc94b'; // Yellow
    return '#f56565'; // Red
  };

  return (
    <Card title="Productivity Score" className={`productivity-score-card ${className}`}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>{dailyScore}</span>
          <span style={{ color: '#718096', fontSize: '0.875rem' }}>out of 100</span>
        </div>
        <Badge variant={variant}>
          {symbol}
          {trendValue}% vs last week
        </Badge>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Progress 
          value={dailyScore} 
          max={100} 
          label="Today's Progress" 
          color={getColor(dailyScore)} 
        />
        <Progress 
          value={weeklyScore} 
          max={100} 
          label="Weekly Average" 
          color={getColor(weeklyScore)} 
        />
      </div>
    </Card>
  );
}
