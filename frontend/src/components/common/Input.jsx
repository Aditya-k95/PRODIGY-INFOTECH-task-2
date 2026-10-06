import React, { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      type = 'text',
      className = '',
      id,
      name,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-holly/80 mb-1.5"
          >
            {label}
            {required && <span className="text-rose-600 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-holly/40">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            className={`
              w-full bg-white text-holly text-sm rounded-xl border transition-all duration-200
              placeholder:text-holly/35
              focus:outline-none focus:ring-2 focus:ring-holly focus:border-transparent
              ${Icon ? 'pl-10' : 'pl-3.5'} pr-3.5 py-2.5
              ${error ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/30' : 'border-holly/15 hover:border-holly/30'}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
            <span>•</span> {error}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1.5 text-xs text-holly/60">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
