import test from 'ava'
import * as SearchService from '../dist/services/searchService'

import dotenv from 'dotenv'
dotenv.config()

const githubToken = process.env.GITHUB_TOKEN

test(async t => {
  await t.notThrows(SearchService.createIndex(githubToken))
})
