const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const SocialUserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		maxlength: 32
	},
	email: {
		type: String,
		trim: true,
		required: true,
		maxlength: 32,
		unique : true
	},
	picture : '',
	role: {
		type: String,
		default: 'subscriber'
	},
	email_verified : {
		type : Boolean,
		default : false
	},
	about: {
		type: String,
		trim: true,
		default:""
	},
	history: {
		type:Array,
		default:[]
	},
	address : {
		type: String,
		trim: true,
		default: ""
	},
	cart: {
		type: Array,
		default: []
	},
	// wishlist: [{
	//       type: ObjectId,
	//       ref: 'product'
	// }]
},{
	timestamps: true
})

module.exports = mongoose.model('SocialUser', SocialUserSchema)