import React, { FC } from 'react';
import { ButtonProps } from '../utils/types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';

const Button: FC<ButtonProps> = ({
  type, link, className, children, onClick, disabled, loading
}) => {
  const handleClick = (link: string | undefined) => {
    if (link) {
      window.open(link, '_blank');
    } else if (onClick)
      onClick();
  };

  let style = '';

  switch (type) {
  case 'primary':
    style += 'bg-tertiary-500 hover:bg-tertiary-480 active:bg-tertiary-550 \
    text-white disabled:hover:bg-tertiary-500 border-[1px] border-tertiary-480 \
    hover:border-tertiary-450 disabled:border-tertiary-480 shadow-sm';
    break;
  case 'secondary':
    style += 'active:bg-tertiary-550 text-white disabled:hover:text-white  \
    disabled:hover:bg-tertiary-500 border-[1px] \
    border-tertiary-480 hover:border-tertiary-450';
    break;
  }
  return (
    <button className={`items-center text-sm md:text-base w-fit
    font-Mregular py-1 px-4 h-fit rounded-lg flex flex-row justify-center
    disabled:opacity-60 disabled:cursor-not-allowed min-h-10 ${style}
    transition duration-200 ease-in-out
    ${className}`} disabled={disabled || false}
    onClick={() => handleClick(link)}>
      {loading ? (
        <ArrowPathIcon className='animate-spin h-5 w-5 mr-3' />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
