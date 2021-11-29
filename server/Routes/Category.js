const express = require("express");

const router = express.Router();

// middleware
const { requireSignIn, isAuth, isAdmin} = require("../Middlewares/Auth");

// controller
const { list, create, read, update, remove, getSubs } = require("../Controllers/Category");

router.get("/categories", list);
router.post("/category", requireSignIn, isAuth, isAdmin, create);
router.get("/category/:slug", read);
router.put("/category/:slug", requireSignIn, isAuth, isAdmin, update);
router.delete("/category/:slug", requireSignIn, isAuth, isAdmin, remove);
router.get("/category/subs/:_id", getSubs);

module.exports = router;