'use client';

import GridPattern from '@/components/Magicui/GridPattern';
import WordPullUp from '@/components/Magicui/WordPullUp';
import clsx from 'clsx';
import { motion, useInView } from 'framer-motion';
import { Button, ExperienceDropdown, ProjectCard, Section } from '@/components';
import { AcademicCapIcon, ArrowDownIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Experience, Project } from '@/types';
import experiences from '@/content/data/experiences.json';
import skills from '@/content/data/skills.json';
import { useRef, useState } from 'react';
import { getProjects } from '@/lib/Documents';

export default function Home() {
  const router = useRouter();
  const projects = getProjects();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <main>
      <section className='flex flex-col relative h-[450px] justify-center'>
        <GridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          className={clsx(
            '[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[+10%] h-[200%] skew-y-12 -left-5 md:-left-36'
          )}
        />
        <div className='flex flex-col w-full md:max-w-xl'>
          <WordPullUp
            words="A Developer's Journey passionate about web development and design"
            className='text-2xl md:text-4xl font-black flex bg-clip-text text-transparent bg-white flex-wrap'
          />
          <motion.p
            className='text-sm md:text-base text-white/70 font-medium z-10 mt-4'
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
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const ref = useRef<HTMLUListElement>(null);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const isInView = useInView(ref);
            return (
              <ul
                key={index}
                ref={ref}
                className='flex flex-row font-normal text-white text-sm gap-2 h-fit max-w-[160px] w-fit'
              >
                <div className='flex flex-col items-center'>
                  <div className='flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-tertiary-500 border-[1px] border-tertiary-480 rounded-full mb-4 text-xs md:text-sm mt-1 text-secondary-500'>
                    {index + 1}
                  </div>
                  <hr className='w-[1px] h-full bg-tertiary-480 border-0 mb-1' />
                </div>
                <div className='flex flex-col h-fit'>
                  <li className='font-bold text-base md:text-lg mb-2'>
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
        <ul className='flex flex-col font-normal text-white text-sm gap-4 w-full'>
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
        <ul className='grid sm:grid-cols-1 md:grid-cols-2 font-normal text-white text-sm gap-4 w-full'>
          {projects.slice(0, isExpanded ? projects.length : 6).map((project: Project, index: number) => (
            <ProjectCard project={project} key={index} />
          ))}
        </ul>
        <Button
          variant='secondary'
          className='mt-5 w-full md:w-fit'
          shiny
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
          <ArrowDownIcon
            className={clsx(
              'size-4 md:size-5 ml-2 transition-all duration-500',
              isExpanded ? 'transform rotate-180' : ''
            )}
          />
        </Button>
      </Section>
    </main>
  );
}
