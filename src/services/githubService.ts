import axios from 'axios'
import * as parse from 'date-fns/parse'
import * as octokit from '@octokit/rest'

export class Github {
  client: octokit

  constructor(accessToken = '') {
    this.client = new octokit({
      headers: {
        'user-agent': 'Stark',
        accept: 'application/vnd.github.v3.star+json',
      },
    })
    this.client.authenticate({ type: 'oauth', token: accessToken })
  }

  async starredRepos() {
    const _client = this.client
    let records: GithubAPI.Response[] = []

    async function _pager(
      response: octokit.AnyResponse
    ): Promise<octokit.AnyResponse | GithubAPI.Response[]> {
      console.log('got response with items:', response.data.length)
      console.log('rate limit:', response.headers['x-ratelimit-remaining'])

      for (const star of response.data) {
        const record = <GithubAPI.Response>{
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
          readme: null,
        }
        records.push(record)
      }

      if (_client.hasNextPage(response.headers)) {
        console.log('goto next page')
        const nextResponse = await _client.getNextPage(response.headers)
        return await _pager(nextResponse)
      }

      console.log('no more pages')
      return records
    }

    const response = await _client.activity.getStarredRepos({
      per_page: 30, // DEBUG
      page: 100,
    })
    return await _pager(response)
  }

  async getReadme(owner: string, repo: string): Promise<string> {
    try {
      console.log({ owner, repo })
      const readmeResponse = await this.client.repos.getReadme({
        owner,
        repo,
      })
      const readme = Buffer.from(
        readmeResponse.data.content,
        'base64'
      ).toString()
      console.log('readme length:', readme.length)
      return readme
    } catch (err) {
      console.log('readme not found', err)
      throw err
    }
  }
}
