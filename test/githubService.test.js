import test from 'ava'
import * as GithubService from '../dist/services/githubService'

import dotenv from 'dotenv'
dotenv.config()

test.cb(async t => {
  const client = new GithubService.Github(process.env.GITHUB_TOKEN)
  try {
    const res = await client.starredRepos((res, link) => {
      t.regex(
        link,
        /<https:\/\/api\.github\.com\/user\/starred\?access_token=.+?/
      )
    })
    console.log('Promise resolved!')
    t.end()
  } catch (err) {
    console.log('Promise got error!')
    t.end()
  }
})
