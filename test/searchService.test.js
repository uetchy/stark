import test from 'ava'
import * as SearchService from '../dist/services/searchService'

import dotenv from 'dotenv'
dotenv.config()

test.cb(async t => {
  const result = await Search.createIndex()
  t.end()
})
