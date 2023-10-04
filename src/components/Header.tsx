import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [ style, setStyle ] = useState<string | null>('bg-tertiary-500');

  const listenScrollEvent = () => {
    if (window.scrollY > 50) {
      setStyle('bg-tertiary-480 backdrop-blur bg-opacity-80');
    } else {
      setStyle('bg-tertiary-500');
    }
  };

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
        <h1 className='text-2xl font-Mblack text-white cursor-pointer'
          onClick={() => window.location.href = '/'}>
          Louis.L
        </h1>
      </div>
      <div className='flex flex-row items-center'>
        <img onClick={() => { window
          .open('https://github.com/LouisLanganay', '_blank');
        }}
        src='https://avatars.githubusercontent.com/u/114762819?v=4'
        alt='Github'
        className='w-8 h-8 rounded-full cursor-pointer'
        />
        <button onClick={() => {
          window.open('https://discord.com/users/660435627757666311','_blank');
        }}
        className='transition-all duration-300 hover:bg-secondary-500
        ease-in-out text-white font-Mmedium px-4 py-2
        border-tertiary-400 border-2 rounded-full ml-4'>
          Contact Me
        </button>
      </div>
    </header>
  );
};

export default Header;
