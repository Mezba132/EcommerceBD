import {
	FETCH_PRODUCTS,
	CREATE_PRODUCT,
	FETCH_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT
} from '../../Constants';

const initialState = {
	getProducts : [],
	getProduct : '',
	createProduct: '',
	updateProduct: '',
	deleteProduct: ''
}

const Product = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS :
			return {...state, getProducts: action.payload}
		case CREATE_PRODUCT :
			return {...state, createProduct: action.payload}
		case FETCH_PRODUCT :
			return {...state, getProduct: action.payload}
		case UPDATE_PRODUCT :
			return {...state, updateProduct: action.payload}
		case DELETE_PRODUCT :
			return {...state, deleteProduct: action.payload}
		default :
			return state;
	}
}

export default Product;