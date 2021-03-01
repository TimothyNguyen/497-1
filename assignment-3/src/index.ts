const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

import quotesRouter from './quote';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/quote', quotesRouter);
/*
app.use('/', function(req: Request, res: any){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});
*/

// app.use('/users', usersRouter);
app.listen(3000, () => {
  console.log('Server started');
});
