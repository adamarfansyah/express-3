const Joi = require("joi");
const { Author } = require("../models/index.js");
const sendResponse = require("../helpers/responseHelpers.js");

exports.getAuthorAll = async (_, res) => {
  try {
    const author = await Author.findAll({ include: "authorBook" });
    return res.status(200).send(sendResponse(200, "Success", null, author));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id, { include: "authorBook" });
    if (!author) return res.status(404).send(sendResponse(404, "author Not Found", null, null));

    return res.status(200).send(sendResponse(200, "Success", null, author));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.createAuthor = async (req, res) => {
  try {
    const { author } = req.body;

    const existingAuthor = await Author.findOne({ where: { author } });
    if (existingAuthor)
      return res.status(400).send(sendResponse(400, "Author Already Existed", null, null));

    const schema = Joi.object({
      author: Joi.string().min(3).required(),
    });

    const { error } = schema.validate({ author });
    if (error) return res.status(400).send(sendResponse(400, error.details[0].message, null, null));

    const newAuthor = await Author.create({ author });
    return res.status(201).send(sendResponse(201, "Success", null, newAuthor));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const { author } = req.body;
    const authorData = await Author.findByPk(id);
    const existingAuthor = await Author.findOne({ where: { author } });

    if (!authorData) return res.status(404).send(sendResponse(404, "Author Not Found", null, null));
    if (existingAuthor) {
      return res.status(400).send(sendResponse(400, "Author Already Existed", null, null));
    }

    const schema = Joi.object({
      author: Joi.string().min(3).required(),
    });

    const { error } = schema.validate({ author });
    if (error) return res.status(400).send(sendResponse(400, error.details[0].message, null, null));

    await authorData.update({ author });
    return res.status(201).send(sendResponse(201, "Success", null, authorData));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id);

    if (!author) return res.status(404).send(sendResponse(404, "Author not found", null, null));
    await author.destroy();
    return res.status(204).send(sendResponse(204, "Success Delete Author", null, null));
  } catch (error) {
    return res.status(500).send(sendResponse(500, "Internal Server Error", error, null));
  }
};
