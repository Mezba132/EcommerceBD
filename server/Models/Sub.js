const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subCatSchema = new mongoose.Schema({
	name : {
		type: String,
		trim: true,
		required: "Name is required",
		minLength: [2, "Too short"],
		maxLength: [32, "Too Long"]
	},
	slug : {
		type: String,
		unique: true,
		lowercase: true,
		index: true
	},
	parent : {
		type : ObjectId,
		ref : 'Category',
		required : true
	},
	cname : {
		type: String,
		trim: true,
		required: "Name is required",
		minLength: [2, "Too short"],
		maxLength: [32, "Too Long"]
	}
},{
	timestamps: true
})

module.exports = mongoose.model('SubCategory', subCatSchema)