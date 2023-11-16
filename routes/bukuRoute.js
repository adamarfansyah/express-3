const express = require("express");
const router = express.Router();
const {
  getAllBuku,
  getBukuById,
  createBuku,
  updateBukuById,
} = require("../controllers/BukuController");

router.get("/", getAllBuku);
router.get("/:id", getBukuById);
router.post("/", createBuku);
router.put("/:id", updateBukuById);

module.exports = router;
