import React from 'react'
import PropTypes from 'prop-types'

import './Counter.css'

class Counter extends React.PureComponent {
  render () {
    const digits = this.props.count.toString().split('')

    return (
      <div className="Counter">
        {digits.map(digit => <div className="CounterDigit">{digit}</div>)}
      </div>
    )
  }
}

Counter.propTypes = {
  count: PropTypes.number.isRequired
}

export default Counter
