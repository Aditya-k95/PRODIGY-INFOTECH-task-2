import React from 'react';
import Button from './Button';
import { Users2, PlusCircle } from 'lucide-react';

const EmptyState = ({
  icon: Icon = Users2,
  title = 'No records found',
  description = 'There are currently no records matching your criteria.',
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-holly/10">
      <div className="p-4 rounded-2xl bg-alabaster border border-holly/10 text-holly/60 mb-4 shadow-subtle">
        <Icon className="w-8 h-8 text-holly/70" />
      </div>
      <h3 className="text-base font-bold text-holly tracking-tight">{title}</h3>
      <p className="mt-1 text-xs text-holly/60 max-w-sm leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <div className="mt-6">
          <Button variant="cta" icon={PlusCircle} onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
