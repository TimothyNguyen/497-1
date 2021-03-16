"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require("body-parser");
var url = require('url');
var todos_1 = __importDefault(require("./todos"));
var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/todo', todos_1.default);
app.listen(5000, function () {
    console.log('Server started');
});
