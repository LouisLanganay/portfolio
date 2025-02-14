import { Button } from '@/components/Button';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import React from 'react';

const ButtonOutline = () => {
  return (
    <Button
      variant='primaryOutline'
      size='md'
    >
      Upgrade to Pro <RocketLaunchIcon className='size-5' />
    </Button>
  );
};

export default ButtonOutline;