import React, { FunctionComponent } from 'react';
import { Header, Footer, BreadCrumb } from '../components';
import PropTypes from 'prop-types';
import { Analytics } from '@vercel/analytics/react';
import grid from '../assets/grid.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-tertiary-600 h-fit min-h-screen flex flex-col relative'>
      <Header />
      <div className='w-full h-fit absolute -top-64'>
        <img src={grid} alt='Grid' className='w-full h-full object-cover opacity-60'/>
      </div>
      <div className='flex flex-col flex-1 z-[2] items-center'>
        <div className='max-w-4xl px-5 py-10'>
          <BreadCrumb />
          {children}
        </div>
        <Analytics />
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
