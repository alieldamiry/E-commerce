import React, { Component } from 'react';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import Aux from "../../hoc/Auxiliary/Auxiliary";
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
import classes from './Layout.css'
// import Spinner from '../../components/UI/Spinner/Spinner';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    componentDidMount() {
        // console.log(this.props);
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
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer}
                    closed={this.sideDrawerToggleHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;