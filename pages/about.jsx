import React, { Component } from 'react';
import { Slider, Switch } from 'antd';
import Headers from '../components/Headers'

class About extends Component {
  constructor(props){
      super(props);
      this.state = {
          searchText:"asdasdasd",
          disabled: false,
      };
  }
  render() {
    const { disabled } = this.state;
    return (
      <div>
        <Headers />
        <Slider defaultValue={30} disabled={disabled} />
        <Slider range defaultValue={[20, 50]} disabled={disabled} />
        Disabled: <Switch size="small" checked={disabled} onChange={this.handleDisabledChange} />
      </div>
    );
  }
}

export default About;