import {
  Button,
  Card,
  CardProps,
  Form,
  Input,
  Modal,
  ModalProps,
  Switch,
  Typography,
} from 'antd';
import styled from 'styled-components';
import { LampStatus } from '../domains';
import React, { useState } from 'react';
import { devices, ItemImageHolder } from '../../../common';
import { TextProps } from 'antd/es/typography/Text';
import { UpdateSingleLampDetailForm } from '../../../redux';
import { SwitchClickEventHandler } from 'antd/es/switch';

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

const LampDetailForm: React.FC<
  Omit<LampComponentProps, 'toggleLampHandler'>
> = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const imageUrl = Form.useWatch('ImageUrl', form);

  const onFinish = (values: any) => {
    const form = {
      lamp_id: props.id,
      name: values.LampName,
      imageUrl: values.ImageUrl,
    };
    console.log('Success:', values, form);
    props.saveChangeSubmission(form);
    setIsEditMode(false);
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
          label="Lamp Name"
          name="LampName"
          initialValue={props.name}
          rules={[{ required: true, message: 'Please input lamp name!' }]}
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

export interface LampComponentProps {
  id: string;
  status: LampStatus;
  name?: string;
  note?: string;
  imageUrl: string;
  saveChangeSubmission: (form: UpdateSingleLampDetailForm) => Promise<void>;
  toggleLampHandler: (lampId: UpdateSingleLampDetailForm) => Promise<void>;
}

export const LampComponent: React.FC<LampComponentProps> = (props) => {
  const [status, setStatus] = useState(props.status === 'on');
  const [open, setOpen] = useState(false);

  const statusChangeHandler = (e: any) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    const toggledStatus = !status;
    const form: UpdateSingleLampDetailForm = {
      lamp_id: props.id,
      status: toggledStatus ? 'on' : 'off',
    };
    props.toggleLampHandler(form);
    setStatus(!status);
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = () => {};

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
        <LampDetailForm
          saveChangeSubmission={props.saveChangeSubmission}
          id={props.id}
          status={props.status}
          imageUrl={props?.imageUrl}
          name={props.name ?? 'Thermo Name'}
        />
      </CustomizedModel>

      <CustomizedSquareCard hoverable={true} onClick={showModal}>
        <FlexRowWrapper>
          <ItemImageHolder imageUrl={props.imageUrl} />
          <Text strong>{props.name ? props.name : 'Lamp Name'}</Text>
        </FlexRowWrapper>
        <Seperator />
        <CustomizedText>Status</CustomizedText>
        <span
          onClick={(e) => {
            statusChangeHandler(e);
          }}
        >
          <Switch
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={status}
          />
        </span>
      </CustomizedSquareCard>
    </>
  );
};
