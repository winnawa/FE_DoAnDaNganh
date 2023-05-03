import {
  Button,
  Card,
  CardProps,
  Form,
  Input,
  Modal,
  ModalProps,
  Space,
  Typography,
} from 'antd';
import styled from 'styled-components';
import React, { useState } from 'react';
import { devices, ItemImageHolder } from '../../../common';
import { TextProps } from 'antd/es/typography/Text';
import { UpdateThermoDetailForm } from '../../../redux';

const { Text } = Typography;

interface CustomizedImageContainerProps {
  imageUrl: string;
}
const CustomizedImageContainer = styled.div<CustomizedImageContainerProps>`
  background-image: ${(props) => `url(${props.imageUrl})`};
  width: 100px;
  height: 100px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;
  top: -10px;
`;

const ThermoDetailForm: React.FC<ThermoComponentProps> = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const imageUrl = Form.useWatch('ImageUrl', form);

  const onFinish = (values: any) => {
    const form = {
      name: values.ThermoName,
      imageUrl: values.ImageUrl,
    };
    console.log('Success:', values, form);
    props.saveChangeSubmission(form);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const resetFields = () => {
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        disabled={!isEditMode}
        layout={'vertical'}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Thermo Name"
          name="ThermoName"
          initialValue={props.name}
          rules={[{ required: true, message: 'Please input thermo name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image Url"
          name="ImageUrl"
          initialValue={props.imageUrl}
          rules={[{ required: true, message: 'Please input image Url!' }]}
        >
          <Input />
        </Form.Item>

        <CustomizedImageContainer imageUrl={imageUrl} />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'relative',
        }}
      >
        <Button
          style={{
            width: '74px',
            position: 'absolute',
            top: '-56px',
            right: '74px',
          }}
          onClick={() => {
            resetFields();
            setIsEditMode(false);
          }}
        >
          Cancel
        </Button>
        <Button
          style={{ width: '74px', position: 'absolute', top: '-56px' }}
          onClick={() => {
            setIsEditMode(true);
          }}
        >
          Edit
        </Button>
      </div>
      {/* position:'relative',top:'-56px' */}
    </>
  );
};

const CustomizedModel: React.FC<ModalProps> = styled(Modal)`
  .ant-modal-content {
    height: 400px;
  }
`;
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
  saveChangeSubmission: (form: UpdateThermoDetailForm) => Promise<void>;
}
export const ThermoComponent: React.FC<ThermoComponentProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setOpen(false);
    // }, 3000);
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
        footer={[]}
      >
        <ThermoDetailForm
          saveChangeSubmission={props.saveChangeSubmission}
          id={props.id}
          data={props.data}
          imageUrl={props?.imageUrl ?? defaultImageUrl}
          name={props.name ?? 'Thermo Name'}
        />
      </CustomizedModel>

      <CustomizedSquareCard hoverable={true} onClick={showModal}>
        <FlexRowWrapper>
          <ItemImageHolder imageUrl={props?.imageUrl ?? defaultImageUrl} />
          <Text strong>{props.name ? props.name : 'Thermo Name'}</Text>
        </FlexRowWrapper>
        <Seperator />
        <Space>
          <CustomizedText>Data :</CustomizedText>
          <CustomizedText>
            {props.data === '...calculating'
              ? '...calculating'
              : `${props.data} degree Celcius`}{' '}
          </CustomizedText>
        </Space>
      </CustomizedSquareCard>
    </>
  );
};
