// Make it so liri.js can take in one of the following commands:
// * `my-tweets`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`

require("dotenv").config();

//movie specific variables
var tomatoesRating;
var internetRating;

//npm require
var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');

//twitter npm specific call to get keys to twitter account
var client = new Twitter(keys.twitter);

//spotify npm specific call to get keys to spotify account
var spotify = new Spotify(keys.spotify);

//grabbing user input variables
var input = process.argv;

//grabs user command for tweets, movies, spotify or random
var command = input[2];

//grabs movie or song names to put into request
var name = "";
for (i = 3; i < input.length; i++) {
	name = name + " " + input[i];
}

name = name.trim().replace(" ", "+");
if (command === "my-tweets") {
	    		
	var params = {screen_name: 'shaheen65494263', limit: 20};
	
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    for (var i = tweets.length - 1; i >= 0; i--) {
	    	var myTweets = 
	    		"-----------------------------------------------------------------------" + "\r\n" + "\r\n" +
	    		"Tweet Number: " + (tweets.length-i) + "\r\n" +
	    		"Posted on: " + tweets[i].created_at + "\r\n" +
	    		"Tweet Posted: " + tweets[i].text + "\r\n" + "\r\n" + "-----------------------------------------------------------------------"
	    	console.log(myTweets);
	    	writeToLog(myTweets);
			} 
		}
	})
}

else if (command === "spotify-this-song") {
	if (name === "") {
  		name = "The Sign"
  	}
	//same song info as above but looking at info for "The Sign" by Ace of Base.
	spotify.search({ type: 'track', query: name, limit: 6 }, function(err, data) {
 	if (err) {
    	return console.log('Error occurred: ' + err);
  	}
  	
  	var track = data.tracks.items[5];
    var mySong =
		"-----------------------------------------------------------------------" + "\r\n" +
		"Song Title: " + name + "\r\n" +
		"Artist: " + track.artists[0].name + "\r\n" +
		"Album: " + track.album.name + "\r\n" + 
		"Preview Link: " + track.preview_url + "\r\n" +
		"-----------------------------------------------------------------------" + "\r\n"
		console.log(mySong);
		writeToLog(mySong);
	})

}

else if (command === "movie-this") {
 	//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
 	if (name === "") {
 		name = "Mr. Nobody";
 	}

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

	request.get(queryUrl, function(error, response, body) {
		
	  	if (!error && response.statusCode === 200) {

	  		for (i = 0; i < JSON.parse(body).Ratings.length; i++) {
	  			if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
	  				tomatoesRating = JSON.parse(body).Ratings[i].Value;
	  			}
	  			if (JSON.parse(body).Ratings[i].Source === "Internet Movie Database") {
	  				internetRating = JSON.parse(body).Ratings[i].Value;
	  			}
	  		}
	
	  		var myMovie =
  			"-----------------------------------------------------------------------" + "\r\n" +
    		"Movie Title: " + JSON.parse(body).Title + "\r\n" +
    		"Year movie released: " + JSON.parse(body).Year + "\r\n" +
    		"Movie rating: " + JSON.parse(body).Rated + "\r\n" + 
    		"Rotten Tomatoes Rating: " + tomatoesRating + "\r\n" +
    		"Internet Movie Database Rating: " + internetRating + "\r\n" +
    		"Country: " + JSON.parse(body).Country + "\r\n" + 
    		"Language: " + JSON.parse(body).Language + "\r\n" + 
			"Movie Plot: " + JSON.parse(body).Plot + "\r\n" +
			"Actors in Movie: " + JSON.parse(body).Actors + "\r\n" +
    		 "-----------------------------------------------------------------------" + "\r\n"
    		console.log(myMovie);
    		writeToLog(myMovie);

  		}
	});

}

if (command === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
		if (error) {
			return console.log(error);
		}
		// Then split it by commas (to make it more readable)
		var nameArr = data.split(",");
		// // We will then re-display the content as an array for later use.

		name = nameArr[1]

		spotify.search({ type: 'track', query: name, limit: 1 }, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			
			var track = data.tracks.items[0];
			var randomSong =
				"-----------------------------------------------------------------------" + "\r\n" +
				"Song Title: " + name + "\r\n" +
				"Artist: " + track.artists[0].name + "\r\n" +
				"Album: " + track.album.name + "\r\n" + 
				"Preview Link: " + track.preview_url + "\r\n" +
				"-----------------------------------------------------------------------" + "\r\n"
			console.log(randomSong);
			writeToLog(randomSong);
		})

	});
}


// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file. 
// Do not overwrite your file each time you run a command.

function writeToLog(printInfo) {
	fs.appendFile("log.txt", printInfo, function(err) {

		// If the code experiences any errors it will log the error to the console.
		if (err) {
			return console.log(err);
		}

	});

}