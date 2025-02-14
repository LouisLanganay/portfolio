import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function CopyButton({ onClick }: { onClick: () => void }) {
  const [ hasCopied, setHasCopied ] = useState(false);

  const handleClick = () => {
    onClick();
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      className='absolute top-2 right-2 text-white dark:hover:bg-gray-200/20'
      onClick={handleClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        {hasCopied ? (
          <motion.div
            key="check"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            transition={{ duration: 0.10 }}
          >
            <CheckIcon className='size-4' />
          </motion.div>
        ) : (
          <motion.div
            key="clipboard"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            transition={{ duration: 0.10 }}
          >
            <ClipboardIcon className='size-4' />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}