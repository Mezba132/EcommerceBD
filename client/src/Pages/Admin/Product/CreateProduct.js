import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {Spin} from "antd";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
		createProduct
	} from '../../../Functions/Product'
import {
		getCategories,
		getSubCategories
} from '../../../Functions/Categoy'
import { getBrands } from '../../../Functions/Brand'
import CreateProductForm from "../../../Components/Shared/Form/Admin/CreateProduct";

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

	const { user }  = useSelector(user => user);

	useEffect(() => {
		loadFields()
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault();
		createProduct(user, values, user.token)
			.then(() => {
				setLoading(false);
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

	const loadFields = () => {
		getCategories()
			.then((category) => {
				getBrands()
					.then((brand) => {
						setValues({...values, brands: brand.data, categories: category.data})
					})
			})

	};

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