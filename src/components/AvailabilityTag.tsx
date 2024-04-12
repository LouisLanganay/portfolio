import React, { FC, useState } from 'react';
import HiringModal from './HiringModal';
import Button from './Button';
import { useTranslation } from 'react-i18next';

const AvailabilityTag: FC = () => {
  const available = true;
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {modalOpen && (
        <HiringModal
          available={available}
          onClose={() => setModalOpen(false)}
        />
      )}
      <Button type='primary' onClick={() => setModalOpen(true)} disabled={!available}>
        <div className='relative flex flex-row items-center gap-x-5'>
          <div className='relative flex flex-row items-center gap-x-2'>
            <div className={`w-3 h-3 ${available ?
              'bg-green-500' : 'bg-red-500'} rounded-full animate-ping absolute`}/>
            <div className={`w-3 h-3 ${available ?
              'bg-green-500' : 'bg-red-500'} rounded-full absolute`}/>
          </div>
          <span>{available ?
            t('hiring.status.hiring') :
            t('hiring.status.not_hiring')}
          </span>
        </div>
      </Button>
    </>
  );
};

export default AvailabilityTag;
