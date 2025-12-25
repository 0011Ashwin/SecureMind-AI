
import React from 'react';
import { RiskLevel } from '../types';

interface RiskIndicatorProps {
  level: RiskLevel;
}

export const RiskIndicator: React.FC<RiskIndicatorProps> = ({ level }) => {
  const styles = {
    High: {
      bg: 'bg-red-950/30',
      text: 'text-red-500',
      border: 'border-red-500',
      icon: '!!'
    },
    Medium: {
      bg: 'bg-amber-950/30',
      text: 'text-amber-500',
      border: 'border-amber-500',
      icon: '??'
    },
    Low: {
      bg: 'bg-emerald-950/30',
      text: 'text-emerald-500',
      border: 'border-emerald-500',
      icon: 'OK'
    },
  };

  const style = styles[level];

  return (
    <div className={`flex items-center space-x-3 px-4 py-1.5 border-2 ${style.bg} ${style.text} ${style.border} font-bold text-[10px] pixel-font shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
      <span>{style.icon}</span>
      <span className="tracking-tighter">{level} RISK</span>
    </div>
  );
};
