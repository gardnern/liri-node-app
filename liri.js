require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');



var findConcert = function(artist) {

axios.get("https://rest.bandsintown.com/artists/" + (artist || 'Rob Zombie') +"/events?app_id=847492e9-710f-445d-81dc-db9b772ae682")
  .then(
    function(response) {
      var data = response.data;
      data.datetime = moment().format("L");
      // console.log(response.data);
      for (var i = 0; i < data.length; i++) {

        console.log("Name of the venue:  " + data[i].venue.name);
        console.log("Venue location:  " + data[i].venue.city + " " + data[i].venue.country);
        console.log("Date of the Event:  " + data[i].datetime);
        console.log("****************************************************************************************************");
      }
     }).catch(
    function(error) {
      console.log(error)
    }
  )
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
        console.log("*********************************************************************************************");
      }
    }
  );
};


var omdbAPI = function(movieName) {
 console.log('This would make it pretty sure', movieName)
  if (movieName === undefined) {
    movieName = "Mr. Nobody";
  }
  axios.get("http://www.omdbapi.com/?t="+ movieName +"&plot=full&tomatoes=true&apikey=trilogy")
  .then(
    function(response) {
      
      var jsonData = response.data;
      console.log("Movie Title: " + jsonData.Title);
      console.log("Year Release: " + jsonData.Year);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      jsonData.Ratings[1] && console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("*************************************************************************************");
    }).catch(
    function(err) {
      console.log(err);
  });
}


var userCommandInterface = function(caseData, functionData) {
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
    var today = moment().format('D MMM, YYYY');
    fs.appendFile("log.txt",'command: ' +  caseData + ' Args' + functionData + ' at this date ' + today + '\n', function(err){
      console.log(err); 
    });
}

    var userInputCommand = process.argv[2]; 
    var userInput = process.argv.slice(3).join(" ");
 

userCommandInterface(userInputCommand, userInput);
  function doWhatItSays() {
      fs.readFile('random.txt', 'utf8', function(err, data){
      console.log(data);
      var dataArr = data.split(',');
      userCommandInterface(dataArr[0], dataArr[1]);
      
    });
  }