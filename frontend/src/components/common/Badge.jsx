import React from 'react';
import { STATUS_COLORS } from '../../utils/constants';

const Badge = ({ status, size = 'sm', className = '' }) => {
  const config = STATUS_COLORS[status] || {
    bg: 'bg-alabaster-300',
    text: 'text-holly',
    border: 'border-holly/20',
    dot: 'bg-holly',
  };

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium',
    md: 'text-sm px-3 py-1 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size] || sizeClasses.sm} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      <span className="tracking-wide">{status}</span>
    </span>
  );
};

export default Badge;
