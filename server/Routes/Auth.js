const express = require("express");
const router = express.Router();
// middleware
const { requireSignIn, isAuth, isAdmin } = require("../Middlewares/Auth");
const { userSignInValidation , userSignUpValidation, validationResult, passwordDecrypt } = require("../Validator")

// controller
const { userSignUp, userSignIn, currentUser, userSignOut } = require("../Controllers/Auth");

router.post("/register", passwordDecrypt, userSignUpValidation, validationResult, userSignUp );
router.post("/login", passwordDecrypt, userSignInValidation, validationResult, userSignIn );
router.post("/logout", userSignOut );
router.post("/current-user", requireSignIn, isAuth, currentUser);
router.post("/current-admin", requireSignIn, isAuth, isAdmin, currentUser);

module.exports = router;
