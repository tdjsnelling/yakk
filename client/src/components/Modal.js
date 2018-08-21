import React, { Component } from 'react'

import './Modal.css'

class Modal extends Component {
  render () {
    const { title, children, toggle } = this.props
    return (
      <div className="ModalContainer">
        <div className="Modal">
          <div className="ModalHeader">
            <h2>{title}</h2>
          </div>
          <div className="ModalBody">
            {children}
          </div>
          <div className="ModalFooter">
            <button>Save</button>
            <button onClick={toggle}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
