import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../redux/actions/auth';
import { checkValidity } from '../../shared/utility';
const Auth = props => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [isSignup, setIsSignUp] = useState(false);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            }
        };
        setAuthForm(updatedControls);
        // this.setState({ controls: updatedControls });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    }
    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignup);
        // this.setState(prevState => {
        //     return { isSignup: !prevState.isSignup };
        // });
    }

    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));

    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = <p style={{ color: 'red' }}>{props.error.message}</p>
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <button className={classes.Btn}>{isSignup ? 'SIGNUP' : 'SIGNIN'}</button>
            </form>
            <button onClick={switchAuthModeHandler} className={[classes.Btn, classes.red].join(' ')}>
                SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);