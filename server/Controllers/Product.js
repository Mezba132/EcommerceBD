const Product = require("../Models/Product");
const slugify = require('slugify')

exports.create = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.title);
		req.body.tagList = req.body.tags.toLowerCase().split(',');
		const product = await new Product( req.body ).save();
		res.json( product );
	}
	catch (err) {
		console.log(err)
		res.status(400).send("Create Product Failed")
	}
}

exports.list = async (req, res) => {
	const listProduct = await Product.find({})
			.limit(parseInt(req.params.count))
			.populate('category')
			.populate('subs')
			.populate('brand')
			.sort([["createdAt", "desc"]])
			.exec()
	res.json(listProduct);
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
		if(req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		if(req.body.tags) {
			req.body.tagList = req.body.tags.toLowerCase().split(',');
		}
		const updated = await Product.findOneAndUpdate(
				{ slug: req.params.slug },
				 req.body ,
				{ new : true }
		)
		res.json(updated)
	}
	catch (err) {
		res.status(400).send("Product Updated Failed")
	}
}