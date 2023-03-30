import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from '../common';

import { HomePage, LampPage, ThermoPage } from '../pages';

export const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="lamp" element={<LampPage />}></Route>
          <Route path="thermo" element={<ThermoPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};
