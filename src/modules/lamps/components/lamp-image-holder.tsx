import { Card, CardProps } from 'antd';
import styled from 'styled-components';
import React from 'react';

interface CustomizedCardProps {
  backgroundImage: string;
}
const CustomizedCard: React.FC<CardProps | CustomizedCardProps> = styled(Card)<CustomizedCardProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100px;
  height: 100px;
`;

interface DataHolderProps {
  data: string;
  imageUrl: string;
}
export const LampImageHolder: React.FC<DataHolderProps> = (props) => {
  return (
    <>
      <CustomizedCard backgroundImage={props.imageUrl} />
    </>
  );
};
