import Head from 'next/head'
import React, { Component } from 'react';
import Resident from '../components/resident/Resident'
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
        <Layouts>
          <Resident />
        </Layouts>
      </Provider>
    );
  }
}

export default index;
