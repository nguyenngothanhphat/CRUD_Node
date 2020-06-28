const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const usersRouter = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/admin', productsRouter);
app.use('/admin', categoriesRouter);
app.use('/admin', usersRouter);

app.get('/', (req, res) => {
	return res.json({ message: 'Welcome to NodeJS' });
});

app.use((req, res, next) => {
	return res.status(404).json({ message: 'Page Not Found' });
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
