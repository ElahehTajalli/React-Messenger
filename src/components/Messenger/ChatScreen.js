import React from 'react'
import ContactProfileContainer from '../../container/ContactProfileContainer'
import MessagesContainer from '../../container/MessagesContainer'
import MessageInputContainer from '../../container/MessageInputContainer'

export default class ChatScreen extends React.Component {
  render () {
    return (
      <>
        {(this.props.image)
          ? <div className='chat-screen' id='chatScreen' >
            <ContactProfileContainer />
            <MessagesContainer />
            <MessageInputContainer />
          </div>
          : ''
        }
      </>
    )
  }
}
