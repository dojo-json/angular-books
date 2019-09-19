const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

console.log(port);

app.use(express.static(path.resolve('dist/books')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// require database
require('./server/config/database');
// require routes
const routes = require('./server/routes');
app.use(routes);

app.listen(port, () => console.log(`express server listening on port ${port}`))
