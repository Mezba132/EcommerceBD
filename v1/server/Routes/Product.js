const express = require("express");

const router = express.Router();

// middleware
const { requireSignIn, isAuth, isAdmin } = require("../Middlewares/Auth");

// controller
const { listByFilters, create, read, update, remove, listByNewArrivals, listByBestSell } = require("../Controllers/Product");

router.post("/products/:count", listByFilters);
router.post("/product", requireSignIn, isAuth, isAdmin, create);
router.delete("/product/:slug", requireSignIn, isAuth, isAdmin, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", requireSignIn, isAuth, isAdmin, update);

router.get("/products/new-arrival", listByNewArrivals);
router.get("/products/best-sell", listByBestSell);

module.exports = router;