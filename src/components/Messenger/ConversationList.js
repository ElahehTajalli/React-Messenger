import React from 'react'
import ProfileContainer from '../../container/ProfileContainer'
import ConversationContainer from '../../container/ConversationContainer'
import ConversationListFooter from './ConversationListFooter'
import ContactsContainer from '../../container/ContactsContainer'
import axios from 'axios'
import { conversations } from '../../action/Conversation'

export default class ConversationList extends React.Component {
  constructor () {
    super()
    this.state = {
      tab: 0
    }
    this.handleTabs = this.handleTabs.bind(this)
  }

  handleTabs (tab) {
    this.setState({ tab })
  }

  componentDidMount () {
    const token = window.localStorage.getItem('token')

    axios.get('https://api.paywith.click/conversation/', {
      params: {
        token: token
      }
    })
      .then((response) => {
        this.props.dispatch(conversations(response.data.data.conversation_details))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div className='page'>

        <div className='conversation-list' id='conversationList'>

          <ProfileContainer />
          {this.state.tab === 1
            ? <div className='contact-list' id='contact-list'>
              { this.props.conversations.map((item, index) => {
                let contactIndex = 0
                Object.values(item.users).map((item, index) => {
                  if (item.id !== parseInt(window.localStorage.getItem('id'))) {
                    contactIndex = index
                  }
                })
                if (item.latest_message !== null) {
                  return (
                    <ConversationContainer
                      key={index}
                      image={item.users[contactIndex].avatar_url}
                      name={item.users[contactIndex].name}
                      lastName={''}
                      time={item.latest_message_date}
                      email={item.users[contactIndex].email}
                      preview={item.preview}
                      unseen={item.unseen}
                      item={index}
                      index={contactIndex}
                    />
                  )
                } else {
                  return null
                }
              })}
            </div>

            : <div className='contact-list' id='contact-list'>
              { this.props.conversations.map((item, index) => {
                let contactIndex = 0
                Object.values(item.users).map((item, index) => {
                  if (item.id !== parseInt(window.localStorage.getItem('id'))) {
                    contactIndex = index
                  }
                })
                return (
                  <ContactsContainer
                    key={index}
                    image={item.users[contactIndex].avatar_url}
                    name={item.users[contactIndex].name}
                    lastName={''}
                    email={item.users[contactIndex].email}
                    item={index}
                    index={contactIndex}
                  />
                )
              })}
            </div>
          }
          <ConversationListFooter handleTab={this.handleTabs} />
        </div>
      </div>
    )
  }
}
