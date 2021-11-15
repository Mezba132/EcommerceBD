const express = require("express");

const router = express.Router();

// middleware
const { authCheck, adminCheck } = require("../Middlewares/Auth");

// controller
const { list, create, read, update, remove, getSubs } = require("../Controllers/Brand");

router.get("/brands", list);
router.post("/brand", authCheck, adminCheck, create);
router.get("/brand/:slug", read);
router.put("/brand/:slug", authCheck, adminCheck, update);
router.delete("/brand/:slug", authCheck, adminCheck, remove);
// router.get("/brand/subs/:_id", getSubs);

module.exports = router;