import * as octokit from '@octokit/rest'

export function fetchStars() {
  const client = new octokit({
    protocol: 'https',
    host: 'api.github.com',
    headers: {
      'user-agent': 'Stark',
    },
    timeout: 5000,
  })

  client.authenticate({ type: 'oauth', token: process.env.GITHUB_TOKEN })

  var starredRepos = []

  const req = client.activity.getStarredRepos(
    {
      per_page: 100,
    },
    getRepos
  )

  function getRepos(err, res) {
    if (err) {
      return false
    }

    starredRepos = starredRepos.concat(res)
    if (client.hasNextPage(res)) {
      // client.getNextPage(res, getRepos)
      console.log(
        starredRepos.map(function(repo) {
          return repo['full_name']
        })
      )
      console.log('starred repos: ' + starredRepos.length)
    } else {
      console.log(
        starredRepos.map(function(repo) {
          return repo['full_name']
        })
      )
      console.log('starred repos: ' + starredRepos.length)
    }
  }
}
