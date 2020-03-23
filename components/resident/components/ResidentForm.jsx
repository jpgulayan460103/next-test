import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, Select, DatePicker } from 'antd';
import API from '../../../api'
import _forEach from 'lodash/forEach'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

function mapStateToProps(state) {
  return {
    formData: state.resident.formData,
    formError: state.resident.formError,
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
const ResidentForm = (props) => {
  const [barangay, setBarangay] = useState({});
  const [formData, setFormData] = useState({is_registered_voter:"YES"});
  const [contactNumber, setContactNumber] = useState([]);
  useEffect(() => {
    getBarangay();
  }, []);
  const getBarangay = () => {
    API.Resident.getBarangay()
    .then(res => {
      setBarangay(res.data.options[0].cities[0].barangays);
    })
    .catch(err => {
      console.log(err);
    })
    .then(res => {
      // console.log(barangay);
    })
    ;
  }
  const setFormFields = (e) => {
    for (var key in e) {
      if (e.hasOwnProperty(key)) {
        if(typeof e[key] == 'string'){
          e[key] = e[key].toUpperCase();
        }
      }
    }
    setFormData({
      ...formData,
      ...e
    })
  }
  const onFinish = (value) => {
    formData.contact_number = contactNumber;
    API.Resident.add(formData)
    .then(res => {
      
    })
    .catch(err => {
      props.dispatch({
        type: "RESIDENT_FORM_ERROR",
        data: err.response.data
      })
    })
    .then(res => {})
  }
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
      items.push(<Option value={value.id} key={value.id}>{value.name}</Option>);   
    });
    return items;
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
        <Form.Item label={`Contact Number ${key+1}`} hasFeedback {...displayErrors(`contact_number.${key}`)} key={key}>
          <Input autoComplete="off" placeholder="Enter Contact Number" onChange={(e) => editContactNumber(e,key)} />
        </Form.Item>
      );
    });
    return items;
  }
  return (
    <div>
      <h1 style={{textAlign: "center"}}>ADD RESIDENT</h1>
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <Form {...layout} layout="horizontal" name="basic" initialValues={{ is_registered_voter: 'YES' }} onValuesChange={setFormFields} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
            <Form.Item label="Alias" name="alias" hasFeedback {...displayErrors('alias')}>
              <Input autoComplete="off" placeholder="Enter Alias" />
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
          </Form>
        </div>
        <div className="col-md-6 col-lg-4">
          <Form {...layout} layout="horizontal" name="basic" initialValues={{ is_registered_voter: 'YES' }} onValuesChange={setFormFields} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item label="Purok or Sitio" name="purok_sitio" hasFeedback {...displayErrors('purok_sitio')}>
                <Input autoComplete="off" placeholder="Enter Purok or Sitio" />
              </Form.Item>
              <Form.Item label="Street Address" name="street_address" hasFeedback {...displayErrors('street_address')}>
                <Input autoComplete="off" placeholder="Enter Street Address" />
              </Form.Item>
              <Form.Item label="Barangay" name="psgc_id" hasFeedback {...displayErrors('psgc_id')}>
                <Select placeholder="Select a Barangay">
                  {populateBarangaySelection(barangay)}
                </Select>
              </Form.Item>
              <Form.Item label="Occupation" name="occupation" hasFeedback {...displayErrors('occupation')}>
                <Input autoComplete="off" placeholder="Enter Occupation" />
              </Form.Item>
              <Form.Item label="Civil Status" name="civil_status" hasFeedback {...displayErrors('civil_status')}>
                <Select placeholder="Select a Civil Status">
                  <Option value="SINGLE">SINGLE</Option>
                  <Option value="MARRIED">MARRIED</Option>
                  <Option value="DIVORCED">DIVORCED</Option>
                  <Option value="SEPARATED">SEPARATED</Option>
                  <Option value="WIDOWED">WIDOWED</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Contact Numbers">
                <Button.Group>
                  <Button type="dashed" onClick={() => { addContactNumber() }}>
                    <PlusOutlined /> Add
                  </Button>
                  {
                    (contactNumber.length != 0 ? (<Button danger onClick={() => { deleteContactNumber() }}>
                    <DeleteOutlined /> Remove Contact Number {contactNumber.length}
                  </Button>) : "")
                  }
                </Button.Group>
              </Form.Item>
              {contactNumberForm()}
            </Form>
        </div>
        <div className="col-md-6 col-lg-4">
          <Form {...layout} layout="horizontal" name="basic" initialValues={{ is_registered_voter: 'YES' }} onValuesChange={setFormFields} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item label="Voters Registration Status" name="is_registered_voter" hasFeedback {...displayErrors('is_registered_voter')}>
              <Select placeholder="Select a Registration Status">
                <Option value="YES">REGISTERED VOTER</Option>
                <Option value="NO">NOT REGISTERED VOTER</Option>
              </Select>
            </Form.Item>
            {
              (formData.is_registered_voter == "YES" ? (
                <>
                  <Form.Item label="Registration Date" name="voters_registration_date" hasFeedback {...displayErrors('voters_registration_date')}>
                    <DatePicker style={{width:'100%'}} format="MM-DD-YYYY"/>
                  </Form.Item>
                  <Form.Item label="Voters ID Number" name="voters_registration_number" hasFeedback {...displayErrors('voters_registration_number')}>
                    <Input autoComplete="off" placeholder="Enter Voters ID Number" />
                  </Form.Item>
                </>
              ) : "")
            }
            <Form.Item label="In Case of Emergency" name="emergency_contact_name" hasFeedback {...displayErrors('emergency_contact_name')}>
              <Input autoComplete="off" placeholder="Enter In Case of Emergency Contact Person" />
            </Form.Item>
            <Form.Item label="Contact Number" name="emergency_contact_number" hasFeedback {...displayErrors('emergency_contact_number')}>
              <Input autoComplete="off" placeholder="Enter In Case of Emergency Contact Number" />
            </Form.Item>
            <Form.Item label="Relationship to the Person" name="emergency_contact_relation" hasFeedback {...displayErrors('emergency_contact_relation')}>
              <Input autoComplete="off" placeholder="Enter In Case of Emergency Contact Person Relationship" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}



export default connect(
  mapStateToProps,
)(ResidentForm);