import React from 'react';
import imageSource from '../../assets/images/Home.jpg';
import classes from './Home.css';
const Home = (props) => {
    return (
        <div className={classes.Home}>
            <img className={classes.image} alt='Home' src={imageSource} />
            <div className={classes.text}>
                <h1>E-commerce</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
        </div>
    );
};

export default Home;