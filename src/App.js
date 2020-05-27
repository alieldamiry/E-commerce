import React, { Component } from 'react';
import classes from './App.css';
import Products from './components/Products/Products';
import Layout from './containers/Layout/Layout';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  // state = {
  //   productsStored: null
  // }
  // componentDidMount() {
  //   axios.get('https://e-commerce-9417b.firebaseio.com/products.json').then(res => {

  //     this.setState({ productsStored: res.data });
  //     // console.log(this.state.productsStored);
  //   });
  // }



  render() {
    return (
      <div className={classes.App}>
        <Layout>

          <Switch>
            <Route path="/fashion" exact render={(props) =>
              <Products Category='fashion' />} />

            <Route path="/electronics"
              render={(props) => <Products Category='electronics' />} />

            <Route path="/appliances" render={() => <h1>This page is still under development</h1>} />
            <Route path="/" render={() => <h1>Home page</h1>} />
          </Switch>

        </Layout>
        {/* <HomePage /> */}
      </div>
    );
  }
}

export default App;