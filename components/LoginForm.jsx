import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined } from '@ant-design/icons';

function mapStateToProps(state) {
  return {

  };
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render() {
    const onFinish = values => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return (
      <div>
        <img src="/images/logo.jpg" className="h-40 w-45 rounded-full mx-auto" alt=""/>
        <Form
          {...layout}
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(LoginForm);