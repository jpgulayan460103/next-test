import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Badge  } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import queryString from "query-string";
import { useRouter } from 'next/router'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function mapStateToProps(state) {
  return {
    sentCount: state.smsBlast.sentCount,
    recipients: state.smsBlast.recipients,
    sendStatus: state.smsBlast.sendStatus,
  };
}
const Menus = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter()
  router.query = queryString.parse(router.asPath.split(/\?/)[1]);
  var {route} = router;
  var {id} = router.query;
  if(id){
    switch (route) {
      case "/resident":
        route = "/resident-edit";
        break;
      case "/barangay-official":
        route = "/barangay-official-edit";
        break;
    
      default:
        break;
    }
  }

  const showSmsProgress = (props) => {
    if(props.sendStatus && props.recipients.threads){
      return (
        <Badge count={`${props.sentCount}/${props.recipients.threads.count}`} />
      )
    }
  }
  
  return (
    <React.Fragment>
        <Sider breakpoint="lg" collapsedWidth="0" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} onBreakpoint={broken => {}}>
          <br />
          <br />
          <div className="logo mr-1"  >
          <img src="/images/logo.png"  className="h-auto p-2 pt-3" alt=""/>
          </div>
          {(!collapsed ? (<div className="mb-32 pb-2"></div>)  : (<div className="mb-2 pb-2"></div>)   )}
          <Menu theme="dark" defaultSelectedKeys={[route]} mode="inline" defaultOpenKeys={['residents','officials']}>
            <Menu.Item key="/">
              <UserOutlined />
              <Link href="/">
                <a>
                  Dashboard
                </a>
              </Link>
            </Menu.Item>
            <SubMenu
              key="officials"
              title={
                <span>
                  <UserOutlined />
                  <span>Barangay Officials</span>
                </span>
              }
            >
              <Menu.Item key="/barangay-officials">
                <Link href="/barangay-officials">
                  <a>All Barangay Officials</a>
                </Link>
              </Menu.Item>

              <Menu.Item key="/barangay-official">
                <Link href="/barangay-official">
                  <a>Add Barangay Official</a>
                </Link>
              </Menu.Item>
              
              { id ? (
                <Menu.Item key="/barangay-official-edit">
                    Edit Barangay Official
                </Menu.Item>
              ) : "" }
            </SubMenu>
            <SubMenu
              key="residents"
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
                  <a>Add Resident</a>
                </Link>
              </Menu.Item>
              
              { id ? (
                <Menu.Item key="/resident-edit">
                    Edit Resident
                </Menu.Item>
              ) : "" }

            </SubMenu>
            <Menu.Item key="/sms-blast">
              <UserOutlined />
              <Link href="/sms-blast">
                <a>
                  SMS Blast {showSmsProgress(props)}
                </a>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </React.Fragment>
  );
}

export default connect(
  mapStateToProps,
)(Menus);

