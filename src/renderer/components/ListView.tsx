import * as React from 'react'

import List from '../components/List'
import SearchBox from '../components/SearchBox'

interface ListViewProps {
  onSearchQueryChanged: Function
  onRepoClicked: Function
  repos: GithubService.Repository[]
}

export default class ListView extends React.Component<ListViewProps> {
  render() {
    return (
      <div>
        <SearchBox searchRepos={this.props.onSearchQueryChanged} />
        <List
          repos={this.props.repos}
          onRepoClicked={this.props.onRepoClicked}
        />
      </div>
    )
  }
}
