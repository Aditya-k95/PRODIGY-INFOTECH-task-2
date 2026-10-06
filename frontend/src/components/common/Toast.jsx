import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null;

  const typeConfig = {
    success: {
      bg: 'bg-white',
      border: 'border-soft-lime-500',
      icon: CheckCircle2,
      iconColor: 'text-holly bg-soft-lime',
      textColor: 'text-holly',
    },
    error: {
      bg: 'bg-white',
      border: 'border-rose-400',
      icon: AlertCircle,
      iconColor: 'text-rose-600 bg-rose-100',
      textColor: 'text-rose-950',
    },
    info: {
      bg: 'bg-white',
      border: 'border-dusty-teal-400',
      icon: Info,
      iconColor: 'text-holly bg-dusty-teal-200',
      textColor: 'text-holly',
    },
  };

  const current = typeConfig[type] || typeConfig.success;
  const Icon = current.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-md w-full px-4 sm:px-0">
      <div
        className={`flex items-start gap-3.5 p-4 rounded-xl shadow-elevated border ${current.bg} ${current.border}`}
      >
        <div className={`p-1.5 rounded-lg shrink-0 ${current.iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className={`text-sm font-semibold ${current.textColor}`}>
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-holly/40 hover:text-holly rounded-lg p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
