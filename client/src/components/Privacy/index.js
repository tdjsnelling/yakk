import React from 'react'
import ga from 'react-ga'
import PropTypes from 'prop-types'

import '../Terms/Terms.css'

class Terms extends React.PureComponent {
  componentDidMount () {
    ga.initialize('UA-87488863-5')
    ga.pageview(window.location.pathname + window.location.search)
  }

  render () {
    return (
      <div className="Terms">
        <a href="/" onClick={(e) => { e.preventDefault(); this.props.history.push('/') }}>&larr; back</a>
        <h2>yakk</h2>
        <h3>privacy policy</h3>

        <p>we do not collect any data directly. however, we may employ third-party companies and individuals on our websites - for example, analytics providers and content partners. these third parties have access to your personal information only to perform specific tasks on our behalf, and are obligated not to disclose or use it for any other purpose.</p>
      </div>
    )
  }
}

Terms.propTypes = {
  history: PropTypes.object
}

export default Terms
