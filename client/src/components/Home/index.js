import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import request from 'request'

import './Home.css'

const SERVER = process.env.REACT_APP_ENV === 'production' ? 'https://s.yakk.xyz' : 'http://localhost:3001'

class Home extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      userCount: 0,
      errored: false
    }

    this.recaptchaRef = React.createRef()
    this.captchaComplete = this.captchaComplete.bind(this)
  }

  componentDidMount() {
    request(`${SERVER}/count`, (err, res, body) => {
      if (!err) {
        this.setState({ userCount: JSON.parse(body).users })
      }
      else {
        this.setState({ errored: true })
      }
    })
  }

  captchaComplete(value) {
    request.post(`${SERVER}/recaptcha`, { form: { 'response': value } }, (err, res, data) => {
      if (!err) {
        const response = JSON.parse(data)
        console.dir(response)
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
          <h1 className="Logotype">yakk</h1>
          <p className="Blurb">yakk is an anonymous chat service that partners you with a random user from anywhere on the planet. it is a great way to make new friends, or it's perfect if you're bored and just want to chat!</p>
          {!this.state.errored &&
            <React.Fragment>
              <p className="UserCount">{this.state.userCount} users online now</p>
              <a className="Button" onClick={ () => { this.recaptchaRef.current.execute() } }>start yakking</a>
            </React.Fragment>
          }
          {this.state.errored &&
            <h3 className="ServiceError">oops, something has gone wrong. please try again later!</h3>
          }
          <ul className="Links">
            <li><a onClick={ () => { this.props.history.push('/terms') } }>terms & conditions</a></li>
            <li><a onClick={ () => { this.props.history.push('/privacy') } }>privacy policy</a></li>
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

export default Home
