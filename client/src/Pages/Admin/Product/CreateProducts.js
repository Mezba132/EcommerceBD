import React, {useEffect, useState } from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {getCategories, getSubCategories} from "../../../Functions/Categoy";
import {createProduct} from "../../../Functions/Product";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import MultiProductForm from "../../../Components/Shared/Form/Admin/MultiProducts";
import {getBrands} from "../../../Functions/Brand";

const CreateProducts = () => {

	const [values, setValues] = useState([]);
	const [showSubs, setShowSubs] = useState(false)
	const [multiple, setMultiple] = useState(true);

	const { user }  = useSelector(user => user);


	const loadValues = () => {
		getCategories().then(category => (
			getBrands()
				.then(brand => (
					setValues([...values,
						{
							title:'',
							description:'',
							cost_price:'',
							mrp_price:'',
							quantity:'',
							categories : category.data,
							category:'',
							subCategories: [],
							subs: [],
							colors:["Black", "Brown", "Silver", "White", "Blue"],
							color:[],
							brands:brand.data,
							brand:'',
							ship:["Yes","No"],
							shipping:'',
							sizes:['SM','M','L','XL','XXL'],
							size:[],
							tags:'',
							tagList:[],
							images:[],
						}])
				))
		))
	};

	useEffect(() => {
		loadValues();
	}, [])

	const handleAddMore = (e) => {
		e.preventDefault();
		loadValues();
	}

	const handleSubmit = () => {
		values.map(item => (
				// console.log(item)
			createProduct(item, user.idToken)
				.then(() => {
					toast.success(`${item.title} inserted Successfully`);
				})
				.catch(err => {
					console.log(err)
					toast.error(`${item.title} insert Failed`);
				})
		))
	}


	const handleChange = (index, e) => {
		let data = [...values];
		data[index][e.target.name] = e.target.value;
		setValues(data);
	}

	const selectChange = (index, e)  => {
		let data;
		if(e.name === 'category') {
			getSubCategories(e.value)
					.then(res => {
						data = [...values];
						data[index]['subCategories'] = [];
						setValues(data);
						setShowSubs(true);
						data = [...values];
						data[index]['subCategories'] = res.data;
						setValues(data);
					})
		}
		data = [...values];
		data[index][e.name] = e.value;
		setValues(data);
	}

	const handleRemove = (index) => {
		let data = [...values];
		if(data.length > 1) {
			data.splice(index, 1);
			setValues(data);
		}
	}


	return (
			<div className="container-fluid">
				<div className="row">
					<div className="sticky-sidebar">
							<AdminNav/>
					</div>
					<div className="adjustment">
						<div className="jumbotron">
							<h1 className="text-center">Add Multiple Products</h1>
							<MultiProductForm
								values={values}
								setValues={setValues}
								selectChange={selectChange}
								handleChange={handleChange}
								handleSubmit={handleSubmit}
								multiple={multiple}
								handleRemove={handleRemove}
								handleAddMore={handleAddMore}
								showSubs={showSubs}
							/>
						</div>

						<button
								className="btn-primary mb-5 p-3 float-right"
								onClick={handleSubmit}>Submit
						</button>
					</div>
				</div>
			</div>
	)
}

export default CreateProducts;