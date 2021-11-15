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