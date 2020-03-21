import Head from 'next/head'
import React, { Component } from 'react';
import Headers from '../components/Headers'
import Menus from '../components/Menus'
import LoginForm from '../components/LoginForm'
import { Provider } from 'react-redux'
import store from '../store'
import Router from 'next/router'

export class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  componentDidMount(){
    // window.location ='http://example.com'
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
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
              about <br />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default index;
