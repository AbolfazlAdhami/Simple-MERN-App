const axios = require("axios");
const HttpError = require("../models/http-error");
const api_key = process.env.GEOCODING_API_KEY;

const getCoordsFromAddress = async (address = "20 W 34th St., New York, NY 10001, USA") => {
  if (!api_key) throw new HttpError("Could not Found Api KEy for Coords Data", 404);

  const { data, status } = await axios.get(`https://geocode.maps.co/search?q=${address}&api_key=${api_key}`);
  console.log(data, status);
};

module.exports = getCoordsFromAddress;