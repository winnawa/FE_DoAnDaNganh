import { Card, CardProps, Switch, Typography } from 'antd';
import styled from 'styled-components';
import { LampStatus } from '../domains';
import { LampImageHolder } from './lamp-image-holder';
import React from 'react';

const { Text } = Typography;

const CustomizedSquareCard: React.FC<CardProps> = styled(Card)`
  width: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export interface LampComponentProps {
  id: string;
  status: LampStatus;
  name?: string;
  note?: string;
  image: string;
}
export const LampComponent: React.FC<LampComponentProps> = (props) => {
  return (
    <>
      <CustomizedSquareCard hoverable={true}>
        <LampImageHolder data={props.status} imageUrl={props.image}></LampImageHolder>
        <Text>{props.name ? props.name : 'Lamp Name'}</Text>
        <Switch checkedChildren="On" unCheckedChildren="Off" checked={props.status === 'on'} />
      </CustomizedSquareCard>
    </>
  );
};
