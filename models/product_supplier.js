'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {foreignKey:"productId"});
      this.belongsTo(models.Supplier, {foreignKey:"supplierId"});
    };
  };
  Product_Supplier.init({
    productId: DataTypes.INTEGER,
    supplierId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_Supplier',
  });
  return Product_Supplier;
};