'use client';

import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './ui/button';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface HiringModalProps {
  available: boolean
  isOpen: boolean;
  onClose: () => void;
}

export function HiringModal({ available, isOpen, onClose }: HiringModalProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  return (
    <Dialog open={isOpen} as='div' className='relative z-10 focus:outline-hidden' onClose={onClose}>
      <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-1000 bg-opacity-50 backdrop-filter backdrop-blur-xs z-50 transition data-closed:bg-opacity-0'/>
      <div className='fixed inset-0 z-50 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='max-w-4xl w-full h-fit relative bg-tertiary-600 rounded-lg shadow-sm ring-1 ring-tertiary-480 pb-6 px-3 pt-4 text-center flex flex-col items-center transition data-closed:transform-[scale(95%)] data-closed:opacity-0'
          >
            <div className='flex flex-row justify-end items-center w-full h-fit'>
              <div className='flex flex-row w-full items-center'>
                <p className='text-lg font-regular text-white pl-3'>
                  {
                    available === true ?
                      'AVAILABLE FOR HIRING' : 'NOT AVAILABLE FOR HIRING'
                  }
                </p>
              </div>
              <div className='flex flex-row justify-end items-center h-fit'>
                <button
                  className='p-2 text-white text-opacity-80 hover:text-opacity-100 transition-colors duration-300 rounded-lg cursor-pointer'
                  onClick={() => onClose()}
                >
                  <XMarkIcon className='w-6 h-6'/>
                </button>
              </div>
            </div>
            {available ? (
              <div className='flex flex-col justify-center items-center w-full h-full gap-y-4 mt-4 px-3'>
                <div className='w-full h-full rounded-lg overflow-hidden'>
                  <Cal
                    namespace="30min"
                    calLink="louislanganay/30min"
                    style={{width:"100%",height:"100%",overflow:"scroll"}}
                    config={{"layout":"month_view"}}
                  />
                </div>
                <div className='flex flex-col gap-y-2 w-full'>
                  <Button
                    variant='primary'
                    className='w-full'
                    onClick={() => {
                      window.open('https://discord.com/users/660435627757666311', '_blank');
                    }}
                  >
                    Contact me on Discord
                  </Button>
                  <Button
                    variant='primary'
                    className='w-full'
                    onClick={() => {
                      window.open('mailto:louis.langanay@epitech.eu', '_blank');
                    }}
                  >
                    Contact me by E-Mail
                  </Button>
                  <Button
                    variant='secondary'
                    className='w-full'
                    onClick={() => {
                      window.open('https://www.linkedin.com/in/louis-langanay/', '_blank');
                    }}
                  >
                    View my LinkedIn
                  </Button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col justify-center items-center w-full h-full gap-y-2 mt-4 px-3'>
                <p className='text-white text-opacity-80 mb-4'>
                  I&apos;m currently not available for new opportunities, but feel free to reach out for future collaborations!
                </p>
                <Button
                  variant='primary'
                  className='w-full'
                  onClick={() => {
                    window.open('https://discord.com/users/660435627757666311', '_blank');
                  }}
                >
                  Contact me on Discord
                </Button>
                <Button
                  variant='primary'
                  className='w-full'
                  onClick={() => {
                    window.open('mailto:louis.langanay@epitech.eu', '_blank');
                  }}
                >
                  Contact me by E-Mail
                </Button>
                <Button
                  variant='secondary'
                  className='w-full'
                  onClick={() => {
                    window.open('https://www.linkedin.com/in/louis-langanay/', '_blank');
                  }}
                >
                  View my LinkedIn
                </Button>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
