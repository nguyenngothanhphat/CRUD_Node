const { Category } = require("../database/index.js");

const createCategory = (req, res, next) => {
    const InfoCategory = ({ title, description } = req.query);
    const category = new Category({
      title: InfoCategory.title,
      description: InfoCategory.description,
    });
    category
      .save()
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
  };

  module.exports = {
    createCategory,
  };