const database = require("../database");
const { Category } = require("../database/index.js");

const createCategory = (req, res, next) => {
  const InfoCategory = ({ title, description } = req.body);
  return database.sequelize.transaction((t) => {
    return Category.create(
      {
        title: InfoCategory.title,
        description: InfoCategory.description,
      },
      { transaction: t }
    )
      .then((result) => {
        res.status(200).json({
          message: "Category created successfully!",
          category: result,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};


module.exports = {
  createCategory,
};
