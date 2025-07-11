const axios = require("axios");
const HttpError = require("../models/http-error");
const api_key = process.env.GEOCODING_API_KEY;

const getCoordsFromAddress = async (address = "20 W 34th St., New York, NY 10001, USA") => {
  const options = {
    method: "GET",
    url: "https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi",
    params: {
      address,
    },
    headers: {
      "x-rapidapi-key": api_key,
      "x-rapidapi-host": "address-from-to-latitude-longitude.p.rapidapi.com",
    },
  };

  if (!api_key) throw new HttpError("Could not Found Api KEy for Coords Data", 404);

  const { data, status } = await axios.request(options);
  console.log(data, status);
  return data;
};

module.exports = getCoordsFromAddress;
