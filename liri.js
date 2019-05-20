require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
console.log(process.argv)
var command = process.argv[2];
var otherArgs = process.argv.slice(3).join(' ');
console.log(command)
console.log(otherArgs)
var functionMap = {
    'spotify-this-song':spotifySong,
    'concert-this':findEvents,
    'movie-this' :findMovie,
    'do-what-it-says' :dowhatever
}

// if(functionMap[process.argv[2]]){
//   functionMap[process.argv[2]](otherArgs)
// }
// else {
//   console.log('That command is not supported')
// }
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});


if(functionMap[process.argv[2]]){
  functionMap[process.argv[2]](otherArgs)
}
else {
  console.log('That command is not supported')
}

function spotifySong(){
  //pretend gets real songs
  console.log('My spotify song');
}

function findEvents(artist){

axios.get("https://rest.bandsintown.com/artists/" + (artist || 'Rolling Stones') +"/events?app_id=847492e9-710f-445d-81dc-db9b772ae682")
.then(
function(response) {
  
  console.log(response.data);
})
.catch(
function(error) {
  console.log(error)
}
);
}

var dowhatever;

function findMovie(movieName, dowhatever) {
  
axios.get("http://www.omdbapi.com/?t=" + (movieName || 'Mr. Nobody' ||dowhatever) + "&y=&plot=short&apikey=trilogy")
.then(
console.log(queryURL),
  function(response) {

    console.log("Release Year: " + response.data.Title);
  })
  .catch(
function (error) {
 console.log(error);
  }
);
}