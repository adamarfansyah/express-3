"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Buku_Kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Buku_Kategori.init(
    {
      bukuId: DataTypes.INTEGER,
      kategoriBukuId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Buku_Kategori",
    }
  );
  return Buku_Kategori;
};
