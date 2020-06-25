import React from 'react';
import logoImage from '../../assets/images/logo.png'
import classes from './Logo.css';

const logo = () => (
    <div className={classes.Logo}>
        <img className={classes.LogoImg} src={logoImage} alt="Logo" />
    </div>
);

export default logo;