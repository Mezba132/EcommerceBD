const Product = require("../Models/Product");
const slugify = require('slugify')

exports.create = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.title);
		const product = await new Product( req.body ).save();
		res.json( product );
	}
	catch (err) {
		console.log(err)
		res.status(400).send("Create Product Failed")
	}
}