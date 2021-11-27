const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4} = require('uuid');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
      name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
      },
      mobile: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique : true
      },
      email: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique : true
      },
      hash_password: {
            type: String,
            required: true
      },
      salt: String,
      role: {
            type: String,
            default: 'subscriber'
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
      resetToken: String,
      expireToken: String,
      // wishlist: [{
      //       type: ObjectId,
      //       ref: 'product'
      // }]
},{
      timestamps: true
})



userSchema
        .virtual('password')
        .set(function (password) {
              this._password = password;
              this.salt = uuidv4();
              this.hash_password = this.encryptPassword(password);
        })
        .get(function () {
              return this._password;
        })

userSchema.methods = {
      authenticate : function(plainText) {
            return this.encryptPassword(plainText) === this.hash_password;
      },
      encryptPassword: function (password) {
            if (!password) return '';
            try {
                  return crypto
                          .createHmac('sha1', this.salt)
                          .update(password)
                          .digest('hex')
            }
            catch (err) {
                  return '';
            }
      }
}
module.exports = mongoose.model('User', userSchema)