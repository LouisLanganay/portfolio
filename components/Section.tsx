import React, { FC, ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  title?: string;
}

export function Section({ children, title }: SectionProps) {
  return (
    <section className='flex flex-col w-full flex-wrap xl:flex-nowrap my-16'>
      {title && (
        <div className='flex flex-row gap-4 items-center w-full mb-8'>
          <h4 className='text-sm md:text-base font-normal dark:text-white/70 text-black/70 flex-shrink-0'>
            {title}
          </h4>
          <hr className='w-full dark:border-tertiary-450 border-tertiary-100' />
        </div>
      )}
      {children}
    </section>
  );
}
