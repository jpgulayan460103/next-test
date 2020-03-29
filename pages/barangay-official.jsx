import Head from 'next/head'
import React, { Component } from 'react';
import BarangayOfficialForm from '../components/BarangayOfficial/components/BarangayOfficialForm'
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
          <title>Barangay Official Form</title>
        </Head>
        <Layouts>
        <div className="row">
          <div className="col-md-12">
            <BarangayOfficialForm />
          </div>
        </div>
        </Layouts>
      </Provider>
    );
  }
}

export default index;
