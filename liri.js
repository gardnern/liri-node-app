require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");


var findConcert = function(artist) {

axios.get("https://rest.bandsintown.com/artists/" + (artist || 'Rolling Stones') +"/events?app_id=847492e9-710f-445d-81dc-db9b772ae682")
.then(
  function(response) {
    console.log("Name of the venue:  " + response.venue.data);
    console.log("Venue location:  " + response.location.data);
    console.log("Date of the Event:  " + jsonData.moment(MMDDYYYY));
    console.log(findConcert.response);
    console.log("************************************************");
  })
  .catch(
  function(error) {
    console.log(error)
  }
);
}
  
 

var spotifyAPI = function(songName) {
  if (songName === undefined) {
    songName = "The Sign";
  }
  spotify.search(
    {
      type: "track",
      query: songName,
      limit: 10
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("Artist name: " + songs[i].artists[0].name);
        console.log("Song title: " + songs[i].name);
        console.log("Track number: " + songs[i].track_number);
        console.log("Album: " + songs[i].album.name);
        console.log("Release date: " + songs[i].album.release_date);
        console.log("Album type: " + songs[i].album.album_type);
        console.log("Preview song: " + songs[i].preview_url);
        console.log("*****************************************************************");
      }
    }
  );
};


var omdbAPI = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr. Nobody";
  };
  axios.get("http://www.omdbapi.com/?t="+ movieName +"&y=&plot=full&tomatoes=true&apikey=trilogy")
  .then(
    function() {
      var jsonData = JSON.parse(body);
      console.log("Movie Title: " + jsonData.Title);
      console.log("Year Release: " + jsonData.Year);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("************************************************");
    },
    function(err) {
    if(err.response) {
      console.log(err.reponse.data);
    } else {
      console.log(err, error.message);
    }
  });
}


var doWhatItSays = function() {
  fs.readFile('random.txt', 'utf8', function(err, data){
    console.log(data);
    var dataArr = data.split(' ');
    if (dataArr.length ===  2) {
      userCommand(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      userCommand(dataArr[3]);
    }
  });
  console.log(userCommand + doWhatItSays + "Doing what you said!");
}


var userCommand = function(caseData, functionData) {
  switch (caseData) {

    case "concert-this":
      findConcert(functionData);
    break;

    case "spotify-this-song":
      spotifyAPI(functionData);
      break;
  
    case "movie-this":
      omdbAPI(functionData);
    break;

    case "do-what-it-says":
      doWhatItSays();
    break;
    default:
    console.log("Sure, whatever you say!");
  }
}

  userCommand = process.argv[2]; 
  var userInput = process.argv.slice(3).join(" ");
  var runThis = function(userCommand, userInput) {
   
  };

runThis(process.argv[2], process.argv[3]);
console.log(userCommand +" "+ userInput + " searching");  

fs.writeFile("log.txt", userCommand, function() {
  
  console.log("****************************Request********************************");
 
})
console.log(findConcert.response || spotifyAPI.songName || omdbAPI.jsonData || doWhatItSays.userInput);
