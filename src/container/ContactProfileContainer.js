import { connect } from 'react-redux'
import ContactProfile from '../components/Messenger/ContactProfile'

const mapStateToProps = (state) => ({
  firstName: state.firstName,
  lastName: state.lastName,
  email: state.email,
  image: state.image,
  profile: state.profile
})

export default connect(mapStateToProps)(ContactProfile)
