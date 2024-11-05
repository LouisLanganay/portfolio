'use client';

import React, { FC, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Experience } from '@/types';
import Image from 'next/image';
import Badge from './Badge';
import { getIcon } from '@/lib/GetIcon';

function checkDateInterval(interval: string) {
  const [startStr, endStr] = interval.split(' - ');
  const startDate = new Date(startStr);
  const endDate = new Date(endStr);
  const currentDate = new Date();

  if (endDate < currentDate)
    return 'Past';

  if (startDate <= currentDate && currentDate <= endDate)
    return 'Current';

  return 'Future';
}

const ExperienceDropdown: FC<Experience> = ({
  title, location, date, description, image, technologies
}, index) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <li
      key={index}
      className={clsx(
        'flex flex-col gap-4 group',
        description && 'cursor-pointer'
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className='flex flex-row gap-4'>
        <div className='flex-none'>
          {image ? (
            <div className='relative flex-shrink-0 overflow-hidden rounded-full size-11 m-auto flex items-center justify-between bg-tertiary-600 border border-tertiary-480'>
              <Image
                src={image}
                alt={title}
                height={100}
                width={100}
                className='rounded-full'
              />
            </div>
          ) : (
            <div className='relative flex shrink-0 overflow-hidden rounded-full size-11 m-auto bg-tertiary-600 border border-tertiary-480'/>
          )}
        </div>
        <div className='flex flex-col gap-3 w-full'>
          <div className='flex flex-col justify-between items-start w-full'>
            <div className='flex flex-row justify-between w-full'>
              <p className='inline-flex items-center justify-center font-normal text-white text-base'>
                {location}
                {checkDateInterval(date) === 'Current' && (
                  <Badge className='ml-2 bg-green-500/10 ring-green-500/30 text-white group-hover:scale-105 group-hover:rotate-6 transition-all duration-150'>
                    Current
                  </Badge>
                )}
                {checkDateInterval(date) === 'Future' && (
                  <Badge className='ml-2 bg-blue-500/10 ring-blue-500/30 text-white group-hover:scale-105 group-hover:rotate-6 transition-all duration-150'>
                    Planned
                  </Badge>
                )}
                <ChevronRightIcon
                  className={clsx(
                    'w-4 h-4 text-white/70 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ml-2',
                    isExpanded && 'rotate-90 translate-x-0 opacity-100',
                    !description && 'hidden',
                  )}
                />
              </p>
              <p className='font-light text-white/70 text-sm text-right'>{date}</p>
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <p className='font-light text-white/70 text-sm'>
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
            <p className='font-light text-white/70 text-sm'>{description}</p>
            {technologies && technologies.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-3'>
                {technologies.map((tech, i) => {
                  const icon = getIcon(tech);
                  return (
                    <div
                      key={i}
                      className='flex items-center gap-1.5 px-2 py-1 rounded-md bg-tertiary-600/30 border border-tertiary-480'
                    >
                      {icon && (
                        <Image
                          src={icon}
                          alt={tech}
                          width={14}
                          height={14}
                          className='object-contain'
                        />
                      )}
                      <span className='text-xs text-white/70'>{tech}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </li>
  );
};

export default ExperienceDropdown;
