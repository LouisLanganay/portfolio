import React, { FC } from 'react';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import { ButtonProps } from '@/types';

const buttonVariants = cva(
  'group/button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        outline: 'bg-transparent hover:bg-tertiary-500 active:bg-tertiary-480 text-tertiary-500 dark:text-white disabled:hover:bg-tertiary-500 border border-tertiary-480 hover:border-tertiary-450 disabled:border-tertiary-480 shadow-xs',
        primary: 'bg-tertiary-500 hover:bg-tertiary-480 active:bg-tertiary-550 text-white disabled:hover:bg-tertiary-500 border border-tertiary-480 hover:border-tertiary-450 disabled:border-tertiary-480 shadow-xs',
        secondary: 'active:bg-tertiary-550 dark:text-white text-black disabled:hover:text-white disabled:hover:bg-tertiary-500 border dark:border-tertiary-480 border-tertiary-100 dark:hover:border-tertiary-450 hover:border-tertiary-200 shadow-xs',
        ghost: 'active:bg-tertiary-550 dark:text-white text-black disabled:hover:text-white disabled:hover:bg-tertiary-500 border border-transparent hover:border-tertiary-450',
        primaryOutline: 'border border-[#feca77] bg-linear-to-r from-[#feca77] to-[#fed1b3] text-tertiary-550 hover:bg-opacity-80 ring-[1px] ring-[#feca77]/50 ring-offset-[3px] ring-offset-tertiary-650 hover:ring-[#feca77]/70'
      },
      size: {
        md: "h-9 px-4 py-2",
        xs: "h-7 rounded-md px-2.5 py-0 text-xs",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        iconSm: "h-7 w-7"
      }
    }
  }
);

const getRingColor = (variant: string) => {
  switch (variant) {
  case 'primary':
    return 'ring-tertiary-480';
  case 'secondary':
    return 'ring-tertiary-480';
  case 'ghost':
    return 'ring-tertiary-480';
  case 'primaryOutline':
    return 'ring-[#feca77]';
  default:
    return 'ring-tertiary-500';
  }
};

export function Button({
  variant, ring, link, className, children, onClick, loading, shiny, size = 'md', ...props
}: ButtonProps) {
  const handleClick = (link: string | undefined) => {
    if (link) {
      window.open(link, '_blank');
    } else if (onClick)
      onClick();
  };

  return (
    <button
      className={clsx(
        buttonVariants({ variant, size }),
        className,
        ring && 'ring-2 ring-opacity-0 ring-offset-0 hover:ring-offset-2 hover:ring-opacity-100 dark:ring-offset-tertiary-700 ring-offset-white',
        ring && getRingColor(variant),
        shiny && 'relative overflow-hidden'
      )}
      onClick={() => handleClick(link)}
      {...props}
    >
      {shiny ? (
        <div className='absolute inset-0 flex h-full w-full justify-center animate-slide'>
          <div className={clsx(
            'absolute w-16 h-full bg-linear-to-r',
            variant === 'primary' ? 'from-white/0 dark:via-white/5 via-white/15 to-white/0' : 'dark:from-white/0 dark:via-white/5 dark:to-white/0 from-black/0 via-black/5 to-black/0'
            )}
          />
        </div>
      ) : null}
      {loading ? (
        <ArrowPathIcon className='animate-spin h-5 w-5 mr-3' />
      ) : (
        children
      )}
    </button>
  );
}
