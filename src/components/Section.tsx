import React, { FC, ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  title: string;
}

const Section: FC<SectionProps> = ({ children , title}) => {
  return (
    <section className='flex flex-col w-full flex-wrap xl:flex-nowrap my-16'>
      <div className='flex flex-row gap-4 items-center w-full mb-8'>
        <h4 className='text-sm md:text-base font-Mregular text-white/70 flex-shrink-0'>
          {title}
        </h4>
        <hr className='w-full border-tertiary-450' />
      </div>
      {children}
    </section>
  );
};

export default Section;
