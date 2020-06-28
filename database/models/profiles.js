"use strict";
module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define(
    "Profiles",
    {
      profileId: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      address: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Profiles.associate = function (models) {
    // associations can be defined here
    Profiles.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return Profiles;
};
