import Routes from './routes'
import { Provider } from 'react-redux'
import React from 'react'

import store from './store'

function App () {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes/>
      </Provider>
    </div>
  )
}

export default App
