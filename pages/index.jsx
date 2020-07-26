import Head from 'next/head'
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from '../store'
import Layouts from './../layouts/layouts'
import Dashboard from '../components/Dashboard'
import { Card, Col, Row } from 'antd';

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
          <title>Dashboard</title>
        </Head>
        <Layouts>
          <Dashboard />
        </Layouts>
      </Provider>
    );
  }
}

export default index;
