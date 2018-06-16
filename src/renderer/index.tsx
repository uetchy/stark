import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'

const render = () => {
  ReactDOM.render(<App />, document.querySelector('#app'))
}

render()
