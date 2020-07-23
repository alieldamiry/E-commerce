import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';

const withErrorHandler = (WrappedComponent) => {
    return props => {
        const [error, setError] = useState(null);
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }
        }, [reqInterceptor, resInterceptor])

        const errorConfirmedHandler = () => {
            setError(null)
        }
        return (
            <React.Fragment>
                <ErrorModal
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </ErrorModal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    }
}

export default withErrorHandler;