const Product = require("../Models/Product");
const slugify = require('slugify')

exports.create = async (req, res) => {
	try {
		let singleProduct = req.body.product;
		if(singleProduct.shipping === "") singleProduct.shipping = "No"
		singleProduct.slug = slugify(singleProduct.title);
		singleProduct.tagList = singleProduct.tags.toLowerCase().split(',');
		const product = await new Product( singleProduct ).save();
		res.json( product );
	}
	catch (err) {
		console.log(err)
		res.status(400).send("Create Product Failed")
	}
}

exports.listByFilters = async (req, res) => {
	let findArgs = {};
	for (let key in req.body.filters) {
		if(req.body.filters[key].length > 0) {
			findArgs[key] = req.body.filters[key]
		}
		else {
			console.log("Rest of the filter still unselected")
		}
	}
	const listProduct = await Product.find(findArgs)
			.limit(parseInt(req.params.count))
			.populate('category')
			.populate('subs')
			.populate('brand')
			.sort([["createdAt", "desc"]])
			.exec()
	res.json(listProduct);
}

exports.listByNewArrivals = async (req, res) => {
	let currentDate = new Date();
	let prev7Date = currentDate.setDate(currentDate.getDate()-7);

	const newProduct = await Product.find({"createdAt": { $gt: prev7Date }})
		.sort([["createdAt", "desc"]])
		.exec()
	res.json(newProduct);
}

exports.listByBestSell = async (req, res) => {

	const newProduct = await Product.find({"sold": { $gt: 10 }})
		.sort([["createdAt", "desc"]])
		.exec()
	res.json(newProduct);
}

exports.remove = async (req, res) => {
	try {
		const deleted = await Product.findOneAndDelete(
				{ slug: req.params.slug }
		)
		res.json(deleted)
	}
	catch (err) {
		res.status(400).send("Product Deleted Failed")
	}
}

exports.read = async (req, res) => {
	const single = await Product.findOne({ slug: req.params.slug })
			.populate('category')
			.populate('subs')
			.populate('brand')
			.exec()
	res.json(single);
}

exports.update = async (req, res) => {
	try {

		let updateProduct = req.body.product;
		if(updateProduct.title) updateProduct.slug = slugify(updateProduct.title);
		if(updateProduct.tags) updateProduct.tagList = updateProduct.tags.toLowerCase().split(',');
		if(updateProduct.shipping === "") updateProduct.shipping = "No"

		const updated = await Product.findOneAndUpdate(
				{ slug: req.params.slug },
				updateProduct ,
				{ new : true }
		)
		res.json(updated)
	}
	catch (err) {
		res.status(400).send("Product Updated Failed")
	}
}