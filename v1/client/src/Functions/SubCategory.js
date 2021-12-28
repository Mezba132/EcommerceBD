import axios from "axios";

export const getSubCategories = async () =>
		await axios.get(`${process.env.REACT_APP_API}/subs`)

export const createSubCategory = async (user ,sub, token) =>
		await axios.post(`${process.env.REACT_APP_API}/sub`, {user, sub},
				{
					headers : {
						Accept : 'application/json',
						'Content-Type' : 'application/json',
						Authorization: `Bearer ${token}`
					}
				})

export const getSubCategory = async (slug) =>
		await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)

export const updateSubCategory = async (user, slug, sub, token) =>
		await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, {user, sub},
				{
					headers : {
						Accept : 'application/json',
						'Content-Type' : 'application/json',
						Authorization: `Bearer ${token}`
					}
				})

export const removeSubCategory = async (user, slug, token) =>
		await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`,
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