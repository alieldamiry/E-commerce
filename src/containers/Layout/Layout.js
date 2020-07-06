import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import classes from './Layout.css'
import { FaFacebookF, FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Spinner from '../../components/UI/Spinner/Spinner';
// import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
const SideDrawer = React.lazy(() => import('../../components/navigation/SideDrawer/SideDrawer'));

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    sideDrawerToggleHandler = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer })
        // this.setState((prevState) => {
        //     return { showSideDrawer: !prevState.showSideDrawer };
        // })
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <Suspense fallback={<Spinner />}>
                    <SideDrawer
                        isAuth={this.props.isAuthenticated}
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerToggleHandler} />
                </Suspense>
                <main className={classes.Content}>
                    {this.props.children}
                    <div className={classes.Footer}>
                        <div className={classes.Subscribe}>
                            <h4><span style={{ color: '#007CC3' }}>Newsletter</span></h4>
                            <h2>Get Discount 30% Off</h2>
                            <h4>Suspendisse netus proin eleifend fusce sollicitudin potenti vel magnis nascetur</h4>
                            <div className={classes.Email}>
                                <input placeholder="Enter Your E-mail ..." type='email' />
                                <button>SUBSCRIBE</button>
                            </div>
                        </div>
                        <div className={classes.Contacts}>
                            <p>Copyright ©2020 Ali Eldamiry</p>
                            <div className={classes.SocialLinks}>
                                <a href="https://www.facebook.com/aliemadeldamiry"><FaFacebookF size={17} color="#fff" /></a>
                                <a href="https://github.com/alieldamiry"><FaGithub size={17} color="#fff" /></a>
                                <a href="https://www.linkedin.com/in/ali-eldamiry-9262b8126/"><FaLinkedinIn size={17} color="#fff" /></a>
                                <a href="https://www.instagram.com/alieldamiry/"><FaInstagram size={17} color="#fff" /></a>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);