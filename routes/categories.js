const express = require("express");

const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.post("/category/create", categoryController.createCategory);

module.exports = router;
