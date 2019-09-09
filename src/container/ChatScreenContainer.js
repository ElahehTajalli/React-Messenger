import ChatScreen from '../components/Messenger/ChatScreen'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  firstName: state.firstName,
  lastName: state.lastName,
  email: state.email,
  image: state.image
})

export default connect(mapStateToProps)(ChatScreen)
