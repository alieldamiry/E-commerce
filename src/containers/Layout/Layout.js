import React, { Component } from 'react';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
import classes from './Layout.css'

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
            <React.Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer}
                    closed={this.sideDrawerToggleHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;