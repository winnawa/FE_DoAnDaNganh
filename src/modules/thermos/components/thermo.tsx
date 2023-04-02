import { Card, CardProps, Space, Typography } from 'antd';
import styled from 'styled-components';
import React from 'react';
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

interface ThermoComponentProps {
  id: string;
  data: string;
  name?: string;
  imageUrl?: string | undefined;
}
export const ThermoComponent: React.FC<ThermoComponentProps> = (props) => {
  const defaultImageUrl =
    'https://assets.fishersci.com/TFS-Assets/CCG/product-images/default.jpg-650.jpg';
  return (
    <>
      <CustomizedSquareCard hoverable={true}>
        <FlexRowWrapper>
          <ItemImageHolder imageUrl={props?.imageUrl ?? defaultImageUrl} />
          <Text strong>{props.name ? props.name : 'Thermo Name'}</Text>
        </FlexRowWrapper>
        <Seperator />
        <Space>
          <CustomizedText>Data :</CustomizedText>
          <CustomizedText>{props.data} degree Celcius</CustomizedText>
        </Space>
      </CustomizedSquareCard>
    </>
  );
};
