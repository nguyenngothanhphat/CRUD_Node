const { Product } = require("../database/index.js");

const getAllProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res
        .status(200)
        .json({ message: "Fetched posts successfully.", products: products });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getProductById = (req, res, next) => {
  const productId = req.params.id;
  Product.findAll({
    where: {
      productId: productId,
    },
  })
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find product.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Product fetched.", product: product });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const createProduct = (req, res, next) => {
  const InfoProduct = ({ title, price, content, categoryId } = req.query);
  const product = new Product({
    title: InfoProduct.title,
    price: InfoProduct.price,
    content: InfoProduct.content,
    categoryId: InfoProduct.categoryId,
  });
  product
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Product created successfully!",
        product: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const updateProduct = (req, res, next) => {
  const productId = req.params.id;
  const InfoProduct = ({ title, price, content } = req.query);
  Product.findAll({
    where: {
      productId: productId,
    },
  })
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find product.");
        error.statusCode = 404;
        throw error;
      }
      product.update(InfoProduct);
    })
    .then((result) => {
      res.status(200).json({ message: "Product updated!", product: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const deleteProduct = (req, res) => {
  const productId = req.params.id

  Product.destroy({
    where: {
      productId: productId
    }
  })
  .then(() => {
    res.status(200).json({ message: 'Delete successfully'});
  })
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
