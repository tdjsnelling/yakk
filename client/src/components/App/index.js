import React, { Component } from 'react'
import io from 'socket.io-client'
import request from 'request'
import moment from 'moment'
import Linkify from 'linkifyjs/react'
import ga from 'react-ga'

import './App.css'

const isDev = process.env.REACT_APP_ENV !== 'production'
const SERVER = isDev ? 'http://localhost:3001' : 'https://s.yakk.xyz'

class App extends Component {
  constructor(props) {
    super(props)

    const isHuman = props.location.state ? props.location.state.passedCaptcha : false
    this.notificationSound = new Audio('/sounds/definite.mp3')

    this.state = {
      isHuman: isHuman,
      socket: null,
      partner: null,
      connected: false,
      messages: [],
      usersOnline: 0,
      isTyping: {
        self: false,
        partner: false
      },
      pressedEscape: false
    }

    this.messageContainerRef = React.createRef()
    this.messageRef = React.createRef()

    this.findPartner = this.findPartner.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.toggleOptions = this.toggleOptions.bind(this)
    this.monitorTyping = this.monitorTyping.bind(this)
  }

  componentDidMount() {
    if (!this.state.isHuman) {
      this.props.history.push('/')
      return 1
    }

    ga.initialize('UA-87488863-5')
    ga.pageview(window.location.pathname + window.location.search)

    window.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        if (!this.state.pressedEscape) {
          this.setState({ pressedEscape: true })
        }
        else {
          this.findPartner()
        }
      }
    })

    const socket = io(SERVER)

    socket.on('connect', () => {
      this.setState({
        socket: socket,
        partner: null,
        connected: true
      })

      this.findPartner()
    })

    socket.on('foundPartner', partnerId => {
      this.setState({
        partner: partnerId
      })

      this.setState({
        messages: []
      })

      let messages = [...this.state.messages]
      if (isDev) {
        messages.push({ d: 'in', m: `Connected to partner ${this.state.partner}. Start yakking!`, t: Date.now() })
      }
      else {
         messages.push({ d: 'in', m: 'Connected to partner. Start yakking!', t: Date.now() })
      }
      this.setState({
        messages: messages
      })

      ga.event({
        category: 'Social',
        action: 'Conversation initiated'
      })
    })

    socket.on('message', message => {
      let messages = [...this.state.messages]
      messages.push(message)
      this.setState({
        messages: messages
      })

      this.messageContainerRef.current.scrollTop = this.messageContainerRef.current.scrollHeight
      this.notificationSound.play()
    })

    socket.on('count', count => {
      this.setState({
        usersOnline: count
      })
    })

    socket.on('userDisconnect', id => {
      if (id === this.state.partner) {
        let messages = [...this.state.messages]
        messages.push({ d: 'in', m: 'Partner disconnected! Click above to find a new one.', t: Date.now() })
        this.setState({
          partner: null,
          messages: messages
        })

        request(`${SERVER}/makeFree/` + this.state.socket.id, (err, res, body) => {
          if (err) {
            console.error(err)
          }
        })
      }
    })

    socket.on('notifyTyping', status => {
      this.setState({ isTyping: { partner: status === 'true' } })
    })
  }

  componentWillUnmount() {
    if (this.state.socket) {
      this.state.socket.close()
      this.setState({ socket: null })
    }
  }

  findPartner() {
    this.setState({
      partner: null,
      messages: [],
      pressedEscape: false
    })

    request(`${SERVER}/makeFree/` + this.state.socket.id, (err, res, body) => {
      if (err) {
        console.error(err)
      }
    })

    request(`${SERVER}/discover/` + this.state.socket.id, (err, res, body) => {
      if (body !== 'no-free-users') {
        this.setState({
          partner: body
        })

        let messages = [...this.state.messages]
        if (isDev) {
          messages.push({ d: 'in', m: `Connected to partner ${this.state.partner}. Start yakking!`, t: Date.now() })
        }
        else {
           messages.push({ d: 'in', m: 'Connected to partner. Start yakking!', t: Date.now() })
        }
        this.setState({
          messages: messages
        })
      }
      else {
        let messages = [...this.state.messages]
        messages.push({ d: 'in', m: 'Could not find a partner. Please try again!', t: Date.now() })
        this.setState({
          messages: messages
        })
      }
    })
  }

  sendMessage(e) {
    e.preventDefault()

    const messageContent = this.messageRef.current.value
    const message = { m: messageContent, t: Date.now() }
    this.messageRef.current.value = ''

    if (messageContent !== '') {
      let messages = [...this.state.messages]
      messages.push({ d: 'out', ...message })
      this.setState({
        messages: messages
      })

      setTimeout(() => {
        this.messageContainerRef.current.scrollTop = this.messageContainerRef.current.scrollHeight
      }, 10)

      request.post(`${SERVER}/send`, { form: { message: message, to: this.state.partner } }, (err, res, body) => {
        if (err) {
          console.error(err)
        }
      })

      this.notifyOfTyping(false)
    }

    ga.event({
      category: 'Social',
      action: 'Message sent'
    })
  }

  notifyOfTyping(status) {
    request.post(`${SERVER}/typing`, { form: { isTyping: status, to: this.state.partner } }, (err, res, body) => {
      if (err) {
        console.error(err)
      }
    })
  }

  toggleOptions() {
    this.setState({ showOptions: !this.state.showOptions })
  }

  monitorTyping() {
    if (!this.state.isTyping.self) {
      this.setState({ isTyping: { self: true } })
      this.notifyOfTyping(true)
      setTimeout(() => {
        this.setState({ isTyping: { self: false } })
        this.notifyOfTyping(false)
      }, 2000)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="Nav">
          <div className="NavGroup">
            <h1 className="NavLogo"><a href="/">yakk</a></h1>
            {(this.state.connected && isDev) && <p className="hidden-mobile">ID: {this.state.socket.id}</p>}
            {!this.state.connected && <p>unable to connect! we'll keep trying for you...</p>}
          </div>
          <div className="NavGroup">
            <p className="hidden-mobile">{`${this.state.usersOnline}  users online!`}</p>
            <button onClick={this.findPartner}>{this.state.pressedEscape ? 'Are you sure? (ESC)' : 'Find a new partner'}</button>
          </div>
        </header>
        <div className="Messages" ref={this.messageContainerRef}>
          {!this.state.connected && <i className="material-icons loading">hourglass_empty</i>}
          {this.state.messages.map((message, i) => (
            <div className={`Message ${message.d === 'out' ? 'out' : 'in'}`} key={i}>
              <span className="Timestamp">{moment(parseInt(message.t, 10)).format('HH:mm:ss')}</span>
              <Linkify tagName="span" className="MessageText">{message.m}</Linkify>
            </div>
          ))}
        </div>
        {this.state.partner &&
          <div className="SendMessageWrapper">
            {this.state.isTyping.partner && <div className="PartnerTyping">partner is typing...</div>}
            <div className="SendMessage">
              <form onSubmit={this.sendMessage}>
                <input type="text" ref={this.messageRef} onChange={this.monitorTyping} />
                <button><i className="material-icons">send</i></button>
              </form>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default App
