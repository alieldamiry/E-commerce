import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import classes from './Products.css';
import Product from '../../components/Product/Product';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
// import ProductModal from '../UI/ProductModal/ProductModal';
const ProductModal = React.lazy(() => import('../../components/UI/ProductModal/ProductModal'));

class Products extends Component {
    state = {
        productClicked: {
            name: null,
            price: null
        },
        showProductModal: false
    }

    componentDidMount() {
        console.log(this.props.productsStored);

        //     axios.get('https://e-commerce-9417b.firebaseio.com/products/' + this.props.Category + '.json')
        //         .then(res => {
        //             console.log(res.data);
        //             console.log(Object.values(res.data));
        //             this.setState({ productsStored: Object.values(res.data) });
        //         });
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
        if (this.props.productsStored) {
            products = this.props.productsStored.map(product =>
                <Product
                    addToCart={() => this.props.addToCart(product)}
                    productModalClicked={() => { this.productClickedHandler(product) }}
                    price={product.price}
                    key={product.name}
                    productName={product.name} />
            );
            productsStyle = classes.Products;
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
                    {products}
                </div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        productsStored: state.productsStored
    }
}

export default connect(mapStateToProps)(Products);