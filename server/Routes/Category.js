const express = require("express");

const router = express.Router();

// middleware
const { authCheck, adminCheck } = require("../Middlewares/Auth");

// controller
const { list, create, read, update, remove, getSubs } = require("../Controllers/Category");

router.get("/categories", list);
router.post("/category", authCheck, adminCheck, create);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subs/:_id", getSubs);

module.exports = router;