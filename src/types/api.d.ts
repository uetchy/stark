declare namespace API {
  interface Response {
    id: number
    name: string
    owner: string
    full_name: string
    description: string
    url: string
    html_url: string
    clone_url: string
    starred_at: Date
    created_at: Date
    pushed_at: Date
    homepage: string
    size: number
    stargazers_count: number
    subscribers_count: number
    forks_count: number
    open_issues_count: number
    language: string
    readme?: string
  }
}
