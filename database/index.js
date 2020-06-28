const Sequelize = require("sequelize");

const ProductModel = require("./models/products");
const CategoryModel = require("./models/categories");
const UserModel = require("./models/users");
const ProfileModel = require("./models/profiles");

const DB_HOST = "localhost";
const DB_NAME = "crud_node";
const DB_USERNAME = "root";
const DB_PASSWORD = "p0937994252";

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

const Product = ProductModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Profile = ProfileModel(sequelize, Sequelize);

const testConnection = () => {
  return sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
};

module.exports = {
  sequelize,
  testConnection,
  Product,
  Category,
  User,
  Profile,
};
