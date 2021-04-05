import React, { Component, useEffect } from 'react' 
import './css/Toast.css'

const Toast = ({ toast, close }) => {
    useEffect(() => {
      if (!toast) return
  
      const closeToast = () => {
        setTimeout(() => {
          close()
        }, 2500)
      }
  
      closeToast()
  
      return () => clearTimeout(closeToast)
    }, [toast])
  
    if (!toast) return null
}

export default class Toast extends Component {
    
    render() {
        return (
            <div className="toast">
                {toast}
            </div>
        )
    }
}
