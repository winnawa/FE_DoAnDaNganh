import styled from 'styled-components';
import React from 'react';
import { devices } from '../../../common';
import { Button, Card, CardProps, Checkbox, Form, Input } from 'antd';

const BackgroundWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(https://cdn.dribbble.com/userupload/3915427/file/original-8c6b5eecacdfe5ebea09e02a7391243b.jpg?compress=1&resize=1024x768);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`
const CustomizedCard : React.FC<CardProps> = styled(Card)`
    height: 500px;
    border-radius: 10px;
`


const FormWrapper : React.FC = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
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
    
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
    
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
}

export const AuthenticationPageWrapper: React.FC = () => {
  
  return (
    <>
        <BackgroundWrapper>
            <CustomizedCard>
                <FormWrapper/>
            </CustomizedCard>
        </BackgroundWrapper>
    </>
  );
};