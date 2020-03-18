import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import API from '../api'

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
    this.handleTest = this.handleTest.bind(this);
  }
  handleTest() {
    API.User.getUsers()
      .then(res => {
        
      })
      .catch(err => {

      })
      .then(res => {})
  }
  render() {
    const onFinish = values => {
      console.log('Success:', values);
      API.User.login(values)
      .then(res => {
        this.props.dispatch({
          type: "USER_LOGIN_SUCCESSFUL",
          data: res.data
        });
      })
      .catch(err => {
        this.props.dispatch({
          type: "USER_LOGIN_FAILED",
          data: err
        });
      })
      .then(res => {})
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

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="button" size="large" onClick={() => this.handleTest() } block>
              test
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