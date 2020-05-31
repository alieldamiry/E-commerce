import React, { Component } from 'react';
import classes from './Products.css';
import Product from './Product/Product';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';
import ProductModal from '../UI/ProductModal/ProductModal';

class Products extends Component {
    state = {
        productsStored: null,
        productClicked: {
            name: null,
            price: null
        },
        showProductModal: false
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.Category !== this.props.Category || nextState !== this.state;
    // }

    componentDidMount() {
        axios.get('https://e-commerce-9417b.firebaseio.com/products/' + this.props.Category + '.json')
            .then(res => {
                this.setState({ productsStored: Object.values(res.data) });
            });
            console.log('its mounted heeeeeey');
    }
    // componentDidUpdate() {
    //     console.log('its updated heeeeeey');
        
    //     axios.get('https://e-commerce-9417b.firebaseio.com/products/' + this.props.Category + '.json')
    //         .then(res => {
    //             if (JSON.stringify(this.state.productsStored) !== JSON.stringify(Object.values(res.data))) {
    //                 this.setState({ productsStored: Object.values(res.data) });
    //             }
    //         });
    // }

    productClickedHandler = (product) => {
        this.setState({ productClicked: product, showProductModal: true });
    }

    closeProductModalHandler = () => {
        this.setState({ showProductModal: false });
    }





    render() {
        let products = null;
        let productsStyle = null;
        if (this.state.productsStored) {
            products = this.state.productsStored.map(product =>
                <Product
                    addToCart={() => this.props.addToCart(product)}
                    productModalClicked={() => { this.productClickedHandler(product) }}
                    price={product.price}
                    key={product.name} productName={product.name} />
            );
            productsStyle = classes.Products;
        } else {
            products = <Spinner />;
        }


        return (
            <Aux>

                <ProductModal
                    closeProductModal={this.closeProductModalHandler}
                    show={this.state.showProductModal}
                    product={this.state.productClicked} />

                <div className={productsStyle}>
                    {products}
                </div>
            </Aux>
        );
    }
}

export default Products;