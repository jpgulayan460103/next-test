import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

class PostComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      test: "",
    };
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(PostComponent);