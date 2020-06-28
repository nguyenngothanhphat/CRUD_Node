const database = require("../database");
const { Product } = require("../database/index.js");

const createProduct = async (title, price, content, cateId) => {
  try {
    return database.sequelize.transaction(async (t) => {
      const createdProduct = await Product.create(
        {
          title: title,
          price: price,
          content: content,
          cateId: cateId,
        },
        { transaction: t }
      ).then((res) => res.toJSON());
      return createdProduct;
    });
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = {
  createProduct,
};
