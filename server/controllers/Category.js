const Category = require("../models/Category");
const slugify = require('slugify')

exports.list = async (req, res) => {
      const listCategory = await Category.find({})
                                         .sort({createdAt: -1})
                                         .exec()
      res.json(listCategory);
}

exports.create = async (req, res) => {
      try {
            const { name } = req.body;
            const category = await new Category({name, slug: slugify(name) }).save();
            res.json(category);
      }
      catch (err) {
            console.log(err)
            res.status(400).send("Create Category Failed")
      }
}

exports.read = async (req, res) => {
      const singleCategory = await Category.findOne({ slug: req.params.slug })
                                           .exec()
      res.json(singleCategory);
}

exports.update = async (req, res) => {
      try {
            const { name } = req.body;
            const updated = await Category.findOneAndUpdate(
                  { slug: req.params.slug },
                  { name, slug : slugify(name) },
                  { new : true }
            )
            res.json(updated)
      }
      catch (err) {
            res.status(400).send("Category Updated Failed")
      }
}

exports.remove = async (req, res) => {
      try {
            const deleted = await Category.findOneAndDelete(
                  { slug: req.params.slug }
            )
            res.json(deleted)
      }
      catch (err) {
            res.status(400).send("Category Deleted Failed")
      }
}