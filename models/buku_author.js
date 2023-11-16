'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buku_Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Buku_Author.init({
    authorId: DataTypes.INTEGER,
    bukuId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Buku_Author',
  });
  return Buku_Author;
};