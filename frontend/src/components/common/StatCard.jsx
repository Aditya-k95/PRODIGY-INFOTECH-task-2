import React from 'react';

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'alabaster',
  trend,
  className = '',
  action,
}) => {
  const variants = {
    alabaster: {
      card: 'bg-white border-holly/10 text-holly shadow-subtle hover:border-holly/20',
      iconBg: 'bg-alabaster text-holly border border-holly/10',
      title: 'text-holly/70',
      value: 'text-holly',
      subtitle: 'text-holly/60',
    },
    holly: {
      card: 'bg-holly text-alabaster border-holly shadow-card hover:bg-holly-surface',
      iconBg: 'bg-white/10 text-soft-lime border border-white/10',
      title: 'text-alabaster/70',
      value: 'text-white',
      subtitle: 'text-alabaster/60',
    },
    teal: {
      card: 'bg-dusty-teal/20 border-dusty-teal/40 text-holly shadow-subtle hover:border-dusty-teal',
      iconBg: 'bg-dusty-teal/40 text-holly border border-dusty-teal/60',
      title: 'text-holly/80',
      value: 'text-holly',
      subtitle: 'text-holly/70',
    },
    lime: {
      card: 'bg-soft-lime/20 border-soft-lime/60 text-holly shadow-subtle hover:border-soft-lime hover:shadow-glow-lime/40',
      iconBg: 'bg-soft-lime text-holly border border-soft-lime-400',
      title: 'text-holly/80',
      value: 'text-holly',
      subtitle: 'text-holly/70',
    },
  };

  const currentTheme = variants[variant] || variants.alabaster;

  return (
    <div
      className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${currentTheme.card} ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <p className={`text-xs font-semibold uppercase tracking-wider ${currentTheme.title}`}>
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className={`text-3xl font-extrabold tracking-tight font-sans ${currentTheme.value}`}>
              {value}
            </h3>
            {trend && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-soft-lime/40 text-holly border border-soft-lime/70">
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className={`text-xs font-medium ${currentTheme.subtitle}`}>
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl shrink-0 transition-transform duration-200 ${currentTheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {action && <div className="mt-4 pt-3 border-t border-current/10">{action}</div>}
    </div>
  );
};

export default StatCard;
