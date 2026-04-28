const express = require("express");
const router = express.Router();
const { shortenUrl, redirectUrl } = require("../controller/urlController.js");

router.get("/", (req, res) => {
  res.json({ message: "URL Shortener API is running" });
});

router.post("/shorten", shortenUrl);
router.get("/:shortCode", redirectUrl);

module.exports = router;
