import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './nav-bar';

export const Layout: React.FC = () => {
  return (
    <>
      <NavBar
        topics={[
          { content: 'Home', icon: <HomeOutlined />, path: '' },
          { content: 'Lamp', icon: <AppstoreOutlined />, path: 'lamp' },
          { content: 'Thermo', icon: <SettingOutlined />, path: 'thermo' }
        ]}
      />
      <Outlet />
    </>
  );
};
