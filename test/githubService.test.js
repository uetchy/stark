import test from 'ava'
import dotenv from 'dotenv'

import { GithubService } from '../dist/services/githubService'

dotenv.config()
const githubToken = process.env.GITHUB_TOKEN

test(async t => {
  const service = new GithubService(githubToken)

  try {
    await t.notThrows(service.starredRepos())
  } catch (err) {
    throw err
  }
})

test(async t => {
  const service = new GithubService(githubToken)

  try {
    const readme = await service.getReadme('maglev', 'Maglev')
    t.true(readme.length > 0)
  } catch (err) {
    throw err
  }
})
