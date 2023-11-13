import React from 'react';
import Layout from './Layout';
import {
  backhand_index_pointing_right as rightHandEmoji
} from '../assets/emojis/index';
import projects from './projects/projects.json';
import { Button, ExperienceDropdown, ProjectCard, Section } from '../components';
import skills from './skills.json';
import experiences from './experiences.json';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { Experience, Project } from '../utils/types';
import { useNavigate } from 'react-router';

interface Skill {
  title: string;
  options: string[];
}

const Home: React.FC = () => {
  const navigate = useNavigate();

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
        <div className='flex flex-row gap-5 flex-wrap justify-between'>
          {skills.map((skill: Skill, index: number) => (
            <ul key={index} className='flex flex-row font-Mregular text-white
            text-sm gap-2 h-fit max-w-[150px]'>
              <div className='flex flex-col items-center'>
                <div className='flex items-center justify-center w-5 h-5 md:w-6 md:h-6
                bg-tertiary-500 border-[1px] border-tertiary-480 rounded-full mb-4
                text-xs md:text-sm mt-1'>
                  {index + 1}
                </div>
                <hr className='w-[1px] h-full bg-tertiary-480 border-0 mb-1' />
              </div>
              <div className='flex flex-col h-fit'>
                <li className='font-Mbold text-base md:text-lg mb-2'>
                  {skill.title.toUpperCase()}
                </li>
                {skill.options.map((skill, index) => (
                  <li key={index} className='text-tertiary-200 text-sm md:text-base'>
                    {skill}
                  </li>
                ))}
              </div>
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
      <Section title='PROJECTS'>
        <ul className='grid sm:grid-cols-1 md:grid-cols-2 font-Mregular text-white
        text-sm gap-4 w-full'>
          {projects.slice(0, 4).map((project: Project, index: number) => (
            <ProjectCard project={project} key={index} />
          ))}
        </ul>
        <Button type='secondary' onClick={() => navigate('/projects')} className='mt-4'>
          View more projects &rarr;
        </Button>
      </Section>
    </Layout>
  );
};

export default Home;
