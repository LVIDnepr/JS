var http = require("http");
var fs = require("fs");
var events = require("events");
var emt = new events.EventEmitter();

emt.on("enteringUser", function() {
	var date = new Date();  
	console.log("Попытка авторизации на сайте " + date.toLocaleString());
});

emt.on("errorLog", function() {	 
	console.log("Ошибка ввода данных пользователя во время авторизации ");
});
	
emt.on("login", function(nick) {
	var date = new Date();
	console.log("Пользователь " + nick + " на сайте")
	console.log(date.toLocaleString() + " cеанс начат");
});

emt.on("mainPage", function(nick) {  
	console.log("Пользователь " + nick + " на главной странице")
});

emt.on("search", function(nick) {
	console.log("Пользователь " + nick + " использует поиск по сайту")
}); 

emt.on("download", function(nick, file) {  
 	console.log("Пользователь " + nick + " скачал файл " + file)
}); 

emt.on("logout", function(nick) {
	var date = new Date();
	console.log("Пользователь " + nick + " покинул сайт")
	console.log(date.toLocaleString() + " cеанс завершен");
});

var nickName = "Ukrainian2000";
var file = "interstellar.torrent";

setTimeout(function() {emt.emit("enteringUser")},0);
setTimeout(function() {emt.emit("errorLog")},250);
setTimeout(function() {emt.emit("enteringUser")},500);
setTimeout(function() {emt.emit("login", nickName)},1000);
setTimeout(function() {emt.emit("mainPage", nickName)},1500);
setTimeout(function() {emt.emit("search", nickName)},2000);
setTimeout(function() {emt.emit("download", nickName, file)},2500);
setTimeout(function() {emt.emit("logout", nickName)},3000);