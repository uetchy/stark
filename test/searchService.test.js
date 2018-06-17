import test from 'ava'
import dotenv from 'dotenv'

import { SearchService } from '../dist/services/searchService'

dotenv.config()
const githubToken = process.env.GITHUB_TOKEN
const dbPath = './stars.db'

test.serial(async t => {
  const service = new SearchService(dbPath)
  const count = await service.createIndex(githubToken)
  console.log('fetched repos', count)
  t.pass()
})

test.serial(async t => {
  const service = new SearchService(dbPath)
  const count = await service.createReadmeIndex(githubToken)
  console.log('fetched readme', count)
  t.pass()
})

test.serial(async t => {
  const service = new SearchService(dbPath)
  const result = await service.search({ name: 'rubinius' })
  console.log('result count', result.length)
  t.is(result.length, 1)
})
