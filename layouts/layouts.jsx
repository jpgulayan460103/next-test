import Head from 'next/head'
import Headers from '../components/Headers'
import Menus from '../components/Menus'
import LoginForm from '../components/LoginForm'
import { Provider } from 'react-redux'
import store from '../store'
import {useEffect,useState} from 'react'
import ls from 'local-storage'
import Router from 'next/router'
import { Layout, BackTop  } from "antd";

const { Header, Content, Footer, Sider } = Layout;


const Post = ({children}) => {
  useEffect(() => {
    let user = ls('user');
    if(user){
      
    }else{
      
      Router.push('/login')
    }
  }, []);
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Provider store={store}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Menus />
        <Layout className="site-layout">
          <Header />
          <Headers />
          <br />
          <Content style={{ margin: '0 16px'}}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: '100%' }}>
              {children}
            </div>
            <BackTop />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Provider>
  );
}

export default Post;
