'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    content: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
    Products.hasOne(models.Categories, {
      foreignKey: 'fk_cateId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Products;
};