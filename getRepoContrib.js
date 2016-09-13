// BACK-BONE OF PROGRAM


var requireModule1 = require("./download_avatar_module1"); // IMPORT MODULE 1 FUNCTION
var requireModule2 = require("./download_avatar_module2"); // IMPORT MODULE 2 FUNCTION

var fs = require('fs'); // IMPORT FILE SYSTEM
const request = require('request'); //IMPORT REQUEST STREAM PACKAGE
const env = require('dotenv').config(); //tell program that we have token stored in a ".gitignored" file

if (!fs.existsSync('./.env')) { // if token file does not exist throw an error
  throw ('.env file does not exist');
}

if (process.argv.length == 4) { //checks too see if you have the right amount of arguments
  requireModule2.getRepoContributors(process.argv[2], process.argv[3], requireModule2.downloadImageByURL)
}
else if (process.argv.length > 4) { // if you have too many arguments throw an error
  console.log("too many arguments!");
}
else { // if you have too few arguments throw an error
  console.log("too few arguments!")
}