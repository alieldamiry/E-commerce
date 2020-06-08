import React, { Component } from 'react';
import classes from './App.css';
import Products from './components/Products/Products';
import Layout from './containers/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Cart from './containers/Cart/Cart';
import CartNotification from './components/CartNotification/CartNotification';
import Checkout from './containers/Checkout/Checkout';
import Home from './containers/Home/Home';

class App extends Component {
  state = {
    orderedProducts: [],
    totalPrice: 0,
    showCartNotification: false,
    showCheckout: false
  }

  calculateTotalPrice = () => {
    const totalPrice = this.state.orderedProducts.reduce((prev, cur) => {
      return prev + cur.price * cur.quantity;
    }, 0);
    if (this.state.totalPrice !== totalPrice) {
      this.setState({ totalPrice: totalPrice, })
    }
  }

  addToCartHandler = (product) => {

    let orderedProduct = { ...product, quantity: 1 };
    let productsList = [...this.state.orderedProducts];
    if (!productsList.some(el => el.name === orderedProduct.name)) {
      productsList.push(orderedProduct);
      this.setState({ orderedProducts: productsList, showCartNotification: true });
    }
  }

  closeCartNotification = () => {
    this.setState({ showCartNotification: false });
  }
  changeQuantityHandler = (event, item) => {
    let orderedProducts = [...this.state.orderedProducts];
    orderedProducts.find(product => product.name === item.name).quantity = Number(event.target.value);
    orderedProducts.reduce((prev, cur) => {
      return prev + cur.price * cur.quantity;
    }, 0);
    this.setState({ orderedProducts: orderedProducts });
  }

  deleteItemHandler = (item) => {
    let orderedProducts = this.state.orderedProducts.filter(el => el !== item);
    this.setState({ orderedProducts: orderedProducts });

  }

  render() {
    const categories = ['fashion', 'electronics'];
    const routingCategories = categories.map(c =>
      <Route key={c} path={'/' + c} render={() =>
        <Products addToCart={this.addToCartHandler} Category={c} />} />);

    return (
      <div className={classes.App}>
        <Layout>
          <CartNotification notificationState={this.state.showCartNotification} closeNotification={this.closeCartNotification} />
          <Switch>
            <Route path="/cart" render={() =>
              <Cart
                totalPrice={this.state.totalPrice}
                calculateTotalPrice={this.calculateTotalPrice}
                closeNotification={this.closeCartNotification}
                products={this.state.orderedProducts}
                deleteItem={(item) => this.deleteItemHandler(item)}
                changeQuantity={(event, item) => this.changeQuantityHandler(event, item)} />} />
            {routingCategories}
            <Route path={'/checkout'} render={() => <Checkout state={this.state} />} />
            <Route path="/" render={() => <Home />} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;