'use client';

import React, { FC, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Experience } from '@/types';
import Image from 'next/image';
import { getIcon } from '@/lib/GetIcon';
import { Badge } from './Badge';
import { TechBadge } from './TechBadge';

function checkDateInterval(interval: string) {
  const [startStr, endStr] = interval.split(' - ');

  const parseDate = (dateStr: string) => {
    if (dateStr.toLowerCase() === 'present') {
      return {
        display: 'Present',
        date: new Date()
      };
    }

    const parts = dateStr.split(' ');
    if (parts.length === 3) {
      return {
        display: `${parts[1]} ${parts[2]}`,
        date: new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`)
      };
    } else {
      return {
        display: `${parts[0]} ${parts[1]}`,
        date: new Date(`${parts[0]} 1, ${parts[1]}`)
      };
    }
  };

  const start = parseDate(startStr);
  const end = parseDate(endStr);
  const currentDate = new Date();

  if (endStr.toLowerCase() === 'present' || end.date >= currentDate) {
    if (start.date <= currentDate) {
      return { status: 'Current', display: `${start.display} - ${end.display}` };
    }
    return { status: 'Future', display: `${start.display} - ${end.display}` };
  }

  return { status: 'Past', display: `${start.display} - ${end.display}` };
}

export function ExperienceDropdown({
  title, location, date, description, image, technologies
}: Experience) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dateInfo = checkDateInterval(date);

  return (
    <li
      className={clsx(
        'flex flex-col gap-4 group',
        description && 'cursor-pointer'
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className='flex flex-row gap-4'>
        <div className='flex-none'>
          {image ? (
            <div className='relative flex-shrink-0 overflow-hidden rounded-full size-11 m-auto flex items-center justify-between dark:bg-tertiary-600 bg-tertiary-400 border dark:border-tertiary-480 border-tertiary-650'>
              <Image
                src={image}
                alt={title}
                height={100}
                width={100}
                className='rounded-full'
              />
            </div>
          ) : (
            <div className='relative flex shrink-0 overflow-hidden rounded-full size-11 m-auto dark:bg-tertiary-600 bg-tertiary-400 border dark:border-tertiary-480 border-tertiary-650'/>
          )}
        </div>
        <div className='flex flex-col gap-3 w-full'>
          <div className='flex flex-col justify-between items-start w-full'>
            <div className='flex flex-row justify-between w-full'>
              <p className='inline-flex items-center justify-center font-normal dark:text-white text-black text-base'>
                {location}
                {dateInfo.status === 'Current' && (
                  <Badge className='ml-2 bg-green-500/10 ring-green-500/30 dark:text-white text-black group-hover:scale-105 group-hover:rotate-6 transition-all duration-150'>
                    Current
                  </Badge>
                )}
                {dateInfo.status === 'Future' && (
                  <Badge className='ml-2 bg-blue-500/10 ring-blue-500/30 dark:text-white text-black group-hover:scale-105 group-hover:rotate-6 transition-all duration-150'>
                    Planned
                  </Badge>
                )}
                <ChevronRightIcon
                  className={clsx(
                    'w-4 h-4 dark:text-white/70 text-black/70 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ml-2',
                    isExpanded && 'rotate-90 translate-x-0 opacity-100',
                    !description && 'hidden',
                  )}
                />
              </p>
              <p className='font-light dark:text-white/70 text-black/70 text-sm text-right'>{dateInfo.display}</p>
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <p className='font-light dark:text-white/70 text-black/70 text-sm'>
                {title}
              </p>
            </div>
          </div>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className='overflow-hidden'
          >
            <p className='font-light dark:text-white/70 text-black/70 text-sm'>{description}</p>
            {technologies && technologies.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-3'>
                {technologies.map((tech, i) => (
                  <TechBadge
                    key={i}
                    tech={tech}
                    icon={getIcon(tech)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </li>
  );
}
