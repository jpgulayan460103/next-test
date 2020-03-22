import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Menus = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <React.Fragment>
        <Sider breakpoint="lg" collapsedWidth="0" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} onBreakpoint={broken => {console.log(broken)}}>
          <br />
          <br />
          <div className="logo mr-1"  >
          <img src="/images/logo.png"  className="h-auto p-2 pt-3" alt=""/>
          </div>
          {(!collapsed ? (<div className="mb-32 pb-2"></div>)  : (<div className="mb-2 pb-2"></div>)   )}
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <UserOutlined />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <UserOutlined />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <UserOutlined />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <UserOutlined />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <UserOutlined />
            </Menu.Item>
          </Menu>
        </Sider>
      </React.Fragment>
  );
}

export default Menus;

