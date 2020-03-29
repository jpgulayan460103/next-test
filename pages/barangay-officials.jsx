import Head from 'next/head'
import React, { Component } from 'react';
import BarangayOfficialTable from '../components/BarangayOfficial/components/BarangayOfficialTable'
import { Provider } from 'react-redux'
import store from '../store'
import Layouts from './../layouts/layouts'

export class BarangayOfficialIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render() {
    
    return (
      <Provider store={store}>
        <Head>
          <title>Barangay Officials</title>
        </Head>
        <Layouts>
          <BarangayOfficialTable />
        </Layouts>
      </Provider>
    );
  }
}

export default BarangayOfficialIndex;
