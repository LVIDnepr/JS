var request = require("request");
var fs = require("fs");
var http = require("http");
var clc = require("cli-color");
var currentDate = new Date();

var ratesPb = request("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5", function(err, res, body) {  
	var courses = "";
	var obj = JSON.parse(body);
	var data = fs.readFileSync("rates.html", "utf8");
	for(i = 0; i < obj.length; i++){
      	var rate = obj[i].ccy + " => |Покупка : " + obj[i].buy + "| Продажа : " + obj[i].sale + "|";
      	str = JSON.stringify(rate).replace(/\"/g, "");
      	courses += str + "\n";
    }  

    fs.writeFile("rates.html", courses, function (err) {
		if(err){
	  		throw err;
		}
	});
    console.log(clc.blue.bgWhite(data));
});	

module.exports = ratesPb;
module.exports = currentDate.toLocaleString();