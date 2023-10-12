import React, { useEffect, useState } from 'react';
import ContactButton from './ContactButton';

const Header: React.FC = () => {
  const [ style, setStyle ] = useState<string | null>('bg-tertiary-500');

  const listenScrollEvent = () => {
    if (window.scrollY > 50) {
      setStyle('bg-tertiary-480 backdrop-blur bg-opacity-80');
    } else {
      setStyle('bg-tertiary-500');
    }
  };

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

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  if (window.location.pathname !== '/')
    return null;

  return (
    <header className={`py-4 lg:px-36 px-5 flex flex-row justify-between
    items-center sticky top-0 ${style}
    transition-all duration-300 z-50`}>
      <div className='flex flex-row items-center'>
        <img onClick={() => { window.location.href = '/'; }}
          src='https://avatars.githubusercontent.com/u/114762819?v=4'
          alt='Github'
          className='w-10 h-10 rounded-full cursor-pointer'
        />
      </div>
      <div className='flex flex-row gap-4 justify-end md:justify-end w-full
      items-center flex-wrap md:flex-nowrap'>
        {links.map((link, i) => (
          <a href={link.url} key={i} target='_blank'
            className='group w-fit ease-in-out font-Mmedium text-tertiary-0
            hover:text-secondary-500 cursor-pointer hidden sm:block'>
            <span className='bg-left-bottom bg-gradient-to-r
            from-secondary-500 to-secondary-500 bg-[length:0%_2px]
            bg-no-repeat pb-1 group-hover:bg-[length:100%_2px] transition-all
            duration-500 ease-out flex gap-2'>
              {link.name}
            </span>
          </a>
        ))}
        <ContactButton />
      </div>
    </header>
  );
};

export default Header;
