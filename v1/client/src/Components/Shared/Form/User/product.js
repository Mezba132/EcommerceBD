import React from 'react';

const Product = ({ product, addToCartHandler }) => {

    const singleProduct = () => {
        console.log('single product');
    }

    return (
        <div id='productContainer'>
				<div id='productImageContainer'>
					<img id='productImage' src={product.images[0].url} alt='Product'/>
				</div>
				<div id='productTitle' onClick={singleProduct}>
					<p>{product.title}</p>
				</div>
				<div id='productPrice'>
					<p>${product.mrp_price}</p>
				</div>
				<div>
                    <button
						id='addToCartButton'
					>
						View Product
					</button>
					<button
						id='addToCartButton'
						onClick={() => addToCartHandler(product)}
					>
						Add To Cart
					</button>
				</div>
			</div>
    )
}

export default Product;