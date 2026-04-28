const urlService = require("../services/urlService");

const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: "Long URL is required" });

    const shortUrl = await urlService.createShortUrl(longUrl);
    res.json({ shortUrl });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const urlEntry = await urlService.getOriginalUrl(shortCode);

    if (!urlEntry) return res.status(404).json({ error: "Short URL not found" });

    res.json({ originalUrl: urlEntry.originalUrl });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { shortenUrl, redirectUrl };
