import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import API from '../../../api'
import { ExclamationCircleOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Typography, Divider, Pagination, Modal, Select, Input, Button } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import _isEmpty from 'lodash/isEmpty'
import _forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty';

const { Option } = Select;
const { Search } = Input;
const { Title, Link } = Typography;
const { confirm } = Modal;

function mapStateToProps(state) {
  return {
    barangays: state.resident.barangays,
  };
}

const ResidentTable = (props) => {
  useEffect(() => {
    getResidents();
    loadBarangays();
  }, []);
  const [loading, setLoading] = useState(false);
  const [residents, setResidents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [searchData, setSearchData] = useState({});

  const loadBarangays = () => {
    if(isEmpty(props.barangays)){
      getBarangays();
    }
  }

  const getResidents = (page = 1) => {
    setLoading(true);
    let filterOptions = {
      page: page,
      ...searchData
    }
    API.Resident.all(filterOptions)
    .then((res) => {
      let result = res.data.residents.data;
      let resultPagination = res.data.residents.meta.pagination;
      setLoading(false);
      result.map(item => {
        item.key = `residents-${item.id}`
        return item;
      });
      setResidents(result);
      setPagination(resultPagination);
    })
    .catch((err) => {
      setLoading(false);
    })
    .then((res) => {
      setLoading(false);
    })
  }

  const getBarangays = () => {
    API.Resident.getBarangay()
    .then(res => {
      let barangayList = res.data.options[0].cities[0].barangays;
      props.dispatch({
        type: "SET_BARANGAY",
        data: barangayList
      })
    })
    .catch(err => {
      
    })
    .then(res => {
      
    })
    ;
  }

  const populateBarangaySelection = (barangays) => {
    let items = [];
    items.push(<Option value="all" key="all" >All Barangay</Option>);   
    _forEach(barangays, function(value, key) {
      items.push(<Option value={value.id} key={value.id} >{value.name}</Option>);   
    });
    return items;
  }

  const setBarangayFilter = (value) => {
    setSearchData({...searchData,barangay_id:value});
  }
  const setSearchString = (e) => {
    let string = e.target.value;
    setSearchData({...searchData,query:string});
  }
  const setVotersRegistrationFilter = (value) => {
    setSearchData({...searchData,is_registered_voter:value});
  }

  const deleteResident = (resident) => {
    API.Resident.delete(resident.id)
    .then(res => {
      getResidents();
    })
    .catch(res => {
      Swal.fire({
        title: 'Error',
        text: 'The system cannot find what you are looking for. It may not have existed or it has been removed.',
        icon: 'error',
        confirmButtonText: 'Ok',
        onClose: () => {}
      })
    })
    .then(res => {})
    ;
  }
  const confirmDeleteResident = (resident) => {
    confirm({
      title: 'Are you sure remove this resident?',
      icon: <ExclamationCircleOutlined />,
      content: `This will permanently remove ${resident.full_name_last} from the list.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteResident(resident);
      },
      onCancel() {
      },
    });
  }

  const editResident = (official) => {
    props.dispatch({
      type: "SET_RESIDENT",
      data: official
    });
    props.dispatch({
      type: "SET_RESIDENT_FORM_STATUS",
      data: "show"
    });
    props.dispatch({
      type: "SET_RESIDENT_FORM_TYPE",
      data: "update"
    });
  }

  const createResident = () => {
    props.dispatch({
      type: "SET_RESIDENT_FORM_STATUS",
      data: "show"
    });
    props.dispatch({
      type: "SET_RESIDENT",
      data: {}
    });
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
          { `${ record.purok_sitio ? record.purok_sitio : "" } ${ record.street_address ? record.street_address : "" } ${record.barangay.barangay_name}, ${record.barangay.city_name} ${record.barangay.province_name}` }
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
      dataIndex: 'contact_number',
      key: 'contact_number',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link onClick={() => {editResident(record)}}>Edit</Link>
          &nbsp;|&nbsp;
          <Link onClick={() => {confirmDeleteResident(record)}}>Delete</Link>
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
      <Button type="primary"  style={{ background: "green" }} icon={<PlusOutlined />} onClick={() => createResident()}>
        Add
      </Button>
      <Search
        allowClear
        placeholder="input search text"
        onChange={value => setSearchString(value)}
        style={{ width: 200 }}
        onSearch={getResidents}
      />
      <Select
        showSearch
        allowClear
        style={{ width: 200 }}
        placeholder="Select a Barangay"
        optionFilterProp="children"
        onChange={setBarangayFilter}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {populateBarangaySelection(props.barangays)}
      </Select>
      <Select
        allowClear
        placeholder="Select Voters Registration Status"
        style={{ width: 200 }}
        onChange={setVotersRegistrationFilter}
      >
        <Option value="1">Registered</Option>
        <Option value="0">Not Registered</Option>
      </Select>
      <Button type="primary" icon={<SearchOutlined />} onClick={getResidents}>
        Search
      </Button>
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