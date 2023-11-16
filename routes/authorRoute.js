const express = require("express");
const {
  getAuthorAll,
  getAuthorById,
  createAuthor,
  updateAuthorById,
  deleteAuthor,
} = require("../controllers/AuthorController");
const router = express.Router();

router.get("/", getAuthorAll);
router.get("/:id", getAuthorById);
router.post("/", createAuthor);
router.put("/:id", updateAuthorById);
router.delete("/:id", deleteAuthor);

module.exports = router;
