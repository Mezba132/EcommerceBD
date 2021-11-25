const expressJWT = require('express-jwt') // for authorization check

exports.requireSignIn = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
})

exports.isAuth = (req, res, next) => {
  let user = req.body && req.auth && req.body._id === req.auth._id;
  if(!user) {
    return res.status(403).json({
      error : "Access denied"
    })
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if(req.body.role !== "admin"){
    return res.status(403).json({
      error : "Admin resource! Access Denied"
    })
  }
  next();
};