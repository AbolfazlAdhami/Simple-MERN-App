const uuid = require("uuid");
const { validationResult } = require("express-validator");
const getCoordsFromAddress = require("../utils/location");
const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  const { id } = req.params;
  const place = DUMMY_PLACES.find((place) => place.id == id);
  if (!place) throw new HttpError(`Could not find place by this id: ${id} `, 404);

  return res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const { id } = req.params;

  const places = DUMMY_PLACES.filter((place) => place.creator === id);

  if (!places || places.length === 0) throw new HttpError(`User not upload place by this ${id}`, 404);

  return res.json({ places });
};

const deleltePlaceById = (req, res, next) => {
  const { id } = req.params;

  if (!DUMMY_PLACES.find((p) => p.id === id)) throw new HttpError(`Could not find Place by this ID:${id}`, 404);

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== id);
  return res.status(200).json({ message: "Deleted Place" });
};

const createPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return next(new HttpError("Invalid inputes passed,please check your data.", 422));

  const { title, description, address, creator } = req.body;
  let coordinate;

  try {
    const geocodingData = await getCoordsFromAddress(address);

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
};

const updatePlaceById = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return next(new HttpError("Invalid inputes passed,please check your data.", 422));

  const { id } = req.params;
  const { title, description } = req.body;
  let updatePlace = { ...DUMMY_PLACES.find((place) => place.id === id) };
  if (!updatePlace) throw new HttpError(`User not upload place by this ${id}`, 404);
  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === id);

  updatePlace.title = title;
  updatePlace.description = description;

  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ data: updatePlace });
};

module.exports = { getPlaceById, getPlacesByUserId, deleltePlaceById, createPlace, updatePlaceById };
