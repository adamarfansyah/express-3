"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Buku.belongsTo(models.Author, { as: "authorBook", foreignKey: { name: "authorId" } });
      Buku.belongsToMany(models.KategoriBuku, { through: models.Buku_Kategori });
    }
  }
  Buku.init(
    {
      judulBuku: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
      kategoriBukuId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Buku",
    }
  );
  return Buku;
};
