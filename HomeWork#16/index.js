var aboutMovie = require('./themoviedb_module');
var http = require('http');
var fs = require('fs');

var titleMovie = "inception"; // Write any title of the movie about which you want to get information, but only in English
								 // inception, the avengers, avengers infinity war, deadpool ......
aboutMovie.everythingAboutMovie(titleMovie);

http.createServer(function (req, res){
	fs.readFile('AboutMovie.html', function(err, data){
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
}).listen(3000, function(){
	console.log("At localhost:3000");
});