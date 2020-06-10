const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/product/create", productController.createProduct);
router.put("/product/:id", productController.updateProduct);
router.get("/product/:id", productController.getProductById);
router.delete("/product/:id", productController.deleteProduct);


module.exports = router;