const Brand = require('../Models/Brand');
const slugify = require('slugify');

exports.list = async (req, res) => {
	const lists = await Brand.find({})
			.sort({createdAt: -1})
			.exec()
	res.json(lists);
}

exports.create = async (req, res) => {
	try {
		let { name } = req.body.brand;
		const created = await new Brand({ name, slug: slugify(name) }).save();
		res.json(created);
	}
	catch (err) {
		console.log(err)
		res.status(400).send("Create Brand Failed")
	}
}

exports.remove = async (req, res) => {
	try {
		const deleted = await Brand.findOneAndDelete(
			{ slug: req.params.slug }
		)
		res.json(deleted)
	}
	catch (err) {
		res.status(400).send("Brand Deleted Failed")
	}
}

exports.read = async (req, res) => {
	const single = await Brand.findOne({ slug: req.params.slug })
			.exec()
	res.json(single);
}

exports.update = async (req, res) => {
	try {
		const { updateName } = req.body.brand;

		const updated = await Brand.findOneAndUpdate(
				{ slug: req.params.slug },
				{ name : updateName, slug : slugify(updateName) },
				{ new : true }
		)
		res.json(updated)
	}
	catch (err) {
		res.status(400).send("Brand Updated Failed")
	}
}