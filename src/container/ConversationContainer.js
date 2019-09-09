import { connect } from 'react-redux'
import Conversation from '../components/Messenger/Conversation'

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  conversations: state.conversations
})

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)
