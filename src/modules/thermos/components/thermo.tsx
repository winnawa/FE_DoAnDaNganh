import { Button, Card, CardProps, Checkbox, Form, Input, Modal, ModalProps, Space, Typography } from 'antd';
import styled from 'styled-components';
import React, { useState } from 'react';
import { devices, ItemImageHolder } from '../../../common';
import { TextProps } from 'antd/es/typography/Text';

const { Text } = Typography;


const ThermoDetailForm: React.FC<ThermoComponentProps> = (props) => {
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  return(
    <>
      <Form 
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

const CustomizedModel: React.FC<ModalProps> = styled(Modal)`
  .ant-modal-content{
    height: 400px;
  }
`
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

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const defaultImageUrl =
    'https://assets.fishersci.com/TFS-Assets/CCG/product-images/default.jpg-650.jpg';
  return (
    <>
    <CustomizedModel
          width={500}
          open={open}
          title="Temperature Reporter"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Submit
            </Button>,
          ]}
      >
        <ThermoDetailForm id={props.id} data= {props.data} imageUrl={props?.imageUrl ?? defaultImageUrl} name={props.name ?? 'Thermo Name'}/>
      </CustomizedModel>

      <CustomizedSquareCard hoverable={true} onClick={showModal}>
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
