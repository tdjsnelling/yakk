import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Home'
import App from '../App'
import Terms from '../Terms'
import Privacy from '../Privacy'

const Router = () => {
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

export default Router;
