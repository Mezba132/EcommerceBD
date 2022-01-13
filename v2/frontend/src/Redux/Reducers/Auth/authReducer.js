import {
    REGISTER_USER,
    LOGGED_IN_ADMIN,
    LOGGED_IN_USER,
    LOGOUT
}
    from '../../Constants';


const AuthReducer = (state  = null, action) => {
    switch (action.type) {
        case REGISTER_USER :
            return action.payload
        case LOGGED_IN_USER :
            return action.payload
        case LOGGED_IN_ADMIN :
            return action.payload
        case LOGOUT :
            return action.payload;
        default:
            return state;
    }
}

export default AuthReducer;