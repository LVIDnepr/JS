var request = require('request');
var fs = require('fs');

request("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5", function(err, res, body) {
	fs.writeFileSync("courses.html", body);
});
var body = fs.readFileSync("courses.html");  
var rate = JSON.parse(body);  

var Converter = function() {
	this.rateUSD = rate[0].buy;
	this.rateEUR = rate[1].buy;
	this.rateRUR = rate[2].buy;
}
;
Converter.prototype.roundToDecimals = function(amount) {
	return Math.round(amount * 100) / 100;
};

Converter.prototype.convertToUSD = function(currency) {
	return this.roundToDecimals(currency * this.rateUSD);
};

Converter.prototype.convertToEUR = function(currency) {
	return this.roundToDecimals(currency * this.rateEUR);
};

Converter.prototype.convertToRUR = function(currency) {
	return this.roundToDecimals(currency * this.rateRUR);
};

module.exports = Converter;