const express = require("express");
const router = express.Router();
// middleware
const { requireSignIn, isAuth, isAdmin } = require("../Middlewares/Auth");
const { userSignInValidation , userSignUpValidation, validationResult, passwordDecrypt } = require("../Validator")

// controller
const { userSignUp, userSignIn, currentUser, userSignOut, resetPassword, newPassword } = require("../Controllers/Auth");

router.post("/register", passwordDecrypt, userSignUpValidation, validationResult, userSignUp );
router.post("/login", passwordDecrypt, userSignInValidation, validationResult, userSignIn );
router.post("/logout", userSignOut );
router.post("/current-user", requireSignIn, isAuth, currentUser);
router.post("/current-admin", requireSignIn, isAuth, isAdmin, currentUser);
router.post("/reset-password", resetPassword );
router.post("/new-password", newPassword );



module.exports = router;
