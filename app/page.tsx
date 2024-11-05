'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import { Button, ExperienceDropdown, ProjectCard, Section } from '@/components';
import GridPattern from '@/components/Magicui/GridPattern';
import WordPullUp from '@/components/Magicui/WordPullUp';
import { Spotlight } from '@/components/Aceternity/Spotlight';

import { Experience, Project } from '@/types';
import { getProjects } from '@/lib/Documents';
import experiences from '@/content/data/experiences.json';
import skills from '@/content/data/skills.json';
import { getIcon } from '@/lib/GetIcon';

export default function Home() {
  const projects = getProjects();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const displayedProjects = isExpanded ? projects : projects.slice(0, 6);

  return (
    <main className="space-y-16">
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
          '[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[+10%] h-[200%] skew-y-12 -left-5 md:-left-36'
        )}
      />
      <div className='relative flex flex-col w-full md:max-w-xl'>
        <Spotlight
          className='-top-10 md:-top-20 md:-left-10'
          fill='white'
        />
        <WordPullUp
          words="A Developer's Journey passionate about web development and design"
          className='text-2xl md:text-4xl font-black flex bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 flex-wrap'
        />
        <motion.p
          className='text-sm md:text-base text-white/70 font-medium z-10 mt-4'
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
  return (
    <Section title='SKILLS'>
      <div className='grid grid-cols-2 md:flex md:flex-row gap-4 w-full justify-between flex-wrap'>
        {skills.map((skill, index) => (
          <SkillItem key={index} skill={skill} index={index} />
        ))}
      </div>
    </Section>
  );
}

function SkillItem({ skill, index }: { skill: { title: string; options: string[] }, index: number }) {
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref);

  return (
    <ul
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
        {skill.options.map((option, optionIndex) => {
          const icon = getIcon(option.toLowerCase());
          return (
            <motion.li
              key={optionIndex}
              className='text-tertiary-200 text-sm md:text-base flex items-center gap-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 1, delay: 0.2 * optionIndex }}
            >
              {option}
              {icon && (
                <Image
                  src={icon}
                  alt={option}
                  width={16}
                  height={16}
                  className="rounded-sm"
                />
              )}
            </motion.li>
          );
        })}
      </div>
    </ul>
  );
}

function ExperienceSection() {
  return (
    <Section title='EXPERIENCES & EDUCATION'>
      <ul className='flex flex-col font-normal text-white text-sm gap-4 w-full'>
        <ExperienceList type="job" title="Work Experience" />
        <ExperienceList type="educational" title="Educational Experience" />
      </ul>
    </Section>
  );
}

function ExperienceList({ type, title }: { type: string; title: string }) {
  const filteredExperiences = experiences.filter(e => e.type === type);

  return (
    <>
      <h5 className='text-sm font-normal text-white/70 flex-shrink-0'>
        - {title}
      </h5>
      <div className='flex flex-col gap-4 w-full'>
        {filteredExperiences.map((experience: Experience, index: number) => (
          <ExperienceDropdown
            key={index}
            title={experience.title}
            location={experience.location}
            date={experience.date}
            description={experience.description}
            image={experience.image}
            technologies={experience.technologies}
          />
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
  return (
    <Section title='PROJECTS'>
      <ul className='grid sm:grid-cols-1 md:grid-cols-2 font-normal text-white text-sm gap-4 w-full'>
        {projects.map((project: Project, index: number) => (
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
  );
}
