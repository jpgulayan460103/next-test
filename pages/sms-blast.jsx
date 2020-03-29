import Head from 'next/head'
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from '../store'
import Layouts from './../layouts/layouts'
import SmsBlastForm from '../components/SmsBlast/SmsBlastForm'

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
          <div className="row">
            <div className="col-md-4">
              <SmsBlastForm />
            </div>
          </div>
        </Layouts>
      </Provider>
    );
  }
}

export default index;
