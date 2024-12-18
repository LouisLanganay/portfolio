'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';
import { ArrowDownIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Button, ExperienceDropdown, ProjectCard, Section, TechBadge } from '@/components';
import GridPattern from '@/components/Magicui/GridPattern';
import WordPullUp from '@/components/Magicui/WordPullUp';
import { Spotlight } from '@/components/Aceternity/Spotlight';

import { Experience, Project } from '@/types';
import { getProjects } from '@/lib/Documents';
import experiences from '@/content/data/experiences.json';
import skills from '@/content/data/skills.json';
import { getIcon } from '@/lib/GetIcon';
import { useTechBadge } from '@/contexts/TechBadgeContext';
import Link from 'next/link';

export default function Home() {
  const projects = getProjects();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const displayedProjects = isExpanded ? projects : projects.slice(0, 6);

  return (
    <main className='space-y-16'>
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection projects={displayedProjects} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </main>
  );
}

function HeroSection() {
  return (
    <section className='relative flex flex-col justify-center h-[450px]'>
      <GridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={clsx(
          'dark:[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
          '[mask-image:radial-gradient(400px_circle_at_center,black,transparent)]',
          'inset-x-0 inset-y-[+10%] h-[200%] skew-y-12 -left-5 md:-left-36'
        )}
      />
      <div className='relative flex flex-col w-full md:max-w-xl'>
        <Spotlight
          className='-top-10 md:-top-20 md:-left-10 hidden dark:block'
          fill='white'
        />
        <WordPullUp
          words="A Developer's Journey passionate about web development and design"
          className='text-2xl md:text-4xl font-black flex bg-clip-text text-transparent bg-gradient-to-b dark:from-white dark:to-white/70 from-black to-black/70 flex-wrap'
        />
        <motion.p
          className='text-sm md:text-base dark:text-white/70 text-black/70 font-medium z-10 mt-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          My name is Louis, and I am a third-year student developer at Epitech in
          France, loving web development and UI/UX design.
        </motion.p>
      </div>
    </section>
  );
}

function SkillsSection() {
  const { selectedTechs, resetSelection } = useTechBadge();
  const projects = getProjects();

  const filteredProjects = projects.filter(project =>
    selectedTechs.size === 0 || project.tools?.some((tech: string) => selectedTechs.has(tech.toLowerCase()))
  );

  const lastProject = filteredProjects.reduce((last, project) => {
    return new Date(project.date) > new Date(last.date) ? project : last;
  }, filteredProjects[0]);

  return (
    <Section title='SKILLS'>
      <div className='grid grid-cols-2 md:flex md:flex-row gap-4 w-full justify-between flex-wrap'>
        {skills.map((skill, index) => (
          <SkillItem key={index} skill={skill} index={index} />
        ))}
      </div>
      {selectedTechs.size > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='mt-4 p-4 dark:bg-tertiary-600 bg-tertiary-50 rounded-md border dark:border-tertiary-480 border-tertiary-100 shadow-sm'
        >
          <h4 className='text-md font-normal flex items-center mb-2'>
            <InformationCircleIcon className='size-4 mr-2' />
            Somes informations about selection
          </h4>
          <p className='text-sm font-light tracking-wide'>
            {filteredProjects.length === 0 ?
              'Oh no, it seems like there are no projects related to the technologies you selected on my portfolio.' :
              `On my portfolio, you can see ${filteredProjects.length} projects related to the technologies you selected.`
            }
          </p>
          {lastProject && (
            <p className='text-sm font-light tracking-wide'>
              The last project related to the technologies you selected is <Link href={`/projects/${lastProject.id}`} className='underline text-sm font-light tracking-wide'>{lastProject.title}</Link>
            </p>
          )}
          <Button
            variant='outline'
            className='mt-2'
            size='xs'
            onClick={resetSelection}
          >
            <XMarkIcon className='size-4 mr-2' />
            Reset Selection
          </Button>
        </motion.div>
      )}
    </Section>
  );
}

function SkillItem({ skill, index }: { skill: { title: string; options: string[] }, index: number }) {
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref);

  return (
    <ul
      ref={ref}
      className='flex flex-row font-normal dark:text-white text-black text-sm gap-2 h-fit max-w-[200px] w-fit'
    >
      <div className='flex flex-col items-center'>
        <div className='flex items-center justify-center w-5 h-5 md:w-6 md:h-6 dark:bg-tertiary-500 bg-white border-[1px] dark:border-tertiary-650 border-tertiary-200 rounded-full mb-4 text-xs md:text-sm mt-1 dark:text-secondary-500 text-tertiary-650'>
          {index + 1}
        </div>
        <hr className='w-[1px] h-full dark:bg-tertiary-450 bg-tertiary-100 border-0 mb-1' />
      </div>
      <div className='flex flex-col h-fit'>
        <li className='font-bold text-base md:text-lg mb-2'>
          {skill.title.toUpperCase()}
        </li>
        <div className='flex flex-wrap gap-1'>
          {skill.options.map((option, optionIndex) => {
            const icon = getIcon(option.toLowerCase());
            return (
              <motion.li
                key={optionIndex}
                className='text-tertiary-200 text-sm md:text-base flex items-center gap-2'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 * optionIndex }}
              >
                <TechBadge tech={option} icon={icon} />
              </motion.li>
            );
          })}
        </div>
      </div>
    </ul>
  );
}

function ExperienceSection() {
  return (
    <Section title='EXPERIENCES & EDUCATION'>
      <ul className='flex flex-col font-normal dark:text-white text-black text-sm gap-4 w-full'>
        <ExperienceList type='job' title='Work Experience' />
        <ExperienceList type='educational' title='Educational Experience' />
      </ul>
    </Section>
  );
}

function ExperienceList({ type, title }: { type: string; title: string }) {
  const { selectedTechs } = useTechBadge();

  const filteredExperiences = experiences.filter(e =>
    e.type === type &&
    (selectedTechs.size === 0 || e.technologies?.some(tech => selectedTechs.has(tech.toLowerCase())))
  );

  return (
    <>
      <h5 className='text-sm font-normal dark:text-white/70 text-black/70 flex-shrink-0'>
        - {title}
      </h5>
      <div className='flex flex-col gap-4 w-full'>
        {filteredExperiences.map((experience: Experience, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.3 }}
          >
            <ExperienceDropdown
              title={experience.title}
              location={experience.location}
              date={experience.date}
              description={experience.description}
              image={experience.image}
              technologies={experience.technologies}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}

function ProjectsSection({
  projects,
  isExpanded,
  setIsExpanded
}: {
  projects: Project[];
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { selectedTechs } = useTechBadge();

  const filteredProjects = projects.filter(project =>
    selectedTechs.size === 0 || project.tools?.some((tech: string) => selectedTechs.has(tech.toLowerCase()))
  );

  return (
    <Section title='PROJECTS'>
      <ul className='grid sm:grid-cols-1 md:grid-cols-2 font-normal text-white text-sm gap-4 w-full'>
        {filteredProjects.map((project: Project, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </ul>
      <Button
        variant='secondary'
        className={clsx('mt-5 w-full md:w-fit', selectedTechs.size > 0 && 'hidden')}
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
  );
}
