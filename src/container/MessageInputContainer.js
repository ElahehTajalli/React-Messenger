import { connect } from 'react-redux'
import MessageInput from '../components/Messenger/MessageInput'

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  id: state.id
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput)
