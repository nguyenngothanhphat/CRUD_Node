const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", productsRouter);
app.use("/admin", categoriesRouter);

app.get("/", (req, res) => {
    return res.json({message: 'Welcome to NodeJS'});
});

app.use((req, res, next) => {
    return res.status(404).json({message: 'Page Not Found'});
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
