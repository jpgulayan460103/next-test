import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import queryString from "query-string";
import { useRouter } from 'next/router'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Menus = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter()
  router.query = queryString.parse(router.asPath.split(/\?/)[1]);
  var {route} = router;
  var {id} = router.query;
  if(id){
    if(route == "/resident"){
      route = "/resident-edit";
    }
  }
  
  return (
    <React.Fragment>
        <Sider breakpoint="lg" collapsedWidth="0" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} onBreakpoint={broken => {}}>
          <br />
          <br />
          <div className="logo mr-1"  >
          {/* <img src="/images/logo.png"  className="h-auto p-2 pt-3" alt=""/> */}
          </div>
          {(!collapsed ? (<div className="mb-32 pb-2"></div>)  : (<div className="mb-2 pb-2"></div>)   )}
          <Menu theme="dark" defaultSelectedKeys={[route]} mode="inline" defaultOpenKeys={['sub1']}>
            <Menu.Item key="/">
              <UserOutlined />
              <Link href="/">
                <a>
                  Dashboard
                </a>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <UserOutlined />
                  <span>Residents</span>
                </span>
              }
            >
              <Menu.Item key="/residents">
                <Link href="/residents">
                  <a>All Residents</a>
                </Link>
              </Menu.Item>

              <Menu.Item key="/resident">
                <Link href="/resident">
                  <a>Add Residents</a>
                </Link>
              </Menu.Item>
              
              { id ? (
                <Menu.Item key="/resident-edit">
                    Edit Residents
                </Menu.Item>
              ) : "" }


            </SubMenu>
          </Menu>
        </Sider>
      </React.Fragment>
  );
}

export default Menus;

