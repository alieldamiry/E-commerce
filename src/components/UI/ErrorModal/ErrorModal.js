import React, { Component } from 'react';

import classes from './ErrorModal.css';
import Backdrop from '../Backdrop/Backdrop';

class ErrorModal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render () {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.ErrorModal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default ErrorModal;