import React from 'react';
import {
  house as HouseEmoji,
  building_construction as BuildingEmoji
} from '../assets/emojis/index';

const BreadCrumb: React.FC = () => {
  const [ path, setPath ] = React.useState<string | null>(null);

  React.useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  console.info(path);
  if (path === '/')
    return null;

  const pagesEmoji = [
    {
      'name': 'projects',
      'emoji': BuildingEmoji,
      'link': '/#projects'
    }
  ];

  return (
    <div className='flex flex-row gap-2 items-center text-tertiary-0 font-Mmedium
    mb-4'>
      <ul className='flex flex-row gap-2'>
        <li className='hover:underline cursor-pointer flex flex-row items-center
        font-Mmedium hover:bg-tertiary-450 rounded px-2'
        onClick={() => window.location.href = '/'}>
          <img src={HouseEmoji} alt='house' className='w-4 h-4 mr-2' />
          Home
        </li>
        {path?.slice(1).split('/').map((p: string, index: number) => {
          const page = pagesEmoji.find((page) => page.name === p);
          return (
            <>
              <div className='text-tertiary-200 font-Mmedium'>
                /
              </div>
              <li key={index} className='flex flex-row hover:underline
              cursor-pointer font-Mmedium hover:bg-tertiary-450 rounded px-2
              items-center' onClick={() => {
                if (page?.link)
                  window.location.href = page.link;
                else
                  window.location.href = path
                    .split('/')
                    .slice(0, index)
                    .join('/');
              }}>
                {page?.emoji && (
                  <img src={page.emoji} alt={page.name} className='w-4 h-4 mr-2' />
                )}
                {p}
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default BreadCrumb;
