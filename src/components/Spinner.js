import React, { Component } from 'react'
import Book from './Book.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div>
        <img src={Book} alt="Loading" />
      </div>
    )
  }
}
