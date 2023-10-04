import React, { FunctionComponent } from 'react';
import { Header, Footer, BreadCrumb } from '../components';
import PropTypes from 'prop-types';
import { Analytics } from '@vercel/analytics/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-tertiary-480 h-fit min-h-screen flex flex-col relative'>
      <Header />
      <div className='pointer-events-none opacity-70 bg-blend-normal
      bg-noisy-texture fixed top-0 left-0 z-[1] h-screen w-screen'/>
      <div className='flex flex-col flex-1 px-5 lg:px-36 py-10 z-[2]'>
        <BreadCrumb />
        {children}
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
