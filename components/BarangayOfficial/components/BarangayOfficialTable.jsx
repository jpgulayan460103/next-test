import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Link from 'next/link'
import API from '../../../api'
import { ExclamationCircleOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Typography, Divider, Pagination, Modal, Select, Input, Button } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import _isEmpty from 'lodash/isEmpty'
import _forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty';

const { Option } = Select;
const { Search } = Input;
const { Title } = Typography;
const { confirm } = Modal;

function mapStateToProps(state) {
  return {
    barangays: state.resident.barangays,
  };
}

const ResidentTable = (props) => {
  useEffect(() => {
    getBarangayOfficials();
    loadBarangays();
  }, []);
  
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [barangayOfficials, setBarangayOfficials] = useState([]);
  const [searchData, setSearchData] = useState({});

  const loadBarangays = () => {
    if(isEmpty(props.barangays)){
      getBarangays();
    }
  }

  const getBarangayOfficials = (page = 1) => {
    setLoading(true);
    let filterOptions = {
      page: page,
      ...searchData
    }
    
    API.BarangayOfficial.all(filterOptions)
    .then((res) => {
      let result = res.data.barangay_officials.data;
      let resultPagination = res.data.barangay_officials.meta.pagination;
      setLoading(false);
      setBarangayOfficials(result);
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
    API.BarangayOfficial.getBarangay()
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
    setSearchData({...searchData,psgc_id:value});
  }
  const setSearchString = (e) => {
    let string = e.target.value;
    setSearchData({...searchData,query:string});
  }
  const setPositionFilter = (value) => {
    setSearchData({...searchData,position:value});
  }

  const deleteBarangayOfficial = (barangayOfficial) => {
    API.BarangayOfficial.delete(barangayOfficial.id)
    .then(res => {
      getBarangayOfficials();
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
  const confirmDeleteBarangayOfficial = (barangayOfficial) => {
    confirm({
      title: 'Are you sure remove this barangay official?',
      icon: <ExclamationCircleOutlined />,
      content: `This will permanently remove ${barangayOfficial.full_name_last} from the list.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteBarangayOfficial(barangayOfficial);
      },
      onCancel() {
      },
    });
  }

  const editBarangayOfficial = (official) => {
    props.dispatch({
      type: "SET_BARANGAY_OFFICIAL",
      data: official
    });
    props.dispatch({
      type: "SET_BARANGAY_OFFICIAL_FORM_STATUS",
      data: "show"
    });
    props.dispatch({
      type: "SET_BARANGAY_OFFICIAL_FORM_TYPE",
      data: "update"
    });
  }

  const createBarangayOfficial = () => {
    props.dispatch({
      type: "SET_BARANGAY_OFFICIAL_FORM_STATUS",
      data: "show"
    });
    props.dispatch({
      type: "SET_BARANGAY_OFFICIAL",
      data: {}
    });
  }

  const dataSource = barangayOfficials;
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name_last',
      key: 'full_name_last',
    },
    {
      title: 'Barangay',
      key: 'address',
      render: (text, record) => (
        <span>
          { `${record.psgc.brgy_name}` }
        </span>
      ),
    },
    {
      title: 'City',
      key: 'city',
      render: (text, record) => (
        <span>
          { `${record.psgc.city_name}` }
        </span>
      ),
    },
    {
      title: 'Province',
      key: 'province',
      render: (text, record) => (
        <span>
          { `${record.psgc.province_name}` }
        </span>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
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
          <a href="#!" onClick={ () => editBarangayOfficial(record) }>Edit</a>
          &nbsp;|&nbsp;
          <a href="#!" onClick={ () => confirmDeleteBarangayOfficial(record) }>
            Delete
          </a>
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
    getBarangayOfficials(val);
  }
  

  return (
    <div>
      <Title style={{textAlign: "center"}}>
        BARANGAY OFFICIALS
      </Title>
      <Button type="primary"  style={{ background: "green" }} icon={<PlusOutlined />} onClick={() => createBarangayOfficial()}>
        Add
      </Button>
      <Search
        allowClear
        placeholder="input search text"
        onChange={value => setSearchString(value)}
        style={{ width: 200 }}
        onSearch={() => getBarangayOfficials()}
        defaultValue={searchData.query}
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
        defaultValue={searchData.psgc_id}
      >
        {populateBarangaySelection(props.barangays)}
      </Select>
      <Select
        allowClear
        placeholder="Select Position"
        style={{ width: 200 }}
        onChange={setPositionFilter}
        defaultValue={searchData.is_registered_voter}
      >
        <Option value="PUNONG BARANGAY">PUNONG BARANGAY</Option>
        <Option value="SANGGUNIANG BARANGAY MEMBER">SANGGUNIANG BARANGAY MEMBER</Option>
        <Option value="SK CHAIRPERSON">SK CHAIRPERSON</Option>
        <Option value="OTHERS">OTHERS</Option>
      </Select>
      <Button type="primary" icon={<SearchOutlined />} onClick={() => getBarangayOfficials()}>
        Search
      </Button>
      <Divider />
      <Table dataSource={dataSource} columns={columns} pagination={false} loading={loading} />
      <Divider />

      {!_isEmpty(barangayOfficials) ? (<Pagination {...paginationConfig} onChange={handleResidentPage} />): ""}

    </div>
  );
}


export default connect(
  mapStateToProps,
)(ResidentTable);