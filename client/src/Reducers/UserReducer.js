import { LOGGED_IN_USER } from '../Constants';
import { LOGOUT } from '../Constants';

export const userReducers = (state = null, action) => {
    switch (action.type) {
        case LOGGED_IN_USER :
            return action.payload;
        case LOGOUT :
            return action.payload;
        default:
            return state;
    }
}