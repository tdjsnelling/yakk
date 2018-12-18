import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Home'
import App from '../App'
import Terms from '../Terms'
import Privacy from '../Privacy'
import NotFound from '../NotFound'

class Router extends React.Component {
  componentDidMount () {
    console.log(`
             _--,-----,_
          _,-,-----       ''-.,_
 /)     (\\                   '''-.
( ( .,-') )                      ''
 \\ '   (_/                       !!
  |       /            '          !!!
  '\\    ^'            '     !    !!!!
    !      _/! , !   !  ! !  !   !!!
     \\Y,   |!!!  !  ! !!  !! !!!!!!!
       '!!! !!!! !!  )!!!!!!!!!!!!!
        !!  ! ! \\( \\(  !!!|/!  |/!
              /_(/_(    /_(  /_(

want to know how yakk works? it's open source! https://github.com/tdjsnelling/yakk`)
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/chat" component={App} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
