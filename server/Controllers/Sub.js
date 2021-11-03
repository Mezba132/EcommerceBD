const SubCat = require("../Models/Sub");
const slugify = require('slugify')

exports.list = async (req, res) => {
	const subCat = await SubCat.find({})
			.sort({createdAt: -1})
			.exec()
	res.json(subCat);
}

exports.create = async (req, res) => {
	try {
		let { name, parent, cname } = req.body;
		const subCat = await new SubCat({ name, parent, cname, slug: slugify(name) }).save();
		res.json(subCat);
	}
	catch (err) {
		res.status(400).send("Create SubCategory Failed")
	}
}

exports.read = async (req, res) => {
	const subCat = await SubCat.findOne({ slug: req.params.slug })
			.exec()
	res.json(subCat);
}

exports.update = async (req, res) => {
	try {
		const { name , parent, cname } = req.body;

		const updated = await SubCat.findOneAndUpdate(
				{ slug: req.params.slug },
				{ name, parent, cname, slug : slugify(name) },
				{ new : true }
		)
		res.json(updated)
	}
	catch (err) {
		res.status(400).send("SubCategory Updated Failed")
	}
}

exports.remove = async (req, res) => {
	try {
		const deleted = await SubCat.findOneAndDelete(
				{ slug: req.params.slug }
		)
		res.json(deleted)
	}
	catch (err) {
		res.status(400).send("SubCategory Deleted Failed")
	}
}