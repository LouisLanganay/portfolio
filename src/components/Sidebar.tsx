import React, { FC, useContext } from 'react';
import { Context } from './Sidebarcontext';
import {
  ChevronDoubleLeftIcon,
  ChevronDownIcon,
  FolderOpenIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import Projects from '../pages/projects/projects.json';

const Sidebar: FC = () => {
  const { SidebarState, SetSidebarState } = useContext(Context);

  const handleSidebar = () => {
    SetSidebarState(SidebarState === 1 ? 0 : 1);
  };

  const navigate = useNavigate();

  const links = [
    {
      name: 'Home',
      link: '/',
      icon: <HomeIcon className='w-4 h-4 text-gray-100'/>
    },
    {
      name: 'Projects',
      link: '/projects',
      icon: <FolderOpenIcon className='w-4 h-4 text-gray-100'/>,
      sublinks: Projects.map((project) => ({
        name: project.title,
        link: `/projects/${project.title.toLowerCase().replace(/ /g, '-')}`
      }))
    },
    {
      name: 'Contact',
      link: '/contact',
      icon: <HomeIcon className='w-4 h-4 text-gray-100'/>,
      sublinks: [
        {
          name: 'Github',
          link: 'https://github.com/LouisLanganay'
        },
        {
          name: 'LinkedIn',
          link: 'https://www.linkedin.com/in/louis-langanay/'
        },
        {
          name: 'Discord',
          link: 'https://discord.com/users/660435627757666311'
        },
        {
          name: 'E-Mail',
          link: 'mailto:louislanganay@gmail.com'
        }
      ]
    }
  ];

  return (
    <div className='flex w-screen sm:w-auto fixed sm:relative z-50 top-0
      sm:top-auto'>
      <div className='bg-tertiary-600 border-2 border-tertiary-500 z-30 rounded-r-lg
      absolute h-screen min-h-full overflow-y-auto scrollbar-hide w-full sm:w-72
      transform lg:!translate-x-0 lg:relative transition-all duration-400
      -translate-x-full md:-translate-x-[full]'>
        <div className='flex flex-col gap-y-1 mt-10 px-3 font-Mmedium sticky'>
          {links.map((link, index) => (
            link.sublinks ? (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button key={index}
                      className='flex flex-row items-center rounded-md px-3 py-1
                      cursor-pointer hover:bg-tertiary-480 hover:ring-[1px]
                      justify-between ring-tertiary-550 gap-x-2 text-gray-100
                      hover:text-white'>
                      <div className='flex flex-row items-center gap-x-2'>
                        {link.icon}
                        <span>{link.name}</span>
                      </div>
                      <ChevronDownIcon className={`w-4 h-4 text-gray-100 transition-all
                        transform ${open ? 'rotate-180' : 'rotate-0'}`} />
                    </Disclosure.Button>
                    <Disclosure.Panel className='flex flex-row w-full pr-5'>
                      <div className='flex flex-col pl-[19px] py-1'>
                        <div className='w-[1px] h-full rounded-l-xl
                        bg-white mb-1' />
                      </div>
                      <ul className='flex flex-col h-fit pl-1 w-full'>
                        {link.sublinks && link.sublinks.map((sublink, index) => (
                          <li key={index} onClick={() => navigate(sublink.link)}
                            className='flex flex-row items-center rounded-md px-3 py-1
                            cursor-pointer hover:bg-tertiary-480 hover:ring-[1px] w-full
                            ring-tertiary-550 gap-x-2 text-gray-100 hover:text-white'>
                            <a className='truncate'>{sublink.name}</a>
                          </li>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ) : (
              <button key={index} className='flex flex-row items-center rounded-md px-3
              py-1 cursor-pointer hover:bg-tertiary-480 hover:ring-[1px]
              ring-tertiary-550 gap-x-2 text-gray-100 hover:text-white'
              onClick={() => navigate(link.link)}>
                {link.icon}
                <span>{link.name}</span>
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
