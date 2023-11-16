const Joi = require("joi");
const { Buku, KategoriBuku, Author } = require("../models/");
const sendResponse = require("../helpers/responseHelpers.js");

exports.getAllKategori = async (_, res) => {
  try {
    const kategori = await KategoriBuku.findAll({ include: { model: Buku } });
    return res.status(200).send(sendResponse(200, "Success", null, kategori));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.getKategoriById = async (req, res) => {
  try {
    const { id } = req.params;
    const kategori = await KategoriBuku.findByPk(id, { include: { model: Buku } });
    if (!kategori) return res.status(404).send(sendResponse(404, "Kategori Not Found", null, null));

    return res.status(200).send(sendResponse(200, "Success", null, kategori));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.createKategori = async (req, res) => {
  try {
    const { kategori } = req.body;
    const kategoriData = await KategoriBuku.findOne({ where: { kategori } });

    if (kategoriData) {
      return res.status(400).send(sendResponse(400, "Kategori Already Existed", null, null));
    }

    const schema = Joi.object({
      kategori: Joi.string().min(3).required(),
    });

    const { error } = schema.validate({ kategori });
    if (error) return res.status(400).send(sendResponse(400, error.details[0].message, null, null));

    const newKategori = await KategoriBuku.create({ kategori }, { include: Buku });
    return res.status(201).send(sendResponse(201, "Success Create Kategori", null, newKategori));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateKategoriById = async (req, res) => {
  try {
    const { id } = req.params;
    const { kategori } = req.body;
    const kategoriData = await KategoriBuku.findByPk(id);
    const isKategoriExist = await KategoriBuku.findOne({ where: { kategori } });

    if (!kategoriData) {
      return res.status(404).send(sendResponse(404, "Kategori not found", null, null));
    }
    if (isKategoriExist) {
      return res.status(400).send(sendResponse(400, "Kategori Already Exist", null, null));
    }

    const schema = Joi.object({
      kategori: Joi.string().min(3).required(),
    });

    const { error } = schema.validate({ kategori });
    if (error) return res.status(400).send(sendResponse(400, error.details[0].message, null, null));

    const newKategori = await kategoriData.update({ kategori }, { include: Buku });
    return res.status(201).send(sendResponse(201, "Success Create Kategori", null, newKategori));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.deleteKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const kategori = await KategoriBuku.findByPk(id);
    if (!kategori) {
      return res.status(404).send(sendResponse(404, "Kategori not found", null, null));
    }

    await kategori.destroy();

    return res.status(204).send(sendResponse(204, "Success Delete Data", null, null));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};
