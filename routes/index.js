const express = require("express");

const bukuRoute = require("./bukuRoute");
const authorRoute = require("./authorRoute");
const kategoriRoute = require("./kategoriRoute");
const router = express.Router();

router.use("/buku", bukuRoute);
router.use("/author", authorRoute);
router.use("/kategori", kategoriRoute);

module.exports = router;
