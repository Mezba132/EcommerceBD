const User = require("../Models/User");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const crypto = require('crypto')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.live.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USERNAME, // generated ethereal user
    pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
  },
});

exports.userSignUp = async (req, res) => {

    try {

      const { email, mobile } = req.body;

      User.findOne({email}, (err, existEmail) => {
        if(existEmail) {
          return res.status(400).json('Email Already Existed !!');
        }
        User.findOne({mobile}, (err, existPhone) => {
          if(existPhone) {
            return res.status(400).json('Phone Number Already Existed !!');
          }
          else {
              const user = new User(req.body);
              user.save((err,save) => {
                if(err) {
                  return res.status(400).json(err)
                }
                user.salt = undefined
                user.hash_password = undefined
                res.json({
                  user
                })
              })
          }
        })
      })

    }
    catch (err) {
      return res.status(400).json(err)
    }
}

exports.userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email} ).exec()
      if(!user) {
        return res.status(400).json({
          error : "Email and Password dont match"
        })
      }
      if(!user.authenticate(password)) {
        return res.status(401).json({
          error : 'Email and Password dont match'
        })
      }

      else {

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("CookieToken", token, { expire : new Date() + 9999 })
        const { _id, name, email, role, mobile } = user;
        return res.json({ token, user : { _id, email, name, role, mobile }})

      }

  }
  catch (err) {
    return res.status(400).json(err)
  }
}

exports.userSignOut = (req, res) => {
  res.clearCookie('CookieToken');
  res.json("SignOut Successfully Done")
}

exports.currentUser = async (req, res) => {
  const user = await User.findOne({ email : req.body.email }).exec();
    if (!user) {
      return res.status(401).json({error : 'Email not found'})
    }
    res.json(user);
};

exports.resetPassword = async (req, res) => {
    const buffer = await crypto.randomBytes(64);
    if(!buffer){
        console.log('Error detected')
    }
    const token = buffer.toString('hex');
    const user = await User.findOne({ email: req.body.email }).exec()
    if(!user) {
          return res.status(422).json({
            error : `User don't exist with this email ${req.body.email}`
          })
    }

    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: "Can't save in user"
            })
        }
        transporter.sendMail({
            to: user.email,
            from: process.env.NODEMAILER_USERNAME,
            subject: "Reset Password",
            html: `
                  <h1>Please Click the link Below</h1>
                  <p>Reset Password Link: <a href="http://localhost:3000/reset_password/${token}">Click Here</a></p>
            `
        })
        res.json({message: "Check Your Email"})
    })

}

exports.newPassword = async (req, res) => {
    const newPassword = req.body.password;
    const newToken = req.body.token;
    const user = await User.findOne({resetToken : newToken, expireToken : {$gt : Date.now()}} ).exec();
    if(!user) {
        return res.status(422).json({error : "Your Link is expired. Try again"})
    }
    user.password = newPassword;
    user.resetToken = undefined;
    user.expireToken = undefined;

    user.save((err, result) => {
        if(err) {
            return res.status(422).json({error : "Password reset failed.Try again"})
        }
        res.json({message : "password update successfully"})
    })
}