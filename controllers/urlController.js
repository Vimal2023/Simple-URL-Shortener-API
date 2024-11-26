const Url = require("../models/Url");
const generateShortId = require("../utils/generateShortId");

exports.shortenUrl = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: "URL is required" });

    const shortId = generateShortId();

    const newUrl = await Url.create({ originalUrl, shortId });
    res.status(201).json({ originalUrl, shortUrl: `${req.headers.host}/${shortId}` });
  } catch (error) {
    next(error);
  }
};

exports.redirectUrl = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clicks: 1 }, lastAccessed: new Date() },
      { new: true }
    );
    if (!url) return res.status(404).json({ error: "Short URL not found" });

    res.redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ error: "Short URL not found" });

    res.status(200).json({
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      lastAccessed: url.lastAccessed,
    });
  } catch (error) {
    next(error);
  }
};
