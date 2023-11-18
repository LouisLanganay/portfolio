import React, { FC, useState } from 'react';
import { Experience } from '../utils/types';
import { Transition } from '@headlessui/react';
import { MapPinIcon, PlusIcon } from '@heroicons/react/24/outline';

const ExperienceDropdown: FC<Experience> = ({
  title, location, date, description
}, index) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li key={index}>
      <button className='bg-tertiary-500 hover:bg-tertiary-480 border-[1px]
      border-tertiary-480 items-center py-1 h-fit rounded-lg flex
      flex-row transition duration-200 ease-in-out w-full shadow-sm
      hover:border-tertiary-450'
      onClick={() => setIsExpanded(!isExpanded)}>
        <a className='flex flex-row w-full items-center justify-between'>
          <div className='flex flex-row items-center'>
            <div className='px-2 md:px-4'>
              <PlusIcon className={`h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-white/90
            ${isExpanded && 'rotate-45'} transition-all duration-200`} />
            </div>
            <p className='text-sm md:text-base font-Mbold text-white/90 mr-2
            md:mr-5 text-left'>
              {title}
            </p>
          </div>
          <p className='text-sm md:text-base font-Iregular text-white/60
          md:whitespace-nowrap pr-2 md:pr-4'>
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
            <p className='text-xs md:text-sm font-Mregular text-white/70'>
              {description}
            </p>
          </div>
        </div>
      </Transition>
    </li>
  );
};

export default ExperienceDropdown;
