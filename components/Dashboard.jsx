import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Divider } from 'antd';

function mapStateToProps(state) {
  return {
    
  };
}

const Dashboard = () => {
  return (
    <div>
      <div className="site-card-wrapper">
        <Row gutter={[10,10]}>
          <Col lg={8} xs={24}>
            <Card title="Registered Residents" bordered={false}>
              Total Registered
            </Card>
          </Col>
          <Col lg={8} xs={12}>
            <Card title="Registered Voters" bordered={false}>
              Registered Residents
            </Card>
          </Col>
          <Col lg={8} xs={12}>
            <Card title="Registered Voters" bordered={false}>
              Registered Voters
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}


export default connect(
  mapStateToProps,
)(Dashboard);