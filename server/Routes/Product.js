const express = require("express");

const router = express.Router();

// middleware
const { authCheck, adminCheck } = require("../Middlewares/Auth");

// controller
const { list, create, read, update, remove } = require("../Controllers/Product");


router.post("/product", authCheck, adminCheck, create);


module.exports = router;