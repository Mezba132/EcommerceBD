const express = require("express");

const router = express.Router();

// middleware
const { authCheck, adminCheck } = require("../Middlewares/Auth");

// controller
const { list, create, read, update, remove } = require("../Controllers/Product");

router.get("/products/:count", list);
router.post("/product", authCheck, adminCheck, create);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

module.exports = router;