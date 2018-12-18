import React from 'react'
import ga from 'react-ga'

import './Terms.css'

class Terms extends React.PureComponent {
  componentDidMount () {
    ga.initialize('UA-87488863-5')
    ga.pageview(window.location.pathname + window.location.search)
  }

  render () {
    return (
      <div className="Terms">
        <h2>yakk</h2>
        <h3>terms & conditions</h3>

        <p>By using the yakk Web site, and/or related products and/or services, you agree to the following terms: Do not use yakk if you are under 13. If you are under 18, use it only with a parent/guardian's permission. Do not transmit nudity, sexually harass anyone, publicize other peoples' private information, make statements that defame or libel anyone, violate intellectual property rights, use automated programs to start chats, or behave in any other inappropriate or illegal way on yakk.</p>
        <p>Understand that human behavior is fundamentally uncontrollable, that the people you encounter on yakk may not behave appropriately, and that they are solely responsible for their own behavior. Use yakk at your own peril. Disconnect if anyone makes you feel uncomfortable. You may be denied access to yakk for inappropriate behavior, or for any other reason.</p>
        <p>YAKK IS PROVIDED AS IS, AND TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, IT IS PROVIDED WITHOUT ANY WARRANTY, EXPRESS OR IMPLIED, NOT EVEN A WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, THE PROVIDER OF YAKK, AND ANY OTHER PERSON OR ENTITY ASSOCIATED WITH YAKK'S OPERATION, SHALL NOT BE HELD LIABLE FOR ANY DIRECT OR INDIRECT DAMAGES ARISING FROM THE USE OF YAKK, OR ANY OTHER DAMAGES RELATED TO YAKK OF ANY KIND WHATSOEVER.</p>
        <a className="Mail" href="mailto:contact@yakk.xyz">contact@yakk.xyz</a>
      </div>
    )
  }
}

export default Terms
