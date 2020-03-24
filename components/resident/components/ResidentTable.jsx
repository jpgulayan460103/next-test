import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router'
import API from '../../../api'
import moment from 'moment';
import { Table, Typography, Divider, Pagination } from 'antd';
import Link from 'next/link'
import _isEmpty from 'lodash/isEmpty'


const { Title } = Typography;

function mapStateToProps(state) {
  return {

  };
}
const ResidentTable = (props) => {
  const [residents, setResidents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getResidents();
  }, []);

  const getResidents = (page = 1) => {
    setLoading(true);
    let filterOptions = {
      page: page
    }
    API.Resident.all(filterOptions)
    .then((res) => {
      let result = res.data.residents.data;
      let resultPagination = res.data.residents.meta.pagination;
      console.log(resultPagination);
      
      setResidents(result);
      setPagination(resultPagination);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })
    .then((res) => {
      setLoading(false);
    })
  }

  const dataSource = residents;
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name_last',
      key: 'full_name_last',
    },
    {
      title: 'Adress',
      key: 'address',
      render: (text, record) => (
        <span>
          { `${record.purok_sitio} ${record.street_address}, ${record.psgc.brgy_name}, ${record.psgc.city_name} ${record.psgc.province_name}` }
        </span>
      ),
    },
    {
      title: 'Voter Status',
      dataIndex: 'is_registered_voter',
      key: 'is_registered_voter',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact_number_1',
      key: 'contact_number_1',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link href={{ pathname: '/resident', query: { id: record.id } }}>
            <a>Edit</a>
          </Link>
          &nbsp;|&nbsp;
          <Link href="/">
            <a>
              Dashboard
            </a>
          </Link>
        </span>
      ),
    }
  ];

  const paginationConfig = {
    defaultCurrent: !_isEmpty(pagination) ? pagination.current_page : 0,
    total: !_isEmpty(pagination) ? pagination.total : 0,
    pageSize: !_isEmpty(pagination) ? pagination.per_page : 0,
  };

  const handleResidentPage = (val) => {
    getResidents(val);
  }

  return (
    <div>
      <Title style={{textAlign: "center"}}>
        RESIDENTS
      </Title>
      <Divider />
      <Table dataSource={dataSource} columns={columns} pagination={false} loading={loading} />
      <Divider />

      {!_isEmpty(residents) ? (<Pagination {...paginationConfig} onChange={handleResidentPage} />): ""}

    </div>
  );
}


export default connect(
  mapStateToProps,
)(ResidentTable);