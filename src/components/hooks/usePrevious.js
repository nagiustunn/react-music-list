import React, { Component, useRef, useEffect } from 'react'

const usePrevious = (value) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  })
}
export default class usePrevious extends Component {
  render() {
    return ref.current
  }
}
