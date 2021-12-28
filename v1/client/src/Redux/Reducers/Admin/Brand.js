import {
	FETCH_BRANDS,
	CREATE_BRAND,
	FETCH_BRAND,
	UPDATE_BRAND,
	DELETE_BRAND
} from '../../Constants';

const initialState = {
	getBrands : [],
	getBrand : '',
	createBrand: '',
	updateBrand: '',
	deleteBrand: ''
}

const Brand = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_BRANDS :
			return {...state, getBrands: action.payload}
		case FETCH_BRAND :
			return {...state, getBrand: action.payload}
		case CREATE_BRAND:
			return {...state, createBrand: action.payload}
		case UPDATE_BRAND :
			return {...state, updateBrand: action.payload}
		case DELETE_BRAND :
			return {...state, deleteBrand: action.payload}
		default :
			return state;
	}
}

export default Brand;