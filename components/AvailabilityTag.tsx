'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { Button } from './ui/button';
import { HiringModal } from './HiringModal';

export function AvailabilityTag() {
  const available = true;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <HiringModal
        available={available}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <Button variant='primary' ring shiny onClick={() => setModalOpen(true)} disabled={!available}>
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
