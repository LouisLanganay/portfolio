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
import { ExperienceDropdown, ProjectCard, Section } from '../components';
import skills from './skills.json';
import experiences from './experiences.json';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

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
      <section className='flex flex-col justify-center w-full h-[400px]'>
        <div className='flex flex-col w-full md:max-w-xl'>
          <h1 className='text-2xl md:text-4xl font-Mblack flex bg-clip-text
          text-transparent bg-white'>
            A Developer's Journey passionate about web development and design
          </h1>
          <p className='text-sm md:text-base text-white/70 font-Mmedium z-10 mt-4'>
            My name is Louis, and I am a 2nd year student developer at Epitech in
            France, loving web development and UI/UX design.
          </p>
        </div>
      </section>
      <Section title='SKILLS'>
        <div className='flex flex-col gap-16 flex-wrap'>
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
      </Section>
      <Section title='EXPERIENCES & EDUCATION'>
        <ul className='flex flex-col font-Mregular text-white
        text-sm gap-4 w-full'>
          <div className='flex flex-row items-center gap-4'>
            <BriefcaseIcon className='w-5 h-5 md:w-6 md:h-6 inline-block
            text-secondary-500' />
            <h5 className='text-xs md:text-sm font-Mmedium text-white/70'>
              EXPERIENCE
            </h5>
          </div>
          {experiences.filter(e => e.type === 'educational')
            .map((experience: Experience, index: number) => (
              <ExperienceDropdown
                key={index}
                title={experience.title}
                location={experience.location}
                date={experience.date}
                description={experience.description}
              />
            ))}
          <div className='flex flex-row items-center gap-4 mt-8'>
            <AcademicCapIcon className='w-5 h-5 md:w-6 md:h-6 inline-block
            text-secondary-500' />
            <h5 className='text-xs md:text-sm font-Mmedium text-white/70'>
              EDUCATION
            </h5>
          </div>
          {experiences.filter(e => e.type === 'job')
            .map((experience: Experience, index: number) => (
              <ExperienceDropdown
                key={index}
                title={experience.title}
                location={experience.location}
                date={experience.date}
                description={experience.description}
              />
            ))}
        </ul>
      </Section>
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
    </Layout>
  );
};

export default Home;
