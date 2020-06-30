import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from './App.css';
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';
// import Spinner from './components/UI/Spinner/Spinner';
import Orders from './containers/Orders/Orders'
import Checkout from './containers/Checkout/Checkout';
// const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
import Cart from './containers/Cart/Cart';
// const Cart = React.lazy(() => import('./containers/Cart/Cart'));
import Products from './containers/Products/Products';
// const Products = React.lazy(() => import('./containers/Products/Products'));

class App extends Component {

  render() {
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
            <Route path='/checkout' component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;