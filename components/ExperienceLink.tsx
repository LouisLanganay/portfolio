'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BriefcaseIcon, AcademicCapIcon, LinkIcon } from '@heroicons/react/24/outline';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Link from 'next/link';

interface Experience {
  type: 'job' | 'educational';
  title: string;
  location: string;
  date: string;
  image: string;
  description: string;
  technologies: string[];
  projects: string[];
}

interface ExperienceLinkProps {
  projectId: string;
  experiences: Experience[];
}

export function ExperienceLink({ projectId, experiences }: ExperienceLinkProps) {
  const router = useRouter();
  const relatedExperiences = experiences.filter(exp => 
    exp.projects && exp.projects.includes(projectId)
  );
  
  if (relatedExperiences.length === 0) {
    return null;
  }

  const handleExperienceClick = (experience: Experience) => {
    router.push('/#experiences');
  };

  return (
    <div className='flex flex-col gap-2'>
      {relatedExperiences.map((experience, index) => (
        <Link
          key={index}
          href={`/#experiences`}
          className='text-sm underline underline-offset-2 flex items-center gap-2 w-fit'
        >
          {experience.title}
          <LinkIcon className='size-4 text-white/70' />
        </Link>
      ))}
    </div>
  );
}
