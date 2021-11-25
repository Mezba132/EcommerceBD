const User = require("../Models/User");
const jwt = require('jsonwebtoken');

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
    User.findOne({email}, (err, user) => {
      if(err || !user) {
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

    })
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
  User.findOne({ email : req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(401).json({
        error : 'Email not found'
      })
    }
    else {
      res.json(user);
    }
  });
};
