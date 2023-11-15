'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Seller, { foreignKey: "sellerId" });
      this.hasMany(models.Product_Supplier,{foreignKey:'productId'});
      this.belongsTo(models.Category, { foreignKey: "categoryId" });
    };
  };
  Product.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};