const express = require("express");
const {
  getAllKategori,
  getKategoriById,
  createKategori,
  updateKategoriById,
  deleteKategori,
} = require("../controllers/KategoriController");
const router = express.Router();

router.get("/", getAllKategori);
router.get("/:id", getKategoriById);
router.post("/", createKategori);
router.put("/:id", updateKategoriById);
router.delete("/:id", deleteKategori);

module.exports = router;
