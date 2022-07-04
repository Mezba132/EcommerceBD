import axios from "axios"

export const getNewProducts = async () =>
		await axios.get(`${process.env.REACT_APP_API}/products/new-arrival`)

export const getBestProducts = async () =>
		await axios.get(`${process.env.REACT_APP_API}/products/best-sell`)