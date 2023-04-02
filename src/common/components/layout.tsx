import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { NavBar } from './nav-bar';

const BackgroundColorWrapper = styled.div`
  padding-top: 20px;
  background-color: #ececf2;
  min-height: calc(100vh - 84px);
  overflow: auto;
`;

export const Layout: React.FC = () => {
  return (
    <>
      <NavBar
        topics={[
          { content: 'Home', icon: <HomeOutlined />, path: '' },
          { content: 'Lamp', icon: <AppstoreOutlined />, path: 'lamp' },
          { content: 'Thermo', icon: <SettingOutlined />, path: 'thermo' },
        ]}
      />
      <BackgroundColorWrapper>
        <Outlet />
      </BackgroundColorWrapper>
    </>
  );
};
