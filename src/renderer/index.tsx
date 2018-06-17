import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './containers/App'
import reducers from './lib/reducers'

const store = createStore(reducers)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
)
