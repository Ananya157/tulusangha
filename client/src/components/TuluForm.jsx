/* eslint-disable no-template-curly-in-string */

import "../styles/home.scss";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Modal, message, InputNumber } from 'antd';
import PaypalButtons from "./PaypalButtons";
import SelectUSState from 'react-select-us-states';
import axios from 'axios';

const { Option } = Select;
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min}',
    },
};
export const TuluForm = props => {
    const [form] = Form.useForm();
    const [isPayPal, setisPayPal] = useState(false);
    const [isZelleModalVisible, setIsZelleModalVisible] = useState(false);
    const [isChequeModalVisible, setIsChequeModalVisible] = useState(false);
    const [componentSize, setComponentSize] = useState('default');
    const [isEmailExistModalVisible, setIsEmailExistModalVisible] = useState(false);
    const [name, setName] = useState('')
    const [spouseName, setSpouseName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [memberType, setMemberType] = useState('grandPatron')
    const [donorType, setDonorType] = useState('general')
    const [sponsorType, setSponsorType] = useState('sponsoredPicture')
    const [amount, setAmount] = useState()
    const [paymentMethod, setPaymentMethode] = useState('')  
    const [disableInput, setDisable]  = useState(false) 
    const [loading, setLoading] = useState(false)
    const page = props.whichpage;
    const becomeAMember = props.whichpage === "BecomeAMember" ? true : false
    const donate = props.whichpage === "Donate" ? true : false
    const sponsor = props.whichpage === "Sponsor" ? true : false
   
    useEffect(() => {
        if (becomeAMember) {
            setAmount(1000)
        } else if (donate) {
            setAmount(250)
        } else if (sponsor) {
            setAmount(75)
            setDisable(true)
        }
    }, [becomeAMember, donate, sponsor])
   

    const onFinish = (values) => {
        let addData = false;
        let url = ''
        let formData = new FormData();
        setLoading(true)
        formData.append('name', values.name)
        formData.append('address', values.address)
        formData.append('city', values.city)
        formData.append('state', values.state)
        formData.append('zipcode', values.zipcode)
        formData.append('email', values.email)
        formData.append('phone', values.phone)
        formData.append('amount', values.amount)
        formData.append('pay', values.paymentMethod)
        setName(values.name); setAddress(values.address); setCity(values.city); setState(values.state); setZipcode(values.zipcode); 
        setEmail(values.email); setPhone(values.phone); setAmount(values.amount); setPaymentMethode(values.paymentMethod);

        if(becomeAMember){
            const emailCheckUrl = 'https://aatana.org/api/contacts.php?email=' + values.email
            axios({
                method: 'get',
                url: emailCheckUrl
            }).then(function (response) {
                if (response.data.includes("Email already")) {
                    setIsEmailExistModalVisible(true); 
                    setLoading(false)
                } else if (response.data.includes("Email does not")) {
                    formData.append('spouseName', values.spouseName)
                    formData.append('type', values.memberType) 
                    url = 'https://aatana.org/api/contacts.php'
                    setSpouseName(values.spouseName);setMemberType(values.memberType)
                    functionCall(values.paymentMethod, addData,url,formData)
                } else {
                    setLoading(false)
                    message.error('Something went wrong while adding fetching email data from our database', 5);
                }
            }).catch (function (response) {
                setLoading(false)
                console.log(response)
            });
        }else if (sponsor){
            formData.append('type', values.sponsorType)
            url = 'https://aatana.org/api/sponsor.php'
            functionCall(values.paymentMethod, addData, url, formData)
        } else if( donate){
            formData.append('member', "None")
            formData.append('type', values.donationType)
            formData.append('purpose', "None") 
            url = 'https://aatana.org/api/donors.php'
            functionCall(values.paymentMethod, addData, url, formData)
        }
    };

    const functionCall = (paymentMethod, addData, url, formData)=>{
        if (paymentMethod === "zelle") {
            setIsZelleModalVisible(true);
            addData = true;
        } else if (paymentMethod === "cheque") {
            setIsChequeModalVisible(true);
            addData = true
        } else if (paymentMethod === "paypal") {
            setisPayPal(true);
            setLoading(false)
        }
        if (addData) {
            axios({
                method: 'post',
                url: url,
                data: formData,
                config: { headers: { 'content-type': 'multipart/form-data' } }
            })
                .then(function (response) {
                    if (response.data.includes("Data Added")) {
                        message.success('Data Successfully Added', 5);
                        setAmount(0)
                        form.resetFields();
                        setLoading(false)
                    } else {
                        setLoading(false)
                        message.error('Something went wrong while adding data to our database', 5);
                    }
                })
                .catch(function (response) {
                    setLoading(false)
                    console.log(response)
                });
        }

    }

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const tailFormItemLayout = {
        wrapperCol: {xs: {span: 24,offset: 0,},sm: {span: 16,offset: 8,},},
    };

    const handleOk = () => {
        setIsChequeModalVisible(false);setIsEmailExistModalVisible(false)
        setIsZelleModalVisible(false);
        setisPayPal(false)
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70,}}>
                <Option value="1">+1</Option>
                <Option value="91">+91</Option>
            </Select>
        </Form.Item>
    );
    const onChangeType = (values) => {
        if (values === "grandPatron") {
            form.setFieldsValue({ amount:1000})
            setAmount(1000); setMemberType('grandPatron'); setDisable(false)
        } else if (values === "patron") {
            setAmount(500); setMemberType('patron')
            form.setFieldsValue({ amount: 500 }); setDisable(false)
        } else if (values === "family") {
            setAmount(100); setMemberType('family'); setDisable(true)
            form.setFieldsValue({ amount: 100 })
        } else if (values === "individual") {
            setAmount(50); setMemberType('individual')
            form.setFieldsValue({ amount: 50 }); setDisable(true)
        }
    }

    const onChangeDonate = (values) => {
        if (values === "general") {
            form.setFieldsValue({ amount: 250 })
            setAmount(250); setDonorType('general');
        } else if (values === "bolpu") {
            setAmount(251); setDonorType('bolpu')
            form.setFieldsValue({ amount: 251 }); 
        } else if (values === "bolli") {
            setAmount(500); setDonorType('bolli'); 
            form.setFieldsValue({ amount: 500 })
        } else if (values === "aisra") {
            setAmount(1000); setDonorType('aisra')
            form.setFieldsValue({ amount: 1000 }); 
        } else if (values === "perme") {
            setAmount(5000); setDonorType('perme')
            form.setFieldsValue({ amount: 5000 }); 
        }
    }

    const onChangeSponsor = (values) => {
        if (values === "sponsoredPicture") {
            form.setFieldsValue({ amount: 75 })
            setAmount(75); setSponsorType('sponsoredPicture'); 
        } else if (values === "sponsoredCrawl") {
            setAmount(25); setSponsorType('sponsoredCrawl')
            form.setFieldsValue({ amount: 25 }); 
        } else if (values === "sponsoringBanner") {
            setAmount(250); setSponsorType('sponsoringBanner'); 
            form.setFieldsValue({ amount: 250 })
        } else if (values === "SponsoringCrawl") {
            setAmount(75); setSponsorType('SponsoringCrawl')
            form.setFieldsValue({ amount: 75 }); 
        }
    }

    if (isPayPal) {
        return (
            <div>
                <PaypalButtons page={page} name={name} spouseName={spouseName} address={address} city={city} state={state} zipcode={zipcode} 
                    amount={amount} email={email} phone={phone} pay={paymentMethod} memberType={memberType} donorType={donorType} sponsorType={sponsorType} />
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
                <Modal title="Info" style={{ top: 20 }} visible={isEmailExistModalVisible} onOk={() => handleOk()} cancelButtonProps={{ style: { display: "none", }, }}>
                     <p>Your email already exists in our database</p>
                 </Modal>
                <Form
                    form={form} name="register" onFinish={onFinish} labelCol={{span: 4,}} wrapperCol={{span: 14,}} layout="horizontal"
                    initialValues={{ prefix: '+1', paymentMethod: 'cheque', currentMember: 'no', memberType: 'grandPatron' ,donationType: 'general', sponsorType:'sponsoredPicture' }}
                    onValuesChange={onFormLayoutChange} size={componentSize} validateMessages={validateMessages} >
                    {becomeAMember && (
                        <>
                        <Form.Item label="Registration Type" name="memberType" >
                            <Select onChange={onChangeType}>
                             <Select.Option value="grandPatron" >Grand Patron-$1000</Select.Option>
                             <Select.Option value="patron">Patron-$500</Select.Option>
                             <Select.Option value="family">Family-$100 </Select.Option>
                             <Select.Option value="individual">Individual-$50</Select.Option>
                         </Select>
                        </Form.Item>
                        <Form.Item label="Amount" name="amount" rules={[{ type: 'number', min: amount },]} initialValue={1000}>
                            <InputNumber disabled={disableInput} />
                        </Form.Item>
                        </>
                    )}
                    {donate && (
                        <>
                            <Form.Item label="Donation Type" name="donationType" >
                                <Select onChange={onChangeDonate}>
                                    <Select.Option value="general">AATA General Donation: Upto to $250</Select.Option>
                                    <Select.Option value="bolpu">AATA Bolpu: Above $250</Select.Option>
                                    <Select.Option value="bolli">AATA Bolli: Above $500</Select.Option>
                                    <Select.Option value="aisra">AATA Aisra: Above $1000</Select.Option>
                                    <Select.Option value="perme">AATA Perme: Above $5000</Select.Option>
                                </Select>
                            </Form.Item>
                            {donorType ==="general" ? (<>
                                    <Form.Item label="Amount" name="amount" rules={[{ type: 'number', max: amount },]} initialValue={250}>
                                        <InputNumber />
                                    </Form.Item> </>
                            ):(<> <Form.Item label="Amount" name="amount" rules={[{ type: 'number', min: amount },]} initialValue={251}>
                                        <InputNumber defaultValue={amount} />
                                    </Form.Item></>)}  
                        </>
                    )}
                    {sponsor && (
                        <>
                            <Form.Item label="Sponorship Type" name="sponsorType" >
                                <Select onChange={onChangeSponsor}>
                                    <Select.Option value="sponsoredPicture" >Sponsored Picture Greeting: $75 per greeting</Select.Option>
                                    <Select.Option value="sponsoredCrawl">Sponsored Crawl Greeting: $25 per greeting</Select.Option>
                                    <Select.Option value="sponsoringBanner">Business Sponsoring - Banner: $250 per greeting </Select.Option>
                                    <Select.Option value="SponsoringCrawl">Business Sponsoring - Crawl: $75 per greeting</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Amount" name="amount" rules={[{ type: 'number', min: amount },]} initialValue={75}>
                                <InputNumber disabled/>
                            </Form.Item>
                        </>
                    )}
                    <Form.Item label="Name" name="name"
                        rules={[{ required: true, message: 'Please enter your name!', },]} >
                        <Input />
                    </Form.Item>
                    {becomeAMember && (
                        <div>
                        <Form.Item label="Spouse Name" name="spouseName">
                             <Input />
                    </Form.Item>
                        </div>
                    )}
                    <Form.Item name="email" label="E-mail"
                        rules={[
                            { type: 'email', message: 'The input is not valid E-mail!',},
                            { required: true,message: 'Please input your E-mail!', },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone Number"
                        rules={[ { required: true, message: 'Please input your phone number!', },]} >
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
                    <Form.Item label="Payment" name="paymentMethod">
                        <Select>
                            <Select.Option value="cheque"> Cheque</Select.Option>
                            <Select.Option value="paypal" >Paypal</Select.Option>
                            <Select.Option value="zelle">Zelle</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="joinUsButton" loading={loading}>
                            {becomeAMember && (<>Join Us</>)}
                            {donate && (<>Please Donate</>)}
                            {sponsor && (<>Please Sponsor</>)}
                    </Button>
                        {}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
