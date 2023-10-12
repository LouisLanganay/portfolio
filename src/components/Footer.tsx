import React from 'react';
import ContactButton from './ContactButton';

const Footer: React.FC = () => {
  const Year = new Date().getFullYear();
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

  return (
    <footer className='py-4 lg:px-36 px-5 flex flex-row
    justify-between items-center border-t border-tertiary-450 flex-wrap-reverse
    md:flex-nowrap gap-y-5'>
      <div className='flex flex-row flex-shrink-0 gap-4'>
        <img onClick={() => { window.location.href = '/'; }}
          src='https://avatars.githubusercontent.com/u/114762819?v=4'
          alt='Github'
          className='w-10 h-10 rounded-full cursor-pointer'
        />
        <div className='flex flex-col'>
          <p className='text-sm text-white opacity-40'>
            louislanganay@gmail.com
          </p>
          <p className='text-sm text-white opacity-40'>
            © Louis {Year}. All Rights Reserved.
          </p>
        </div>
      </div>
      <div className='flex flex-row gap-4 justify-center md:justify-end w-full
      items-center flex-wrap md:flex-nowrap'>
        {links.map((link, i) => (
          <a href={link.url} key={i} target='_blank'
            className='group w-fit ease-in-out font-Mmedium text-tertiary-0
            hover:text-secondary-500 cursor-pointer'>
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
    </footer>
  );
};

export default Footer;
