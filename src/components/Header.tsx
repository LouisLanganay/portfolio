import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvailabilityTag from './AvailabilityTag';
import clsx from 'clsx';
import Button from './Button';
import { getTheme, switchTheme } from '../lib/Theme';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

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

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [ currentTheme, setCurrentTheme ] = useState<'dark' | 'light'>(getTheme());

  const handleSwitchTheme = () => {
    switchTheme();
    setCurrentTheme(getTheme());
  };

  return (
    <div
      className={clsx(
        'sticky top-0 transition-all duration-300 z-50 bg-tertiary-600/10',
        window.scrollY > 50 && 'backdrop-blur-lg'
      )}
    >
      <header className='py-4 px-5 flex flex-row justify-between max-w-4xl items-center m-auto'>
        <div className='flex flex-row items-center flex-shrink-0'>
          <img
            onClick={() => {
              navigate('/');
            }}
            src='https://avatars.githubusercontent.com/u/114762819?v=4'
            alt='Github'
            className='w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer'
          />
          <span className='sr-only'>
            Louis Langanay
          </span>
        </div>
        <div className='flex flex-row gap-4 justify-end md:justify-end w-full items-center flex-wrap md:flex-nowrap'>
          {links.map((link, i) => (
            <a
              href={link.url}
              key={i}
              target='_blank'
              className='group w-fit ease-in-out font-Mmedium text-gray-200 hover:text-gray-100 cursor-pointer hidden sm:block text-sm md:text-base'>
              <span className='bg-left-bottom bg-gradient-to-r from-white/90 to-white/90 bg-[length:0%_1px] bg-no-repeat pb-0 group-hover:bg-[length:100%_1px] transition-all duration-500 ease-out flex gap-2'>
                {link.name}
              </span>
            </a>
          ))}
          <AvailabilityTag />
        </div>
      </header>
    </div>
  );
};

export default Header;
