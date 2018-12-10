import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Home'
import App from '../App'
import Terms from '../Terms'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/chat' component={App} />
        <Route path='/terms' component={Terms} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
