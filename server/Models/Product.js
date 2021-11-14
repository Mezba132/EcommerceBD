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
		type : ObjectId,
		ref: "Category"
	},
	subs : [
		{
			type : ObjectId,
			ref : "SubCategory"
		},
	],
	quantity : {
		type : Number,
		trim: true,
		maxlength: 32
	},
	sold : {
		type : Number,
		trim : true,
		maxlength : 32,
		default: 0
	},
	images : {
		type : Array
	},
	shipping : {
		type : String,
		enum : ["Yes", "No"]
	},
	color : {
		type: String,
		enum: ["Black", "Brown", "Silver", "White", "Blue"]
	},
	brand: {
		type: String,
		enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
	},
	// ratings: [
	//   {
	//     star: Number,
	//     postedBy: { type: ObjectId, ref: "User" },
	//   },
	// ],
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema);