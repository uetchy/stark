import { Github } from './githubService'
import { createDatastore } from '../database'
import { promisify } from 'util'

// fetch and index all starred repos
export async function createIndex(githubToken: string) {
  const github = new Github(githubToken)
  const db = createDatastore()

  try {
    const repos = (await github.starredRepos(
      (res: API.Response, link: string) => {}
    )) as API.Response[]
    for (const repo of repos) {
      const doc = await promisify(db.insert.bind(db))(repo)
      console.log('added', repo.name)
    }
  } catch (err) {
    throw err
  }
}
