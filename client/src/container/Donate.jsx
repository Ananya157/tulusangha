
import "../styles/home.scss";
import React, { useState } from "react";
import { Form, Input, Button, Select, Modal, message, Switch } from 'antd';
import PaypalButtons from "../components/PaypalButtons";
import SelectUSState from 'react-select-us-states';
import axios from 'axios';

const { Option } = Select;
export const Donate = () => {
    const page = "Donate"
    const [form] = Form.useForm();
    const [isPayPal, setisPayPal] = useState(false);
    const [isZelleModalVisible, setIsZelleModalVisible] = useState(false);
    const [isChequeModalVisible, setIsChequeModalVisible] = useState(false);
    const [componentSize, setComponentSize] = useState('default');
    const [name, setName] = useState('')
    const [member, setMember] = useState(false)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [amount, setAmount] = useState(0)
    const [purpose, setPurpose] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const onFinish = (values) => {
        let formData = new FormData();
        formData.append('name', values.name)
        formData.append('member', values.currentMember)
        formData.append('address', values.address)
        formData.append('city', values.city)
        formData.append('state', values.state)
        formData.append('zipcode', values.zipcode)
        formData.append('amount', values.amount)
        formData.append('purpose', values.purpose)
        formData.append('email', values.email)
        formData.append('phone', values.phone)
        formData.append('pay', values.pay)
        setName(values.name); setMember(values.currentMember); setAddress(values.address); setCity(values.city); setPurpose(values.purpose)
        setState(values.state); setZipcode(values.zipcode); setEmail(values.email); setPhone(values.phone); setAmount(values.amount);
        let addData = false;
        if (values.pay === "zelle") {
            setIsZelleModalVisible(true);
            addData = true;
        } else if (values.pay === "cheque") {
            setIsChequeModalVisible(true);
            addData = true
        } else if (values.pay === "paypal") {
            setisPayPal(true);
        }
        if (addData) {
            console.log(formData)
            const url = 'https://aatana.org/api/donors.php'
            axios({
                method: 'post',
                url: url,
                data: formData,
                config: { headers: { 'content-type': 'multipart/form-data' } }
            })
            .then(function (response) {
                if (response.data.includes("Data Added")) {
                    message.success('Data Successfully Added', 5);
                    form.resetFields();
                } else {
                    message.error('Something went wrong while adding data to our database', 5);
                }
            })
            .catch(function (response) {
                message.error(response, 5);
            });
        }

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
        setisPayPal(false)
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}>
                <Option value="1">+1</Option>
                <Option value="91">+91</Option>
            </Select>
        </Form.Item>
    );

    if (isPayPal) {
        return (
            <div>
                <PaypalButtons page={page} name={name} member={member} address={address} city={city} state={state} zipcode={zipcode} amount={amount} purpose={purpose}
                    email={email} phone={phone} />
            </div>
        )
    } else {
        return (
            <div>
                <Modal title="Instructions to pay via Cheque" style={{ top: 20 }} visible={isChequeModalVisible} onOk={() => handleOk()} cancelButtonProps={{ style: { display: "none", }, }}>
                    <p>Please write a Cheque to <b>All America Tulu Association</b> </p><p>Mail cheque to : <b>All America Tulu Association 2 Atwood Ln Andover MA 01810 </b></p>
                </Modal>
                <Modal title="Instructions to pay via Zelle" style={{ top: 20 }} visible={isZelleModalVisible} onOk={() => handleOk()} cancelButtonProps={{ style: { display: "none", }, }}>
                    <p>Please transfer money to : <b>All America Tulu Association </b></p><p><b>Email: </b> aatana.ec@gmail.com</p>
                </Modal>
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
                        prefix: '+1',
                        pay: 'cheque'
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                >
                    <Form.Item label="Name" name="name"
                        rules={[{ required: true, message: 'Please enter your name!', },]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Are you a current member?" name="currentMember" valuePropName="checked">
                        <Switch />
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
                        <Input />
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
                        <Input addonBefore={prefixSelector} style={{ width: '100%', }} />
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
                    <Form.Item label="Donation Amount" name="amount"
                        rules={[{ required: true, message: 'Please enter the amount you want to donate!', },]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Donation Purpose" name="purpose"
                        rules={[{ required: true, message: 'Please enter the purpose of your donation!', },]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Payment" name="pay">
                        <Select>
                            <Select.Option value="cheque"> Cheque</Select.Option>
                            <Select.Option value="paypal" >Paypal</Select.Option>
                            <Select.Option value="zelle">Zelle</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="joinUsButton">
                            Join US
                    </Button>
                        {}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
