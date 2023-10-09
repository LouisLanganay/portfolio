import React from 'react';
import Layout from './Layout';
import {
  person_raising_hand as heyEmoji,
  laptop as laptopEmoji,
  round_pushpin as locationEmoji,
  graduation_cap as graduationEmoji,
  potted_plant as plantEmoji,
  backhand_index_pointing_right as rightHandEmoji
} from '../assets/emojis/index';
import projects from './projects/projects.json';
import { ProjectCard } from '../components';
import skills from './skills.json';
import experiences from './experiences.json';

interface Skill {
  title: string;
  options: string[];
}

interface Experience {
  type: string | 'education' | 'job';
  title: string;
  location: string;
  date: string;
  description?: string;
}

interface Project {
  title: string;
  description: string;
  links?: {
    name: string;
    url: string;
  }[];
  image?: string;
  date: string;
  tags: string[];
  tools: string[];
  stats?: {
    users?: string;
    downloads?: string;
  };
  repository?: string;
}

const Home: React.FC = () => {
  return (
    <Layout>
      <section className='flex flex-col justify-center w-full sm:w-[550px]
      h-[400px]'>
        <div className='relative w-full max-w-lg'>
          <div className='absolute -top-20 -left-4 w-60 h-60 rounded-full
          bg-secondary-500 mix-blend-multiply filter blur-xl opacity-25
          animate-blob'/>
          <div className='absolute -top-32 right-20 w-60 h-60 rounded-full
          bg-main-500 mix-blend-multiply filter blur-xl opacity-25 animate-blob
          animation-delay-2000 hidden md:block'/>
          <div className='absolute -top-5 right-28 w-60 h-60 rounded-full
          bg-light-500 mix-blend-multiply filter blur-xl opacity-25 animate-blob
          animation-delay-4000'/>
          <div className='flex flex-col relative'>
            <div className='flex flex-row items-center'>
              <h1 className='text-4xl md:text-5xl font-Mblack flex bg-clip-text
              text-transparent bg-white'>
                Hello World!
              </h1>
              <img src={heyEmoji} alt='Hey' className='w-10 h-10 md:h-12 md:w-12
              inline-block ml-2 z-10' />
            </div>
            <p className='text-base md:text-lg text-white font-Mmedium z-10'>
              My name is Louis, and I am a 2nd year student developer at Epitech in
              France, loving web development and UI/UX design.
            </p>
          </div>
        </div>
      </section>
      <div className='flex flex-col w-full gap-36'>
        <section className='flex flex-row w-full gap-16 flex-wrap'>
          <h2 className='flex flex-shrink-0 text-xl font-Mblack
          text-secondary-500 w-60'>
            SKILLS
            <img src={laptopEmoji} alt='Laptop'
              className='w-7 h-7 inline-block ml-2' />
          </h2>
          <div className='flex flex-row gap-16 flex-wrap'>
            {skills.map((skill: Skill, index: number) => (
              <ul key={index} className='flex flex-col font-Mregular text-white
              text-sm gap-1'>
                <li className='font-Mbold text-lg mb-2'>
                  {skill.title.toUpperCase()}
                </li>
                {skill.options.map((skill, index) => (
                  <li key={index} className='text-tertiary-200 text-base'>
                    {skill}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
        <section className='flex flex-row w-full gap-16 flex-wrap xl:flex-nowrap'>
          <h2 className='flex md:flex-shrink-0 text-xl font-Mblack
          text-secondary-500 w-60'>
            EXPERIENCES & EDUCATION
            <img src={graduationEmoji} alt='Laptop'
              className='w-7 h-7 inline-block ml-2' />
          </h2>
          <ul className='flex flex-col font-Mregular text-white
          text-sm gap-5 w-full'>
            {experiences.filter(e => e.type === 'job')
              .map((skill: Experience, index: number) => (
                <li key={index} className='font-Mbold flex flex-row w-full
                justify-between'>
                  <div className='flex flex-col'>
                    <h3 className='text-lg'>
                      {skill.title}
                    </h3>
                    <h4 className='font-Mmedium text-tertiary-200 text-base'>
                      <img src={locationEmoji} alt='Location'
                        className='w-5 h-5 inline-block mr-1' />
                      {skill.location}
                    </h4>
                    {skill.description && (
                      <p className='font-Mregular text-tertiary-200 text-base'>
                        {skill.description}
                      </p>
                    )}
                  </div>
                  <p className='font-Imedium w-56 flex justify-end md:flex-shrink-0
                  text-right ml-5 md:ml-0 text-base'>
                    {skill.date}
                  </p>
                </li>
              ))}
            <hr className='w-full border-tertiary-400 my-5' />
            {experiences.filter(e => e.type === 'educational')
              .map((skill: Experience, index: number) => (
                <li key={index} className='font-Mbold flex flex-row w-full
                justify-between'>
                  <div className='flex flex-col'>
                    <h3 className='text-lg'>
                      {skill.title}
                    </h3>
                    <h4 className='font-Mmedium text-tertiary-200 text-base'>
                      <img src={locationEmoji} alt='Location'
                        className='w-5 h-5 inline-block mr-1' />
                      {skill.location}
                    </h4>
                    {skill.description && (
                      <p className='font-Mregular text-tertiary-200 text-base'>
                        {skill.description}
                      </p>
                    )}
                  </div>
                  <p className='font-Imedium w-56 flex justify-end md:flex-shrink-0
                  text-right ml-5 md:ml-0 text-base'>
                    {skill.date}
                  </p>
                </li>
              ))}
          </ul>
        </section>
        <section className='flex flex-row w-full gap-16 flex-wrap xl:flex-nowrap'
          id='projects'>
          <h2 className='flex flex-shrink-0 text-xl font-Mblack
          text-secondary-500 w-56'>
            PROJECTS
            <img src={plantEmoji} alt='Laptop'
              className='w-7 h-7 inline-block ml-2' />
          </h2>
          <div className='flex flex-col gap-12'>
            <ul className='flex flex-row font-Mregular text-white
            text-sm gap-5 w-full flex-wrap'>
              {projects.slice(0, 4).map((project: Project, index: number) => (
                <ProjectCard project={project} position={index} />
              ))}
            </ul>
            <a href='/projects'
              className='group w-fit ease-in-out font-Mmedium text-tertiary-0
              hover:text-secondary-500 cursor-pointer'>
              <span className='bg-left-bottom bg-gradient-to-r
              from-secondary-500 to-secondary-500 bg-[length:0%_2px]
              bg-no-repeat pb-1 group-hover:bg-[length:100%_2px] transition-all
              duration-500 ease-out flex gap-2'>
                <img src={rightHandEmoji} alt='Right Hand Emoji'
                  className='w-5 h-5 inline-block' />
                View more projects
              </span>
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
