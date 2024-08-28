import React, { FC } from 'react';
import { ButtonProps } from '../utils/types';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'items-center text-sm md:text-base w-fit font-Mregular py-1.5 px-4 h-fit rounded-lg flex flex-row justify-center disabled:opacity-80 disabled:cursor-not-allowed transition duration-200 ease-in-out',
  {
    variants: {
      variant: {
        primary: 'bg-tertiary-500 hover:bg-tertiary-480 active:bg-tertiary-550 text-white disabled:hover:bg-tertiary-500 border-[1px] border-tertiary-480 hover:border-tertiary-450 disabled:border-tertiary-480 shadow-sm',
        secondary: 'active:bg-tertiary-550 text-white disabled:hover:text-white disabled:hover:bg-tertiary-500 border-[1px] border-tertiary-480 hover:border-tertiary-450 shadow-sm',
        ghost: 'active:bg-tertiary-550 text-white disabled:hover:text-white disabled:hover:bg-tertiary-500 border-[1px] border-tertiary-480 hover:border-tertiary-450 shadow-sm'
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
  variant, ring, link, className, children, onClick, loading, ...props
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
        buttonVariants({ variant }),
        className,
        ring && 'ring-2 ring-opacity-0 ring-offset-0 hover:ring-offset-2 hover:ring-opacity-100 ring-offset-tertiary-700',
        ring && getRingColor(variant)
      )}
      onClick={() => handleClick(link)}
      {...props}
    >
      {loading ? (
        <ArrowPathIcon className='animate-spin h-5 w-5 mr-3' />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
