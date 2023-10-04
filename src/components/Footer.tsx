import React from 'react';

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
    }
  ];

  return (
    <footer className='py-4 lg:px-36 px-5 flex flex-row
    justify-between items-center border-t border-tertiary-450 flex-wrap-reverse
    md:flex-nowrap gap-y-5'>
      <div className='flex flex-col flex-shrink-0'>
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
      <div className='flex flex-row gap-4 justify-center md:justify-end w-full
      items-center'>
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
        <button onClick={() => {
          window.open('https://discord.com/users/660435627757666311','_blank');
        }}
        className='transition-all duration-300 hover:bg-secondary-500
        ease-in-out text-white font-Mmedium px-4 py-2 ml-16
        border-tertiary-400 border-2 rounded-full'>
          Contact Me
        </button>
      </div>
    </footer>
  );
};

export default Footer;
