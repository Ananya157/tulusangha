
// import "../styles/home.scss";
// import React, { useState } from "react";
// import { MembershipHeader } from '../components/MembershipHeader';
// import { Form, Input, Button, Select, Modal, message } from 'antd';
// import PaypalButtons from "../components/PaypalButtons";
// import SelectUSState from 'react-select-us-states';
// import axios from 'axios';
// import pdf from "../assets/documents/aata_constitution_and_bylaws.pdf";

// const { Option } = Select;
// export const BecomeAMember = () => {
//     const page = "Member"
//     const [form] = Form.useForm();
//     const [isPayPal, setisPayPal] = useState(false);
//     const [isZelleModalVisible, setIsZelleModalVisible] = useState(false);
//     const [isChequeModalVisible, setIsChequeModalVisible] = useState(false);
//     const [isEmailExistModalVisible, setIsEmailExistModalVisible] = useState(false);
//     const [componentSize, setComponentSize] = useState('default');
//     const [name, setName] = useState('')
//     const [spouseName, setSpouseName] = useState('')
//     const [address, setAddress] = useState('')
//     const [city, setCity] = useState('')
//     const [state, setState] = useState('')
//     const [zipcode, setZipcode] = useState('')
//     const [type, setType] = useState('Grand Patron')
//     const [email, setEmail] = useState('')
//     const [phone, setPhone] = useState('')
//     const [pay, setPay] = useState('')
//     const [amount, setAmount] = useState('1000')

//     const onFinish = (values) => {
//         const url = 'https://aatana.org/api/contacts.php?email=' + values.email
//         axios({
//             method: 'get',
//             url: url
//         })
//             .then(function (response) {
//                 if (response.data.includes("Email already")) {
//                     setIsEmailExistModalVisible(true);
//                 } else if (response.data.includes("Email does not")) {
//                     let formData = new FormData();
//                     formData.append('name', values.name)
//                     formData.append('spouseName', values.spouseName)
//                     formData.append('address', values.address)
//                     formData.append('city', values.city)
//                     formData.append('state', values.state)
//                     formData.append('zipcode', values.zipcode)
//                     formData.append('type', values.type)
//                     formData.append('email', values.email)
//                     formData.append('phone', values.phone)
//                     formData.append('pay', values.pay)
//                     formData.append('amount', values.amount)
//                     setName(values.name); setSpouseName(values.spouseName); setAddress(values.address); setCity(values.city);
//                     setState(values.state); setZipcode(values.zipcode); setEmail(values.email); setPhone(values.phone); setPay(values.pay);
//                     if (values.type === 'grandPatron') {
//                         setAmount(1000); setType('Grand Patron')
//                         formData.append('amount', 1000)
//                     } else if (values.type === 'patron') {
//                         setAmount(500); setType('Patron')
//                         formData.append('amount', 500)
//                     } else if (values.type === 'family') {
//                         setAmount(100); setType('Family')
//                         formData.append('amount', 100)
//                     } else if (values.type === 'individual') {
//                         setAmount(50); setType('Individual')
//                         formData.append('amount', 50)
//                     }
//                     let addData = false;
//                     if (values.pay === "zelle") {
//                         setIsZelleModalVisible(true);
//                         addData = true;
//                     } else if (values.pay === "cheque") {
//                         setIsChequeModalVisible(true);
//                         addData = true
//                     } else if (values.pay === "paypal") {
//                         setisPayPal(true);
//                     }
//                     if (addData) {
//                         const url = 'https://aatana.org/api/contacts.php'
//                         axios({
//                             method: 'post',
//                             url: url,
//                             data: formData,
//                             config: { headers: { 'content-type': 'multipart/form-data' } }
//                         })
//                             .then(function (response) {
//                                 if (response.data.includes("Data Added")) {
//                                     message.success('Data Successfully Added', 5);
//                                     form.resetFields();
//                                 } else {
//                                     message.error('Something went wrong while adding data to our database', 5);
//                                 }
//                             })
//                             .catch(function (response) {
//                                 message.error(response, 5);
//                             });
//                     }
//                 } else {
//                     message.error('Something went wrong while adding fetching email data from our database', 5);
//                 }
//             })
//             .catch(function (response) {
//                 message.error(response)
//             });
//     };

//     const onFormLayoutChange = ({ size }) => {
//         setComponentSize(size);
//     }
//     const tailFormItemLayout = {
//         wrapperCol: {
//             xs: {
//                 span: 24,
//                 offset: 0,
//             },
//             sm: {
//                 span: 16,
//                 offset: 8,
//             },
//         },
//     };

//     const handleOk = () => {
//         setIsChequeModalVisible(false);
//         setIsZelleModalVisible(false);
//         setIsEmailExistModalVisible(false);
//         setisPayPal(false)
//     };

//     const prefixSelector = (
//         <Form.Item name="prefix" noStyle>
//             <Select
//                 style={{
//                     width: 70,
//                 }}>
//                 <Option value="1">+1</Option>
//                 <Option value="91">+91</Option>
//             </Select>
//         </Form.Item>
//     );

