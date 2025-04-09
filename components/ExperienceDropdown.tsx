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

function calculateDuration(dateInterval: string) {
  const [startStr, endStr] = dateInterval.split(' - ');

  const parseDate = (dateStr: string) => {
    if (dateStr.toLowerCase() === 'present') {
      return new Date();
    }
    const parts = dateStr.split(' ');
    if (parts.length === 3) {
      return new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
    } else {
      return new Date(`${parts[0]} 1, ${parts[1]}`);
    }
  };

  const start = parseDate(startStr);
  const end = parseDate(endStr);

  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return years === 1 ? '1 year' : `${years} years`;
  } else {
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  }
}

interface GroupedExperience extends Experience {
  roles?: Experience[];
}

export function ExperienceDropdown({
  title, location, date, description, image, technologies, roles
}: GroupedExperience) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dateInfo = checkDateInterval(date);

  return (
    <li
      className={clsx(
        'flex flex-col gap-4 group',
        (description || roles) && 'cursor-pointer'
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
                    (!description && !roles) && 'hidden',
                  )}
                />
              </p>
              <p className='font-light dark:text-white/70 text-black/70 text-sm text-right hidden sm:block'>{dateInfo.display}</p>
            </div>
            <div className='flex flex-col gap-1 w-full'>
              <p className='font-light dark:text-white/70 text-black/70 text-sm text-left block sm:hidden'>{dateInfo.display}</p>
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
            {description && (
              <p className='font-light dark:text-white/70 text-black/70 text-sm'>{description}</p>
            )}
            {roles && roles.length > 0 && (
              <div className='relative mt-4 space-y-4 pl-4'>
                <div className='absolute left-1 h-full w-0.5 mt-1 dark:bg-tertiary-480 bg-tertiary-100' />
                {roles.map((role, index) => (
                  <div key={index} className='relative'>
                    <div className='absolute -left-[15px] top-1 size-2 rounded-full dark:bg-tertiary-480 bg-tertiary-100' />
                    <div className='flex flex-col gap-1'>
                      <div className='flex flex-row justify-between items-start w-full'>
                        <div className='flex flex-col'>
                          <p className='font-medium dark:text-white/90 text-black/90 text-sm'>{role.title}</p>
                          <p className='font-light dark:text-white/70 text-black/70 text-xs'>{checkDateInterval(role.date).display} - {calculateDuration(role.date)}</p>
                        </div>
                      </div>
                      {role.description && (
                        <p className='font-light dark:text-white/70 text-black/70 text-sm'>{role.description}</p>
                      )}
                      {role.technologies && role.technologies.length > 0 && (
                        <div className='flex flex-wrap gap-2 mt-2'>
                          {role.technologies.sort().map((tech, i) => (
                            <TechBadge
                              key={i}
                              tech={tech}
                              icon={getIcon(tech)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!roles && technologies && technologies.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-3'>
                {technologies.sort().map((tech, i) => (
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
