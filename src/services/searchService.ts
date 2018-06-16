import { Github } from './githubService'
import { Datastore } from '../datastore'

// fetch and index all starred repos
export async function createIndex(githubToken: string) {
  const github = new Github(githubToken)
  const db = new Datastore()

  try {
    const repos = (await github.starredRepos()) as GithubAPI.Response[]
    for (const repo of repos) {
      const doc = await db.insert(repo)
      console.log('added', repo.name)
    }
  } catch (err) {
    throw err
  }
}
