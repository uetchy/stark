import { Github } from './githubService'
import { createDatastore } from '../database'

// fetch and index all starred repos
export function createIndex() {
  return new Promise((resolve, reject) => {
    const github = new Github(process.env.GITHUB_TOKEN)
    const db = createDatastore()

    let currentLink = null
    github.starredRepos((res: API.Response, link: string) => {
      currentLink = link
      db.insert(res, (err, newDoc) => {
        console.log('added')
      })
    })
  })
}
