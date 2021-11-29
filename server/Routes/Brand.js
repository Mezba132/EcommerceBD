const express = require("express");

const router = express.Router();

// middleware
const { requireSignIn, isAuth, isAdmin } = require("../Middlewares/Auth");

// controller
const { list, create, read, update, remove } = require("../Controllers/Brand");

router.get("/brands", list);
router.post("/brand", requireSignIn, isAuth, isAdmin, create);
router.get("/brand/:slug", read);
router.put("/brand/:slug", requireSignIn, isAuth, isAdmin, update);
router.delete("/brand/:slug", requireSignIn, isAuth, isAdmin, remove);

module.exports = router;