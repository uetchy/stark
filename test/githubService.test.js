import test from 'ava'
import * as GithubService from '../dist/services/githubService'

import dotenv from 'dotenv'
import { log } from 'util'
dotenv.config()

const githubToken = process.env.GITHUB_TOKEN

test(async t => {
  const client = new GithubService.Github(githubToken)
  let count = 0
  try {
    const result = await client.starredRepos((res, link) => {
      t.regex(
        link,
        /<https:\/\/api\.github\.com\/user\/starred\?access_token=.+?/
      )
      count += 1
    })
    console.log('Promise resolved!')
    t.is(count, result.length)
    return result
  } catch (err) {
    console.log('Promise got error!')
    throw err
  }
})
