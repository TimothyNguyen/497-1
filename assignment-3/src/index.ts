const express = require('express');
const bodyParser = require("body-parser");
const url = require('url');

import quotesRouter from './quote';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/quote', quotesRouter);

// app.use('/users', usersRouter);
app.listen(3000, () => {
  console.log('Server started');
});
