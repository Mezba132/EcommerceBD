import { LOGGED_IN_ADMIN, LOGGED_IN_USER, LOGOUT } from '../../Constants';

const AuthReducers = (state = null, action) => {
    switch (action.type) {
        case LOGGED_IN_ADMIN :
            return action.payload;
        case LOGGED_IN_USER :
            return action.payload;
        case LOGOUT :
            return action.payload;
        default:
            return state;
    }
}

export default AuthReducers;