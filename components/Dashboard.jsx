import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Divider, Typography } from 'antd';
import { Line } from 'react-chartjs-2';

const { Title } = Typography;

function mapStateToProps(state) {
  return {
    
  };
}

const Dashboard = () => {

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemember'],
    datasets: [
      {
        label: '2019 Blotters',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: [
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
        ]
      },
      {
        label: '2020 Blotters',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(175,92,192,0.4)',
        borderColor: 'rgba(175,92,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(175,92,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(175,92,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: [
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
        ]
      },
      {
        label: '2021 Blotters',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(175,92,92,0.4)',
        borderColor: 'rgba(175,92,92,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(175,92,92,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(175,92,92,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: [
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
          (Math.random()*100).toFixed(0),
        ]
      },
    ]
  };
  return (
    <div>
      <div className="site-card-wrapper">
        <Row gutter={[10,10]}>
          <Col lg={8} xs={24}>
            <Card title="Registered Residents" bordered={false}>
              <Title>{ (Math.random()*100).toFixed(0) }</Title>
            </Card>
          </Col>
          <Col lg={8} xs={12}>
            <Card title="Registered Voters" bordered={false}>
              <Title>{ (Math.random()*100).toFixed(0) }</Title>
            </Card>
          </Col>
          <Col lg={8} xs={12}>
            <Card title="Blotters for this month" bordered={false}>
              <Title>{ (Math.random()*100).toFixed(0) }</Title>
            </Card>
          </Col>
          <Col span={24}>
              <Title style={{textAlign: "center"}}>Blotters Chart</Title>
              <Line data={data} />
          </Col>
        </Row>
      </div>
    </div>
  );
}


export default connect(
  mapStateToProps,
)(Dashboard);