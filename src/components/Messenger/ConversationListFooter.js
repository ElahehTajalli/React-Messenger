import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Chats from '@material-ui/icons/Message'
import Contacts from '@material-ui/icons/SupervisorAccount'

export default class ConversationListFooter extends React.Component {
  constructor () {
    super()

    this.state = {
      value: 0
    }
  }

  handleChange (event, newValue) {
    this.setState({ value: newValue })
    this.props.handleTab(newValue)
  }

  render () {
    return (
      <Tabs
        value={this.state.value}
        onChange={(event, value) => this.handleChange(event, value)}
        variant='fullWidth'
        indicatorColor='secondary'
        textColor='secondary'
        aria-label='icon label tabs example'
      >
        <Tab icon={<Contacts />} label='Contacts' />
        <Tab icon={<Chats />} label='Chats' />
        {/* <Tab icon={<PersonPinIcon />} label='NEARBY' /> */}
      </Tabs>
    )
  }
}
