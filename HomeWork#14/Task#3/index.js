var request = require("request");
var fs = require("fs");
var http = require("http");

request("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5", function(err, res, body) {  
	var exchange = "";
	var obj = JSON.parse(body);
	var data = fs.readFileSync("exchange.html", "utf8");
	for(var i = 0; i < obj.length; i++){
    	var rate = obj[i].ccy + " => |Покупка : " + obj[i].buy + "| Продажа : " + obj[i].sale + "|";
     	str = JSON.stringify(rate).replace(/\"/g, "");
    	exchange += str + "\n";
    }

    fs.writeFile("exchange.html", exchange, function (err) {
		if(err){
		  	throw err;
		}
	});
    console.log(data);
});	