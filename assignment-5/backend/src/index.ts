const express = require('express');
const bodyParser = require("body-parser");
const url = require('url');
import todosRouter from './todos';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/todo', todosRouter);

// We run our app on localhost:5000
app.listen(5000, () => {
  console.log('Server started');
});
