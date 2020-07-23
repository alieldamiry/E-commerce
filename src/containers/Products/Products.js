import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../redux/actions/cart';
import { fetchProducts } from '../../redux/actions/products';
import classes from './Products.css';
import Product from '../../components/Product/Product';
import CartNotification from '../../components/CartNotification/CartNotification';
import Spinner from '../../components/UI/Spinner/Spinner';
import ProductModal from '../../components/UI/ProductModal/ProductModal';

const Products = props => {
    const initialState = {
        productClicked: {
            name: null,
            price: null
        },
        showProductModal: false,
        cartNotification: false
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SHOW_CART_NOTIFICATION':
                return { ...state, cartNotification: true };
            case 'CLOSE_CART_NOTIFICATION':
                return { ...state, cartNotification: false };
            case 'PRODUCT_CLICKED_HANDLER':
                return { ...state, showProductModal: true, productClicked: { ...action.product } };
            case 'CLOSE_MODAL_HANDLER':
                return { ...state, showProductModal: false }
            default: return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        console.log(state);
        props.fetchProducts(props.Category)
    }, [])

    // componentDidMount() {
    //     console.log(props);
    //     props.fetchProducts(props.Category);
    // }
    const showCartNotification = () => {
        dispatch({ type: 'SHOW_CART_NOTIFICATION' });
    }
    const closeCartNotification = () => {
        dispatch({ type: 'CLOSE_CART_NOTIFICATION' });
    }

    const productClickedHandler = product => {
        dispatch({ type: 'PRODUCT_CLICKED_HANDLER', product })
        // this.setState({ productClicked: product, showProductModal: true });
    }

    const closeProductModalHandler = () => {
        dispatch({ type: 'CLOSE_MODAL_HANDLER' })
        // this.setState({ showProductModal: false });
    }

    let products = props.error ? <p>Can't load products</p> : <Spinner />;
    let productsStyle = null;
    if (props.products && !props.loading) {
        productsStyle = classes.Products;
        products = props.products.map(product =>
            <Product
                addToCart={() => {
                    props.onAddToCart(product)
                    showCartNotification()
                }}
                productModalClicked={() => { productClickedHandler(product) }}
                product={product}
                key={product.name} />);
    }

    return (
        <React.Fragment>
            <ProductModal
                closeProductModal={closeProductModalHandler}
                show={state.showProductModal}
                product={state.productClicked} />
            <div className={productsStyle}>
                <CartNotification notificationState={state.cartNotification} closeNotification={closeCartNotification} />
                {products}
            </div>
        </React.Fragment>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (product) => {
            dispatch(actions.addToCart(product))
            dispatch(actions.calculatePrice())
        },
        fetchProducts: (Category) => dispatch(fetchProducts(Category))
    }
}
const mapStateToProps = state => {
    return {
        products: state.products.products,
        loading: state.products.loading,
        error: state.products.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Products, axios));