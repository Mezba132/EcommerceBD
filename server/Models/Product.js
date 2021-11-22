const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
	title : {
		type : String,
		trim : true,
		required: true,
		maxlength: 32,
		text: true
	},
	slug : {
		type: String,
		unique: true,
		lowercase: true,
		index: true
	},
	description : {
		type : String,
		required: true,
		maxlength: 500,
		text: true
	},
	cost_price : {
		type: Number,
		required: true,
		trim: true,
		maxlength: 32
	},
	mrp_price : {
		type: Number,
		required: true,
		trim: true,
		maxlength: 32
	},
	category : {
		required: true,
		type : ObjectId,
		ref: "Category"
	},
	subs : [
		{
			required: true,
			type : ObjectId,
			ref : "SubCategory"
		},
	],
	quantity : {
		required: true,
		type : Number,
		trim: true,
		maxlength: 32
	},
	sold : {
		required: true,
		type : Number,
		trim : true,
		maxlength : 32,
		default: 0
	},
	images : {
		required: true,
		type : Array
	},
	shipping : {
		type : String,
		enum : ["Yes", "No"],
		default: "No"
	},
	color : {
		type : Array
	},
	size : {
		type : Array
	},
	tagList : {
		required: true,
		type : Array
	},
	brand: {
		required: true,
		type : ObjectId,
		ref: "Brand"
	},
	stock: {
		type: String,
		enum: ["In Stock","Stock Out"],
		default: "In Stock"
	}
	// ratings: [
	//   {
	//     star: Number,
	//     postedBy: { type: ObjectId, ref: "User" },
	//   },
	// ],
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema);