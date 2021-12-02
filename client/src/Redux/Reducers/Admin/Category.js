import {
	FETCH_CATEGORIES,
	CREATE_CATEGORY,
	FETCH_CATEGORY,
	UPDATE_CATEGORY,
	DELETE_CATEGORY
} from '../../Constants';

const initialState = {
	getCategories : [],
	getCategory : '',
	createCategory: '',
	updateCategory: '',
	deleteCategory: ''
}

const Category = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CATEGORIES :
			return {...state, getCategories: action.payload}
		case CREATE_CATEGORY :
			return {...state, createCategory: action.payload}
		case FETCH_CATEGORY :
			return {...state, getCategory: action.payload}
		case UPDATE_CATEGORY :
			return {...state, updateCategory: action.payload}
		case DELETE_CATEGORY :
			return {...state, deleteCategory: action.payload}
		default :
			return state;
	}
}

export default Category;