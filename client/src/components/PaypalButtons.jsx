import "../styles/home.scss";
import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import Spinner from "./Spinner";
import axios from 'axios';
import { message } from 'antd'

const CLIENT = {
    
    //sandbox: "Aa7mAU7gnIw3MGT62xbYCTY2eR_JT-FC4h9aX5j96Eh2cQdmSvP3yWp4eZL-8bteYuODT-e7b1GCFMFj",  //Production
    production: "Aa7mAU7gnIw3MGT62xbYCTY2eR_JT-FC4h9aX5j96Eh2cQdmSvP3yWp4eZL-8bteYuODT-e7b1GCFMFj"  //Production
    //sandbox: "AVRxqx_n10Ia4qNVrdvUt-V3bUyL1xc6J8vvasAOkWYfLd7BwyCkJ46AKJLQGOqjTPa4jrEgsV-7fOtp",    //TestID
    //production: "AVRxqx_n10Ia4qNVrdvUt-V3bUyL1xc6J8vvasAOkWYfLd7BwyCkJ46AKJLQGOqjTPa4jrEgsV-7fOtp"  //TestID
}; 

const CLIENT_ID =
    process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showButtons: false,
            loading: true,
            paid: false
        };

        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;
        if (isScriptLoaded && isScriptLoadSucceed) {
            PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
            this.setState({ loading: false, showButtons: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

        const scriptJustLoaded =
            !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;
        if (scriptJustLoaded) {
            if (isScriptLoadSucceed) {
                PayPalButton = window.paypal.Buttons.driver("react", {
                    React,
                    ReactDOM
                });
                this.setState({ loading: false, showButtons: true });
            }
        }
    }
    createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: +"All America Tulu Association Membership",
                    amount: {
                        currency_code: "USD",

                        value: this.props.amount
                    }
                }
            ]
        });
    };

    onApprove = (data, actions) => {
        actions.order.capture().then(details => {
            let url = "";
            let formData = new FormData();
            formData.append('name', this.props.name)
            formData.append('address', this.props.address)
            formData.append('city', this.props.city)
            formData.append('state', this.props.state)
            formData.append('zipcode', this.props.zipcode)
            formData.append('email', this.props.email)
            formData.append('phone', this.props.phone)
            formData.append('pay', this.props.pay)
            formData.append('amount', this.props.amount)
            if (this.props.page === "BecomeAMember"){
                formData.append('spouseName', this.props.spouseName)
                formData.append('type', this.props.memberType) 
                url = 'https://aatana.org/api/contacts.php'
            } else if (this.props.page === "Donate"){
                formData.append('member', "None")
                formData.append('type', this.props.donationType)
                formData.append('purpose', "None")
                url = 'https://aatana.org/api/donors.php'
            } else if (this.props.page === "Sponsor") {
                formData.append('type', this.props.sponsorType)
                url = 'https://aatana.org/api/sponsor.php'
            }
            
            if (details.status === "COMPLETED"){
                axios({
                    method: 'post',
                    url: url,
                    data: formData,
                    config: { headers: { 'content-type': 'multipart/form-data' } }
                })
                    .then(function (response) {
                        if (response.data.includes("Data Added")) {
                            message.success('Data Successfully Added', 5);
                        } else {
                            message.error('Something went wrong while adding data to our database', 5);
                        }
                    })
                    .catch(function (response) {
                        message.error(response, 5);
                    });
            }
            this.setState({ showButtons: false, paid: true });
        });
    };

    render() {
        const { showButtons, loading, paid } = this.state;

        return (
            <div className="main">
                {loading && <Spinner />}

                {showButtons && (
                    <div>
                        <div>
                            {/* <h2>Membership type: {this.props.type}</h2> */}
                            <h2>Total checkout Amount ${this.props.amount}</h2>
                        </div>

                        <PayPalButton
                            createOrder={(data, actions) => this.createOrder(data, actions)}
                            onApprove={(data, actions) => this.onApprove(data, actions)}
                        />
                    </div>
                )}

                {paid && (
                    <div className="main">
                        Payment Successful
                    </div>
                )}
            </div>
        );
    }
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);
