import Head from 'next/head'
import Headers from '../components/Headers'
import Menus from '../components/Menus'
import LoginForm from '../components/LoginForm'
import { Provider } from 'react-redux'
import store from '../store'
import {useEffect} from 'react'
import ls from 'local-storage'
import Router from 'next/router'

const Post = ({children}) => {
  useEffect(() => {
    let user = ls('user');
    if(user){
      
    }else{
      
      Router.push('/login')
    }
  }, []);
  return (
    <Provider store={store}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Headers />
      <Menus />
      {children}
    </Provider>
  );
}

export default Post;
