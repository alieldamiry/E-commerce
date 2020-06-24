import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from './App.css';
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';
import Spinner from './components/UI/Spinner/Spinner';
// import Checkout from './containers/Checkout/Checkout';
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
// import Cart from './containers/Cart/Cart';
const Cart = React.lazy(() => import('./containers/Cart/Cart'));
// import Products from './components/Products/Products';
const Products = React.lazy(() => import('./containers/Products/Products'));

class App extends Component {

  render() {
    const categories = ['fashion', 'electronics'];
    const routingCategories = categories.map(c =>
      <Route key={c} path={'/' + c} render={() => (
        <Suspense fallback={<Spinner />}>
          <Products Category={c} />
        </Suspense>
      )
      } />);
    return (
      <div className={classes.App}>
        <Layout>
          <Switch>
            <Route path="/cart" render={() => (
              <Suspense fallback={<Spinner />}>
                <Cart />
              </Suspense>)
            } />
            {routingCategories}
            <Route path={'/checkout'} render={() => (
              <Suspense fallback={<Spinner />}>
                <Checkout />
              </Suspense>
            )} />
            <Route path="/" render={() =>
              <Home />
            } />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;