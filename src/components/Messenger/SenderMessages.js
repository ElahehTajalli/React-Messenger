import React from 'react'

export default class SenderMessages extends React.Component {
  render () {
    return (
      <div className={this.props.className} >
        <span>{this.props.text}</span>
        <span className='time'>{this.props.time}</span>
      </div>
    )
  }
}
