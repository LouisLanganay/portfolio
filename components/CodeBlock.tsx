import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import clsx from 'clsx';
import { Button } from './ui/button';
import { CopyButton } from './CopyButton';

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonTitle?: string;
  language?: string;
}

export function CodeBlock({
  buttonTitle,
  language = 'plaintext',
  children,
  className,
  ...props
}: CodeBlockProps) {
  const codeRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const rawString = (children as React.ReactElement)?.props?.children as string || '';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
      setIsLoading(false);
    }
  }, [children, isOpened]);



  const CodeContainer = ({ isExpandable }: { isExpandable: boolean }) => (
    <div className={clsx('relative w-full rounded-lg border-gray-300/30 border dark:border-gray-700', isExpandable && !isOpened && 'max-h-52 overflow-hidden', isExpandable && isOpened && 'overflow-y-auto')}>
      <pre className='relative w-full rounded-lg overflow-auto bg-tertiary-650 text-wrap p-2'>
        <CopyButton onClick={() => navigator.clipboard.writeText(rawString)} />
        <code ref={codeRef} className={`language-${language} bg-tertiary-650! font-poppins! text-sm`}>
          {isLoading ? 'Loading...' : children}
        </code>
      </pre>
      {isExpandable && (
        <div className={clsx('absolute flex items-center justify-center bg-linear-to-t from-tertiary-650 to-transparent transition-all duration-200 px-5', isOpened ? 'inset-x-0 bottom-0 h-12 from-gray-900/30' : 'inset-0')}>
          <Button onClick={() => setIsOpened((prev) => !prev)} variant={'secondary'} size='md'>
            {isOpened ? 'Hide code' : buttonTitle}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className={clsx('relative overflow-hidden', className)}>
      {buttonTitle && rawString?.length > 350 ? (
        <CodeContainer isExpandable />
      ) : (
        <div className='w-full rounded-lg max-h-96 overflow-y-auto'>
          <pre className='relative w-full rounded-lg overflow-auto bg-tertiary-650 text-wrap p-2 border-gray-300/30 border dark:border-gray-700'>
            <CopyButton onClick={() => navigator.clipboard.writeText(rawString)} />
            <code ref={codeRef} className={`language-${language} bg-tertiary-650! font-poppins! text-sm`}>
              {children}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}