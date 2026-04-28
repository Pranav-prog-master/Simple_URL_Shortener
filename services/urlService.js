const shortid = require("shortid");
const Url = require("../model/Url");

const createShortUrl = async (longUrl) => {
  const shortCode = shortid.generate();
  const newUrl = new Url({ shortCode, originalUrl: longUrl });
  await newUrl.save();
  return `${process.env.BASE_URL}/${shortCode}`;
};

const getOriginalUrl = async (shortCode) => {
  return await Url.findOne({ shortCode });
};

module.exports = { createShortUrl, getOriginalUrl };
