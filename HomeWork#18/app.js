var express = require("express");
var app = express();
var courses = require("./data/courses.json");
var bodyParses = require("body-parser");

app.set("view engine", "pug");

app.use(bodyParses.urlencoded( { extended: true } ));
app.use(express.static(__dirname + "/public"));//открывешь доступ к папке где лежат файлы
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));//открывется доступ к папке с шаблоном css

app.get("/", function(req, res){
	res.render("index", {title: "API"});//принимает вид шаблона index.pug из views передавая с данным API
});

app.get("/api/courses", function(req, res) {
	res.render("courses", {
		title: "Api courses",
		courses: courses,
	});
});

app.get("/api/courses/add", function(req, res) {
	res.render("add");
});

app.post("/api/courses/add", function(req, res) {
	var course = {
		name: req.body.name,
		id: Date.now(),
	}

	courses.push(course);

	res.redirect("/api/courses");
});

app.get("/api/courses/edit/:id", function(req, res) {
	var course = courses.find(function (course){
		return course.id = +req.params.id;
	});

	if(!course) {
		res.sendStatus(404);
		return;
	};

	res.render("edit", { course: course })
});

app.post("/api/courses/edit/:id", function(req, res) {
	var course = courses.find(function (course) {
		return course.id === Number(req.params.id);
});
	if(!course) {
		res.sendStatus(404);
		return;
	}

	course.name = req.body.name;

	res.redirect("/api/courses");
});

app.get("/api/courses/delete/:id", function(req, res){
	courses = courses.filter(function (course) {
		return course.id !== Number(req.params.id);
	});

	res.redirect("/api/courses");
});


app.listen(3000,  function() {
	console.log("Example app list on port 3000")
});

