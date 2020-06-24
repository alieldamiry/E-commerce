import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import classes from './Products.css';
import Product from '../../components/Product/Product';
import CartNotification from '../../components/CartNotification/CartNotification';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
// import ProductModal from '../UI/ProductModal/ProductModal';
const ProductModal = React.lazy(() => import('../../components/UI/ProductModal/ProductModal'));


class Products extends Component {
    state = {
        productsStored: null,
        productClicked: {
            name: null,
            price: null
        },
        showProductModal: false,
        cartNotification: false
    }

    showCartNotification = () => {
        this.setState({ cartNotification: true });
    }
    closeCartNotification = () => {
        this.setState({ cartNotification: false });
    }

    componentDidMount() {
        axios.get('https://e-commerce-9417b.firebaseio.com/products/' + this.props.Category + '.json')
            .then(res => {
                this.setState({ productsStored: Object.values(res.data) });
            });
    }
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
            productsStyle = classes.Products;
            products = this.state.productsStored.map(product =>
                <Product
                    addToCart={() => {
                        this.props.onAddToCart(product)
                        this.showCartNotification()
                    }}
                    productModalClicked={() => { this.productClickedHandler(product) }}
                    product={product}
                    key={product.name} />
            );
        } else {
            products = <Spinner />;
        }

        return (
            <React.Fragment>
                <Suspense fallback={<Spinner />}>
                    <ProductModal
                        closeProductModal={this.closeProductModalHandler}
                        show={this.state.showProductModal}
                        product={this.state.productClicked} />
                </Suspense>
                <div className={productsStyle}>
                    <CartNotification notificationState={this.state.cartNotification} closeNotification={this.closeCartNotification} />
                    {products}
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (product) => {
            dispatch(actionCreators.addToCart(product))
            dispatch(actionCreators.calculatePrice())
        }
    }
}
const mapStateToProps = state => {
    return {
        productsStored: state.productsStored,
        orderedProducts: state.orderedProducts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);