import Head from 'next/head'
import React, { Component } from 'react';
import Headers from '../components/Headers'
import Menus from '../components/Menus'
import LoginForm from '../components/LoginForm'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../reducers'
import ls from 'local-storage'


export class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
    ls.set('key', 'value12348776812734');
    
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
        <br />
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <LoginForm />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default index;
