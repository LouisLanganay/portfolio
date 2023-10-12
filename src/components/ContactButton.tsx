import React from 'react';

const ContactButton: React.FC = () => {
  return (
    <button onClick={() => {
      window.open('mailto:louislanganay@gmail.com','_blank');
    }}
    className='transition-all duration-300 hover:bg-secondary-500
    ease-in-out text-white font-Mmedium px-4 py-2
    border-tertiary-400 border-2 rounded-full ml-4'>
      Contact Me
    </button>
  );
};

export default ContactButton;
