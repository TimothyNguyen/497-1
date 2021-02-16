const express = require('express');
const bodyParser = require("body-parser");

import usersRouter from './server';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/users', usersRouter);
app.listen(3000, () => {
  console.log('Server started');
});
