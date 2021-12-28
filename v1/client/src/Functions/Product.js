import axios from "axios";

export const createProduct = async (user ,product, token) =>
		await axios.post(`${process.env.REACT_APP_API}/product`, {user, product},
			{
				headers : {
					Accept : 'application/json',
					'Content-Type' : 'application/json',
					Authorization: `Bearer ${token}`
				}
			})

export const getProductsByFilters = async (filters = {}) =>
		await axios.post(`${process.env.REACT_APP_API}/products/50`, {filters})

export const removeProduct = async (user, slug, token) =>
		await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`,
				{
					headers : {
						Accept : 'application/json',
						'Content-Type' : 'application/json',
						Authorization: `Bearer ${token}`
					},
					data : {
						user
					}
				})

export const getProduct = async (slug) =>
		await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)

export const updateProduct= async (user, slug, product, token) =>
		await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, {user, product},
				{
					headers : {
						Accept : 'application/json',
						'Content-Type' : 'application/json',
						Authorization: `Bearer ${token}`
					}
				})