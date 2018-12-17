import React from 'react'

import './NotFound.css'

class NotFound extends React.PureComponent {
  render () {
    return (
      <div className="Wrapper">
        <div className="Container">
          <pre>{`
             _--,-----,_
         ,-,-----       ''-.,_
 /)     (\\                   '''-.
( ( .,-') )                      ''
 \\ '    (_/                      !!
  |       /            '          !!!
  '\\    ^'            '     !    !!!!
    !      _/! , !   !  ! !  !   !!!
     \\Y,   |!!!  !  ! !!  !! !!!!!!!
       '!!! !!!! !!  )!!!!!!!!!!!!!
        !!  ! ! \\( \\(  !!!|/!  |/!
              /_(/_(    /_(  /_(
          `}</pre>
          <h2 className="NotFoundPrompt">the page you're looking for doesn't exist. maybe you should head back <a href="/" className="HomeLink">home</a>.</h2>
        </div>
      </div>
    )
  }
}

export default NotFound
