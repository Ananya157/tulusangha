
import "../styles/home.scss";
import React, { useState } from "react";
import { Form, Input, Button, Select, Modal } from 'antd';
import { PayPal } from '../components/PayPal';
import SelectUSState from 'react-select-us-states';
import axios from 'axios';

const { Option } = Select;
export const BecomeAMember = () => { 
    const [form] = Form.useForm();
    const [isPayPal, setisPayPal] = useState(false);
    const [isDataAddedModalVisible, setIsDataAddedModalVisible] = useState(false);
    const [isZelleModalVisible, setIsZelleModalVisible] = useState(false);
    const [isChequeModalVisible, setIsChequeModalVisible] = useState(false);
    const [isEmailExistModalVisible, setIsEmailExistModalVisible] = useState(false);
    const [IsErrorModalVisible, setIsErrorModalVisible] = useState(false)
    const [isDisableJoinUsButton, setisDisableJoinUsButton] = useState(false)
    const [componentSize, setComponentSize] = useState('default');

    const onEmailChange = (e) =>{
        console.log(e.target.value)
        let formData = new FormData();
        const url = 'https://aatana.org/api/contacts.php'

        formData.append('email', e.target.value)
        axios({
            method: 'get',
            url: url,
            data: formData,
            config: { headers: { 'content-type': 'multipart/form-data' } }
        })
            .then(function (response) {
                if (response.data.includes("Email already")) {
                    setIsEmailExistModalVisible(true);
                    setisDisableJoinUsButton(true)
                }else if (response.data.includes("Email does not")) {
                    setIsDataAddedModalVisible(true);
                    setisDisableJoinUsButton(false);
                } else {
                    setIsErrorModalVisible(true)
                }

                console.log(response)
            })
            .catch(function (response) {
                console.log(response)
            });
    }

    const onFinish = (values) => {
        if (values.pay === "zelle"){
            setIsZelleModalVisible(true)
        } else if (values.pay === "cheque"){
            setIsChequeModalVisible(true)
        }else if(values.pay === "paypal"){
            setisPayPal(true)
            console.log("To be done")
        }
        const url = 'https://aatana.org/api/contacts.php'
        let formData = new FormData();
        formData.append('name', values.name)
        formData.append('spouseName', values.spouseName)
        formData.append('address', values.address)
        formData.append('city', values.city)
        formData.append('state', values.state)
        formData.append('zipcode', values.zipcode)
        formData.append('type', values.type)
        formData.append('email', values.email)
        formData.append('phone', values.phone)
        formData.append('pay', values.pay)
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        axios({
            method: 'post',
            url: url,
            data: formData,
            config: { headers: { 'content-type': 'multipart/form-data' } }
        })
            .then(function (response) {
                if (response.data.includes("Data Added")) {
                    setIsDataAddedModalVisible(true);
                }else{
                    setIsErrorModalVisible(true)
                } 
                console.log(response)
            })
            .catch(function (response) {
                console.log(response)
            });
        console.log('Received values of form: ', values);
    };

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const handleOk = () => {
        setIsChequeModalVisible(false);
        setIsZelleModalVisible(false);
        setIsEmailExistModalVisible(false);
        setIsDataAddedModalVisible(false)
        setIsErrorModalVisible(false)
    };


    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="1">+1</Option>
                <Option value="91">+91</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div>
            <Modal title="Instructions to pay via Cheque" style={{ top: 20 }} visible={isChequeModalVisible} onOk={() => handleOk()} onCancel={() => handleOk()}>
                <p>Please write a Cheque to <b>All America Tulu Association</b> </p><p>Mail cheque to : <b>All America Tulu Association 2 Atwood Ln Andover MA 01810 </b></p>
            </Modal>
            <Modal title="Instructions to pay via Zelle" style={{ top: 20 }} visible={isZelleModalVisible} onOk={() => handleOk()} onCancel={() => handleOk()}>
                <p>Please transfer money to : <b>All America Tulu Association </b></p><p><b>Email: </b> aatana.ec@gmail.com</p>
            </Modal>
            <Modal title="Info" style={{ top: 20 }} visible={isEmailExistModalVisible} onOk={() => handleOk()}>
                <p>Your email already exists in our database</p>
            </Modal>
            <Modal title="Success" style={{ top: 20 }} visible={isDataAddedModalVisible} onOk={() => handleOk()}>
                <p>Data Successfully Added</p>
            </Modal>
            <Modal title="Error" style={{ top: 20 }} visible={IsErrorModalVisible} onOk={() => handleOk()}>
                <p>Something went wrong while adding data to our database</p>
            </Modal>
            <h1 className="homeHeader newsletter">
                Membership
           </h1>
            <h1 className="homeHeader disclamer marginBorder">
                Any person eighteen years or older and subscribes to the objectives of the association and pays dues, is entitled to be a member of the association. Membership in this corporation shall be open to all persons with roots in Tulunadu and/or interested in Tulu language or culture.
                Members must agree to abide by the by-laws of the Association.
           </h1>
            <h1 className="homeHeader tuluLipi marginBorder">
                Grand Patron Member - Family Membership: $1000 & above
                <br/>
                Patron Member - Family Membership: $500 & above
                <br />
                Life Member - Family Membership: $100
                <br />
                Life Member - Individual Membership: $50
           </h1>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    type: 'grnadPatron',
                    prefix: '+1',
                    pay: 'paypal'
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="Registration Type" name="type" >
                    <Select >
                        <Select.Option value="grnadPatron" >Grand Patron-$1000</Select.Option>
                        <Select.Option value="patron">Patron-$500</Select.Option>
                        <Select.Option value="family">Family-$100 </Select.Option>
                        <Select.Option value="individual">Individual-$50</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Name" name="name"
                    rules={[{required: true,message: 'Please enter your name!',},]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Spouse Name" name = "spouseName">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}>
                    <Input onChange={ onEmailChange}/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <Form.Item label="Address" name="address"
                    rules={[{ required: true, message: 'Please enter your address!', },]} >
                    <Input />
                </Form.Item>
                <Form.Item label="City" name="city"
                    rules={[{ required: true, message: 'Please enter your city!', },]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Zipcode" name="zipcode"
                    rules={[{ required: true, message: 'Please enter your zipcode!', },]} >
                    <Input />
                </Form.Item>
                <Form.Item label="State" name="state"
                    rules={[{ required: true, message: 'Please select your state!', },]} >
                    <SelectUSState className="ant-input" id="state" />
                </Form.Item>
                <Form.Item label="Payment" name="pay" >
                    <Select >
                        <Select.Option value="paypal" >Paypal</Select.Option>
                        <Select.Option value="zelle">Zelle</Select.Option>
                        <Select.Option value="cheque"> Cheque</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" disabled={isDisableJoinUsButton}>
                        Join US
                    </Button>
                    {/* <Button type="primary" onClick={() => {form.resetFields();}}>
                        Clear
                    </Button> */}
                    {isPayPal ? (<PayPal />) : (<>
                       
                    </>)}
                </Form.Item>
            </Form> 
        </div>
    )
}
