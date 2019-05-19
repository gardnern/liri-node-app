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
    'concert-this':findEvents
}
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
// if(!artist){
//     artist='Rolling Stones'
// }


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



axios.get("http://www.omdbapi.com/?apikey=trilogy&s=Matrix").then(
  function(response) {
    
    console.log(response.data);
  },
  function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      //console.log(error.response.data);
      //console.log(error.response.status);
     // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      //console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
     // console.log("Error", error.message);
    }
    //console.log(error.config);
  }
);

// 9. Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`

// ### What Each Command Should Do

// 1. `node liri.js concert-this <artist/band name here>`

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.



// function Dog(name, age, breed) {
//         this.name = name;
//         this.age = age;
//         this.breed = breed;

//         this.speak = function(){
//             console.log('woof says ' + this.name)
//         }
// }

// class DogClass {
//     constructor(name, age, breed){
//         this.name = name;
//         this.age = age;
//         this.breed = breed;
//     }

//     speak(){
//         console.log('woof sasy ' + this.name)
//     }
// }

// var someDog = new Dog('bob', 34, 'Husky');
// someDog.speak()
// var someDogTwo = new DogClass('bob', 34, 'Husky');
// someDogTwo.speak()
// console.log(someDog)
// console.log(someDogTwo)