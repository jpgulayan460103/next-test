import Head from 'next/head'
import React from 'react';
import BarangayOfficial from '../components/BarangayOfficial/BarangayOfficial'
import { Provider } from 'react-redux'
import store from '../store'
import Layouts from './../layouts/layouts'

const BarangayOfficialIndex = () => {
  return (
    <Provider store={store}>
      <Head>
        <title>Barangay Officials</title>
      </Head>
      <Layouts>
        <BarangayOfficial />
      </Layouts>
    </Provider>
  );
};

export default BarangayOfficialIndex;
