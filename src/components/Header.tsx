import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [ style, setStyle ] = useState<string | null>('');
  const navigate = useNavigate();

  const listenScrollEvent = () => {
    if (window.scrollY > 50) {
      setStyle('transition-all duration-200 -translate-y-20');
    } else {
      setStyle('');
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

  return (
    <div className={`sticky top-0 ${style} transition-all duration-300 z-50`}>
      <header className='py-4 px-5 flex flex-row justify-between max-w-4xl items-center
      m-auto'>
        <div className='flex flex-row items-center'>
          <img onClick={() => {
            navigate('/');
          }}
          src='https://avatars.githubusercontent.com/u/114762819?v=4'
          alt='Github'
          className='w-10 h-10 rounded-full cursor-pointer'
          />
        </div>
        <div className='flex flex-row gap-4 justify-end md:justify-end w-full
        items-center flex-wrap md:flex-nowrap'>
          {links.map((link, i) => (
            <a href={link.url} key={i} target='_blank'
              className='group w-fit ease-in-out font-Mmedium text-white/70
              hover:text-white/90 cursor-pointer hidden sm:block text-sm md:text-base'>
              <span className='bg-left-bottom bg-gradient-to-r
              from-white/90 to-white/90 bg-[length:0%_1px]
              bg-no-repeat pb-0 group-hover:bg-[length:100%_1px] transition-all
              duration-500 ease-out flex gap-2'>
                {link.name}
              </span>
            </a>
          ))}
          <Button type='primary' link='mailto:louislanganay@gmail.com' className='ml-5'>
            Contact me
          </Button>
        </div>
      </header>
    </div>
  );
};

export default Header;
