const { check, validationResult } = require('express-validator');
const CryptoJS = require('crypto-js')

exports.passwordDecrypt = (req, res, next) => {

	let hashPassword = CryptoJS.AES.decrypt(req.body.password, process.env.CRYPTOJS_SECRETKEY);
	let textPassword = hashPassword.toString(CryptoJS.enc.Utf8);
	req.body.password = textPassword;
	next();

}

exports.userSignUpValidation = [
	check("name", "Name is required")
			.notEmpty()
			.exists()
			.isLength({
				min: 2,
				max: 50,
			})
			.withMessage('Name must be between 2 to 32 characters'),
	check("email", "Name is required")
			.exists()
			.notEmpty()
			.isEmail()
			.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/)
			.withMessage("Valid Email is required")
			.isLength({
				min:4,
				max:32
			}),

	check('mobile', 'Phone No is Required').notEmpty(),
	check('mobile', "Phone number must be in 11 digit").isNumeric(),
	check('mobile',"Phone number is not Valid")
			.matches(/^(?:\+88|88)?(01[3-9]\d{8})$/)
			.isLength({
				min:11
			}),


	check("password", "Password is required").notEmpty(),
	check("password")
			.matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/)
			.withMessage("Password length must be 8 and at least need one character and one number")
			.isLength({
				min:4,
				max:50
			})
]

exports.userSignInValidation = [
	check("email", "Name is required").notEmpty(),
	check("email")
			.isEmail()
			.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/)
			.withMessage("Valid Email is required")
			.isLength({
				min:4,
				max:32
			}),
	check("password", "Password is required").notEmpty(),
	check("password")
			.matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/)
			.withMessage("Password length must be 4 and at least need one character and one number")
			.isLength({
				min:4,
				max:50
			})
]

exports.validationResult = (req, res, next) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let err = errors.array().map( e => e.msg)
		return res.status(400).json({ error : err.toString() });
	}
	else {
		next();
	}

}