
var twitterInfo = require("./keys.js");

var twitter = require("twitter");



 // console.log(twitterInfo);

 var client = new twitter({
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

	});
}


// GET https://api.twitter.com/1.1/search/tweets.json?q=@3lemonstar&count=20
// console.log(client);

switch(process.argv[2]) {

  case "my-tweets":
    displayTweets();
    break;

  // case "withdraw":
  //   withdraw(process.argv[3]);
  //   break;

  // case "deposit":
  //   deposit(process.argv[3]);
  //   break;
  
  // case "lotto":
  // 	lotto();
  // 	break;
  	
  // default:
  //   console.log("Please enter 'total' 'withdraw' 'deposit' or 'lotto'")
}
