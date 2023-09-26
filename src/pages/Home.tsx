import React from 'react';
import Layout from './Layout';
import {
  person_raising_hand as heyEmoji,
  laptop as laptopEmoji,
  round_pushpin as locationEmoji,
  graduation_cap as graduationEmoji,
  potted_plant as plantEmoji
} from '../assets/emojis/index';
import projects from './projects.json';
import getIcon from '../utils/getIcon';

interface Skill {
  title: string;
  options: string[];
}

interface Experience {
  title: string;
  location: string;
  date: string;
  description?: string;
}

interface Project {
  title: string;
  image: string;
  tools: string[];
  date: string;
}

const Home: React.FC = () => {
  const skills: Skill[] = [
    {
      'title': 'languages',
      'options': [
        'Javascript',
        'NodeJS',
        'C/C++',
        'Typescript',
        'Java',
        'Bash'
      ]
    },
    {
      'title': 'tools',
      'options': [
        'API Rest',
        'Git',
        'Linux systems',
        'Github Actions',
        'Docker',
        'MongoDB',
        'Postman'
      ]
    },
    {
      'title': 'design',
      'options': [
        'Tailwindcss',
        'Figma',
        'Adobe Illustrator',
        'Adobe Photoshop'
      ]
    },
    {
      'title': 'frameworks',
      'options': [
        'React'
      ]
    }
  ];

  const experiences: Experience[] = [
    {
      'title': 'Baccalauréat STI2D - \
      Information and Digital Systems (SIN) specialism (distinction)',
      'location': 'Campus La Chataigneraie',
      'date': 'sep. 2019 - 2022'
    },
    {
      'title': 'Expert in Information Technologies',
      'location': 'Epitech Rennes',
      'date': 'sep. 2022 - 2027',
      'description': 'RNCP 7 Professional Certification - BAC +5.'
    },
    {
      'title': 'Internship - Developer',
      'location': 'Centre hospitalier intercommunal Elbeuf \
      Louviers Val de Reuil',
      'date': 'jul. 2023 - aug. 2023',
      'description': 'Development of an intranet for the hospital\'s\
      various divisions.'
    },
    {
      'title': 'Internship - Front-end developer',
      'location': 'Venture\'s Game • Remote',
      'date': 'sep. 2023 - nov. 2023',
      'description': 'Development of a showcase site.'
    }
  ];

  return (
    <Layout>
      <section className='flex flex-col justify-center w-full sm:w-[550px]
      h-[400px]'>
        <div className='flex flex-row items-center'>
          <h1 className='text-4xl font-Mblack flex text-transparent bg-clip-text
            bg-gradient-to-r from-main-500 to-secondary-500'>
            Hello World!
          </h1>
          <img src={heyEmoji} alt='Hey' className='w-10 h-10 inline-block ml-2' />
        </div>
        <p className='text-base text-white font-Mmedium'>
          My name is Louis, and I am a 2nd year student developer at Epitech in
          France, loving web development and UI/UX design.
        </p>
      </section>
      <div className='flex flex-col w-full gap-36'>
        <section className='flex flex-row w-full gap-16'>
          <h2 className='flex flex-shrink-0 text-xl font-Mblack
          text-secondary-500'>
            SKILLS
            <img src={laptopEmoji} alt='Laptop'
              className='w-7 h-7 inline-block ml-2' />
          </h2>
          <div className='flex flex-row gap-16 flex-wrap'>
            {skills.map((skill, index) => (
              <ul key={index} className='flex flex-col font-Mregular text-white
              text-sm gap-1'>
                <li className='font-Mbold text-base'>
                  {skill.title.toUpperCase()}
                </li>
                {skill.options.map((skill, index) => (
                  <li key={index} className='text-tertiary-200'>{skill}</li>
                ))}
              </ul>
            ))}
          </div>
        </section>
        <section className='flex flex-row w-full gap-16'>
          <h2 className='flex flex-shrink-0 text-xl font-Mblack
          text-secondary-500'>
            EXPERIENCES & EDUCATION
            <img src={graduationEmoji} alt='Laptop'
              className='w-7 h-7 inline-block ml-2' />
          </h2>
          <ul className='flex flex-col font-Mregular text-white
          text-sm gap-5 w-full'>
            {experiences.map((skill, index) => (
              <li key={index} className='font-Mbold text-base flex flex-row w-full
              justify-between'>
                <div className='flex flex-col'>
                  <h3>{skill.title}</h3>
                  <h4 className='font-Mmedium text-tertiary-200'>
                    <img src={locationEmoji} alt='Location'
                      className='w-4 h-4 inline-block mr-1' />
                    {skill.location}
                  </h4>
                  {skill.description && (
                    <p className='font-Mregular text-tertiary-200'>
                      {skill.description}
                    </p>
                  )}
                </div>
                <p className='font-Imedium w-56 flex justify-end flex-shrink-0'>
                  {skill.date}
                </p>
              </li>
            ))}
          </ul>
        </section>
        <section className='flex flex-row w-full gap-16'>
          <h2 className='flex flex-shrink-0 text-xl font-Mblack
          text-secondary-500'>
            PROJECTS
            <img src={plantEmoji} alt='Laptop'
              className='w-7 h-7 inline-block ml-2' />
          </h2>
          <ul className='flex flex-row font-Mregular text-white
          text-sm gap-5 w-full'>
            {projects.map((project: Project, index: number) => (
              <li key={index} className='bg-tertiary-500 p-4 rounded-sm w-96
              overflow-hidden hover:scale-101 cursor-pointer transition-all
              duration-150 group' onClick={() => {
                window.location.href = (`/project/${project
                  .title.toLowerCase().replace(/ /g, '-')}`);
              }}>
                <img src={project.image} alt={project.title}
                  className='w-full h-[200px] object-cover rounded-md' />
                <div className='flex flex-col mt-1'>
                  <h3 className='font-Mbold text-base mt-2'>
                    {project.title}
                  </h3>
                  <p className='font-Imedium text-tertiary-200'>
                    {project.date}
                  </p>
                  <div className='h-[1px] bg-tertiary-400 w-full my-4' />
                  <div className='flex flex-row gap-1'>
                    {project.tools.map((tool: string, index: number) => (
                      <img
                        key={index}
                        src={getIcon(tool)}
                        alt={tool} className='w-6 h-6 inline-block mr-2 grayscale
                        group-hover:grayscale-0 transition-all duration-150
                        rounded-sm'
                      />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
