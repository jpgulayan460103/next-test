import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router'
import { Form, Input, Button, Divider, Select, DatePicker, Typography } from 'antd';
import { ArrowLeftOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import API from '../../../api'
import _forEach from 'lodash/forEach'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import _debounce from 'lodash/debounce'
import moment from 'moment';
import queryString from "query-string";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Router from 'next/router'

const { Title } = Typography;
const { Option } = Select;


function mapStateToProps(state) {
  return {
    formData: state.barangayOfficial.formData,
    formError: state.barangayOfficial.formError,
    barangay: state.resident.barangays,
    formType: state.barangayOfficial.formType,
    selectedBarangayOfficial: state.barangayOfficial.selectedBarangayOfficial,
  };
}
const handleClick = () => {}

const onFinishFailed = (value) => {}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const BarangayOfficialForm = (props) => {

  const [formData, setFormData] = useState({});
  const [submit, setSubmit] = useState(false);
  const [contactNumber, setContactNumber] = useState([]);
  const formRef = React.useRef();
  const router = useRouter()
  router.query = queryString.parse(router.asPath.split(/\?/)[1]);
  const { id } = router.query
  useEffect(() => {
    getBarangay();
  }, []);
  useEffect(() => {
    loadBarangayOfficialData();
  }, [props.selectedBarangayOfficial]);
  
  const getBarangay = () => {
    if(_isEmpty(props.barangay)){
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
  }
  const loadBarangayOfficialData = () => {
    let loadedData = props.selectedBarangayOfficial;
    if(_isEmpty(loadedData)){
      setFormData({});
    }else{
      loadedData.birth_date = moment(loadedData.birth_date, "MM-DD-YYYY");
      loadedData.elected_date = moment(loadedData.elected_date, "MM-DD-YYYY");
      setFormData({
        ...loadedData
      })
      formRef.current.setFieldsValue({
        ...loadedData
      });
    }
  }

  const setFormFields = (e) => {
    setFormData({
      ...formData,
      ...e
    })
  }
  const formSubmit = _debounce(() => {
    setSubmit(true);
    props.dispatch({
      type: "BARANGAY_OFFICIAL_FORM_SUBMIT",
      data: {}
    })
    if(props.formType == "create"){
      API.BarangayOfficial.add(formData)
      .then(res => {
        setSubmit(false);
        Swal.fire(
          'Success!',
          'You have successfuly added a barangay official.',
          'success'
        )
        formRef.current.resetFields();
        setFormData({});
      })
      .catch(err => {
        setSubmit(false);
        if(err.response && err.response.data){
          props.dispatch({
            type: "BARANGAY_OFFICIAL_FORM_ERROR",
            data: err.response.data
          })
        }
        Swal.fire(
          'Update Failed!',
          `Please check for required fields`,
          'info'
        )
      })
      .then(res => {
        setSubmit(false);
      })
    }else{
      API.BarangayOfficial.update(formData,formData.id)
      .then(res => {
        setSubmit(false);
        Swal.fire(
          'Success!',
          `You have successfuly updated a barangay official <br> ${formData.full_name_last}`,
          'success'
        )
      })
      .catch(err => {
        setSubmit(false);
        props.dispatch({
          type: "BARANGAY_OFFICIAL_FORM_ERROR",
          data: err.response.data
        })

        Swal.fire(
          'Update Failed!',
          `Please check for required fields`,
          'info'
        )
      })
      .then(res => {
        setSubmit(false);
      })
    }
  }, 250)
  const displayErrors = (field) => {
    if(props.formError[field]){
      return {
        validateStatus: 'error',
        help: props.formError[field][0]
      }
    }
  }
  const populateBarangaySelection = (barangay) => {
    let items = [];
    _forEach(barangay, function(value, key) {
      items.push(<Option value={value.id} key={value.id} >{value.name}</Option>);   
    });
    return items;
  }
  const selectBarangay = (e) => {
    console.log(e);
    
  }
  const editContactNumber = (e,index) => {
    let value = e.target.value;
    contactNumber[index] = value;
    setContactNumber([...contactNumber])
  }
  const addContactNumber = () => {
    setContactNumber([...contactNumber, ""]);
  }
  const deleteContactNumber = (e) => {
    contactNumber.pop();
    setContactNumber([...contactNumber])
  }
  const contactNumberForm = () => {
    let items = [];
    _forEach(contactNumber, function(value, key) {
      items.push(
        <Form.Item label={`Contact Number ${key+1}`} name={`contact_number_${key}`}  hasFeedback {...displayErrors(`contact_number.${key}`)} key={key}>
          <Input autoComplete="off" placeholder="Enter Contact Number" onChange={(e) => editContactNumber(e,key)} />
        </Form.Item>
      );
    });
    return items;
  }

  const backToTable = () => {
    props.dispatch({
      type: "SET_BARANGAY_OFFICIAL",
      data: {}
    });
    props.dispatch({
      type: "SET_BARANGAY_OFFICIAL_FORM_STATUS",
      data: "hide"
    });
    props.dispatch({
      type: "SET_BARANGAY_OFFICIAL_FORM_TYPE",
      data: "create"
    });
  }
  return (
    <div>
      <p>
        <a href="#!" onClick={() => backToTable()}>
          <ArrowLeftOutlined /> Back to list of barangay officials
        </a>
      </p>
      <Title style={{textAlign: "center"}}>
        {(props.formType=="create" ? "ADD" : "EDIT")} BARANGAY OFFICIAL
      </Title>
      <Divider />
      <Form {...layout} ref={formRef} layout="horizontal" name="basic" initialValues={{ is_registered_voter: 'YES' }} onValuesChange={setFormFields} onFinish={formSubmit} onFinishFailed={onFinishFailed}>
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <Form.Item label="Barangay" name="psgc_id" hasFeedback {...displayErrors('psgc_id')}>
              <Select
                showSearch
                placeholder="Select a Barangay"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {populateBarangaySelection(props.barangay)}
              </Select>
            </Form.Item>
            <Form.Item label="Last Name" name="last_name" hasFeedback {...displayErrors('last_name')}>
              <Input autoComplete="off" placeholder="Enter Last Name" />
            </Form.Item>
            <Form.Item label="First Name" name="first_name" hasFeedback {...displayErrors('first_name')}>
              <Input autoComplete="off" placeholder="Enter First Name" />
            </Form.Item>
            <Form.Item label="Middle Name" name="middle_name" hasFeedback {...displayErrors('middle_name')}>
              <Input autoComplete="off" placeholder="Enter Middle Name" />
            </Form.Item>
            <Form.Item label="Ext Name" name="ext_name" hasFeedback {...displayErrors('ext_name')}>
              <Input autoComplete="off" placeholder="Enter Ext Name" />
            </Form.Item>
            <Form.Item label="Gender" name="gender" hasFeedback {...displayErrors('gender')}>
              <Select placeholder="Select a Gender">
                <Option value="MALE">MALE</Option>
                <Option value="FEMALE">FEMALE</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Birth Date" name="birth_date" hasFeedback {...displayErrors('birth_date')}>
              <DatePicker style={{width:'100%'}} format="MM-DD-YYYY"/>
            </Form.Item>
            <Form.Item label="Birth Place" name="birth_place" hasFeedback {...displayErrors('birth_place')}>
              <Input autoComplete="off" placeholder="Enter Birth Place" />
            </Form.Item>
            <Form.Item label="Contact Number" name="contact_number" hasFeedback {...displayErrors('contact_number')}>
              <Input autoComplete="off" placeholder="Enter Contact Number" />
            </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
            <Form.Item label="Position" name="position" hasFeedback {...displayErrors('position')}>
              <Select placeholder="Select Position">
                <Option value="PUNONG BARANGAY">PUNONG BARANGAY</Option>
                <Option value="SANGGUNIANG BARANGAY MEMBER">SANGGUNIANG BARANGAY MEMBER</Option>
                <Option value="SK CHAIRPERSON">SK CHAIRPERSON</Option>
                <Option value="OTHERS">OTHERS</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Committee" name="committee" hasFeedback {...displayErrors('committee')}>
              <Input autoComplete="off" placeholder="Enter Committee" />
            </Form.Item>
            <Form.Item label="Elected Date" name="elected_date" hasFeedback {...displayErrors('elected_date')}>
              <DatePicker style={{width:'100%'}} format="MM-DD-YYYY"/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" disabled={submit}>
                Submit
              </Button>
            </Form.Item>    
          </div>
        </div>
      </Form>
    </div>
  );
}


export default connect(
  mapStateToProps,
)(BarangayOfficialForm);