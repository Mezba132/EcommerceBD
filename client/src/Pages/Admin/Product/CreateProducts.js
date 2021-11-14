import React, {useEffect, useState } from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {getCategories, getSubCategories} from "../../../Functions/Categoy";
import {createProduct} from "../../../Functions/Product";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import MultiProductForm from "../../../Components/Shared/Form/MultiProductsForm";

const CreateProducts = () => {

	const [values, setValues] = useState([]);
	const [showSubs, setShowSubs] = useState(false)
	const [multiple, setMultiple] = useState(true);

	const { user }  = useSelector(user => user);


	const loadValues = () => {
		getCategories()
				.then((res) => {
					setValues([...values,
						{
							title:'',
							description:'',
							cost_price:'',
							mrp_price:'',
							quantity:'',
							categories : res.data,
							colors:["Black", "Brown", "Silver", "White", "Blue"],
							brands:["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
							ship:["Yes","No"],
							subCategories: [],
							shipping:'',
							subs: [],
							color:'',
							brand:'',
							images:[],
							category:'',
						}])
				})
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
		let data = [...values];
		data[index][e.name] = e.value;
		setValues(data);
		if(e.name === 'category') {
			getSubCategories(e.value)
					.then(res => {
						data[index]['subCategories'] = res.data;
						setValues(data);
						setShowSubs(true)
					})
		}
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
					<div className="col-md-2">
						<div className="col-md-6 bg-dark h-100" id="sticky-sidebar">
							<AdminNav/>
						</div>
					</div>
					<div className="col-md-10 content">
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