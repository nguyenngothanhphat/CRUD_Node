'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  categories.associate = function(models) {
    // associations can be defined here
    categories.hasMany(models.products, {
      foreignKey: 'categoryId',
    })
  };
  return categories;
};