import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {Layout, Spin} from "antd";
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
const { Content } = Layout
import HeaderAdmin from "../../../Components/Layout/Admin/Header";
import SideBar from "../../../Components/Layout/Admin/Sidebar";
import FooterAdmin from "../../../Components/Layout/Admin/Footer";

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
			<Layout>
				<HeaderAdmin/>
				<SideBar/>
				<Layout className='content-layout'>
					<Content className="site-layout-background content">
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
					</Content>
					<FooterAdmin/>
				</Layout>
			</Layout>
	)
}

export default NewProduct;