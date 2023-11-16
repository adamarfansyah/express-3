"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KategoriBuku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KategoriBuku.belongsToMany(models.Buku, { through: models.Buku_Kategori });
    }
  }
  KategoriBuku.init(
    {
      kategori: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "KategoriBuku",
    }
  );
  return KategoriBuku;
};
