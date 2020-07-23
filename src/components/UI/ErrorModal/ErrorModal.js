import React from 'react';

import classes from './ErrorModal.css';
import Backdrop from '../Backdrop/Backdrop';

const ErrorModal = props => {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== props.show || nextProps.children !== props.children;
    // }

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.ErrorModal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default React.memo(ErrorModal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show && nextProps.children === prevProps.children
);