
import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ 
  label, 
  error, 
  className, 
  ...props 
}, ref) => {
  return (
    <div className="w-full space-y-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all',
          error ? 'border-red-500' : 'border-slate-300',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
