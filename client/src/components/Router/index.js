import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Home'
import App from '../App'
import Terms from '../Terms'
import Privacy from '../Privacy'

class Router extends React.Component {
  componentDidMount() {
    console.log('want to know how yakk works? it\'s open source! https://github.com/tdjsnelling/yakk')
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/chat' component={App} />
          <Route path='/terms' component={Terms} />
          <Route path='/privacy' component={Privacy} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
