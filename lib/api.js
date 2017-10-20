const axios = require('axios');
const parse = require('date-fns/parse');
const Promise = require('bluebird');
const github = require('github');
const extend = require('util')._extend;

module.exports = class API {
  constructor(accessToken = '') {
    this.client = new github({
      debug: false,
      headers: {
        'user-agent': 'Stark',
        accept: 'application/vnd.github.v3.star+json',
      },
      Promise: Promise,
    });
    this.client.authenticate({ type: 'oauth', token: accessToken });
  }

  async starredWithReadme(callback) {
    const _client = this.client;

    async function _pager(response) {
      console.log('got response:', response.data.length);
      console.log(response.meta);

      for (const star of response.data) {
        console.log('fetching readme:', star.repo.full_name);

        let readme = '';
        try {
          console.log({ owner: star.repo.owner.login, repo: star.repo.name });
          const readmeResponse = await _client.repos.getReadme({
            owner: star.repo.owner.login,
            repo: star.repo.name,
          });
          readme = new Buffer(readmeResponse.data.content, 'base64').toString();
        } catch (err) {
          console.log('readme not found', err);
        }

        const record = {
          id: star.repo.id,
          name: star.repo.name,
          owner: star.repo.owner.login,
          full_name: star.repo.full_name,
          description: star.repo.description,
          url: star.repo.url,
          html_url: star.repo.html_url,
          clone_url: star.repo.clone_url,
          starred_at: parse(star.starred_at),
          created_at: parse(star.repo.created_at),
          pushed_at: parse(star.repo.pushed_at),
          homepage: star.repo.homepage,
          size: star.repo.size,
          stargazers_count: star.repo.stargazers_count,
          subscribers_count: star.repo.subscribers_count,
          forks_count: star.repo.forks_count,
          open_issues_count: star.repo.open_issues_count,
          language: star.repo.language,
          readme,
        };

        callback(record);
      }

      if (_client.hasNextPage(response)) {
        return _client.getNextPage(response).then(_pager);
      }

      console.log('no more pages');
    }

    _client.activity
      .getStarredRepos({
        per_page: 100,
      })
      .then(_pager);
  }
};
