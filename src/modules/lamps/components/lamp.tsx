import { Card, CardProps, Switch, Typography } from 'antd';
import styled from 'styled-components';
import { LampStatus } from '../domains';
import React, { useState } from 'react';
import { devices, ItemImageHolder } from '../../../common';
import { TextProps } from 'antd/es/typography/Text';

const { Text } = Typography;

const CustomizedSquareCard: React.FC<CardProps> = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;

  @media ${devices.tablet} {
    width: 280px;
  }
`;

const FlexRowWrapper = styled.div`
  display: flex;
  column-gap: 20px;
`;

const Seperator = styled.div`
  border-top: solid #dcdce7 1px;
  margin-top: 10px;
  padding-bottom: 10px;
`;

const CustomizedText: React.FC<TextProps> = styled(Text)`
  padding-right: 8px;
`;

export interface LampComponentProps {
  id: string;
  status: LampStatus;
  name?: string;
  note?: string;
  imageUrl: string;
}

export const LampComponent: React.FC<LampComponentProps> = (props) => {
  const [status, setStatus] = useState(props.status === 'on');

  const statusChangeHandler = () => {
    // TODO: dispatch status change action
  };

  return (
    <>
      <CustomizedSquareCard hoverable={true}>
        <FlexRowWrapper>
          <ItemImageHolder imageUrl={props.imageUrl} />
          <Text strong>{props.name ? props.name : 'Lamp Name'}</Text>
        </FlexRowWrapper>
        <Seperator />
        <CustomizedText>Status</CustomizedText>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          checked={status}
          onClick={statusChangeHandler}
        />
      </CustomizedSquareCard>
    </>
  );
};