# liri-node-app
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.  

# Description and Requirements
LIRI Bot takes in one of the following commands, and displays information in the terminal/bash window: -my-tweets -spotify-this-song -movie-this -do-what-it-says

### my-tweets
Displays last 20 tweets and when they were created.

### spotify-this-song
Displays the following song information: -Artist(s) -The song's name -A preview link of the song from Spotify -The album that the song is from If no song is provided then your program will default to the song "The Sign" by Ace of Base

### movie-this
Displays the following movie information: -Title of the movie. -Year the movie came out. -IMDB Rating of the movie. -Country where the movie was produced. -Plot of the movie. -Actors in the movie. If no movie is provided then your program will default to the movie "Mr. Nobody"

### do-what-it-says
Using the fs Node package, LIRI will take the text inside of a file random.txt and then use it to call one of LIRI's commands. -Text inside of random.txt: spotify-this-song, "I Want it That Way" -Will run the spotify-this-song command for the respective song

### Command log
Using the fs Node package, outputs the commands entered into a .txt file called log.txt. -Appends each command you run to the log.txt file.  

## Technologies Used
```
-Node.JS
-Node Package Modules
  -Twitter
  -omdb
  -node-spotify-api
  -fs (File System)
  -request
  -dotenv
  ```
