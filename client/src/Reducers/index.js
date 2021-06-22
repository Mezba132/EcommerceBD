import { combineReducers } from "redux";
import { userReducers } from './UserReducer';

const rootReducer = combineReducers({
    user: userReducers,
});

export default rootReducer;