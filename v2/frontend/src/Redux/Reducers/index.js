import { combineReducers } from 'redux';
import AuthReducer from "./Auth/authReducer";

const rootReducer = combineReducers({
    user: AuthReducer,
});

export default rootReducer;