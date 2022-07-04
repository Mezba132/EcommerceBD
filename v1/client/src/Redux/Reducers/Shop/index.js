import {
	FETCH_PRODUCT_NEW_ARRIVAL,
	FETCH_PRODUCT_BEST_SELL
} from '../../Constants';

const initialState = {
	getNewProducts : [],
	getBestProducts : []
}

const Home = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PRODUCT_NEW_ARRIVAL :
			return {...state, getNewProducts: action.payload}
		case FETCH_PRODUCT_BEST_SELL :
			return {...state, getBestProducts: action.payload}
		default :
			return state;
	}
}

export default Home;