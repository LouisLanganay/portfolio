'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { Button } from './ui/button';
import { HiringModal } from './HiringModal';

export function AvailabilityTag() {
  const available = false;
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (available)
      setModalOpen(true);
  };

  return (
    <>
      <HiringModal
        available={available}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <Button
        variant='primary'
        ring
        shiny
        onClick={() => handleClick()}
        className={clsx(available ? 'cursor-pointer' : 'cursor-not-allowed')}
      >
        <div className='relative flex flex-row items-center gap-x-5'>
          <div className='relative flex flex-row items-center gap-x-2'>
            <div
              className={clsx(
                'size-3 rounded-full animate-ping absolute',
                available ? 'bg-green-500' : 'bg-red-500'
              )}
            />
            <div
              className={clsx(
                'size-3 rounded-full absolute',
                available ? 'bg-green-500' : 'bg-red-500'
              )}
            />
          </div>
          <span>{available ? 'AVAILABLE FOR HIRING' : 'NOT AVAILABLE FOR HIRING'}</span>
        </div>
      </Button>
    </>
  );
};
