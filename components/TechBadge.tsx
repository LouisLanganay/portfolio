import React, { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useTechBadge } from '@/contexts/TechBadgeContext';

interface TechBadgeProps {
  tech?: string;
  icon?: string;
}

export function TechBadge({ tech, icon }: TechBadgeProps) {
  const { selectedTechs, toggleTech } = useTechBadge();

  const isSelected = tech ? selectedTechs.has(tech.toLowerCase()) : false;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        tech && toggleTech(tech);
      }}
      className={clsx(
        'flex items-center space-x-1.5 py-1 rounded-md cursor-pointer transition-all duration-300',
        'dark:bg-tertiary-600/30 bg-tertiary-600 border border-tertiary-480',
        tech ? 'px-2' : 'px-1.5',
        isSelected && 'scale-101',
        !isSelected && selectedTechs.size > 0 && 'opacity-30'
      )}
    >
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
}
