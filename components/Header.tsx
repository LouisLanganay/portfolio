'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { MoonIcon } from '@heroicons/react/24/outline';
import { SunIcon } from '@heroicons/react/24/outline';
import { AvailabilityTag } from './AvailabilityTag';
import { Button } from './ui/button';

const links = [
  {
    name: 'Github',
    url: 'https://github.com/LouisLanganay'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/louis-langanay/'
  },
  {
    name: 'Discord',
    url: 'https://discord.com/users/660435627757666311'
  },
  {
    name: 'E-Mail',
    url: 'mailto:louislanganay@gmail.com'
  }
];

export function Header() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <div
      className='sticky top-0 transition-all duration-300 z-10 bg-white/10 dark:bg-tertiary-600/10 backdrop-blur-lg'
    >
      <header className='py-4 px-5 flex flex-row justify-between max-w-4xl items-center m-auto'>
        <div className='flex flex-row items-center shrink-0'>
          <img
            onClick={() => router.push('/') }
            src='https://avatars.githubusercontent.com/u/114762819?v=4'
            alt='Github'
            className='w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer'
          />
          <span className='sr-only'>
            Louis Langanay
          </span>
        </div>
        <div className='flex flex-row gap-4 justify-end md:justify-end w-full items-center flex-wrap md:flex-nowrap relative'>
          {links.map((link, i) => (
            <a
              href={link.url}
              key={i}
              target='_blank'
              className='group w-fit ease-in-out font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer hidden sm:block text-sm md:text-base'>
              <span className='bg-left-bottom bg-linear-to-r from-white/90 to-white/90 bg-[length:0%_1px] bg-no-repeat pb-0 group-hover:bg-[length:100%_1px] transition-all duration-500 ease-out flex gap-2'>
                {link.name}
              </span>
            </a>
          ))}
          <AvailabilityTag />
        </div>
      </header>
    </div>
  );
}
