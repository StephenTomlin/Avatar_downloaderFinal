const gitRequest = require('./download_avatar_module1'); //import function from "download_avatar_module 1"
const fs = require('fs'); // import file system package
const request = require('request'); //import request stream package
module.exports = {
  getRepoContributors: getRepoContributors,
  downloadImageByURL: downloadImageByURL
};
function getRepoContributors(repoOwner, repoName, callback) { //define function that takes CLI INPUTS and has a callback function argument
  gitRequest(`/repos/${repoOwner}/${repoName}/contributors`, (err, response, body) => {
    var data = JSON.parse(body) //info is pulled in JSON and is parsed into variable data
    if (err) {
      throw err;
    }
    if (response.statusCode === 404) { //git hub repository or repo owner does not exist
      throw `${repoOwner} and/or ${repoName} does not exist`
    }
    if (response.statusCode === 401) { // if token is not valid throw an error
      throw "Invalid token."
    }
    else if (!fs.existsSync('avatar')) { //if avatar folder does not exist create it
      fs.mkdirSync('avatar');
    }
    for (var i = 0; i < data.length; i++) { //send each avatar_url to the callback function
      callback(data[i].avatar_url, `./avatar/${data[i].login}.jpg`);
    };
  });
}
function downloadImageByURL (url, path) { // create function that takes the url of the image and downloads them to the determined path
  request(url).pipe(fs.createWriteStream(path));
}