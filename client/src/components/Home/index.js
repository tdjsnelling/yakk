import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import request from 'request'

import './Home.css'

const SERVER = 'http://localhost:3001'

class Home extends React.PureComponent {
  constructor() {
    super()
    this.recaptchaRef = React.createRef()
    this.captchaComplete = this.captchaComplete.bind(this)
  }

  captchaComplete(value) {
    request.post(`${SERVER}/recaptcha`, { form: { 'response': value } }, (err, res, data) => {
      if (!err) {
        const response = JSON.parse(data)
        console.dir(response)
        if (response.success) {
          this.props.history.push('/chat')
        }
      }
    })
  }

  render () {
    return (
      <div className="Wrapper">
        <div className="Container">
          <h1 className="Logotype">yakk</h1>
          <p className="Blurb">yakk is an anonymous chat service that partners you with a random user from anywhere on the planet. it is a great way to make new friends, or it's perfect if you're just bored and want to chat!</p>
          <a className="Button" onClick={ () => { this.recaptchaRef.current.execute() } }>start yakking</a>
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
