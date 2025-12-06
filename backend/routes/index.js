const { Router } = require("express");
const userRouter = require("./users-router");
const placeRouter = require("./places-router");

const router = Router();

router.use("/user", userRouter);
router.use("/places", placeRouter);


module.exports = router;
