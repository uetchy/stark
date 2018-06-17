import * as React from 'react'

interface Props {
  repos: GithubService.Repository[]
  onRepoClicked: Function
}

export default class List extends React.Component<Props> {
  render() {
    const { repos, onRepoClicked } = this.props
    return (
      <ul>
        {this.props.repos.length > 0 ? (
          this.props.repos.map(repo => (
            <li key={repo.id} onClick={e => onRepoClicked(repo)}>
              {repo.full_name}
            </li>
          ))
        ) : (
          <li>no repo found</li>
        )}
      </ul>
    )
  }
}
