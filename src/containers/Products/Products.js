import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/cart';
import { fetchProducts } from '../../redux/actions/products';
import classes from './Products.css';
import Product from '../../components/Product/Product';
import CartNotification from '../../components/CartNotification/CartNotification';
import Spinner from '../../components/UI/Spinner/Spinner';
import ProductModal from '../../components/UI/ProductModal/ProductModal';
// const ProductModal = React.lazy(() => import('../../components/UI/ProductModal/ProductModal'));


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
        console.log(this.props);
        this.props.fetchProducts(this.props.Category);
        // axios.get('https://e-commerce-9417b.firebaseio.com/products/' + this.props.Category + '.json')
        //     .then(res => {
        //         this.setState({ productsStored: Object.values(res.data) });
        //     });
    }
    productClickedHandler = (product) => {
        this.setState({ productClicked: product, showProductModal: true });
    }

    closeProductModalHandler = () => {
        this.setState({ showProductModal: false });
    }

    render() {
        let products = <Spinner />;
        if (this.props.error) {
            products = <p>Can't load products</p>;
        }
        let productsStyle = null;
        if (this.props.products && !this.props.loading) {
            productsStyle = classes.Products;
            products = this.props.products.map(product =>
                <Product
                    addToCart={() => {
                        this.props.onAddToCart(product)
                        this.showCartNotification()
                    }}
                    productModalClicked={() => { this.productClickedHandler(product) }}
                    product={product}
                    key={product.name} />);
        }


        return (
            <React.Fragment>
                <ProductModal
                    closeProductModal={this.closeProductModalHandler}
                    show={this.state.showProductModal}
                    product={this.state.productClicked} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Products);