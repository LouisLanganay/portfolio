import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface Link {
  name: string;
  url: string;
}

const Footer: React.FC = () => {
  const Year = new Date().getFullYear();
  const navigate = useNavigate();
  const links: Link[] = [
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
    <footer className='py-4 px-5 flex flex-col justify-between max-w-4xl
    items-center m-auto w-full'>
      <div className='flex flex-row w-full'>
        <p className='text-white/70 font-Mregular text-sm md:text-base'>
          © {Year} Louis Langanay
        </p>
      </div>
      <div className='w-full h-[1px] border-tertiary-400 border-dashed border-t-[1px]
      my-2' />
      <div className='flex flex-row justify-between w-full'>
        <div className='flex flex-row items-center flex-shrink-0'>
          <img onClick={() => { window.location.href = '/'; }}
            src='https://avatars.githubusercontent.com/u/114762819?v=4'
            alt='Github'
            className='w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer'
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
      </div>
    </footer>
  );
};

export default Footer;
