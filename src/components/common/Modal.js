import React, { Component } from 'react'
import './css/Modal.css'

const Modal = ({ children, show, close }) => {
  if (!show) return null
}
export default class Modal extends Component {
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <i className="fa fa-times" onClick={close} />
          {children}
        </div>
      </div>
    )
  }
}
