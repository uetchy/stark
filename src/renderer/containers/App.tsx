import * as React from 'react'
import { connect } from 'react-redux'

import DetailView from '../components/DetailView'
import ListView from '../components/ListView'

import * as actions from '../lib/repos/actions'
import { Dispatch, Action } from 'redux'
import { SearchService } from '../../services/searchService'

interface Props {
  repos: GithubService.Repository[]
  dbPath: string
  githubToken: string
  onReposLoaded: any
  onIndexCreated: any
  onReadmeIndexCreated: any
}

interface State {
  selectedRepository?: GithubService.Repository
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { selectedRepository: null }
  }

  componentDidMount() {
    this.loadDatastore()
  }

  onSearchQueryChanged(queryText: string) {
    console.log('search for', queryText)
  }

  onRepoClicked(repo: GithubService.Repository) {
    this.setState({ selectedRepository: repo })
  }

  async loadDatastore() {
    const { dbPath, onReposLoaded } = this.props
    const service = new SearchService(dbPath)
    const result = await service.search({}) // search all
    onReposLoaded(result)
  }

  async updateRepos() {
    const { dbPath, githubToken } = this.props
    const service = new SearchService(dbPath)
    const count = await service.createIndex(githubToken)
    this.props.onIndexCreated(count)

    const readmeCount = await service.createReadmeIndex(githubToken)
    this.props.onReadmeIndexCreated(readmeCount)

    const repos = await service.search({})
    this.props.onReposLoaded()
  }

  render() {
    return (
      <div>
        <ListView
          repos={this.props.repos}
          onSearchQueryChanged={this.onSearchQueryChanged}
          onRepoClicked={this.onRepoClicked}
        />
        <DetailView repo={this.state.selectedRepository} />
      </div>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    dbPath: state.dbPath,
    githubToken: state.githubToken,
    repos: state.repos,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onReposLoaded: () => dispatch(actions.loadRepos()),
    onIndexCreated: (count: number) =>
      dispatch(actions.createIndexCompleted(count)),
    onReadmeIndexCreated: (count: number) =>
      dispatch(actions.createReadmeIndexCompleted(count)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
