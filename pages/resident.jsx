import Head from 'next/head'
import React, { Component } from 'react';
import ResidentForm from '../components/Resident/components/ResidentForm'
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
        <Head>
          <title>Resident Form</title>
        </Head>
        <Layouts>
        <div className="row">
          <div className="col-md-12">
            <ResidentForm />
          </div>
        </div>
        </Layouts>
      </Provider>
    );
  }
}

export default index;
