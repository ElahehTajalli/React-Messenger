import React from 'react'
import ContactProfileContainer from '../../container/ContactProfileContainer'
import MessagesContainer from '../../container/MessagesContainer'
import MessageInputContainer from '../../container/MessageInputContainer'
import axios from 'axios'

export default class ChatScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      interval : ''
    }
  }

  componentDidMount () {
    const interval = setInterval(() => {
      const fdata = new FormData()
      fdata.append('token', window.localStorage.getItem('token'))
      fdata.append('conversation_id', this.props.id)
      axios.post('https://api.paywith.click/conversation/seen/', fdata)
        .then((response) => {
        })
        .catch(function (error) {
          console.log(error)
        })
    }, 3000);
    this.setState({ interval })
  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
  }

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
