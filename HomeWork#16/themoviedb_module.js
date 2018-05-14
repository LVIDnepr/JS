var request = require('request');
var fs = require('fs');

module.exports.everythingAboutMovie = function(titleMovie){

	
	var urlTitle = "https://api.themoviedb.org/3/search/movie?api_key=747c7ff19c5f29aa95c110ddee080027&query="+titleMovie;

	request(urlTitle, function(err, res, body) {
	 	if(err){
	  	throw err;
	    }

	   	var getId = JSON.parse(body);
		var idMovie = getId.results[0].id;
		
			var urlId = "https://api.themoviedb.org/3/movie/"+idMovie+"?api_key=747c7ff19c5f29aa95c110ddee080027";
			request(urlId, function(err, res, body) {
		 	if(err){
		  	throw err;
		    }
		    var film = JSON.parse(body);
			function createHtml(film){

				var title = " Movie: " + film.original_title + "<br>";
				var budget = " Budget: " + film.budget + " $ <br>";
				var overview = " Overview: <p align=\"left\"> " + film.overview + "</p>";
				var popularity = " Popularity: " + film.popularity + " millions of people <br>";
				var runtime = " Runtime: " + film.runtime + " minutes <br>";
				var revenue = " Revenue: " + film.revenue + " $ <br>";
				var release_date = " Release date: " + film.release_date + " <br>";
				var vote_average = " Vote average: " + film.vote_average + " themoviedb <br>";
				var genres = " Genres: " + film.genres[0].name + " <br>";
				var poster_path = "https://image.tmdb.org/t/p/original/" + film.poster_path;				
				var image_poster = "<img src=" + poster_path + " align=\"left\" width=\"17%\" height=\"30%\"> <br>";
				var aboutMovie = image_poster + overview + release_date + budget + title + popularity + vote_average + runtime + revenue + genres ;
				return aboutMovie;
			}

			fs.writeFile("AboutMovie.html", createHtml(film), function (err) {
			  if(err){
			  	throw err;
			  }
			});
		}); 
	});  
}