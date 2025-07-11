const express = require("express");
const validation = require("../utils/validation");
const { getPlaceById, getPlacesByUserId, deleltePlaceById, createPlace, updatePlaceById } = require("../controller/place-controller");

const router = express.Router();

router.get("/:id", getPlaceById);

router.get("/user/:id", getPlacesByUserId);

router.delete("/:id", deleltePlaceById);

router.post("/", validation.postPlace, createPlace);

router.patch("/:id", validation.pathPlace, updatePlaceById);

module.exports = router;
