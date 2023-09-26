import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Project } from '../pages';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/project/:id' element={<Project />} />
    </Routes>
  );
};

export default Router;
