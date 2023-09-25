import React from 'react';

const Footer: React.FC = () => {
  const Year = new Date().getFullYear();
  return (
    <footer className='py-4 lg:px-36 px-5 flex flex-row
    justify-between items-center border-t border-tertiary-450'>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-Mblack text-white'>
          Louis.L
        </h1>
        <p className='text-sm text-white opacity-40'>
          louislanganay@gmail.com
        </p>
        <p className='text-sm text-white opacity-40'>
          © Louis {Year}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
