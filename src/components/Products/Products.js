import React, { Component } from 'react';
import classes from './Products.css';
import Product from './Product/Product';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';
import ProductDetails from '../UI/ProductDetails/ProductDetails';

class Products extends Component {
    state = {
        productsStored: null,
        productClickedName: null,
        showDetails: false
    }

    componentDidMount() {
        axios.get('https://e-commerce-9417b.firebaseio.com/products/' + this.props.Category + '.json')
            .then(res => {
                this.setState({ productsStored: Object.values(res.data) });
            });
    }
    componentDidUpdate() {
        axios.get('https://e-commerce-9417b.firebaseio.com/products/' + this.props.Category + '.json')
            .then(res => {
                console.log(this.props.Category + ' is updated');

                if (JSON.stringify(this.state.productsStored) != JSON.stringify(Object.values(res.data))) {
                    this.setState({ productsStored: Object.values(res.data) });
                }
            });
    }

    productClickedHandler = (productName) => {
        // alert(productName);
        this.setState({ productClickedName: productName, showDetails: true });
    }

    closeDetailsHandler = () => {
        this.setState({ showDetails: false });
    }

    render() {

        let products = null;
        let productsStyle = null;
        if (this.state.productsStored) {
            products = this.state.productsStored.map(product =>
                <Product
                    clicked={() => { this.productClickedHandler(product.name) }}
                    price={product.price}
                    key={product.name} productName={product.name} />
            );

            productsStyle = classes.Products;
        } else {
            products = <Spinner />;
        }


        return (
            <Aux>
                <ProductDetails closeDetails={this.closeDetailsHandler} show={this.state.showDetails} productName={this.state.productClickedName} />
                <div className={productsStyle}>
                    {products}
                </div>
            </Aux>
        );
    }
}

export default Products;