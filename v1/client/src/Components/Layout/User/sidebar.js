import React, {useEffect, useState} from "react";
import SearchForm from "../../Shared/Form/User/search";
import { FetchCategories } from "../../../Redux/Actions"
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';

const SideBar = ({isShowSidebar}) => {

    const dispatch = useDispatch()
    const { category }  = useSelector(state => state);

    const categories = category.getCategories

    useEffect(() => {
        dispatch(FetchCategories())
    },
    [dispatch])

    const getSidebarStyle = () => {
		return !isShowSidebar ? {left: '-200px'} : {};
	}

    return(
        <div id='sideBarContainer' style={getSidebarStyle()}>
            <div id='sideBarBody'>
                <ul>
                    {categories.map((category) => (
                        <Link key={category._id} to="">
                            <li>{category.name}</li>
                        </Link>
					))}
                </ul>
            </div>
		</div>
    )
}

export default SideBar;