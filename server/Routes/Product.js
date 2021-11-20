const express = require("express");

const router = express.Router();

// middleware
const { authCheck, adminCheck } = require("../Middlewares/Auth");

// controller
const { listByFilters, create, read, update, remove } = require("../Controllers/Product");

router.post("/products/:count", listByFilters);
router.post("/product", authCheck, adminCheck, create);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

module.exports = router;