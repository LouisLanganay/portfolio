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
    <h1 className='font-black text-xl md:text-2xl mb-2 text-white' {...props} />
  ),
  h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className='font-extrabold text-lg md:text-xl mb-2 text-white' {...props} />
  ),
  h3: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className='font-bold text-base md:text-lg mb-2 text-white' {...props} />
  ),
  h4: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className='font-semibold text-sm md:text-base mb-2 text-white' {...props} />
  ),
  h5: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className='font-medium text-xs md:text-sm mb-2 text-white' {...props} />
  ),
  a: ({ ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className='text-secondary-500 hover:underline cursor-pointer'
      {...props}
      target='_blank'
      rel='noreferrer'
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className='border-secondary-500 my-5' {...props} />
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
          <blockquote className='border-l-4 border-secondary-500 pl-3 my-2 flex flex-col gap-1' {...props}>
            <div className='flex flex-row items-center gap-2'>
              <InformationCircleIcon className='w-5 h-5 text-secondary-500' />
              <span className='font-Mbold text-base text-secondary-500'>Note</span>
            </div>
            <p className='text-base'>
              {content[0].slice(7)}
              {contentArray}
            </p>
          </blockquote>
        );
      } else if (value.startsWith('[!IMPORTANT]')) {
        return (
          <blockquote className='border-l-4 border-purple-500 pl-3 my-2 flex flex-col gap-1' {...props}>
            <div className='flex flex-row items-center gap-2'>
              <ChatBubbleBottomCenterTextIcon className='w-5 h-5 text-purple-500' />
              <span className='font-Mbold text-base text-purple-500'>Important</span>
            </div>
            <p className='text-base'>{value.slice(13)}</p>
          </blockquote>
        );
      } else if (value.startsWith('[!WARNING]')) {
        return (
          <blockquote className='border-l-4 border-main-500 pl-3 my-2 flex flex-col gap-1' {...props}>
            <div className='flex flex-row items-center gap-2'>
              <ExclamationTriangleIcon className='w-5 h-5 text-main-500' />
              <span className='font-Mbold text-base text-main-500'>Warning</span>
            </div>
            <p className='text-base'>{value.slice(11)}</p>
          </blockquote>
        );
      } else {
        return (
          <blockquote className='border-l-4 border-green-500 pl-3 my-2 flex flex-col gap-1' {...props}>
            <p className='text-base'>{value}</p>
          </blockquote>
        );
      }
    }
    return <blockquote className='border-l-4 border-secondary-500 pl-3 my-2' {...props} />;
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
      <pre className='bg-tertiary-500 rounded-sm px-[2.72px] w-fit select-all inline-block'>{children}</pre>
    );
  },
  li: ({ ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className='list-disc list-inside' {...props} />
  ),
  input: ({ ...props }: React.HTMLAttributes<HTMLInputElement>) => (
    <input
      className='w-4 h-4 text-secondary-500 rounded bg-tertiary-500 border border-tertiary-450 checked:bg-tertiary-450'
      {...props}
    />
  ),
  table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <table className='table-auto border-collapse' {...props} />
  ),
  th: ({ ...props }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th className='border-tertiary-400 border-2 px-3 py-2' {...props} />
  ),
  td: ({ ...props }: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td className='border-tertiary-400 border-2 px-3 py-2' {...props} />
  ),
  tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className='border-tertiary-400 border-2 px-3 py-2' {...props} />
  ),
  br: ({ ...props }: React.HTMLAttributes<HTMLBRElement>) => (
    <br className='my-7' {...props} />
  ),
  img: ({ ...props }: React.HTMLAttributes<HTMLImageElement>) => (
    <div className='w-full h-full'>
      <img className='w-full h-full rounded' {...props} />
    </div>
  ),
};

export function Mdx({ code, raw }: MDXProps) {
  const MDXContent = useMDXComponent(raw);
  return (
    <article className='font-poppins text-white/70 text-md'>
      <MDXContent components={components} />
    </article>
  );
}