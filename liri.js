
var twitterInfo = require("./keys.js");

var Twitter = require("twitter");

var Spotify = require('node-spotify-api');

var request = require("request");

var fs = require("fs");

var inquirer = require("inquirer");



function displayTweets(){

	var client = new Twitter({
  consumer_key: twitterInfo.consumer_key,
  consumer_secret: twitterInfo.consumer_secret,
  access_token_key: twitterInfo.access_token_key,
  access_token_secret: twitterInfo.access_token_secret
});

	var params = {screen_name: '3lemonstar'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error) {
	    console.log(error);
	  }

	  // forEach tweet in the response ('tweets'), display the text and date created
	  tweets.forEach(function(tweet, num){
	  	  	
	  	console.log("\ntweet #" + (num + 1));
	  	console.log(tweet.text);
	  	console.log("Date created: " + tweet.created_at);
	  })

// or can use for loop
	  // for (var i = 0; i < tweets.length; i++) {
	  // 	console.log("\ntweet #" + (i + 1));
	  // 	console.log(tweets[i].text);
	  // 	console.log("Date created: " + tweets[i].created_at);
	  // }
	  
	});
}

function displaySongInfo(song){
	var spotify = new Spotify({
		id: "9791b8f8bdd2445294356216abd9f845",
		secret: "a0de4ef3219f4d0c820c66c8dedb6b31"
	});

 
	spotify.search({ type: 'track', query: song }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }

		console.log("\nSong Name: " + data.tracks.items[0].name);
		console.log("Artist(s): " + data.tracks.items[0].artists[0].name);  
		console.log("Preview Link: " + data.tracks.items[0].preview_url);
		console.log("Album: " + data.tracks.items[0].album.name);  
	 
	});
}


function displayMovieInfo(movie){

	// run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy"

	request(queryUrl, function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {
	  	//empty line for readability
	  	console.log();
	    // Parse the body of the site and recover the title, year, imdbRating etc
	    // loop through the array and console.log
	    var infoArray = ["Title", "Year", "Country", "Language", "Plot", "Actors"];
	    for (var i = 0; i < infoArray.length; i++) {
	    	console.log(infoArray[i] + ": " + JSON.parse(body)[infoArray[i]]);
	    }
	    // also log these that couldn't quite go in the array
	   	console.log("imdb Rating: " + JSON.parse(body).Ratings[0].Value);
	    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	   
	  }

	});

}


function readFromFile(){
	fs.readFile("random.txt", "utf8", function(error, data) {

	  // If the code experiences any errors it will log the error to the console.
	  if (error) {
	    return console.log(error);
	  }

	  // We will then print the contents of data
	  console.log("\nThe file says: " + data + "\n(Loading...)");

	  // Then create an array with the content split by the comma
	  var dataArr = data.split(",");

	  //0th element of dataArr is one of the commands
	  switch(dataArr[0]){

  		case "my-tweets":
    		displayTweets();
    		break;

  		case "spotify-this-song":
  			displaySongInfo(dataArr[1]);
    		break;

  		case "movie-this":
  			displayMovieInfo(dataArr[1]);
    		break;
  		}

	});
}


// prompt the user to choose a command
inquirer.prompt([

{
	type: "list", 
	message: "Choose a command",
	choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
	name: "command"
}
// then, based on their choice 
]).then(answers => {
  
	switch(answers.command) {
		// if user chose 'my-tweets', run the corresponding function
	  case "my-tweets":
	    displayTweets();
	    break;

	  case "spotify-this-song":
	  // show another prompt to get the song name
	  	inquirer.prompt([

				{
					type: "input", 
					message: "Enter the name of a song (If none is provided I will use 'The Sign' by Ace of Base)",
					name: "song"
				}
				// then run the function using user input for the song 
				]).then(answers => {

					//if no song was provided, use 'The Sign' by Ace of Base
					if (!answers.song ){
						answers.song = "The Sign, Ace of Base";
					}
					
					displaySongInfo(answers.song);
					
				});

	    break;

	  case "movie-this":
	  // show another prompt to get the movie name
	  	inquirer.prompt([

				{
					type: "input", 
					message: "Enter the name of a movie (If none is provided I will use 'Mr. Nobody')\n",
					name: "movie"
				}
				// then run the function using user input for the movie
				]).then(answers => {
					// if no movie was provided, use 'Mr. Nobody'
					if (!answers.movie ){
						answers.movie = "Mr. Nobody";
					}

					displayMovieInfo(answers.movie);
				});

	    break;

	  case "do-what-it-says":
	  	readFromFile();

	    break;
	}

});





