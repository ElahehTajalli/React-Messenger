import React from 'react'
// import './App.css'
import './App.scss'
import Login from './components/auth/Login.js'
import Messenger from './components/Messenger/Messenger'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignUp from './components/auth/SignUp.js'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import conversation from './reducer/Conversation'
import logger from 'redux-logger'
import Profile from './components/auth/Profile'

const store = createStore(conversation, applyMiddleware(logger))

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Route path='/' exact component={Login} />
          <Route path='/signup/' exact component={SignUp} />
          <Route path='/profile/' exact component={Profile} />
          <Route path='/messenger/' component={Messenger} />
        </Router>
      </Provider>
    )
  }
}
export default App
