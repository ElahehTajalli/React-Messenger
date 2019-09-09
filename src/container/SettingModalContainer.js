import { connect } from 'react-redux'
import SettingModal from '../components/Messenger/SettingModal'

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapDispatchToProps)(SettingModal)
