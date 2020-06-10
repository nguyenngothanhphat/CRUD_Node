'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    content: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  products.associate = function(models) {
    // associations can be defined here
    products.belongsTo(models.categories, {
      foreignKey: 'categoryId'
    });
  };
  return products;
};