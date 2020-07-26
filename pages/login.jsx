import Head from 'next/head'
import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm'
import { Provider } from 'react-redux'
import store from '../store'
import Layouts from './../layouts/layouts'
import Router from 'next/router'
import ls from 'local-storage'


const login = () => {
  useEffect(() => {
    let user = ls('user');
    if(user){
      Router.push('/')
    }
  }, []);
  return (
    <Provider store={store}>
      <Head>
        <title>Login</title>
      </Head>
      <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <LoginForm />
            </div>
          </div>
        </div>
    </Provider>
  );
}

export default login;


