import React from 'react'

export default class ReceiverMessages extends React.Component {
  render () {
    return (
      <div className={this.props.className} >
        <span>{this.props.text}</span>
        <span className='time'>{this.props.time}</span>
      </div>
    )
  }
}
