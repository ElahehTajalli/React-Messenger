import { connect } from 'react-redux'
import Profile from '../components/Messenger/Profile'

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapDispatchToProps)(Profile)
