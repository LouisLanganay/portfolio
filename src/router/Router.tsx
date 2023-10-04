import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Project, Projects } from '../pages';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/projects/:id' element={<Project />} />
      <Route path='/projects' element={<Projects />} />
    </Routes>
  );
};

export default Router;
