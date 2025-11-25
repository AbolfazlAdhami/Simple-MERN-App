const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const getCoordsFromAddress = require("../utils/location");
const Place = require("../models/Place");
const User = require("../models/User");

const getPlaceById = async (req, res, next) => {
  const { id } = req.params;
  let place;
  try {
    place = await Place.findById(id);
  } catch (err) {
    return next(new HttpError(`Something went wrong, could not find place ,${err} `, 500));
  }

  if (!place) return next(new HttpError("Could not find place by provided id.", 404));

  return res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const { id } = req.params;
  let userPlaces;
  try {
    userPlaces = await User.findById(id).populate("places");
  } catch (err) {
    return next(new HttpError("Fetching places failed, please try again later.", 500));
  }
  if (!userPlaces || userPlaces.places.length === 0) return next(new HttpError("Could not find places for provided id", 404));

  return res.json({
    places: userPlaces.places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return next(new HttpError("Invalid inputes passed,please check your data.", 422));

  const { title, description, address } = req.body;
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
    image: req.file.path,
    creator: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (error) {
    return next(new HttpError("Creating place failed , please try again", 500));
  }

  if (!user) return next(new HttpError("Could not find user by provide id.", 404));
  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createPlace.save({ session: sess });
    user.places.push(createPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Creating place failed, please try again", 500));
  }
  return res.status(201).json({ place: createPlace });
};

const updatePlaceById = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return next(new HttpError("Something went wrong, could not update place.", 422));

  const { id } = req.params;
  const { title, description } = req.body;

  let place;
  try {
    place = await Place.findById(id);
  } catch (error) {
    return next(new HttpError("Could not find place bu provided id", 500));
  }

  if (place.creator.toString() !== req.userData.userId) return next(new HttpError("You are not allowed to edit this place.", 401));

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    return next(new HttpError("Could not find place by provided id", 500));
  }

  return res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlaceById = async (req, res, next) => {
  const { id } = req.params;
  try {
    let place = await Place.findById(id).populate("creator");
    if (!place) return next(new HttpError("Could not find place by provided id,", 404));

    if (place.creator.id !== req.userData.userId) return next(new HttpError("You are not allowed to delete this place.", 401));

    const imagePath = place.image;

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await place.remove({ session: sess });
      place.creator.places.pull(place);
      await place.creator.save({ session: sess });
      await sess.commitTransaction();
    } catch (error) {
      return next(new HttpError("Something went wrong, could not delete place.", 500));
    }
  } catch (error) {
    return next(new HttpError("Something went wrong, could not delete place.", 500));
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  return res.status(200).json({ message: "Deleted place." });
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  deletePlaceById,
  createPlace,
  updatePlaceById,
};
