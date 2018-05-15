var Converter = require('./converter');
var currentDate = require('./rates');
var clc = require("cli-color");

var converter = new Converter();

console.log(clc.blue.bgWhite("Дата: " + currentDate + "\n"));