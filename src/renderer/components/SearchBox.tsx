import * as React from 'react'

interface SearchBoxProps {
  searchRepos: Function
}

export default class SearchBox extends React.Component<SearchBoxProps> {
  render() {
    return (
      <div>
        <input
          type="text"
          onChange={e => this.props.searchRepos(e.target.value)}
        />
      </div>
    )
  }
}
