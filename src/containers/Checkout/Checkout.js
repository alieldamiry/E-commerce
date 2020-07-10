import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import classes from './Checkout.css';
// import axios from 'axios';
import * as actions from '../../redux/actions/orders';
// import { withRouter } from "react-router";
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utility';
class Checkout extends Component {
    componentDidMount() {
        console.log(this.props);
    }
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
                    maxLength: 5,
                    isNumeric: true
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
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        if (!this.props.isAuthenticated) {
            this.props.history.push('/auth')
        }
        let orderedProducts = {};
        this.props.cart.orderedProducts.forEach(item =>
            orderedProducts[item.name] = {
                name: item.name,
                price: item.price,
                quantity: item.quantity
            });

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            orderedProducts: orderedProducts,
            totalPrice: this.props.cart.totalPrice + 0.1 * this.props.cart.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.purchaseProducts(order);

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
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
        let productsSummary = this.props.cart.orderedProducts.map(item =>
            <div key={item.name}>({item.quantity}) x {item.name}: <strong>{item.price * item.quantity}$</strong> </div>
        );
        let checkout = <div className={classes.Checkout}>
            <h4>Enter Your Contact Data</h4>
            <div className={classes.orderSummary}>
                <div className={classes.ProductsSummary}>
                    {productsSummary}
                    <div>Tax (10%) : <strong>{(0.1 * this.props.cart.totalPrice).toFixed(2)}$</strong></div>
                </div>
                <div><strong>Total: {(0.1 * this.props.cart.totalPrice + this.props.cart.totalPrice).toFixed(2)}$</strong></div>
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
                <button
                    className={classes.OrderButton}
                    disabled={!this.state.formIsValid}>{this.props.isAuthenticated ? 'ORDER' : 'SIGNUP TO ORDER'}</button>
            </form>
        </div >
        if (this.props.loading) {
            checkout = <Spinner />;
        }
        return (
            <React.Fragment>
                {checkout}
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseProducts: (order) => dispatch(actions.purchaseProducts(order))
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        loading: state.orders.loading,
        error: state.orders.error,
        isAuthenticated: state.auth.token !== null,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Checkout, axios));