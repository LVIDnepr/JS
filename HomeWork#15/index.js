var fs = require('fs');
var http = require('http');

var fileSize = fileSize();
console.log("File size: " + fileSize + "Mb");

http.createServer(function(req, res){
  if(req.url === "/stream"){
    if(fileSize > 10){
      var stream = fs.createReadStream("test.txt");
      stream.pipe(res);
    }else{
      res.write("File is small. Enter URL '/file'");
      res.end();
    }
  }else if(req.url === "/file"){
    if(fileSize < 10){
      fs.readFile('test.txt', function(err, data){
        res.write(data);
        res.end();
      });
    }else{    
     res.write("File is too large. Enter URL '/stream'");
     res.end();
    }
  }else{
    res.write("Hello, if u want to test my HM15, enter URL '/file' or '/stream'.");
    res.end();
  }
}).listen(3000, function(){
  console.log("localhоst:3000");
});

function fileSize(){
  var stats = fs.statSync("test.txt");
  var fileSizeMb = Math.floor(stats.size / 1000000.0);
  return fileSizeMb;
}