import React, { useRef } from 'react';
import Layout from './Layout';
import projects from './projects/projects.json';
import { Button, ExperienceDropdown, ProjectCard, Section } from '../components';
import skills from './skills.json';
import experiences from './experiences.json';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { Experience, Project } from '../utils/types';
import { useNavigate } from 'react-router';
import { motion, useInView } from 'framer-motion';
import WordPullUp from '../components/Magicui/WordPullUp';
import GridPattern from '../components/Magicui/GridPattern';
import clsx from 'clsx';

interface Skill {
  title: string;
  options: string[];
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className='flex flex-col relative h-[450px] justify-center'>
        <GridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={clsx(
            '[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[-50%] h-[200%] skew-y-12 -left-5 md:-left-36'
          )}
        />
        <div className='flex flex-col w-full md:max-w-xl'>
          <WordPullUp
            words="A Developer's Journey passionate about web development and design"
            className='text-2xl md:text-4xl font-Mblack flex bg-clip-text text-transparent bg-white flex-wrap'
          />
          <motion.p
            className='text-sm md:text-base text-white/70 font-Mmedium z-10 mt-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            My name is Louis, and I am a 2nd year student developer at Epitech in
            France, loving web development and UI/UX design.
          </motion.p>
        </div>
      </section>
      <Section title='SKILLS'>
        <div className='grid grid-cols-2 md:flex md:flex-row gap-4 w-full justify-between flex-wrap'>
          {skills.map((skill, index) => {
            const ref = useRef<HTMLUListElement>(null);
            const isInView = useInView(ref);

            return (
              <ul
                key={index}
                ref={ref}
                className='flex flex-row font-Mregular text-white text-sm gap-2 h-fit max-w-[160px] w-fit'
              >
                <div className='flex flex-col items-center'>
                  <div className='flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-tertiary-500 border-[1px] border-tertiary-480 rounded-full mb-4 text-xs md:text-sm mt-1 text-secondary-500'>
                    {index + 1}
                  </div>
                  <hr className='w-[1px] h-full bg-tertiary-480 border-0 mb-1' />
                </div>
                <div className='flex flex-col h-fit'>
                  <li className='font-Mbold text-base md:text-lg mb-2'>
                    {skill.title.toUpperCase()}
                  </li>
                  {skill.options.map((option, optionIndex) => (
                    <motion.li
                      key={optionIndex}
                      className='text-tertiary-200 text-sm md:text-base'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                      transition={{ duration: 1, delay: 0.2 * optionIndex }}
                    >
                      {option}
                    </motion.li>
                  ))}
                </div>
              </ul>
            );
          })}
        </div>
      </Section>
      <Section title='EXPERIENCES & EDUCATION'>
        <ul className='flex flex-col font-Mregular text-white text-sm gap-4 w-full'>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-col justify-between flex-shrink-0 items-center'>
              <div className='flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-tertiary-500 border-[1px] border-tertiary-480 rounded-full mb-4 text-xs md:text-sm mt-1 p-[2.3px]'>
                <BriefcaseIcon className='w-5 h-5 md:w-6 md:h-6 text-secondary-500' />
              </div>
              <hr className='w-[1px] h-full bg-tertiary-480 border-0 mb-1' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
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
            <div className='flex flex-col justify-between flex-shrink-0 items-center'>
              <div className='flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-tertiary-500 border-[1px] border-tertiary-480 rounded-full mb-4 text-xs md:text-sm mt-1 p-[2.3px]'>
                <AcademicCapIcon className='w-5 h-5 md:w-6 md:h-6 text-secondary-500' />
              </div>
              <hr className='w-[1px] h-full bg-tertiary-480 border-0 mb-1' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
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
      <Section title='PROJECTS'>
        <ul className='grid sm:grid-cols-1 md:grid-cols-2 font-Mregular text-white text-sm gap-4 w-full'>
          {projects.slice(0, 4).map((project: Project, index: number) => (
            <ProjectCard project={project} key={index} />
          ))}
        </ul>
        <Button variant='secondary' onClick={() => navigate('/projects')} className='mt-4'>
          View more projects &rarr;
        </Button>
      </Section>
    </Layout>
  );
};

export default Home;
