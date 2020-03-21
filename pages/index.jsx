import Head from 'next/head'
import React, { Component } from 'react';
import Headers from '../components/Headers'
import Menus from '../components/Menus'
import LoginForm from '../components/LoginForm'
import { Provider } from 'react-redux'
import store from '../store'

export class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render() {
    
    return (
      <Provider store={store}>
        <Head>
          <title>Create Next App</title>
        </Head>
        <Headers />
        <Menus />
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
}

export default index;
