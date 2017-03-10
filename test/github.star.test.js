import test from 'ava'
import starAPI from '../src/lib/github/star'

require('dotenv').config()

test(t => {
  console.log(starAPI.fetchStars())
})
