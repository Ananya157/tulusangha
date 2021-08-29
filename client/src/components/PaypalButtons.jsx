import "../styles/home.scss";
import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import Spinner from "./Spinner";
import axios from 'axios';
import { message } from 'antd'

const CLIENT = {
    sandbox: "Af25HL_akZaLaxCTiQj0Fg7SF-o5uooxh51HxmJmqTfQcsrXoZB5aPOoqjQYeZbGAmRWcFy5BKEAZYp8",
    production: "Af25HL_akZaLaxCTiQj0Fg7SF-o5uooxh51HxmJmqTfQcsrXoZB5aPOoqjQYeZbGAmRWcFy5BKEAZYp8"
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
                    description: +"Mercedes G-Wagon",
                    amount: {
                        currency_code: "USD",
                        value: this.props.pay
                    }
                }
            ]
        });
    };

    onApprove = (data, actions) => {
        actions.order.capture().then(details => {
            let formData = new FormData();
            formData.append('name', this.props.name)
            formData.append('spouseName', this.props.spouseName)
            formData.append('address', this.props.address)
            formData.append('city', this.props.city)
            formData.append('state', this.props.state)
            formData.append('zipcode', this.props.zipcode)
            formData.append('type', this.props.type)
            formData.append('email', this.props.email)
            formData.append('phone', this.props.phone)
            formData.append('pay', this.props.pay)
            
            if (details.status === "COMPLETED"){
                const url = 'https://aatana.org/api/contacts.php'
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
                            <h2>Membership type: {this.props.type}</h2>
                            <h2>Total checkout Amount ${this.props.pay}</h2>
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
