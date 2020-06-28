'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    productId: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    content: DataTypes.TEXT,
    cateId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
    Products.belongsTo(models.Categories, {
      foreignKey: 'cateId',
      as: 'categories',
      onDelete: 'CASCADE'
    });
  };
  return Products;
};