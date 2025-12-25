
import React from 'react';
import { RiskLevel } from '../types';

interface RiskIndicatorProps {
  level: RiskLevel;
}

export const RiskIndicator: React.FC<RiskIndicatorProps> = ({ level }) => {
  const styles = {
    High: {
      bg: 'bg-red-50 text-red-700 border-red-200',
      dot: 'bg-red-500',
      label: 'High Risk'
    },
    Medium: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
      label: 'Medium Risk'
    },
    Low: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      label: 'Low Risk'
    },
  };

  const style = styles[level];

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.bg} transition-all`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${style.dot} animate-pulse`}></span>
      {style.label}
    </div>
  );
};
