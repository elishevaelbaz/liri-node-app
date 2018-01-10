# liri-node-app


### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Node Packages
 This app uses twitter, node-spotify-api, request, and inquirer node packages (see package.json).

### Instructions

liri.js will display a prompt with the following options:

   * `my-tweets`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### What Each Command Should Do

1. `my-tweets`

   * This will show the last 20 tweets of an alias account and when they were created in the terminal/bash window.

2. `spotify-this-song`

	 * This will prompt the user to enter the name of a song

   * It will then show the following information about the song in the terminal/bash window:
     
     * The song's name

     * Artist(s)
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided, the program will default to "The Sign" by Ace of Base.
   

3. `movie-this`

	 * This will prompt the user to enter the name of a movie

   * It will then output the following information to the terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
     ```

   * If no movie input is provided, the program will output data for the movie 'Mr. Nobody.'

4. `do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     


