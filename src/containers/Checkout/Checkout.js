import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import classes from './Checkout.css';
import axios from 'axios';
import { withRouter } from "react-router";

class Checkout extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            paymentMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'vodafone cash', displayValue: 'Vodafone Cash' },
                        { value: 'credit card', displayValue: 'Credit Card' }
                    ]
                },
                value: 'credit card',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false,
    }
    // shouldComponentUpdate(){
    //     return this.props.state.showCheckout;
    // }
    orderHandler = () => {
        let orderedProducts = {};
        this.props.state.orderedProducts.forEach(item =>
            orderedProducts[item.name] = {
                price: item.price,
                quantity: item.quantity
            });

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            orderedProducts: orderedProducts,
            price: this.props.state.totalPrice + 0.1 * this.props.state.totalPrice,
            orderData: formData
        }

        axios.post('https://e-commerce-9417b.firebaseio.com/orders.json', order)
            .then(res => {
                this.props.history.push('/');
            }).catch(res => {
                alert(res);
            });
    }



    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let productsSummary = this.props.state.orderedProducts.map(item =>
            <div key={item.name}>({item.quantity}) x {item.name}: <strong>{item.price * item.quantity}$</strong> </div>
        );
        return (
            <div className={classes.Checkout}>
                <h4>Enter Your Contact Data</h4>
                <div className={classes.orderSummary}>
                    <div className={classes.ProductsSummary}>
                        {productsSummary}
                        <div>Tax (10%) : <strong>{0.1 * this.props.state.totalPrice}$</strong></div>
                    </div>
                    <div><strong>Total: {0.1 * this.props.state.totalPrice + this.props.state.totalPrice}$</strong></div>
                    
                </div>
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <button className={classes.OrderButton} disabled={!this.state.formIsValid}>ORDER</button>
                </form>
            </div >
        );
    }
}

export default withRouter(Checkout);