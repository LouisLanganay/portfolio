'use client';

import { ArrowDownIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

import { Spotlight } from '@/components/Aceternity/Spotlight';
import GridPattern from '@/components/Magicui/GridPattern';
import WordPullUp from '@/components/Magicui/WordPullUp';
import { Section } from '@/components/Section';

import { ExperienceDropdown } from '@/components/ExperienceDropdown';
import { ProjectCard } from '@/components/Projects/ProjectCard';
import { TechBadge } from '@/components/TechBadge';
import { Button } from '@/components/ui/button';
import experiences from '@/content/data/experiences.json';
import skills from '@/content/data/skills.json';
import { useTechBadge } from '@/contexts/TechBadgeContext';
import { getProjects, getArticles } from '@/lib/Documents';
import { getIcon } from '@/lib/GetIcon';
import { Experience, Project, Skill } from '@/types';
import Image from 'next/image';
import { ArticleCard } from '@/components/Articles/ArticleCard';
import { useRouter } from 'next/navigation';
import { useProjectPrefetch } from '@/lib/hooks/useProjectPrefetch';

export default function Home() {
  const projects = getProjects();
  const articles = getArticles();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const displayedProjects = isExpanded ? projects : projects.slice(0, 6);

  // Intelligent project prefetching
  useProjectPrefetch({ 
    projects, 
    maxPrefetch: 6,
    delay: 500 
  });

  return (
    <main className='space-y-16'>
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection projects={displayedProjects} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <ArticlesSection articles={articles} />
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
          className='text-2xl md:text-4xl font-black flex bg-clip-text text-transparent bg-linear-to-b dark:from-white dark:to-white/70 from-black to-black/70 flex-wrap'
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

  const validTechEntries = Array.from(selectedTechs).filter(tech => {
    const techInfo = skills
      .flatMap(category => category.options)
      .find(opt => opt.name.toLowerCase() === tech);
    const icon = getIcon(techInfo?.name.toLowerCase() || '');
    return techInfo && icon && techInfo.description;
  });

  return (
    <Section title='SKILLS'>
      <div className='grid grid-cols-1 sm:flex sm:flex-row gap-4 w-full justify-between flex-wrap'>
        {skills.map((skill, index) => (
          <SkillItem key={index} skill={skill} index={index} />
        ))}
      </div>
      {selectedTechs.size > 0 && validTechEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='relative overflow-hidden mt-4 p-4 dark:bg-tertiary-600 bg-tertiary-50 rounded-md border dark:border-tertiary-480 border-tertiary-100 shadow-xs'
        >
          <div className='absolute -bottom-20 left-[-20%] w-[140%] bg-radial from-light-500/5 to-60% to-transparent h-40 pointer-events-none'></div>
          <h4 className='text-md font-normal flex items-center mb-2 z-10'>
            <InformationCircleIcon className='size-4 mr-2' />
            Selected technologies
          </h4>
          <div className='space-y-3 z-10'>
            {validTechEntries.map((tech) => {
              const techInfo = skills
                .flatMap(category => category.options)
                .find(opt => opt.name.toLowerCase() === tech);
              const icon = getIcon(techInfo?.name.toLowerCase() || '');
              return techInfo && icon && techInfo.description && (
                <div key={tech} className='text-sm flex flex-row items-start gap-2'>
                  <div className='p-1 shrink-0 rounded-md bg-tertiary-600/30 border border-tertiary-480 flex flex-row items-center justify-center gap-1'>
                    <Image
                      src={icon}
                      alt={techInfo.name}
                      width={14}
                      height={14}
                      className='object-contain'
                    />
                    <div className='text-xs'>{techInfo.name}</div>
                  </div>
                  <div className='text-muted-foreground'> - {techInfo.description}</div>
                </div>
              );
            })}
          </div>
          <Button
            variant='outline'
            className='mt-4'
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

function SkillItem({ skill, index }: { skill: Skill, index: number }) {
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref);

  return (
    <ul
      ref={ref}
      className='flex flex-row font-normal dark:text-white text-black text-sm gap-2 h-fit w-full sm:w-[30%]'
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
          {skill.options
            .filter(option => option.display)
            .sort()
            .map((option, optionIndex) => {
              const icon = getIcon(option.name.toLowerCase());
              return (
                <motion.li
                  key={optionIndex}
                  className='text-tertiary-200 text-sm md:text-base flex items-center gap-2'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 * optionIndex }}
                >
                  <TechBadge
                    tech={option.name}
                    icon={icon}
                  />
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

  if (filteredExperiences.length === 0)
    return null;

  // Group experiences by company (location)
  const groupedExperiences = filteredExperiences.reduce((acc: any[], exp) => {
    const existingCompany = acc.find(g => g.location === exp.location);
    if (existingCompany) {
      if (!existingCompany.roles) {
        existingCompany.roles = [{ ...existingCompany }];
        delete existingCompany.description;
        delete existingCompany.technologies;
        existingCompany.date = `${exp.date.split(' - ')[0]} - ${existingCompany.date.split(' - ')[1]}`;
      }
      existingCompany.roles.push(exp);
      // Sort roles by date in descending order
      existingCompany.roles.sort((a: Experience, b: Experience) => {
        const aDate = new Date(a.date.split(' - ')[0]);
        const bDate = new Date(b.date.split(' - ')[0]);
        return bDate.getTime() - aDate.getTime();
      });
    } else {
      acc.push({ ...exp });
    }
    return acc;
  }, []);

  // Sort companies by most recent experience
  groupedExperiences.sort((a, b) => {
    const aDate = new Date(a.date.split(' - ')[0]);
    const bDate = new Date(b.date.split(' - ')[0]);
    return bDate.getTime() - aDate.getTime();
  });

  return (
    <>
      <h5 className='text-sm font-normal dark:text-white/70 text-black/70 shrink-0'>
        - {title}
      </h5>
      <div className='flex flex-col gap-4 w-full'>
        {groupedExperiences.map((experience: Experience, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.3 }}
          >
            <ExperienceDropdown {...experience} />
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

function ArticlesSection({ articles }: { articles: any[] }) {
  const { selectedTechs } = useTechBadge();

  const filteredArticles = articles.filter(article =>
    selectedTechs.size === 0 || article.tools?.some((tech: string) => selectedTechs.has(tech.toLowerCase()))
  );

  return (
    <Section title='ARTICLES'>
      <ul className='grid sm:grid-cols-1 md:grid-cols-2 font-normal text-white text-sm gap-4 w-full'>
        {filteredArticles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </ul>
    </Section>
  );
}
