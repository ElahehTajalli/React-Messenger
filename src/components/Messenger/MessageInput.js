import React from 'react'
import EmojiPicker from 'emoji-picker-react'
import EmojiFace from '@material-ui/icons/TagFaces'
import JSEMOJI from 'emoji-js'
import Modal from '@material-ui/core/Modal'
import { sendNewMessage } from '../../action/Conversation'
import Attach from '@material-ui/icons/AttachFile'
import SendIcon from '@material-ui/icons/Send'
import axios from 'axios'

const jsemoji = new JSEMOJI()
jsemoji.img_set = 'emojione'
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/'
jsemoji.allow_native = true
jsemoji.supports_css = false
jsemoji.replace_mode = 'unified'

export default class MessageInput extends React.Component {
  constructor () {
    super()
    this.state = {
      emoji: false,
      text: ''
    }
  }

  handleEmojiOpen () {
    this.setState({ emoji: true })
  }

  handleEmojiClose () {
    this.setState({ emoji: false })
  }

  handleClick (n, e) {
    const emoji = jsemoji.replace_colons(`:${e.name}:`)
    this.setState({
      text: this.state.text + emoji
    })
  };

  onChange (e) {
    e.preventDefault()
    this.setState({
      text: e.target.value
    })
  };

  // handleSend () {
  //   if (this.state.text) {
  //     this.props.dispatch(sendNewMessage(this.state.text, new Date().getHours() + ':' + new Date().getMinutes()))
  //     this.setState({ text: '' })
  //   }
  // }

  handleSend () {
    const fdata = new FormData()
    fdata.append('token', window.localStorage.getItem('token'))
    fdata.append('conversation_id', this.props.id)
    fdata.append('text', this.state.text)

    axios.post('https://api.paywith.click/conversation/create/', fdata)
      .then((response) => {
        this.setState({ text: '' })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  onKeyPress (e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      this.handleSend()
    }
  }

  render () {
    return (
      <div className='send-box'>
        {/* <i className='material-icons attach'>&#xe226;</i> */}
        <Attach className='attach' />
        <textarea
          id='msg'
          placeholder='Message...'
          value={this.state.text}
          onChange={(e) => this.onChange(e)}
          onKeyPress={(e) => this.onKeyPress(e)}
        />
        <EmojiFace
          className='emojiFace'
          onClick={() => this.handleEmojiOpen()}
        />
        <Modal
          className='modalStyle'
          open={this.state.emoji}
          onClose={() => this.handleEmojiClose()}
        >
          <div>
            <EmojiPicker onEmojiClick={(n, e) => this.handleClick(n, e)} />
          </div>
        </Modal>
        <button
          id='myBtn'
          className='msg_send_btn'
          type='button'
          onClick={() => this.handleSend()}
        >
          {/* <i className='fa fa-paper-plane-o sendIcon' aria-hidden='true' /> */}
          <SendIcon className='sendIcon' />
        </button>
      </div>
    )
  }
}
