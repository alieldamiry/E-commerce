import React, { useState } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import classes from './Checkout.css';
import * as actions from '../../redux/actions/orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utility';
const Checkout = props => {
    const [orderForm, setOrderForm] = useState({
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
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        if (!props.isAuthenticated) {
            props.history.push('/auth')
        }
        let orderedProducts = {};
        props.cart.orderedProducts.forEach(item =>
            orderedProducts[item.name] = {
                name: item.name,
                price: item.price,
                quantity: item.quantity
            });

        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            orderedProducts: orderedProducts,
            totalPrice: props.cart.totalPrice + 0.1 * props.cart.totalPrice,
            orderData: formData,
            userId: props.userId
        }
        props.purchaseProducts(order);

    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
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
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
        });
    }
    let productsSummary = props.cart.orderedProducts.map(item =>
        <div key={item.name}>({item.quantity}) x {item.name}: <strong>{item.price * item.quantity}$</strong> </div>
    );
    let checkout = <div className={classes.Checkout}>
        <h4>Enter Your Contact Data</h4>
        <div className={classes.orderSummary}>
            <div className={classes.ProductsSummary}>
                {productsSummary}
                <div>Tax (10%) : <strong>{(0.1 * props.cart.totalPrice).toFixed(2)}$</strong></div>
            </div>
            <div><strong>Total: {(0.1 * props.cart.totalPrice + props.cart.totalPrice).toFixed(2)}$</strong></div>
        </div>
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!formIsValid}>{props.isAuthenticated ? 'ORDER' : 'SIGNUP TO ORDER'}</button>
        </form>
    </div >
    if (props.loading) {
        checkout = <Spinner />;
    }
    return (
        <React.Fragment>
            {checkout}
        </React.Fragment>
    );
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