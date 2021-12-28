const express = require("express");

const router = express.Router();

// middleware
const { requireSignIn, isAuth, isAdmin } = require("../Middlewares/Auth");

// controller
const { listByFilters, create, read, update, remove } = require("../Controllers/Product");

router.post("/products/:count", listByFilters);
router.post("/product", requireSignIn, isAuth, isAdmin, create);
router.delete("/product/:slug", requireSignIn, isAuth, isAdmin, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", requireSignIn, isAuth, isAdmin, update);

module.exports = router;