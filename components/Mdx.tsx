'use client';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { ChatBubbleBottomCenterTextIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { CodeBlock } from './CodeBlock';
import { ComponentPreview } from './ComponentPreview';

interface MDXProps {
  code: MDXRemoteSerializeResult;
  raw: string;
}

const components = {
  ComponentPreview,
  h1: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className='font-bold text-2xl md:text-3xl mb-4 mt-6 text-white tracking-tight leading-tight' {...props} />
  ),
  h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className='font-semibold text-xl md:text-2xl mb-3 mt-6 text-white tracking-tight leading-tight' {...props} />
  ),
  h3: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className='font-medium text-lg md:text-xl mb-2 mt-4 text-white tracking-tight leading-tight' {...props} />
  ),
  h4: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className='font-medium text-base md:text-lg mb-2 mt-4 text-white tracking-tight leading-tight' {...props} />
  ),
  h5: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className='font-medium text-sm md:text-base mb-2 mt-3 text-white tracking-tight leading-tight' {...props} />
  ),
  p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className='text-sm leading-6 mb-3 text-white/80' {...props} />
  ),
  a: ({ ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className='text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300/50 transition-colors duration-200 text-sm'
      {...props}
      target='_blank'
      rel='noreferrer'
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className='border-gray-600 my-6' {...props} />
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { node?: any }) => {
    if (props.node?.children[1].type === 'element') {
      const value = (props.node.children[1].children[0] as { value: string }).value;
      let content = '';
      let contentArray = '';
      if (Array.isArray(children) && children[1] && typeof children[1] === 'object' && 'props' in children[1] && 'children' in children[1].props) {
        content = (children[1] as { props: { children: string } }).props.children;
        contentArray = content.slice(1);
      }

      if (value.startsWith('[!NOTE]')) {
        return (
          <blockquote className='border-l-4 border-blue-500 pl-3 py-2 my-3 bg-blue-500/10 rounded-r-lg' {...props}>
            <div className='flex flex-row items-center gap-2 mb-1'>
              <InformationCircleIcon className='w-4 h-4 text-blue-500' />
              <span className='font-semibold text-xs text-blue-500 uppercase tracking-wide'>Note</span>
            </div>
            <p className='text-sm text-white/90 leading-5'>
              {content[0].slice(7)}
              {contentArray}
            </p>
          </blockquote>
        );
      } else if (value.startsWith('[!IMPORTANT]')) {
        return (
          <blockquote className='border-l-4 border-purple-500 pl-3 py-2 my-3 bg-purple-500/10 rounded-r-lg' {...props}>
            <div className='flex flex-row items-center gap-2 mb-1'>
              <ChatBubbleBottomCenterTextIcon className='w-4 h-4 text-purple-500' />
              <span className='font-semibold text-xs text-purple-500 uppercase tracking-wide'>Important</span>
            </div>
            <p className='text-sm text-white/90 leading-5'>{value.slice(13)}</p>
          </blockquote>
        );
      } else if (value.startsWith('[!WARNING]')) {
        return (
          <blockquote className='border-l-4 border-orange-500 pl-3 py-2 my-3 bg-orange-500/10 rounded-r-lg' {...props}>
            <div className='flex flex-row items-center gap-2 mb-1'>
              <ExclamationTriangleIcon className='w-4 h-4 text-orange-500' />
              <span className='font-semibold text-xs text-orange-500 uppercase tracking-wide'>Warning</span>
            </div>
            <p className='text-sm text-white/90 leading-5'>{value.slice(11)}</p>
          </blockquote>
        );
      } else {
        return (
          <blockquote className='border-l-4 border-gray-500 pl-3 py-2 my-3 bg-gray-500/10 rounded-r-lg' {...props}>
            <p className='text-sm text-white/90 leading-5'>{value}</p>
          </blockquote>
        );
      }
    }
    return <blockquote className='border-l-4 border-gray-500 pl-3 py-2 my-3 bg-gray-500/10 rounded-r-lg' {...props} />;
  },
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <CodeBlock
        language={match[1]}
        {...props}
      >
        {children}
      </CodeBlock>
    ) : (
      <code className='bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-xs font-mono'>{children}</code>
    );
  },
  pre: ({ ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className='bg-gray-900 border border-gray-700 rounded-lg p-3 overflow-x-auto my-4' {...props} />
  ),
  li: ({ ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className='text-sm leading-6 mb-1 text-white/80' {...props} />
  ),
  ul: ({ ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className='list-disc list-inside mb-3 space-y-0.5' {...props} />
  ),
  ol: ({ ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className='list-decimal list-inside mb-3 space-y-0.5' {...props} />
  ),
  input: ({ ...props }: React.HTMLAttributes<HTMLInputElement>) => (
    <input
      className='w-3.5 h-3.5 text-blue-500 rounded border-gray-600 bg-gray-700 focus:ring-blue-500 focus:ring-2'
      {...props}
    />
  ),
  table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <table className='w-full border-collapse border border-gray-600 rounded-lg overflow-hidden my-4' {...props} />
  ),
  th: ({ ...props }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th className='border border-gray-600 px-3 py-2 text-left font-semibold text-white bg-gray-800 text-sm' {...props} />
  ),
  td: ({ ...props }: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td className='border border-gray-600 px-3 py-2 text-white/80 text-sm' {...props} />
  ),
  tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className='hover:bg-gray-800/50 transition-colors duration-150' {...props} />
  ),
  br: ({ ...props }: React.HTMLAttributes<HTMLBRElement>) => (
    <br className='my-3' {...props} />
  ),
  img: ({ ...props }: React.HTMLAttributes<HTMLImageElement>) => (
    <div className='my-4'>
      <img className='w-full h-auto rounded-lg shadow-lg' {...props} />
    </div>
  ),
  strong: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className='font-semibold text-white text-sm' {...props} />
  ),
  em: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className='italic text-white/90 text-sm' {...props} />
  ),
};

export function Mdx({ code, raw }: MDXProps) {
  const MDXContent = useMDXComponent(raw);
  return (
    <article className='font-inter text-white max-w-4xl mx-auto leading-relaxed'>
      <MDXContent components={components} />
    </article>
  );
}