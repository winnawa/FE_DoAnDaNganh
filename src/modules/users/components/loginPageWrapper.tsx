import styled from 'styled-components';
import React from 'react';
import { devices } from '../../../common';
import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  Checkbox,
  Form,
  Input,
  Typography,
} from 'antd';
import { InputProps } from 'rc-input';
import { PasswordProps } from 'antd/es/input';
import { LoginSubmissionForm } from '../containers';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(https://cdn.dribbble.com/userupload/6110201/file/original-a8d3977276d6ea418d8d73e0d6296841.jpeg?compress=1&resize=1024x768);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
`;
const CustomizedCard: React.FC<CardProps> = styled(Card)`
  height: 480px;
  border-radius: 10px;
`;

const CustomizedInput: React.FC<InputProps> = styled(Input)`
  width: 340px;
`;
const CustomizedPassword: React.FC<PasswordProps> = styled(Input.Password)`
  width: 340px;
`;
const CustomizedButton: React.FC<ButtonProps> = styled(Button)`
  width: 340px;
`;
const TittleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;
const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

interface FormSubmissison {
  username: string;
  password: string;
}
interface FormWrapperProps {
  loginSubmissionHandler: (form: LoginSubmissionForm) => Promise<void>;
}
const FormWrapper: React.FC<FormWrapperProps> = (props) => {
  const onFinish = (values: FormSubmissison) => {
    const submissionForm: FormSubmissison = {
      username: values.username,
      password: values.password,
    };
    props.loginSubmissionHandler(submissionForm);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        // label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <CustomizedInput placeholder="Enter Username" />
      </Form.Item>

      <Form.Item
        // label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <CustomizedPassword placeholder="Password" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <CustomizedButton type="primary" htmlType="submit">
          Submit
        </CustomizedButton>
      </Form.Item>
    </Form>
  );
};

interface LoginPageWrapperProps {
  loginSubmissionHandler: (form: LoginSubmissionForm) => Promise<void>;
}
export const LoginPageWrapper: React.FC<LoginPageWrapperProps> = (props) => {
  return (
    <>
      <BackgroundWrapper>
        <CustomizedCard>
          <TittleWrapper>
            <Title level={3}>SMART HOME APP</Title>
          </TittleWrapper>
          <TextWrapper>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              <Text>
                Hey, enter your details to login and start the tour !!!
              </Text>
            </div>
          </TextWrapper>
          <FormWrapper loginSubmissionHandler={props.loginSubmissionHandler} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text>
              Don&apos;t have an account?
              <Link to={'/signup'}> Sign up </Link>
              here
            </Text>
          </div>
        </CustomizedCard>
      </BackgroundWrapper>
    </>
  );
};
