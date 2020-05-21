import React, { useState } from 'react';
import { connect } from 'react-redux';
import ResidentForm from './components/ResidentForm'
import ResidentTable from './components/ResidentTable'
import { Table, Tag } from 'antd';

function mapStateToProps(state) {
  return {
    formType: state.resident.formType,
    formStatus: state.resident.formStatus,
  };
}

const Resident = (props) => {
  return (
    <div>
      { (props.formStatus == "hide" ? <ResidentTable /> : <ResidentForm />) }
    </div>
  );
}



export default connect(
  mapStateToProps,
)(Resident);