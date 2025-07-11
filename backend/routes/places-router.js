const express = require("express");
const { check, validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const getCoordsFromAddress = require("../utils/location");
const uuid = require("uuid");

const router = express.Router();

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "The Empire State Building is a 102-story, Art Deco-style supertall skyscraper in the Midtown South neighborhood of Manhattan, New York City, United States. ",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St., New York, NY 10001, USA",
    creator: "u1",
  },
];

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const place = DUMMY_PLACES.find((place) => place.id == id);
  if (!place) throw new HttpError(`Could not find place by this id: ${id} `, 404);

  return res.json({ place });
});

router.get("/user/:id", (req, res, next) => {
  const { id } = req.params;

  const places = DUMMY_PLACES.filter((place) => place.creator === id);

  if (!places || places.length === 0) throw new HttpError(`User not upload place by this ${id}`, 404);

  return res.json({ places });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  if (!DUMMY_PLACES.find((p) => p.id === id)) throw new HttpError(`Could not find Place by this ID:${id}`, 404);

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== id);
  return res.status(200).json({ message: "Deleted Place" });
});

router.post("/", [check("title").not().isEmpty(), check("description").isLength({ min: 5 }), check("address").not().isEmpty()], async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return next(new HttpError("Invalid inputes passed,please check your data.", 422));

  const { title, description, address, creator } = req.body;
  let coordinate;

  try {
    const geocodingData = await getCoordsFromAddress(address);
    console.log(geocodingData, "GeoData");
    coordinate = {
      lat: geocodingData.latitude,
      lng: geocodingData.longitude,
    };
  } catch (error) {
    return next(error);
  }

  const newPlace = {
    id: uuid.v4(),
    title,
    description,
    location: {
      ...coordinate,
    },
    address,
    creator,
  };

  DUMMY_PLACES.push(newPlace);
  return res.status(201).json({ data: DUMMY_PLACES });
});

router.patch("/:id", [check("title").not().isEmpty(), check("description").isLength({ min: 5 }), check("address").not().isEmpty()], (req, res, next) => {});

module.exports = router;
