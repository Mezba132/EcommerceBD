import React from 'react';
import Product from '../../Shared/Form/User/product';

const Body = ({ isShowSidebar, isShowShoppingCart, products, addToCartHandler }) => {
    const getBodyStyle = () => {
		return isShowSidebar ? {marginLeft: '230px'} : {};
	}

	const getBodyStyleClass = () => {
		return isShowShoppingCart ?
			'bodyContainer bodyContainerWithCart' : 'bodyContainer';
	}

    return (
        <div className={getBodyStyleClass()} style={getBodyStyle()}>
                <h1>New Arrivals</h1>
                <hr/>
				<div id='body'>
                        {products ?
                            products.map((product) => (
                                <Product
                                    key={product._id}
                                    product = {product}
                                    addToCartHandler={addToCartHandler}
                                />
                            ))
                            :
                            <h1>No Product</h1>
                        }
				</div>
                <h1>Best Selling</h1>
                <hr/>
			</div>
    )
}

export default Body; 