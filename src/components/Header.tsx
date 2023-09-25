import React from 'react';

const Header: React.FC = () => {
  return (
    <header className='py-4 lg:px-36 px-5 flex flex-row justify-between
    items-center sticky top-0 backdrop-blur bg-tertiary-480 bg-opacity-80'>
      <h1 className='text-2xl font-Mblack text-white'>Louis.L</h1>
      <div className='flex flex-row items-center'>
        <img
          src='https://avatars.githubusercontent.com/u/114762819?v=4'
          alt='Github'
          className='w-8 h-8 rounded-full'
        />
      </div>
    </header>
  );
};

export default Header;
