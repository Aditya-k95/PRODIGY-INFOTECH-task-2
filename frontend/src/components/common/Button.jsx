import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-holly text-alabaster hover:bg-holly-light focus:ring-holly shadow-sm',
    cta:
      'bg-soft-lime text-holly font-semibold hover:bg-soft-lime-400 focus:ring-soft-lime shadow-sm hover:shadow-glow-lime transition-all',
    teal:
      'bg-dusty-teal text-holly font-semibold hover:bg-dusty-teal-400 focus:ring-dusty-teal',
    secondary:
      'bg-white text-holly border border-holly/15 hover:bg-alabaster focus:ring-holly/30 shadow-subtle',
    outline:
      'border border-holly/20 text-holly hover:bg-holly/5 focus:ring-holly/30',
    ghost:
      'text-holly hover:bg-holly/5 focus:ring-holly/20',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        Icon && <Icon className="w-4 h-4 shrink-0 text-current" />
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
