import clsx from 'clsx';
import React, { FC, HTMLProps, ReactNode } from 'react';

interface ProjectCardItemProps extends HTMLProps<HTMLDivElement> {
  tooltip?: string;
  className?: string;
  children: ReactNode;
}

const ProjectCardItem: FC<ProjectCardItemProps> = ({
  tooltip, children, className
}) => {
  return (
    <div className='flex-col flex-shrink-0 text-center justify-center items-center flex relative'>
      <span className={clsx(
        'flex flex-row items-center bg-tertiary-480 py-1 px-3 transition-all rounded-lg border-[1px] border-tertiary-450 duration-300 peer',
        tooltip && 'cursor-pointer',
        className
      )}>
        {children}
      </span>
      {tooltip && (
        <div className='flex opacity-0 bottom-11 bg-tertiary-480 text-white/90 absolute border-[1px] border-tertiary-450 shadow font-regular rounded py-1 px-2 items-center text-center translate-y-2 peer-hover:translate-y-0 peer-hover:opacity-100 whitespace-nowrap transition-all duration-200 z-[50]'>
          {tooltip}
          <svg
            className='absolute text-tertiary-480 h-2 top-full left-1/2 transform -translate-x-1/2'
            x='0px'
            y='0px'
            viewBox='0 0 500 255'
            xmlSpace='preserve'
            fill='currentColor'
          >
            <polygon className='fill-current' points='0,0 250,255 500,0' />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ProjectCardItem;
