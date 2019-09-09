import Messages from '../components/Messenger/Messages'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  // messageList: state.messageList,
  security: state.security,
  background: state.background,
  alt: state.alt,
  messages: state.messages
})

export default connect(mapStateToProps)(Messages)
