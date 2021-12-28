import {
	IMAGE_UPLOAD,
	IMAGE_REMOVE
} from '../../Constants';

const initialState = {
	uploadImages : [],
	deleteImage: ''
}

const Image = (state = initialState, action) => {
	switch (action.type) {
		case IMAGE_UPLOAD :
			return {...state, uploadImages: action.payload}
		case IMAGE_REMOVE :
			return {...state, deleteImage: action.payload}
		default :
			return state;
	}
}

export default Image;