const uuid = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require('mongoose')

const HttpError = require("../models/http-error");
const getCoordsFromAddress = require("../utils/location");
const Place = require('../models/Place');
const User = require('../models/User');
const { json } = require("body-parser");


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

const getPlaceById = async (req, res, next) => {
  const { id } = req.params;
  let place
  try {
    place = await Place.findById(id)
  } catch (err) {

    return next(new HttpError(`Something went wrong, could not find place ,${err} `, 500))
  }

  if (!place) return next(new HttpError('Could not find place by provided id.', 404))

  return res.json({ place: place.toObject({ getters: true }) })

};

const getPlacesByUserId = async (req, res, next) => {
  const { id } = req.params;
  let userPlaces
  try {
    userPlaces = await User.findById(id).populate('places')
  } catch (err) {
    return next(new HttpError('Fetching places failed, please try again later.',
      500))
  }
  if (!userPlaces || userPlacesplaces.length === 0) return next(new HttpError('Could not find places for provided id', 404))

  return res.json({ places: userPlaces.places.map(place => place.toObject({ getters: true })) })

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

  const createPlace = new Place({
    title,
    description,
    location: {
      ...coordinate,
    },
    address,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg', // => File Upload module, will be replaced with real image url
    creator,
  });

  let user
  try {
    user = await User.findById(creator)
  } catch (error) {
    return next(new HttpError('Creating place failed , please try again', 500))
  }

  if (!user) return next(new HttpError('Could not find user by provide id.', 404))
  console.log(user)

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createPlace.save()
    user.places.push(createPlace)
    await user.save({ session: sess })
    await sess.commitTransaction()

  } catch (error) {
    return next(new HttpError('Creating place failed, please try again', 500))
  }
  return res.status(201).json({ place, createPlace })
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

const deleltePlaceById = async (req, res, next) => {
  const { id } = req.params;

  let place = await Place.findById(id).populate('creator')

  if (!DUMMY_PLACES.find((p) => p.id === id)) throw new HttpError(`Could not find Place by this ID:${id}`, 404);

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== id);
  return res.status(200).json({ message: "Deleted Place" });
};




module.exports = { getPlaceById, getPlacesByUserId, deleltePlaceById, createPlace, updatePlaceById };
