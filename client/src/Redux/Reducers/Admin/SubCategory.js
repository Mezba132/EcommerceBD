import {
	FETCH_SUB_CATEGORIES,
	CREATE_SUB_CATEGORY,
	FETCH_SUB_CATEGORY,
	UPDATE_SUB_CATEGORY,
	DELETE_SUB_CATEGORY
} from '../../Constants';

const initialState = {
	getSubCategories : [],
	getSubCategory : '',
	createSubCategory: '',
	updateSubCategory: '',
	deleteSubCategory: ''
}

const SubCategory = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SUB_CATEGORIES :
			return {...state, getSubCategories: action.payload}
		case FETCH_SUB_CATEGORY :
			return {...state, getSubCategory: action.payload}
		case CREATE_SUB_CATEGORY :
			return {...state, createSubCategory: action.payload}
		case UPDATE_SUB_CATEGORY :
			return {...state, updateSubCategory: action.payload}
		case DELETE_SUB_CATEGORY :
			return {...state, deleteSubCategory: action.payload}
		default :
			return state;
	}
}

export default SubCategory;