var express = require( "express" );
var app = express();
var bodyParser = require( "body-parser" );
var request = require("request");
var fs = require('fs');
var nodemailer = require("nodemailer");
var currentDate = new Date();

app.set( "view engine", "ejs" );

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

var urlencodedParse = bodyParser.urlencoded({ extended: false })

app.use('/public', express.static('public'));

var posts = [
	{ title: 'Examples of dishes'},
	{ title: 'Pizza', content: 'Very taste dish'},
	{ title: 'Fried Potato', content: 'Lightly fried potatoes with tender pork'},
	{ title: 'Lasagna', content: 'Lasagna - pasta in the form of a square or rectangle, as well as lasagna al forno - a dish of Italian cuisine'}
]


app.get( "/", function( req, res ) {
	 	res.render( "main.ejs", {post: posts});
});



app.get( "/about", function( req, res ) {
	 	res.render( "about.ejs");
});

app.get( "/contact", function( req, res ) {

	 	res.render( "contact.ejs");
});
app.post('/contact', urlencodedParse, function (req, res) {	
	if (!req.body) return res.sendStatus(400);
	console.log(req.body);	
	var output = `
		<ul>
			<li>Name: ${req.body.name}</li>
			<li>Email: ${req.body.email}</li>
			<li>Text: ${req.body.message}</li>
		</ul>
	`;

	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: '', // ENTER HERE YOUR EMAIL
			pass: '' // ENTER HERE YOUR PASSWORD
		},
		tls: {
			rejectUnathorized: false //in order to send mails from localhost
		}
	});

	let mailOptions = {
		from: '', // ENTER HERE SENDER ADDRESS
		to: '', // ENTER HERE RECEIVER ADDRESS
		subject: 'Contact request',
		text: 'Hello world?',
		html: output
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	});
	res.render( 'contact');
});

app.listen( 3000, function() {
	console.log("Example app list on port 3000")
});