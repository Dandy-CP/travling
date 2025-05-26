import React, { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputProps {
  variant?: 'default' | 'password' | 'textarea';
  label?: string;
  errorMessage?: string;
}

type InputType = React.ComponentProps<'input'> &
  React.ComponentProps<'textarea'> &
  InputProps;

function Input({
  className,
  type,
  variant = 'default',
  label,
  errorMessage,
  ...props
}: InputType) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  };

  switch (variant) {
    case 'default':
      return (
        <div>
          {label && (
            <span className="font-medium text-sm mb-2 text-[#0A0A0A]">
              {label}
            </span>
          )}

          <input
            type={type}
            data-slot="input"
            className={cn(
              'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
              errorMessage && 'border-red-500',
              className
            )}
            {...props}
          />

          {errorMessage && (
            <span className="font-medium text-sm text-red-400">
              {errorMessage}
            </span>
          )}
        </div>
      );
    case 'password':
      return (
        <div>
          {label && (
            <span className="font-medium text-sm mb-2 text-[#0A0A0A]">
              {label}
            </span>
          )}

          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              data-slot="input"
              className={cn(
                'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                errorMessage && 'border-red-500',
                className
              )}
              {...props}
            />

            <button
              className="h-full absolute right-0 top-0 px-3 py-1 cursor-pointer"
              onClick={(event) => {
                togglePasswordVisibility(event);
              }}
            >
              {isPasswordVisible ? <EyeClosed /> : <Eye />}
            </button>
          </div>

          {errorMessage && (
            <span className="font-medium text-sm text-red-400">
              {errorMessage}
            </span>
          )}
        </div>
      );
    case 'textarea':
      return (
        <div>
          {label && (
            <span className="font-medium text-sm mb-2 text-[#0A0A0A]">
              {label}
            </span>
          )}

          <textarea
            data-slot="input"
            className={cn(
              'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
              errorMessage && 'border-red-500',
              className
            )}
            {...props}
          />

          {errorMessage && (
            <span className="font-medium text-sm text-red-400">
              {errorMessage}
            </span>
          )}
        </div>
      );
  }
}

export { Input };
