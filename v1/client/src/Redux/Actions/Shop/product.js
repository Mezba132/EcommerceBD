import React  from "react";
import {
    FETCH_PRODUCT_BEST_SELL,
    FETCH_PRODUCT_NEW_ARRIVAL
} from '../../Constants';

import { getNewProducts, getBestProducts } from "../../../Functions/Shop/product"

export const FetchNewProducts = () => {
	return (dispatch) => {
		return getNewProducts()
				.then(res => {
					dispatch({
						type: FETCH_PRODUCT_NEW_ARRIVAL,
						payload: res.data
					})
				})
				.catch(err => console.log(err))
	}
}

export const FetchBestProducts = () => {
	return (dispatch) => {
		return getBestProducts()
				.then(res => {
					dispatch({
						type: FETCH_PRODUCT_BEST_SELL,
						payload: res.data
					})
				})
				.catch(err => console.log(err))
	}
}