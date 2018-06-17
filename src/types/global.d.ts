declare namespace GithubService {
  interface Repository {
    _id?: string
    id: number
    owner: string
    name: string
    full_name: string
    description: string
    readme?: string
    readme_fetched_at?: Date
    fetched_at: Date
    starred_at: Date
    created_at: Date
    pushed_at: Date
    url: string
    html_url: string
    clone_url: string
    homepage: string
    size: number
    stargazers_count: number
    subscribers_count: number
    forks_count: number
    open_issues_count: number
    language: string
  }
}

interface IStoreState {
  dbPath: string
  githubToken: string
  repos: GithubService.Repository[]
}
