const express = require("express");
const validation = require("../utils/validation");
const { getPlaceById, getPlacesByUserId, deleltePlaceById, createPlace, updatePlaceById } = require("../controller/place-controller");
const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/file-uploader");



const router = express.Router();

router.get("/:id", getPlaceById);

router.get("/user/:id", getPlacesByUserId);

router.use(checkAuth);

router.post("/", fileUpload.single("image"), validation.postPlace, createPlace);

router.patch("/:id", validation.pathPlace, updatePlaceById);

router.delete("/:id", deleltePlaceById);

module.exports = router;
