import React from 'react'
import SenderMessages from './SenderMessages.js'
import ReceiverMessages from './ReceiverMessages.js'
import moment from 'moment'

export default class Messages extends React.Component {
  componentDidMount () {
    const chatBox = document.getElementById('chat-box')
    chatBox.scrollTop = chatBox.scrollHeight
  }

  render () {
    return (
      <div className='chat-box' id='chat-box' style={{ backgroundImage: 'url(' + this.props.background + ')' }}>
        {
          // this.props.messageList.map((message, index) => {
          this.props.messages.map((message, index) => {
            return (
              message.map((message, index) => {
                if (message.sender.id === parseInt(window.localStorage.getItem('id'))) {
                  if (this.props.security) {
                    return (
                      <SenderMessages key={index} text={message.text} time={moment(message.date).add({ h: 4, m: 30 }).format('LT')} className='right-message-blur' />
                    )
                  } else {
                    return (
                      <SenderMessages key={index} text={message.text} time={moment(message.date).add({ h: 4, m: 30 }).format('LT')} className='right-message' />
                    )
                  }
                } else if (message.sender.id !== parseInt(window.localStorage.getItem('id'))) {
                  if (this.props.security) {
                    return (
                      <ReceiverMessages key={index} text={message.text} time={moment(message.date).add({ h: 4, m: 30 }).format('LT')} className='left-message-blur' />
                    )
                  } else {
                    return (
                      <ReceiverMessages key={index} text={message.text} time={moment(message.date).add({ h: 4, m: 30 }).format('LT')} className='left-message' />
                    )
                  }
                }
              })
            )
          })
        }
        {/* {(this.props.message) ? <SenderMessages text={this.props.message} time={this.props.time} /> : ''} */}
        {/* <SenderMessages text={this.props.message} time={this.props.time} /> */}
      </div>
    )
  }
}
