import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

const Badge: FC<BadgeProps> = ({ children, className }) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;