'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Categories.associate = function(models) {
    // associations can be defined here
    Categories.belongsTo(models.Products, {
      foreignKey: 'fk_cateId',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
  };
  return Categories;
};