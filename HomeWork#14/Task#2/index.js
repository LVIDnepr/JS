var http = require("http");
var fs = require("fs");

http.createServer( function(req, res) {
	if (req.url === "/") {
	  fs.readFile("index.html", function(err, data) {
        res.write(data);
        res.end();
      });
	}
    if (req.url === "/about") {
      console.log("Запрос на About");
    }

    if (req.url === "/stop") {
	  console.log("Работа сервера завершена");
	  server.close();
     }
    if req.url === "/contact") {
      console.log("Запрос на Contact");
	  fs.readFile("contact.html", function(err, data) {
       res.write(data);
       res.end();
      });
	}
}).listen(3000, function() {
    console.log("Server on localhost:3000");
});