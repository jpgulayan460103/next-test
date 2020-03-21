import Head from 'next/head'
import React, { Component } from 'react';
import LoginForm from '../components/LoginForm'
import { Provider } from 'react-redux'
import store from '../store'
import Layouts from './../layouts/layouts'

export class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render() {
    
    return (
      <Provider store={store}>
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
