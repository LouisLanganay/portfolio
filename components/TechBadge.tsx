import React, { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface TechBadgeProps {
  tech?: string;
  icon?: string;
}

const TechBadge: FC<TechBadgeProps> = ({ tech, icon }) => {
  return (
    <div className={clsx(
      'flex items-center space-x-1.5 py-1 rounded-md dark:bg-tertiary-600/30 bg-tertiary-600 border border-tertiary-480',
        tech ? 'px-2' : 'px-1.5'
      )}>
      {icon && (
        <Image
          src={icon}
          alt={tech || ''}
          width={14}
          height={14}
          className='object-contain'
        />
      )}
      {tech && (
        <span className='text-xs dark:text-white/70 text-white'>{tech}</span>
      )}
    </div>
  );
};

export default TechBadge;
