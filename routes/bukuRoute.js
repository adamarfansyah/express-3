const express = require("express");
const router = express.Router();
const {
  getAllBuku,
  getBukuById,
  createBuku,
  updateBukuById,
  deleteBuku,
  updateBukuNameById,
  updateBukuAuthor,
  updateAddKategoriBuku,
  updateDeleteKategoriBuku,
} = require("../controllers/BukuController");

router.get("/", getAllBuku);
router.get("/:id", getBukuById);
router.post("/", createBuku);
router.put("/:id", updateBukuById);
router.put("/update-name/:id", updateBukuNameById);
router.put("/update-author/:id", updateBukuAuthor);
router.put("/update-addKategori/:id", updateAddKategoriBuku);
router.put("/update-deleteKategori/:id", updateDeleteKategoriBuku);
router.delete("/:id", deleteBuku);

module.exports = router;
