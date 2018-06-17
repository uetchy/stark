import * as React from 'react'

import Metadata from '../components/Metadata'
import Readme from '../components/Readme'

interface DetailViewProps {
  repo?: GithubService.Repository
}

export default class DetailView extends React.Component<DetailViewProps> {
  render() {
    const { repo } = this.props
    return (
      <div>
        <Metadata description={repo.description} language={repo.language} />
        <Readme readme={repo.readme} />
      </div>
    )
  }
}
