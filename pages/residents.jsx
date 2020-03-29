import Head from 'next/head'
import React, { Component } from 'react';
import ResidentTable from '../components/Resident/components/ResidentTable'
import { Provider } from 'react-redux'
import store from '../store'
import Layouts from './../layouts/layouts'

export class residentsIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render() {
    
    return (
      <Provider store={store}>
        <Head>
          <title>Residents</title>
        </Head>
        <Layouts>
          <ResidentTable />
        </Layouts>
      </Provider>
    );
  }
}

export default residentsIndex;
