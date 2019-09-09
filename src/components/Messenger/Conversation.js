import React from 'react'
import axios from 'axios'
import { getMessageList, getConversationId, getUsername } from '../../action/Conversation'
import moment from 'moment'

export default class Conversation extends React.Component {
  constructor () {
    super()

    this.state = {
      token: window.localStorage.getItem('token')
    }
  }

  getMessageList () {
    this.props.dispatch((getConversationId(this.props.conversations[this.props.item].id)))
    this.props.dispatch((getUsername(this.props.name, this.props.lastName, this.props.email, this.props.image)))

    const fdata = new FormData()
    fdata.append('token', this.state.token)
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
            <span id='time'>{moment(this.props.time).add({ h: 4, m: 30 }).format('LT')}</span>
            <span id='user'>{this.props.email}</span>
          </div>

          <div className='name-date'>
            <span className='fontSize preview'>{this.props.preview}</span>
            <span className='unseen'>{this.props.unseen}</span>
          </div>
        </div>
      </div>
    )
  }
}
