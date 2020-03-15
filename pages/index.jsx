import Head from 'next/head'
import React, { Component } from 'react';
import Headers from '../components/Headers'
import Menus from '../components/Menus'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import todos from '../reducers/todos'
import visibilityFilter from '../reducers/visibilityFilter'


const rootReducer = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

const initialState = { 
  todos: {
    isLoggedParent: "314234827349"
  }
};

const store = createStore(
  rootReducer, 
  initialState
);

export class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedParent: "asjdbasdbajdaasdas67d57a"
    }
    
  }
  render() {
    return (
      <Provider store={store}>
        <Head>
          <title>Create Next App</title>
        </Head>
        <Headers />
        <Menus />
        <div className="container-fluid">
          { this.state.isLoggedParent }
        </div>
      </Provider>
    );
  }
}

export default index;
