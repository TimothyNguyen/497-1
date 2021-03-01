"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var quote_1 = __importDefault(require("./quote"));
var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/quote', quote_1.default);
/*
app.use('/', function(req: Request, res: any){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});
*/
// app.use('/users', usersRouter);
app.listen(3000, function () {
    console.log('Server started');
});
