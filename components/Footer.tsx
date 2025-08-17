'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';

interface Link {
  name: string;
  url: string;
}

export function Footer() {
  const Year = new Date().getFullYear();
  const router = useRouter();
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
    <footer className='py-4 px-5 flex flex-col justify-between max-w-4xl items-center m-auto w-full' role="contentinfo" aria-label="Footer">
      <div className='flex flex-row w-full'>
        <p className='text-white/70 font-normal text-sm md:text-base'>
          © {Year} Louis Langanay - Full Stack Developer
        </p>
      </div>
      <div className='w-full h-px border-tertiary-400 border-dashed border-t my-2' />
      <div className='flex flex-row justify-between w-full'>
        <div className='flex flex-row items-center shrink-0'>
          <Image
            src='https://avatars.githubusercontent.com/u/114762819?v=4'
            alt='Louis Langanay - Photo de profil'
            className='w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer'
            onClick={() => { router.push('/') }}
            loading="lazy"
            width={32}
            height={32}
          />
        </div>
        <nav className='flex flex-row gap-4 justify-end md:justify-end w-full items-center flex-wrap md:flex-nowrap' aria-label="Liens sociaux">
          {links.map((link, i) => (
            <a
              href={link.url}
              key={i}
              target='_blank'
              rel="noopener noreferrer"
              className='group w-fit ease-in-out font-normal text-white/70 hover:text-white/90 cursor-pointer hidden sm:block text-sm md:text-base'
              aria-label={`Visiter mon profil ${link.name}`}
            >
              <span className='bg-bottom-left bg-linear-to-r from-white/90 to-white/90 bg-size-[0%_1px] bg-no-repeat pb-0 group-hover:bg-size-[100%_1px] transition-all duration-500 ease-out flex gap-2'>
                {link.name}
              </span>
            </a>
          ))}
          <Button variant='primary' link='mailto:louislanganay@gmail.com' className='ml-5' aria-label="Me contacter par email">
            Contact me
          </Button>
        </nav>
      </div>
    </footer>
  );
}
