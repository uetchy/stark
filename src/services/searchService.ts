import { GithubService } from './githubService'
import { Datastore } from '../datastore'

export class SearchService {
  dbPath: string
  db: Datastore

  constructor(dbPath: string) {
    this.dbPath = dbPath
    this.db = new Datastore(this.dbPath)
  }

  // fetch and index all starred repos and returns processed count
  // if repo exists, then skip it
  async createIndex(githubToken: string) {
    const github = new GithubService(githubToken)

    let count = 0

    try {
      const repos = (await github.starredRepos()) as GithubService.Repository[]
      for (const repo of repos) {
        if (await this.db.exist(repo.id)) continue
        console.log('index', repo.full_name)
        await this.db.insert(repo)
        count += 1
      }
    } catch (err) {
      throw err
    }

    return count
  }

  // create readme index and returns processed count
  async createReadmeIndex(githubToken: string) {
    const github = new GithubService(githubToken)

    let count = 0

    try {
      const reposWithoutReadme = await this.db.find({ readme: null })
      for (const repo of reposWithoutReadme) {
        try {
          const readme = await github.getReadme(repo.owner, repo.name)
          await this.db.update(
            { _id: repo._id },
            { $set: { readme: readme, readme_fetched_at: new Date() } }
          )
          console.log('readme', repo.full_name)
          count += 1
        } catch (err) {
          console.log(repo.owner, repo.name, 'ERR')
          continue
        }
      }
    } catch (err) {
      throw err
    }

    return count
  }

  async search(query: any): Promise<GithubService.Repository[]> {
    return this.db.find(query)
  }
}
