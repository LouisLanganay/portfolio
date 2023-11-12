import React, { FC, useEffect, useState } from 'react';
import { Experience } from '../utils/types';
import { Menu, Transition } from '@headlessui/react';
import { MapPinIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const ExperienceDropdown: FC<Experience> = ({
  title, location, date, description
}, key ) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [style, setStyle] = useState('max-h-0');

  return (
    <li key={key}>
      <button className='bg-tertiary-500 hover:bg-tertiary-480 active:bg-tertiary-600
      border-[1px] border-tertiary-480 items-center py-1 px-4 h-fit rounded-lg flex
      flex-row transition duration-200 ease-in-out w-full'
      onClick={() => setIsExpanded(!isExpanded)}>
        <a className='flex flex-row w-full items-center justify-between'>
          <div className='flex flex-row items-center gap-4'>
            <PlusCircleIcon className='h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-white' />
            <p className='text-sm md:text-base font-Mbold text-white/70 mr-5 text-left'>
              {title}
            </p>
          </div>
          <p className='text-sm md:text-base font-Mmedium text-white/60
          whitespace-nowrap'>
            {date}
          </p>
        </a>
      </button>
      <Transition
        show={isExpanded}
        className="transition-all duration-500 ease-in-out overflow-hidden"
        enterFrom="transform max-h-0"
        enterTo="transform max-h-[100px]"
        leaveFrom="transform max-h-[100px]"
        leaveTo="transform max-h-0"
      >
        <div className='mt-2 pl-11 md:pl-12'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs md:text-sm font-Mmedium text-white/60 flex flex-row
            items-center'>
              <MapPinIcon className='h-4 w-4 inline-block mr-1' />
              {location}
            </p>
            <p className='text-xs md:text-sm font-Mmedium text-white/70'>
              {description}
            </p>
          </div>
        </div>
      </Transition>
    </li>
  );
};

export default ExperienceDropdown;
