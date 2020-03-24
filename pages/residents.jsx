import Head from 'next/head'
import React, { Component } from 'react';
import ResidentTable from '../components/resident/components/ResidentTable'
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
        <Layouts>
          <ResidentTable />
        </Layouts>
      </Provider>
    );
  }
}

export default residentsIndex;
