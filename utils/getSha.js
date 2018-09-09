const GitHub = require('github-api')
const fetch = require('node-fetch')

const username = 'mrluit';
const repoName = 'etherscamdb';
const branchName = 'master';
const filePath = '_data/scams.yaml'

var fileName = filePath.split(/(\\|\/)/g).pop();
var fileParent = filePath.substr(0, filePath.lastIndexOf("/"));

module.exports = async (accessToken) => {
    const gh = new GitHub({
      token: accessToken
    });
    var repo = gh.getRepo(username, repoName);
    return new Promise(function(resolve, reject) {
        fetch('https://api.github.com/repos/' +
              username + '/' +
              repoName + '/git/trees/' +
              encodeURI(branchName + ':' + fileParent), {
                headers: {
                  "Authorization": "token " + accessToken
                }
              }).then(function(response) {
              return response.json();
            }).then(function(content) {
              var file = content.tree.filter(entry => entry.path === fileName);
              if (file.length > 0) {
                return(file[0].sha)
              } else {
                reject("file " + fileName + " not found");
              }
            }).then(function(output) {
                resolve(output)
            })
    })
}
