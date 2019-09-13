import React from 'react'
import ConversationListContainer from '../../container/ConversationListContainer'
import ChatScreenContainer from '../../container/ChatScreenContainer'
// import './Messenger.css'
import './Messenger.scss'

export default class Messenger extends React.Component {
  constructor () {
    super()
    this.state = {
      escMode: true
    }
    this.escFunction = this.escFunction.bind(this)
    this.escFunctionClose = this.escFunctionClose.bind(this)
  }

  escFunction (event) {
    if (event.keyCode === 27) {
      this.setState({ escMode: true })
    }
  }

  escFunctionClose (event) {
    this.setState({ escMode: false })
  }

  componentDidMount () {
    document.addEventListener('keydown', this.escFunction, false)
    document.addEventListener('mousedown', this.escFunctionClose, false)
  }

  searchShort () {
    var obj = document.getElementById('search')
    obj.style.width = '0%'
    obj.style.opacity = '0'
    obj.style.transition = 'transition: width 0.4s ease-in-out'
  }

  searchChat () {
    var input, filter, i, contactList, contact, text, div
    input = document.getElementById('search')
    filter = input.value.toUpperCase()

    contactList = document.getElementById('chat-box')
    div = contactList.getElementsByTagName('div')

    for (i = 0; i < div.length; i++) {
      contact = div[i].getElementsByTagName('span')[0]
      if (contact) {
        text = contact.textContent || contact.innerText
        if (text.toUpperCase().indexOf(filter) > -1) {
          div[i].style.display = ''
        } else {
          div[i].style.display = 'none'
        }
      }
    }
  }

  render () {
    return (
      <div className='chat'>

        <ConversationListContainer />
        {!this.state.escMode &&
          <ChatScreenContainer />
        }
        {/* <div className='modal' id='modal'>
          <div className='addContact'>
            <span><strong> Add Contact </strong></span>
            <input id='email' type='text' placeholder='@email' />
            <span id='existContact' />
            <button onClick='addNewContact()'> ADD </button>
          </div>
        </div> */}

      </div>
    )
  }
}
