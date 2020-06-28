const { Product } = require("../database/index.js");
const { Category } = require("../database/index.js");
const productService = require("../services/productService.js");

const getAllProducts = (req, res, next) => {
  return Product.findAll()
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
        res.status(404).json({ message: "Could not find product." });
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

const createProduct = async (req, res, next) => {
  const { title, price, content, cateId } = req.body;
  const result = await productService.createProduct(
    title,
    price,
    content,
    cateId
  );
  return res.status(200).json({
    message: "Category created successfully!",
    product: result,
  });
};

const updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findOne({
    where: {
      productId: productId,
    },
  })
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "Could not find product." });
      }
      product.title = req.body.title;
      product.price = req.body.price;
      product.content = req.body.content;
      product.cateId = req.body.cateId;
      return product.save();
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
  const productId = req.params.id;
  Product.destroy({
    where: {
      productId: productId,
    },
  }).then(() => {
    res.status(200).json({ message: "Delete successfully" });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
