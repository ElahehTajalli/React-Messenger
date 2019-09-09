import ConversationList from '../components/Messenger/ConversationList'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  // conversationList: state.conversationList
  conversations: state.conversations
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList)
