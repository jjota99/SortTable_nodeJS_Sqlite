const express = require("express");
const GalleryController = require("./controllers/GalleryController");

const router = express.Router();

router.get("/", GalleryController.findAll);

module.exports = router;
