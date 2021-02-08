import Routes from './routes'
import { Provider } from 'react-redux'
import React from 'react'

// store redux
import store from './store'
// componentes
// import Social from './components/social/Social'
// import Group from './components/group/Group'

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
