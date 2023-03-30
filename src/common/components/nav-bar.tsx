import styled from 'styled-components';

import React,{ ReactNode, useEffect, useState, } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoUrl } from '../constants';
import { Typography, MenuProps, Menu } from 'antd';

const { Text } = Typography;


const NavBarHolder = styled.div`
  padding: 10px 20px 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid;
  border-width: 1px;
  border-color: rgba(5, 5, 5, 0.06);
  margin-bottom: 20px;
`;
interface LogoContainerProps {
  logoUrl: string;
}
const LogoContainer = styled.div<LogoContainerProps>`
  background-image: ${(props) => `url(${props.logoUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 44px;
  height: 44px;
  margin-right: 10px;
`;
const GroupElement = styled.div`
  display: flex;
  .ant-menu-horizontal {
    border-bottom: none !important;
  }
`;
const UserDisplay = styled.div`
  padding-right: 20px;
`;
const CustomizedMenu: React.FC<MenuProps> = styled(Menu)``;

export interface Topic {
  content: string;
  icon: JSX.Element;
  path: string;
}
interface NavBarPropsType {
  topics: Topic[];
}
export const NavBar: React.FC<NavBarPropsType> = (props:NavBarPropsType) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<string>(props.topics[0].path);
  
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  const items: MenuProps['items'] = props.topics.map((topic) => ({
    label: topic.content,
    key: topic.path,
    icon: topic.icon,
  }));

  useEffect(() => {
    navigate('/');
  }, []);

  return (
    <NavBarHolder>
      <GroupElement>
        <LogoContainer logoUrl={logoUrl} />
        <div style={{ minWidth: '300px' }}>
          <CustomizedMenu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            defaultSelectedKeys={[current]}
          />
        </div>
      </GroupElement>
      <GroupElement>
        <UserDisplay>
          <Text>Welcome to smart home !!!</Text>
        </UserDisplay>
      </GroupElement>
    </NavBarHolder>
  );
};
