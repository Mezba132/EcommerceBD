import React  from "react";
import {
	FETCH_BRAND,
	FETCH_BRANDS,
	FETCH_CATEGORIES,
	FETCH_CATEGORY, FETCH_PRODUCT, FETCH_PRODUCTS,
	FETCH_SUB_CATEGORIES,
	FETCH_SUB_CATEGORY
} from '../Constants';
import { getCategories, getCategory} from "../../Functions/Categoy";
import {getSubCategories, getSubCategory} from "../../Functions/SubCategory";
import {getBrand, getBrands} from "../../Functions/Brand";
import {getProduct, getProductsByFilters} from "../../Functions/Product";

export const FetchCategories = () => {
	return (dispatch) => {
		return getCategories()
				.then(res => {
					dispatch({
						type: FETCH_CATEGORIES,
						payload: res.data
					})
				})
				.catch(err => console.log(err))
	}
}

export const FetchCategory = (slug) => {
	return (dispatch) => {
		return getCategory(slug)
				.then(res => {
					dispatch({
						type: FETCH_CATEGORY,
						payload: res.data
					})
				})
				.catch(err => console.log(err))
	}
}

export const FetchSubCategories = () => {
	return (dispatch) => {
		return getSubCategories()
				.then(res => {
					dispatch({
						type: FETCH_SUB_CATEGORIES,
						payload: res.data
					})
				})
				.catch(err => console.log(err))
	}
}

export const FetchSubCategory = (slug) => {
	return (dispatch) => {
		return getSubCategory(slug)
				.then(res => {
					dispatch({
						type: FETCH_SUB_CATEGORY,
						payload: res.data
					})
				})
				.catch(err => console.log(err))
	}
}

export const FetchBrands = () => {
	return (dispatch) => {
		return getBrands()
				.then(res => {
					dispatch({
						type: FETCH_BRANDS,
						payload: res.data
					})
				})
				.catch(err => console.log(err))
	}
}

export const FetchBrand = (slug) => {
	return (dispatch) => {
		return getBrand(slug)
				.then(res => {
					dispatch({
						type: FETCH_BRAND,
						payload: res.data
					})
				})
				.catch(err => console.log(err))
	}
}

export const FetchProducts = (filters) => {
	return (dispatch) => {
		return getProductsByFilters(filters)
				.then(res => {
					dispatch({
						type: FETCH_PRODUCTS,
						payload: res.data
					})
				})
				.catch(err => console.log(err))
	}
}

export const FetchProduct = (slug) => {
	return (dispatch) => {
		return getProduct(slug)
				.then(res => {
					dispatch({
						type: FETCH_PRODUCT,
						payload: res.data
					})
				})
				.catch(err => console.log(err))
	}
}

