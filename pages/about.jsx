import Head from 'next/head'
import React, { Component } from 'react';
import Headers from '../components/Headers'
import Menus from '../components/Menus'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../reducers'
import ls from 'local-storage'


export class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
    ls.set('key', 'value')
    
  }
  render() {
    const store = createStore(reducers)
    // console.log(store.getState());
    
    return (
      <Provider store={store}>
        <Head>
          <title>Create Next App</title>
        </Head>
        <Headers />
        <Menus />
        <div className="container-fluid">
          
        </div>
      </Provider>
    );
  }
}

export default index;
