import React from 'react';
import Layout from './Layout';
import heyEmoji from '../assets/emojis/person_raising_hand_3d_light.png';
import laptopEmoji from '../assets/emojis/laptop_3d.png';
import skills from './skills.json';

const Home: React.FC = () => {
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
      <section className='flex flex-row w-full gap-16'>
        <h2 className='flex flex-shrink-0 text-xl font-Mblack text-secondary-500'>
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
          <ul className='flex flex-col font-Mregular text-white text-sm gap-1'>
            <li className='font-Mbold text-base'>
              TOOLS
            </li>
            <li className='text-tertiary-200'>API Rest</li>
            <li className='text-tertiary-200'>Git</li>
            <li className='text-tertiary-200'>Linux systems</li>
            <li className='text-tertiary-200'>CI/CD</li>
            <li className='text-tertiary-200'>Docker</li>
            <li className='text-tertiary-200'>MongoDB</li>
          </ul>
          <ul className='flex flex-col font-Mregular text-white text-sm gap-1'>
            <li className='font-Mbold text-base'>
              DESIGN
            </li>
            <li className='text-tertiary-200'>Tailwindcss</li>
            <li className='text-tertiary-200'>Figma</li>
          </ul>
          <ul className='flex flex-col font-Mregular text-white text-sm gap-1'>
            <li className='font-Mbold text-base'>
              FRAMEWORKS
            </li>
            <li className='text-tertiary-200'>React</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
