import { Card, CardProps } from 'antd';
import styled from 'styled-components';

interface BackgroundWrapperProps {
  size: string;
  backgroundColor: string;
}
const BackgroundWrapper = styled.div<BackgroundWrapperProps>`
  width: ${(props) => `${props.size}`};
  height: ${(props) => `${props.size}`};
  background-color: ${(props) => `${props.backgroundColor}`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleDataHolder = styled.div`
  border-radius: 50%;
  background-color: white;
  font-size: xx-large;
`;

interface CustomizedCardProps {
  backgroundColor: string;
}
const CustomizedCard: React.FC<CardProps | CustomizedCardProps> = styled(Card)<CustomizedCardProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => `${props.backgroundColor}`};
  width: 80px;
  height: 80px;
`;

interface DataHolderProps {
  data: string;
}
export const DataHolder: React.FC<DataHolderProps> = (props) => {
  return (
    <>
      <CustomizedCard backgroundColor={'#ff7875'}>
        {/* <BackgroundWrapper size={'100%'} backgroundColor={'#ff7875'}> */}
        <CircleDataHolder>{props.data}</CircleDataHolder>
        {/* </BackgroundWrapper> */}
      </CustomizedCard>
    </>
  );
};
