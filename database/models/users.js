"use strict";

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      userId: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  Users.associate = function (models) {
    // associations can be defined here
    Users.hasOne(models.Profiles, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return Users;
};
