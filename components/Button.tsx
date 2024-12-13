import React, { FC } from 'react';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import { ButtonProps } from '@/types';

const buttonVariants = cva(
  'group/button items-center w-fit font-normal h-fit rounded-lg flex flex-row justify-center disabled:opacity-80 disabled:cursor-not-allowed transition duration-200 ease-in-out',
  {
    variants: {
      variant: {
        outline: 'bg-transparent hover:bg-tertiary-500 active:bg-tertiary-480 text-tertiary-500 dark:text-white disabled:hover:bg-tertiary-500 border-[1px] border-tertiary-480 hover:border-tertiary-450 disabled:border-tertiary-480 shadow-sm',
        primary: 'bg-tertiary-500 hover:bg-tertiary-480 active:bg-tertiary-550 text-white disabled:hover:bg-tertiary-500 border-[1px] border-tertiary-480 hover:border-tertiary-450 disabled:border-tertiary-480 shadow-sm',
        secondary: 'active:bg-tertiary-550 dark:text-white text-black disabled:hover:text-white disabled:hover:bg-tertiary-500 border-[1px] dark:border-tertiary-480 border-tertiary-100 dark:hover:border-tertiary-450 hover:border-tertiary-200 shadow-sm',
        ghost: 'active:bg-tertiary-550 dark:text-white text-black disabled:hover:text-white disabled:hover:bg-tertiary-500 border-[1px] border-transparent hover:border-tertiary-450'
      },
      size: {
        icon: 'p-2 rounded-full',
        sm: 'py-1 px-2 text-sm md:text-base',
        md: 'py-1.5 px-4 text-sm md:text-base',
        lg: 'py-2 px-5 text-sm md:text-base',
        xs: 'py-1 px-3 text-xs md:text-sm'
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
  default:
    return 'ring-tertiary-500';
  }
};

const Button: FC<ButtonProps> = ({
  variant, ring, link, className, children, onClick, loading, shiny, size = 'md', ...props
}) => {
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
            'absolute w-16 h-full bg-gradient-to-r',
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
};

export default Button;
