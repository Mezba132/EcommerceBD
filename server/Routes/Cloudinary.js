const express = require("express");

const router = express.Router();

// middleware
const { authCheck, adminCheck } = require("../Middlewares/Auth");

// controller
const { upload, remove } = require("../Controllers/Cloudinary");

router.post("/upload-images", authCheck, adminCheck, upload);
router.post("/remove-image", authCheck, adminCheck, remove);


module.exports = router;