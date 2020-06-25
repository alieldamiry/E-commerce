import React from 'react';
import classes from './Home.css';
import imageSource from "../../assets/images/Chair.png";

const Home = () => {
    return (
        <div className={classes.Home}>
            <div className={classes.Header}>
                <img className={classes.HeaderImage} alt="" src={imageSource} />
                <div className={classes.HeaderText}>
                    <h6>THIS WEEK ONLY</h6>
                    <h1>Big Sale</h1>
                    <h2><span style={{ color: '#007cc3' }}>50% Off</span></h2>
                    <button className={classes.HeaderButton}><strong>SHOP NOW</strong></button>
                </div>
            </div>
        </div>
    );
};

export default Home;