import styled from 'styled-components';

import React, { ReactNode, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { devices, logoUrl } from '../constants';
import { Typography, MenuProps, Menu } from 'antd';
import { TextProps } from 'antd/es/typography/Text';
import { MessageOutlined } from '@ant-design/icons';
import { LogHistoryContainer } from '../containers/log-history';

const NavBarHolder = styled.div`
  padding: 10px 20px 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid;
  border-width: 1px;
  border-color: rgba(5, 5, 5, 0.06);
  background-color: #f5f5f5;
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
  display: flex;
  padding-right: 20px;
  align-items: center;
`;
const CustomizedMenu: React.FC<MenuProps> = styled(Menu)`
  background-color: #f5f5f5;
`;

const WidthWrapper = styled.div`
  width: 100px;

  @media ${devices.tablet} {
    min-width: 300px;
  }
`;

const CustomizedText: React.FC<TextProps> = styled(Typography.Text)`
  padding-left: 10px;
  display: none;
  .span {
    display: block;
  }
  @media ${devices.tablet} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export interface Topic {
  content: string;
  icon: JSX.Element;
  path: string;
}
interface NavBarPropsType {
  topics: Topic[];
}
export const NavBar: React.FC<NavBarPropsType> = (props: NavBarPropsType) => {
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
        <WidthWrapper>
          <CustomizedMenu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            defaultSelectedKeys={[current]}
          />
        </WidthWrapper>
      </GroupElement>
      <GroupElement>
        <UserDisplay>
          <LogHistoryContainer />
          <div>
            <CustomizedText>Welcome to smart home !!!</CustomizedText>
          </div>
        </UserDisplay>
      </GroupElement>
    </NavBarHolder>
  );
};
