'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    categoryId: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Categories.associate = function(models) {
    // associations can be defined here
    Categories.hasMany(models.Products, {
      foreignKey: 'cateId',
      as: 'products',
      onDelete: 'CASCADE',
    });
  };
  return Categories;
};