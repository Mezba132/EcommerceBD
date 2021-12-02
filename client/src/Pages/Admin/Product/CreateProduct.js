import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
		createProduct
	} from '../../../Functions/Product'
import {
		getSubCategories
} from '../../../Functions/Categoy'
import CreateProductForm from "../../../Components/Shared/Form/Admin/CreateProduct";
import {CREATE_PRODUCT} from "../../../Redux/Constants";

const initialState = {
	title:'',
	description:'',
	cost_price:'',
	mrp_price:'',
	categories:[],
	images:[],
	category:'',
	subCategories:[],
	subs:[],
	ship:["Yes", "No"],
	shipping:'',
	quantity:'',
	brands:[],
	colors:["Black", "Brown", "Silver", "White", "Blue"],
	color:[],
	sizes:['SM','M','L','XL','XXL'],
	size:[],
	brand:'',
	tags:'',
	tagList:[],
	showSubs: false
}

const NewProduct = ({history}) => {

	const [values, setValues] = useState(initialState);
	const [loading, setLoading] = useState(false);

	const {title, description, cost_price, mrp_price, categories, category, subCategories, subs, ship, quantity, images, colors, brands, color, brand, showSubs, size, shipping, sizes, tags, listTag} = values

	const dispatch = useDispatch()
	const { user }  = useSelector(user => user);

	const handleSubmit = (e) => {
		e.preventDefault();
		createProduct(user, values, user.token)
			.then((res) => {
				setLoading(false);
				dispatch({
					type : CREATE_PRODUCT,
					payload : res.data
				})
				setValues({...values,
					title:'',
					description:'',
					cost_price:'',
					mrp_price:'',
					images:[],
					ship:[],
					subCategories: [],
					colors: [],
					size: [],
					categories: [],
					brands: [],
					tags: '',
					quantity: ''
				})
				toast.success(`${title} inserted Successfully`);
				history.push('/admin/list-products');
			})
			.catch(err => {
				console.log(err)
				setLoading(false);
				toast.error(`${title} insert Failed`);
			})
	}

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const selectChange = (e, action) => {
		if(action.name === 'category') {
			getSubCategories(e.value)
				.then(res => {
					setValues({...values, subCategories: []})
					setValues({...values, subCategories: res.data, showSubs: true, [action.name] : e.value})
				})
		}
		setValues({...values, [action.name] : e.value})
	}

	return (
			<div className="container-fluid">
				<div className="row">
					<div className="sticky-sidebar">
						<AdminNav/>
					</div>
					<div className="adjustment">
						{loading ?
								<div className="text-center"> <Spin tip="Loading..." /> </div>
							:
								<div>
									<CreateProductForm
										values={values}
										handleSubmit={handleSubmit}
										handleChange={handleChange}
										selectChange={selectChange}
										setValues={setValues}
									/>
								</div>
						}
					</div>
				</div>
			</div>
	)
}

export default NewProduct;