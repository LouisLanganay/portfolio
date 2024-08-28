import React, { FC, useState } from 'react';
import HiringModal from './HiringModal';
import Button from './Button';
import clsx from 'clsx';

const AvailabilityTag: FC = () => {
  const available = true;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && (
        <HiringModal
          available={available}
          onClose={() => setModalOpen(false)}
        />
      )}
      <Button variant='primary' ring onClick={() => setModalOpen(true)} disabled={!available}>
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

export default AvailabilityTag;
