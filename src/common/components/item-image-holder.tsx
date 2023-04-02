import { Card, CardProps } from 'antd';
import styled from 'styled-components';
import React from 'react';

interface CustomizedCardProps {
  backgroundImage: string;
}
const CustomizedCard: React.FC<CardProps | CustomizedCardProps> = styled(
  Card,
)<CustomizedCardProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 110px;
  height: 110px;
`;

interface DataHolderProps {
  imageUrl: string;
}
export const ItemImageHolder: React.FC<DataHolderProps> = (props) => {
  return (
    <>
      <CustomizedCard backgroundImage={props.imageUrl} />
    </>
  );
};
