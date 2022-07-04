import { combineReducers } from "redux";
import AuthReducers from './Auth/AuthReducer';
import Category from './Admin/Category'
import SubCategory from "./Admin/SubCategory";
import Brand from "./Admin/Brand";
import Product from "./Admin/Product";
import Image from "./Admin/Image";
import Home from "./Shop/index";

const rootReducer = combineReducers({
    user: AuthReducers,
    category : Category,
    subs : SubCategory,
    brand : Brand,
    product : Product,
    image : Image,
    home : Home
});

export default rootReducer;