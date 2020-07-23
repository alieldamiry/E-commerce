import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './redux/actions/auth';
import classes from './App.css';
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';
import Orders from './containers/Orders/Orders'
import Checkout from './containers/Checkout/Checkout';
import Cart from './containers/Cart/Cart';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Products from './containers/Products/Products';

const App = props => {

  useEffect(() => {
    props.onTryAutoSignUp();
  }, [])

  const categories = ['fashion', 'electronics'];
  const routingCategories = categories.map(c =>
    <Route key={c} path={'/' + c} render={() => (
      <Products Category={c} />
    )
    } />);

  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          {routingCategories}
          <Route path="/cart" component={Cart} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path='/checkout' component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));