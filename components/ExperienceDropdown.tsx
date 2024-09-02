'use client';

import React, { FC, useState } from 'react';
import { MapPinIcon, PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Experience } from '@/types';

const ExperienceDropdown: FC<Experience> = ({
  title, location, date, description
}, index) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li key={index}>
      <button
        className='bg-tertiary-500 hover:bg-tertiary-480 border-[1px] border-tertiary-480 items-center py-1 h-fit rounded-lg flex flex-row transition duration-200 ease-in-out w-full shadow-sm hover:border-tertiary-450'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <a className='flex flex-row w-full items-center justify-between'>
          <div className='flex flex-row items-center'>
            <div className='px-2 md:px-4'>
              <PlusIcon className={clsx(
                'h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-white/90 transition-all duration-200',
                isExpanded && 'rotate-45'
              )} />
            </div>
            <p className='text-sm md:text-base font-medium text-white/90 mr-2 md:mr-5 text-left'>
              {title}
            </p>
          </div>
          <p className='text-sm md:text-base font-light text-white/60 md:whitespace-nowrap pr-2 md:pr-4'>
            {date}
          </p>
        </a>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className='overflow-hidden'
      >
        <div className='mt-2 pl-11 md:pl-12'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs md:text-sm font-medium text-white/60 flex flex-row
            items-center'>
              <MapPinIcon className='h-4 w-4 inline-block mr-1' />
              {location}
            </p>
            <p className='text-xs md:text-sm font-normal text-white/70'>
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </li>
  );
};

export default ExperienceDropdown;
