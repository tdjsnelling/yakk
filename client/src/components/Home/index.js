import React from 'react'
import PropTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
import ga from 'react-ga'
import request from 'request'
import Counter from '../primitive/Counter'

import './Home.css'

const SERVER = process.env.REACT_APP_ENV === 'production' ? 'https://yakk-api.tdjs.tech' : 'http://localhost:3001'

class Home extends React.PureComponent {
  constructor () {
    super()

    this.state = {
      userCount: 0,
      errored: false
    }

    this.recaptchaRef = React.createRef()
    this.captchaComplete = this.captchaComplete.bind(this)
  }

  componentDidMount () {
    ga.initialize('UA-87488863-5')
    ga.pageview(window.location.pathname + window.location.search)

    request(SERVER, (err, res, body) => {
      if (!err) {
        this.setState({ userCount: JSON.parse(body).users })
      } else {
        this.setState({ errored: true })
      }
    })
  }

  captchaComplete (value) {
    request.post(`${SERVER}/recaptcha`, { form: { 'response': value } }, (err, res, data) => {
      if (!err) {
        const response = JSON.parse(data)
        if (response.success) {
          this.props.history.push({ pathname: '/chat', state: { passedCaptcha: true } })
        }
      }
    })
  }

  render () {
    return (
      <div className="Wrapper">
        <div className="Container">
          <img className="Logo" src="/icon.png" alt="yakk logo" />
          <h1 className="Logotype">yakk</h1>
          <p className="Blurb">yakk is an anonymous chat service that partners you with a random user from anywhere on the planet. it is a great way to make new friends, or it's perfect if you're bored and just want to chat!</p>
          {!this.state.errored &&
            <React.Fragment>
              <Counter count={this.state.userCount} />
              <p className="UserCount">users online now</p>
              <button className="Button" onClick={() => { this.recaptchaRef.current.execute() }}>start yakking</button>
            </React.Fragment>
          }
          {this.state.errored &&
            <h3 className="ServiceError">oops, something has gone wrong. please try again later!</h3>
          }
          <ul className="Links">
            <li><a href="/terms" onClick={(e) => { e.preventDefault(); this.props.history.push('/terms') }}>terms & conditions</a></li>
            <li><a href="/privacy" onClick={(e) => { e.preventDefault(); this.props.history.push('/privacy') }}>privacy policy</a></li>
          </ul>

          <ReCAPTCHA
            ref={this.recaptchaRef}
            size="invisible"
            sitekey="6Le29X8UAAAAADGvatsZ2-O7XJjmUyoFhPKyLAqf"
            onChange={this.captchaComplete}
          />
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object
}

export default Home
