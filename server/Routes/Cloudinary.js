const express = require("express");

const router = express.Router();

// middleware
const { requireSignIn, isAuth, isAdmin } = require("../Middlewares/Auth");

// controller
const { upload, remove } = require("../Controllers/Cloudinary");

router.post("/upload-images", requireSignIn, isAuth, isAdmin, upload);
router.post("/remove-image", requireSignIn, isAuth, isAdmin, remove);


module.exports = router;