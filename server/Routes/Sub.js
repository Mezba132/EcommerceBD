const express = require("express");

const router = express.Router();

// middleware
const { requireSignIn, isAuth, isAdmin } = require("../Middlewares/Auth");

// controller
const { list, create, read, update, remove } = require("../Controllers/Sub");

router.get("/subs", list);
router.post("/sub", requireSignIn, isAuth, isAdmin, create);
router.get("/sub/:slug", read);
router.put("/sub/:slug", requireSignIn, isAuth, isAdmin, update);
router.delete("/sub/:slug", requireSignIn, isAuth, isAdmin, remove);

module.exports = router;