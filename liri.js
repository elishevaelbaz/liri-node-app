
var twitterInfo = require("./keys.js");

var Twitter = require("twitter");

var Spotify = require('node-spotify-api');

var request = require("request");

var fs = require("fs");



 // console.log(twitterInfo);

var client = new Twitter({
  consumer_key: twitterInfo.consumer_key,
  consumer_secret: twitterInfo.consumer_secret,
  access_token_key: twitterInfo.access_token_key,
  access_token_secret: twitterInfo.access_token_secret
});

function displayTweets(){

	var params = {screen_name: '3lemonstar'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error) {
	    console.log(error);
	  }

	  console.log(tweets);

	  tweets.forEach(function(tweet){
	  	console.log(tweet.text);
	  console.log("Date created: " + tweet.created_at);
	  })

	  // for (var i = 0; i < tweets.length; i++) {
	  // 	console.log(tweets[i].text);
	  // 		console.log("Date created: " + tweets[i].created_at);
	  // }
	  
	});
}

function displaySongInfo(song){
	var spotify = new Spotify({
		id: "9791b8f8bdd2445294356216abd9f845",
		secret: "a0de4ef3219f4d0c820c66c8dedb6b31"
	});

	if(process.argv[3] == undefined){
		song = "Ace of Base"

	}
 
	spotify.search({ type: 'track', query: song }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }

	  // if (!data){
	  // 	spotify.search({ type: 'track', query: song }, function(err, data) {
	  // 	if (err) {
	  //   	return console.log('Error occurred: ' + err);
	  // 	}




	  // })
	  // }
	 
	// console.log("data" + data[0]); 

	console.log("You made it here")

	console.log(data.tracks.items[0].name);
	console.log(data.tracks.items[0].artists[0].name);  
	console.log(data.tracks.items[0].preview_url);
	console.log(data.tracks.items[0].album.name);  


	 
	});
}


function displayMovieInfo(movie){

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy"

	request(queryUrl, function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    var infoArray = ["Title", "Year", "Country", "Language", "Plot", "Actors"];
	    for (var i = 0; i < infoArray.length; i++) {
	    	console.log(infoArray[i] + ": " + JSON.parse(body)[infoArray[i]]);
	    }

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
	  console.log(data);

	  // Then split it by commas (to make it more readable)
	  var dataArr = data.split(",");

	  // We will then re-display the content as an array for later use.
	  console.log(dataArr);

	  console.log("node liri.js " + dataArr[0] + " " + dataArr[1]);

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




switch(process.argv[2]) {

  case "my-tweets":
    displayTweets();
    break;

  case "spotify-this-song":
  	displaySongInfo(process.argv[3]);
    break;

  case "movie-this":
  	displayMovieInfo(process.argv[3]);
    break;

  case "do-what-it-says":
  	readFromFile();

    break;
  	
  default:
    console.log("Please enter 'my-tweets', 'spotify-this-song', 'movie-this, or 'do-what-it-says'")
}



