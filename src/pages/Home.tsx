import React from 'react';
import Layout from './Layout';
import projects from './projects/projects.json';
import { Button, ExperienceDropdown, ProjectCard, Section } from '../components';
import skills from './skills.json';
import experiences from './experiences.json';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { Experience, Project } from '../utils/types';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

interface Skill {
  title: string;
  options: string[];
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout>
      <section className='flex flex-col relative h-[450px] justify-center'>
        <div className='w-full h-full opacity-90 bg-grid-texture bg-cover bg-center
          absolute -z-[1] -left-5 md:-left-36'/>
        <div className='flex flex-col w-full md:max-w-xl'>
          <h1 className='text-2xl md:text-4xl font-Mblack flex bg-clip-text
          text-transparent bg-white'>
            {t('home.title')}
          </h1>
          <p className='text-sm md:text-base text-white/70 font-Mmedium z-10 mt-4'>
            {t('home.subtitle')}
          </p>
        </div>
      </section>
      <Section title={t('home.skills.title').toUpperCase()}>
        <div className='grid grid-cols-2 md:flex md:flex-row gap-4 w-full
        justify-between flex-wrap'>
          {skills.map((skill: Skill, index: number) => (
            <ul key={index} className='flex flex-row font-Mregular text-white
            text-sm gap-2 h-fit max-w-[160px] w-fit'>
              <div className='flex flex-col items-center'>
                <div className='flex items-center justify-center w-5 h-5 md:w-6 md:h-6
                bg-tertiary-500 border-[1px] border-tertiary-480 rounded-full mb-4
                text-xs md:text-sm mt-1 text-secondary-500'>
                  {index + 1}
                </div>
                <hr className='w-[1px] h-full bg-tertiary-480 border-0 mb-1' />
              </div>
              <div className='flex flex-col h-fit'>
                <li className='font-Mbold text-base md:text-lg mb-2'>
                  {t('home.skills.list.' + skill.title).toUpperCase()}
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
      <Section title={t('home.experiences.title').toUpperCase()}>
        <ul className='flex flex-col font-Mregular text-white
        text-sm gap-4 w-full'>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-col justify-between flex-shrink-0
            items-center'>
              <div className='flex items-center justify-center w-5 h-5 md:w-6 md:h-6
                bg-tertiary-500 border-[1px] border-tertiary-480 rounded-full mb-4
                text-xs md:text-sm mt-1 p-[2.3px]'>
                <BriefcaseIcon className='w-5 h-5 md:w-6 md:h-6
                text-secondary-500' />
              </div>
              <hr className='w-[1px] h-full bg-tertiary-480 border-0 mb-1' />
            </div>
            <div className='flex flex-col gap-1 w-full'>
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
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-col justify-between flex-shrink-0
            items-center'>
              <div className='flex items-center justify-center w-5 h-5 md:w-6 md:h-6
                bg-tertiary-500 border-[1px] border-tertiary-480 rounded-full mb-4
                text-xs md:text-sm mt-1 p-[2.3px]'>
                <AcademicCapIcon className='w-5 h-5 md:w-6 md:h-6
                text-secondary-500' />
              </div>
              <hr className='w-[1px] h-full bg-tertiary-480 border-0 mb-1' />
            </div>
            <div className='flex flex-col gap-1 w-full'>
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
            </div>
          </div>
        </ul>
      </Section>
      <Section title={t('home.projects.title').toUpperCase()}>
        <ul className='grid sm:grid-cols-1 md:grid-cols-2 font-Mregular text-white
        text-sm gap-4 w-full'>
          {projects.slice(0, 4).map((project: Project, index: number) => (
            <ProjectCard project={project} key={index} />
          ))}
        </ul>
        <Button type='secondary' onClick={() => navigate('/projects')} className='mt-4'>
          {t('buttons.view_more_projects')} &rarr;
        </Button>
      </Section>
    </Layout>
  );
};

export default Home;
