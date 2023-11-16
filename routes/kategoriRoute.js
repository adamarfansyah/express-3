const express = require("express");
const {
  getAllKategori,
  getKategoriById,
  createKategori,
} = require("../controllers/KategoriController");
const router = express.Router();

router.get("/", getAllKategori);
router.get("/:id", getKategoriById);
router.post("/", createKategori);

module.exports = router;
