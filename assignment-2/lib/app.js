"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require("body-parser");
var server_1 = __importDefault(require("./server"));
var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/users', server_1.default);
app.listen(3000, function () {
    console.log('Server started');
});