//     if (isPayPal) {
//         return (
//             <div>
//                 <MembershipHeader />
//                 <PaypalButtons page={page} name={name} spouseName={spouseName} address={address} city={city} state={state} zipcode={zipcode} type={type}
//                     email={email} phone={phone} pay={pay} amount={amount}/>
//             </div>
//         )
//     } else {
//         return (
//             <div>
//                 <Modal title="Instructions to pay via Cheque" style={{ top: 20 }} visible={isChequeModalVisible} onOk={() => handleOk()} cancelButtonProps={{ style: { display: "none", }, }}>
//                     <p>Please write a Cheque to <b>All America Tulu Association</b> </p><p>Mail cheque to : <b>All America Tulu Association 2 Atwood Ln Andover MA 01810 </b></p>
//                 </Modal>
//                 <Modal title="Instructions to pay via Zelle" style={{ top: 20 }} visible={isZelleModalVisible} onOk={() => handleOk()} cancelButtonProps={{ style: { display: "none", }, }}>
//                     <p>Please transfer money to : <b>All America Tulu Association </b></p><p><b>Email: </b> aatana.ec@gmail.com</p>
//                 </Modal>
//                 <Modal title="Info" style={{ top: 20 }} visible={isEmailExistModalVisible} onOk={() => handleOk()} cancelButtonProps={{ style: { display: "none", }, }}>
//                     <p>Your email already exists in our database</p>
//                 </Modal>
//                 <MembershipHeader />
//                 <Form
//                     form={form}
//                     name="register"
//                     onFinish={onFinish}
//                     labelCol={{
//                         span: 4,
//                     }}
//                     wrapperCol={{
//                         span: 14,
//                     }}
//                     layout="horizontal"
//                     initialValues={{
//                         type: 'grandPatron',
//                         prefix: '+1',
//                         pay: 'cheque'
//                     }}
//                     onValuesChange={onFormLayoutChange}
//                     size={componentSize}
//                 >
//                     <Form.Item label="Registration Type" name="type">
//                         <Select>
//                             <Select.Option value="grandPatron" >Grand Patron-$1000</Select.Option>
//                             <Select.Option value="patron">Patron-$500</Select.Option>
//                             <Select.Option value="family">Family-$100 </Select.Option>
//                             <Select.Option value="individual">Individual-$50</Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <Form.Item label="Name" name="name"
//                         rules={[{ required: true, message: 'Please enter your name!', },]} >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item label="Spouse Name" name="spouseName">
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         name="email"
//                         label="E-mail"
//                         rules={[
//                             {
//                                 type: 'email',
//                                 message: 'The input is not valid E-mail!',
//                             },
//                             {
//                                 required: true,
//                                 message: 'Please input your E-mail!',
//                             },
//                         ]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         name="phone"
//                         label="Phone Number"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Please input your phone number!',
//                             },
//                         ]}
//                     >
//                         <Input addonBefore={prefixSelector} style={{width: '100%',}}/>
//                     </Form.Item>
//                     <Form.Item label="Address" name="address"
//                         rules={[{ required: true, message: 'Please enter your address!', },]} >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item label="City" name="city"
//                         rules={[{ required: true, message: 'Please enter your city!', },]} >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item label="Zipcode" name="zipcode"
//                         rules={[{ required: true, message: 'Please enter your zipcode!', },]} >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item label="State" name="state"
//                         rules={[{ required: true, message: 'Please select your state!', },]} >
//                         <SelectUSState className="ant-input" id="state" />
//                     </Form.Item>
//                     <Form.Item label="Payment" name="pay">
//                         <Select>
//                             <Select.Option value="cheque"> Cheque</Select.Option>
//                             <Select.Option value="paypal" >Paypal</Select.Option>
//                             <Select.Option value="zelle">Zelle</Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <Form.Item {...tailFormItemLayout}>
                        
//                         <Button type="primary" htmlType="submit" className="joinUsButton">
//                             Join US
//                     </Button>
//                         {}
//                     </Form.Item>
//                 </Form>
//                 <h4 className='disclamer_bylaw'>*Please note that by clicking Join Us you agree to abide by the <a href = {pdf} target = "_blank">By-Laws</a> of the association</h4>
//             </div>
//         )
//     }
// }


import "../styles/home.scss";
import React from "react";
import { TuluForm } from '../components/TuluForm'

export const BecomeAMember = () => {
    const page = "BecomeAMember"
    return (
        <div>
            <div>
                <h1 className="homeHeader newsletter">
                    Membership
                </h1>
                <h1 className="homeHeader disclamer marginBorder">
                    Any person eighteen years or older and subscribes to the objectives of the association and pays dues, is entitled to be a member of the association. Membership in this corporation shall be open to all persons with roots in Tulunadu and/or interested in Tulu language or culture.
                    <b>Members must agree to abide by the by-laws of the Association.</b>
                    </h1>
                    <h1 className="homeHeader tuluLipi marginBorder">
                        Grand Patron Member - Family Membership: $1000 & above
                    <br />
                    Patron Member - Family Membership: $500 & above
                    <br />
                    Life Member - Family Membership: $100
                    <br />
                    Life Member - Individual Membership: $50
                </h1>
            </div>
            <TuluForm whichpage={page} />
        </div>
    )
}
