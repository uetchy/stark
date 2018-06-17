import * as React from 'react'

interface ReadmeProps {
  readme: string
}

export default class Readme extends React.Component<ReadmeProps> {
  render() {
    return (
      <div>
        <div>{this.props.readme}</div>
      </div>
    )
  }
}
