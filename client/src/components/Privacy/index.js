import React from 'react'

import '../Terms/Terms.css'

class Terms extends React.PureComponent {
  render () {
    return (
      <div className="Terms">
        <h3>privacy policy</h3>

        <p>we don't store your data, period.</p>
        <p>the only cookies used by this site are 3rd party cookies, e.g. Google to provide reCAPTCHA. for 3rd party privacy policies, please refer to the respective sites.</p>
      </div>
    )
  }
}

export default Terms
