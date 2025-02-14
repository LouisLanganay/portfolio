'use client';

import registry, { ComponentName } from '@/app/registry';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useMemo, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { Button } from './Button';
import { CodeBlock } from './CodeBlock';

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: ComponentName;
  source?: boolean;
  default?: 'preview' | 'source';
}

export function ComponentPreview({
  name,
  source,
  default: defaultTab = 'preview',
  children,
  ...props
}: ComponentPreviewProps) {
  const [key, setKey] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [sourceCode, setSourceCode] = useState<string | null>(null);

  const handleReload = () => {
    setIsSpinning(true);
    setKey((prev) => prev + 1);

    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };

  const Preview = useMemo(() => {
    const Component = registry[name]?.component;

    if (!Component) {
      console.error(`Component with name '${name}' not found in registry.`);
      return (
        <p className='text-sm text-muted-foreground'>
          Component{' '}
          <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm'>
            {name}
          </code>{' '}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name, key]);

  useEffect(() => {
    const source = registry[name]?.source;

    if (!source) {
      console.error(`Component with name '${name}' not found in registry.`);
      return;
    }
    setSourceCode(source.default);
  }, [name, key]);

  // Si pas de source, retourner directement le preview sans les tabs
  if (!source) {
    return (
      <div
        className='relative flex flex-col gap-4 rounded-lg bg-tertiary-650 border-gray-300/30 border mb-5 dark:border-gray-700'
        {...props}
      >
        <div className='relative z-10 flex gap-4 flex-col'>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleReload}
            className='absolute right-0 top-0 z-10 mt-2 mr-2'
          >
            <ArrowPathIcon className={clsx(
              'size-4',
              isSpinning && 'animate-spin'
            )} />
          </Button>
          <div className='justify-center items-center flex flex-col pt-10 px-4 pb-10 sm:px-10' key={key}>
            {Preview}
          </div>
        </div>
        <div className='absolute inset-0 rounded-lg overflow-hidden pointer-events-none'>
          <div className='absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white dark:from-tertiary-650 to-transparent'/>
          <div className='absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white dark:from-tertiary-650 to-transparent'/>
          <div className='absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white dark:from-tertiary-650 to-transparent'/>
          <div className='absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-tertiary-650 to-transparent'/>
        </div>
      </div>
    );
  }

  return (
    <TabGroup defaultIndex={defaultTab === 'preview' ? 0 : 1}>
      <TabList className='flex gap-4 border-b border-gray-300/30'>
        <Tab
          className='font-medium text-gray-900 data-[selected]:border-b-2 border-gray-900 outline-none pb-[10px] data-[selected]:!pb-2 px-4 pt-4 dark:border-gray-700 dark:text-white'
        >
          Preview
        </Tab>
        {source && (
          <Tab
            className='font-medium text-gray-900 data-[selected]:border-b-2 border-gray-900 outline-none pb-[10px] data-[selected]:!pb-2 px-4 pt-4 dark:border-gray-700 dark:text-white'
          >
            Source
          </Tab>
        )}
      </TabList>
      <TabPanels className='mt-2'>
        <TabPanel>
        <div
          className='relative flex flex-col gap-4 rounded-lg bg-tertiary-650 border-gray-300/30 border mb-5 dark:border-gray-700'
          {...props}
        >
          <div className='relative z-10 flex gap-4 flex-col'>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleReload}
              className='absolute right-0 top-0 z-10 mt-2 mr-2'
            >
              <ArrowPathIcon className={clsx(
                'size-4',
                isSpinning && 'animate-spin'
              )} />
            </Button>
            <div className='justify-center items-center flex flex-col pt-10 px-4 pb-10 sm:px-10' key={key}>
              {Preview}
            </div>
          </div>
          <div className='absolute inset-0 rounded-lg overflow-hidden pointer-events-none'>
            <div className='absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white dark:from-tertiary-650 to-transparent'/>
            <div className='absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white dark:from-tertiary-650 to-transparent'/>
            <div className='absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white dark:from-tertiary-650 to-transparent'/>
            <div className='absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-tertiary-650 to-transparent'/>
          </div>
        </div>
        </TabPanel>
        <TabPanel>
          <CodeBlock>
            {sourceCode}
          </CodeBlock>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}