const Joi = require("joi");
const { Buku, KategoriBuku, Author } = require("../models/");
const sendResponse = require("../helpers/responseHelpers.js");

// Mendapatkan semua buku
exports.getAllBuku = async (_, res) => {
  try {
    const buku = await Buku.findAll({
      include: [{ model: Author, as: "authorBook" }, { model: KategoriBuku }],
    });
    return res.status(200).send(sendResponse(200, "Success", null, buku));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.getBukuById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Buku.findByPk(id, {
      include: [{ model: Author, as: "authorBook" }, { model: KategoriBuku }],
    });

    if (!book) return res.status(404).send(sendResponse(404, "Buku Not Found", null, null));

    return res.status(200).send(sendResponse(200, "Success", null, book));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.createBuku = async (req, res) => {
  try {
    const { judulBuku, authorId, kategoriBukuId } = req.body;

    const author = await Author.findByPk(authorId);
    const kategoriBuku = await KategoriBuku.findByPk(kategoriBukuId);
    const isJudulExist = await Buku.findOne({ where: { judulBuku } });

    if (isJudulExist) {
      return res.status(400).send(sendResponse(400, "Buku Already Existed", null, null));
    }

    if (!author) {
      return res.status(404).send(sendResponse(404, "Author Not Found", null, null));
    }

    if (!kategoriBuku) {
      return res.status(404).send(sendResponse(404, "Kategori Buku Not Found", null, null));
    }

    const schema = Joi.object({
      judulBuku: Joi.string().min(3).required(),
      authorId: Joi.required(),
      kategoriBukuId: Joi.required(),
    });

    const newData = { judulBuku, authorId, kategoriBukuId };

    const { error } = schema.validate(newData);
    if (error) return res.status(400).send(sendResponse(400, error.details[0].message, null, null));

    const newBuku = await Buku.create(newData, {
      include: "authorBook",
    });

    await kategoriBuku.addBuku(newBuku);
    return res.status(201).send(sendResponse(201, "Success create Data", null, newBuku));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateBukuById = async (req, res) => {
  try {
    const { id } = req.params;
    const { judulBuku, authorId, kategoriBukuId } = req.body;

    const author = await Author.findByPk(authorId);
    const kategoriBuku = await KategoriBuku.findByPk(kategoriBukuId);
    const existingBook = await Buku.findByPk(id);

    if (!existingBook) {
      return res.status(404).send(sendResponse(404, "Book not found", null, null));
    }

    if (!author) {
      return res.status(404).send(sendResponse(404, "author Not Found", null, null));
    }

    if (!kategoriBuku) {
      return res.status(404).send(sendResponse(404, "Kategori Buku Not Found", null, null));
    }

    const schema = Joi.object({
      judulBuku: Joi.string().min(3).required(),
      authorId: Joi.required(),
      kategoriBukuId: Joi.required(),
    });

    const newData = { judulBuku, authorId, kategoriBukuId };

    const { error } = schema.validate(newData);
    if (error) return res.status(400).send(sendResponse(400, error.details[0].message, null, null));

    const newBuku = await existingBook.update(newData);
    await kategoriBuku.addBuku(newBuku);
    return res.status(200).send(sendResponse(200, "Success Update Data", null, newBuku));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateBukuNameById = async (req, res) => {
  try {
    const { id } = req.params;
    const { judulBuku } = req.body;

    const existingBook = await Buku.findByPk(id);

    if (!existingBook) {
      return res.status(404).send(sendResponse(404, "Book not found", null, null));
    }

    const schema = Joi.object({
      judulBuku: Joi.string().min(3).required(),
    });

    const newData = { judulBuku };

    const { error } = schema.validate(newData);
    if (error) return res.status(400).send(sendResponse(400, error.details[0].message, null, null));

    const newBuku = await existingBook.update(newData);
    return res.status(200).send(sendResponse(200, "Success Update Data", null, newBuku));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};
exports.updateBukuAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId } = req.body;

    const existingBook = await Buku.findByPk(id);
    const author = await Author.findByPk(authorId);

    if (!existingBook) {
      return res.status(404).send(sendResponse(404, "Book not found", null, null));
    }
    if (!author) {
      return res.status(404).send(sendResponse(404, "Author not found", null, null));
    }

    const schema = Joi.object({
      authorId: Joi.required(),
    });

    const newData = { authorId };

    const { error } = schema.validate(newData);
    if (error) return res.status(400).send(sendResponse(400, error.details[0].message, null, null));

    const newBuku = await existingBook.update(newData);
    return res.status(200).send(sendResponse(200, "Success Update Data", null, newBuku));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateAddKategoriBuku = async (req, res) => {
  try {
    const { id } = req.params;
    const { kategoriBukuId } = req.body;

    const existingBook = await Buku.findByPk(id);
    const kategori = await KategoriBuku.findByPk(kategoriBukuId);

    if (!existingBook) {
      return res.status(404).send(sendResponse(404, "Book not found", null, null));
    }
    if (!kategori) {
      return res.status(404).send(sendResponse(404, "kategori not found", null, null));
    }

    const schema = Joi.object({
      kategoriBukuId: Joi.required(),
    });

    const newData = { kategoriBukuId };

    const { error } = schema.validate(newData);
    if (error) return res.status(400).send(sendResponse(400, error.details[0].message, null, null));

    const newBuku = await existingBook.update(newData);
    await kategori.addBuku(newBuku);
    return res.status(200).send(sendResponse(200, "Success Update Data", null, newBuku));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};
exports.updateDeleteKategoriBuku = async (req, res) => {
  try {
    const { id } = req.params;
    const { kategoriBukuId } = req.body;

    const existingBook = await Buku.findByPk(id);
    const kategori = await KategoriBuku.findByPk(kategoriBukuId);

    if (!existingBook) {
      return res.status(404).send(sendResponse(404, "Book not found", null, null));
    }
    if (!kategori) {
      return res.status(404).send(sendResponse(404, "kategori not found", null, null));
    }

    const schema = Joi.object({
      kategoriBukuId: Joi.required(),
    });

    const newData = { kategoriBukuId };

    const { error } = schema.validate(newData);
    if (error) return res.status(400).send(sendResponse(400, error.details[0].message, null, null));

    const newBuku = await existingBook.update(newData);
    await kategori.removeBuku(newBuku);
    return res.status(200).send(sendResponse(200, "Success Update Data", null, newBuku));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.deleteBuku = async (req, res) => {
  try {
    const { id } = req.params;
    const buku = await Buku.findByPk(id);

    if (!buku) return res.status(404).send(sendResponse(404, "buku Not Found", null, null));

    await buku.destroy();
    return res.status(204).send(sendResponse(204, "Success Delete buku", null, null));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};
