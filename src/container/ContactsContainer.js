
import { connect } from 'react-redux'
import Contacts from '../components/Messenger/Contacts'

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  conversations: state.conversations
})

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
