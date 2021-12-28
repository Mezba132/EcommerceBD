import axios from "axios";

export const getBrands = async () =>
		await axios.get(`${process.env.REACT_APP_API}/brands`)

export const createBrand = async (user ,brand, token) =>
		await axios.post(`${process.env.REACT_APP_API}/brand`, {user, brand},
				{
					headers : {
						Accept : 'application/json',
						'Content-Type' : 'application/json',
						Authorization: `Bearer ${token}`
					}
				})

export const removeBrand = async (user, slug, token) =>
		await axios.delete(`${process.env.REACT_APP_API}/brand/${slug}`,
				{
					headers : {
						Accept : 'application/json',
						'Content-Type' : 'application/json',
						Authorization: `Bearer ${token}`
					},
					data: {
						user
					}
				})

export const getBrand = async (slug) =>
		await axios.get(`${process.env.REACT_APP_API}/brand/${slug}`)

export const updateBrand = async (user, slug, brand, token) =>
		await axios.put(`${process.env.REACT_APP_API}/brand/${slug}`, {user, brand},
				{
					headers : {
						Accept : 'application/json',
						'Content-Type' : 'application/json',
						Authorization: `Bearer ${token}`
					}
				})