const express = require("express");
const validation = require("../utils/validation");
const { getPlaceById, getPlacesByUserId, deleltePlaceById, createPlace, updatePlaceById } = require("../controller/place-controller");



const router = express.Router();

router.get("/:id", getPlaceById);

router.get("/user/:id", getPlacesByUserId);

router.use();

router.post("/", validation.postPlace, createPlace);

router.patch("/:id", validation.pathPlace, updatePlaceById);

router.delete("/:id", deleltePlaceById);


module.exports = router;
