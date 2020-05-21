import React, { useState } from 'react';
import { connect } from 'react-redux';
import BarangayOfficialTable from './components/BarangayOfficialTable'
import BarangayOfficialForm from './components/BarangayOfficialForm'

function mapStateToProps(state) {
  return {
    formType: state.barangayOfficial.formType,
    formStatus: state.barangayOfficial.formStatus,
  };
}

const BarangayOfficial = (props) => {
  return (
    <div>
      { (props.formStatus == "hide" ? <BarangayOfficialTable /> : <BarangayOfficialForm />) }
    </div>
  );
}


export default connect(
  mapStateToProps,
)(BarangayOfficial);