var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');

app.set( 'view engine', 'ejs' );

app.use( bodyParser.urlencoded( { extended : true } ) );
app.use( bodyParser.json() );

var posts = [
	{title : "Red", content : "Film#1"},
	{title : "Red 2", content : "Film#2"},
	{title : "Inception", content : "Film#3"}
];

app.get("/", function(req,res){
	res.render('index.ejs',{posts: posts} );
});

app.listen(3000, function (){
	console.log('Work at 3000 port');
});