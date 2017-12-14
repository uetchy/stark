const GitHubAPI = require('github');

function fetchStars() {
  const client = new GitHubAPI({
    // optional
    debug: true,
    protocol: 'https',
    host: 'api.github.com', // should be api.github.com for GitHub
    headers: {
      'user-agent': 'Stark', // GitHub is happy with a unique user agent
    },
    Promise: require('bluebird'),
    followRedirects: true, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000,
  });

  client.authenticate({ type: 'oauth', token: process.env.GITHUB_TOKEN });

  var starredRepos = [];

  var req = client.activity.getStarredRepos(
    {
      per_page: 100,
    },
    getRepos
  );
  function getRepos(err, res) {
    if (err) {
      return false;
    }

    starredRepos = starredRepos.concat(res);
    if (client.hasNextPage(res)) {
      // client.getNextPage(res, getRepos)
      console.log(
        starredRepos.map(function(repo) {
          return repo['full_name'];
        })
      );
      console.log('starred repos: ' + starredRepos.length);
    } else {
      console.log(
        starredRepos.map(function(repo) {
          return repo['full_name'];
        })
      );
      console.log('starred repos: ' + starredRepos.length);
    }
  }
}

module.exports = {
  fetchStars,
};
