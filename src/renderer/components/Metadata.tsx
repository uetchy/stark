import * as React from 'react'

interface MetadataProps {
  description: string
  language: string
}

export default class Metadata extends React.Component<MetadataProps> {
  render() {
    return (
      <div>
        <div>{this.props.description}</div>
        <div>{this.props.language}</div>
      </div>
    )
  }
}
