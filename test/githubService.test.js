import test from 'ava'
import * as GithubService from '../dist/services/githubService'

import dotenv from 'dotenv'
dotenv.config()

const githubToken = process.env.GITHUB_TOKEN

test(async t => {
  const client = new GithubService.Github(githubToken)

  try {
    await t.notThrows(client.starredRepos())
  } catch (err) {
    throw err
  }
})
