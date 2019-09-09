import React from 'react'
import axios from 'axios'
import { getMessageList, getConversationId, getUsername } from '../../action/Conversation'

export default class Conversation extends React.Component {

  getMessageList () {
    this.props.dispatch((getConversationId(this.props.conversations[this.props.item].id)))
    this.props.dispatch((getUsername(this.props.name, this.props.lastName, this.props.email, this.props.image)))

    const fdata = new FormData()
    fdata.append('token', window.localStorage.getItem('token'))
    fdata.append('conversation_id', this.props.conversations[this.props.item].id)
    fdata.append('size', 100)
    fdata.append('date', (new Date().getTime() / 1000).toFixed(0))

    axios.post('https://api.paywith.click/conversation/details/', fdata)
      .then((response) => {
        this.props.dispatch((getMessageList(response.data.data.messages)))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <div className='conversation'
        // onClick={() => this.props.dispatch(getUsername(this.props.name, this.props.lastName, this.props.email, this.props.image))}
        onClick={() => this.getMessageList()}
      >
        <img src={this.props.image} alt='profileContact' />
        <div>
          <div className='name-date'>
            {this.props.name === null || this.props.name === '' ? <strong>{this.props.email}</strong> : <strong>{this.props.name} {this.props.lastName}</strong>}
            {/* <strong>{this.props.name} {this.props.lastName}</strong> */}
            <span id='user'>{this.props.email}</span>
          </div>
        </div>
      </div>
    )
  }
}
