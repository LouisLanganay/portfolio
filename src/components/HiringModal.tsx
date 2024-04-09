import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { FC, useEffect, useRef } from 'react';
import Button from './Button';

interface HiringModalProps {
  available: boolean
  onClose: () => void;
}

const HiringModal: FC<HiringModalProps> = ({ available, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, onClose]);

  return (
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0
      bg-gray-1000 bg-opacity-50 backdrop-filter backdrop-blur-sm z-50'/>
      <div className='fixed left-0 right-0 top-0 z-50 p-4 animate-fade-in transition-all
      duration-300 w-full h-full flex justify-center'>
        <div className='relative w-fit min-w-0 sm:min-w-[600px] max-w-lg
        max-h-full m-auto'>
          <div className='relative bg-tertiary-600 rounded-lg shadow ring-1
          ring-tertiary-480 pb-6 px-3 pt-4 text-center flex flex-col
            items-center' ref={modalRef}>
            <div className='flex flex-row justify-end items-center w-full h-fit'>
              <div className='flex flex-row w-full items-center'>
                <p className='text-lg font-regular text-white pl-3'>
                  {
                    status === 'AVAILABLE' ?
                      'AVAILABLE FOR HIRING' : 'NOT AVAILABLE FOR HIRING'
                  }
                </p>
              </div>
              <div className='flex flex-row justify-end items-center h-fit'>
                <button className='p-2 text-white text-opacity-80 hover:text-opacity-100
                transition-colors duration-300 rounded-lg'
                onClick={() => onClose()}>
                  <XMarkIcon className='w-6 h-6'/>
                </button>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center w-full h-full
            gap-y-2 mt-4 px-3'>
              <Button type='primary' className='w-full' onClick={() => {
                window.open('https://discord.com/users/660435627757666311', '_blank');
              }}>
                Contact me on Discord
              </Button>
              <Button type='primary' className='w-full' onClick={() => {
                window.open('mailto:louis.langanay@epitech.eu', '_blank');
              }}>
                Contact me by E-Mail
              </Button>
              <Button type='secondary' className='w-full' onClick={() => {
                window.open('https://www.linkedin.com/in/louis-langanay/', '_blank');
              }}>
                View my LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HiringModal;
