import React, { FunctionComponent } from 'react';
import { Header, Footer } from '../components';
import PropTypes from 'prop-types';
import { Analytics } from '@vercel/analytics/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-tertiary-480 h-fit min-h-screen flex flex-col'>
      <Header />
      <div className='flex flex-col flex-1 px-5 lg:px-36 py-10'>
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
