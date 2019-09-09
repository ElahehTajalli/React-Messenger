import React from 'react'
import ProfilePhoto from '../../photos/cute-panda-cub.jpg'
import Modals from './Modals'
import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import AddPersonIcon from '@material-ui/icons/PersonAdd'
import SeenMessage from '@material-ui/icons/Message'
import LogOut from '@material-ui/icons/ExitToApp'
import SettingIcon from '@material-ui/icons/Settings'
import { Link } from 'react-router-dom'
import Search from '@material-ui/icons/Search'
import Edit from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import { securityMessages } from '../../action/Conversation'
// import { addConversation, securityMessages, addNewConversations } from '../../action/Conversation'
// import validate from '../../validation/ValidateFunction'
import SecurityIcon from '@material-ui/icons/Security'
import axios from 'axios'
import SettingModalContainer from '../../container/SettingModalContainer'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import PaletteIcon from '@material-ui/icons/Palette'

const styles = {}

export default class Profile extends React.Component {
  constructor () {
    super()

    this.state = {
      error: {
        email: ''
      },
      menuBar: false,
      editMenu: false,
      // name: 'Elaheh',
      // email: 'swift@gmail.com',
      showConversationModal: false,
      newContactEmail: '',
      security: false,
      token: window.localStorage.getItem('token'),
      users: [],
      settingModal: false,
      settingMode: false,
      image: window.localStorage.getItem('image'),
      user: ''

    }
  }

  handleDrawerOpen () {
    this.setState({ menuBar: true })
  }

  handleDrawerClose () {
    this.setState({ menuBar: false })
  }

  editProfileOpen () {
    this.setState({ editMenu: true })
    this.handleDrawerClose()
  }

  editProfileClose () {
    this.setState({ editMenu: false })
  }

  searchContact () {
    var input, filter, i, contactList, contact, text, div
    input = document.getElementById('searchContacts')
    filter = input.value.toUpperCase()

    contactList = document.getElementById('contact-list')
    div = contactList.getElementsByTagName('div')

    for (i = 0; i < div.length; i++) {
      contact = div[i].getElementsByTagName('strong')[0]
      if (contact) {
        text = contact.textContent || contact.innerText
        if (text.toUpperCase().indexOf(filter) > -1) {
          div[i].style.display = ''
        } else {
          div[i].style.display = 'none'
        }
      }
    }
  }

  addConversationModal () {
    const error = {
      email: ''
    }
    this.setState({ showConversationModal: true, error })
  }

  addConversationModalClose () {
    this.setState({ showConversationModal: false })
  }

  handleChange (event) {
    this.setState({ newContactEmail: event.target.value })
  }

  // addConversationaddConversation () {
  // const error = {
  //   email: validate('email', this.state.newContactEmail)
  // }
  // this.setState({ error }, () => this.handleError())
  // }

  handleError () {
    // if (!this.state.error.email) {
    // this.props.dispatch(addConversation(this.state.newContactEmail))
    this.setState({ showConversationModal: false, newContactEmail: '' })
    const fdata = new FormData()
    fdata.append('token', this.state.token)
    fdata.append('user_id', this.state.user.id)

    axios.post('https://api.paywith.click/conversation/', fdata)
      .then((response) => {
        // this.props.dispatch(addNewConversations(user.email, user.avatar_url, user.name))
      })
      .catch(function (error) {
        console.log(error)
      })
    // }
  }

  security () {
    this.setState({ security: !this.state.security, menuBar: false }, () => this.props.dispatch(securityMessages(this.state.security)))
    this.handleSetting()
    // this.props.dispatch(securityMessages(this.state.security))
  }

  handleSearch (event) {
    this.setState({ newContactEmail: event.target.value })
    const fdata = new FormData()
    fdata.append('token', this.state.token)
    fdata.append('query', event.target.value)
    fdata.append('size', 4)

    axios.post('https://api.paywith.click/explore/search/contacts/', fdata)
      .then((response) => {
        this.setState({ users: response.data.data.users })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  selectContact (e, user) {
    document.getElementById('mui-theme-provider-standard-input').value = e.target.innerText
    this.setState({ users: [], newContactEmail: e.target.innerText, user })
  }

  settingModalClose () {
    this.setState({ settingModal: false })
  }

  changeBackground () {
    this.setState({ settingModal: true })
    this.handleSetting()
    this.handleDrawerClose()
  }

  handleSetting () {
    this.setState({ settingMode: !this.state.settingMode })
  }

  addNewConversation (user) {
    const fdata = new FormData()
    fdata.append('token', this.state.token)
    fdata.append('user_id', user.id)

    axios.post('https://api.paywith.click/conversation/', fdata)
      .then((response) => {
        // this.props.dispatch(addNewConversations(user.email, user.avatar_url, user.name))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <>
        <div className='profile'>
          <AppBar className='appBar'>
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={() => this.handleDrawerOpen()}
              >
                <MenuIcon />
              </IconButton>
              <div className='search'>
                <input type='text' placeholder='search' id='searchContacts' onKeyUp={() => this.searchContact()} />
                {/* <input type='text' placeholder='search' id='searchContacts' onChange={(event) => this.handleSearch(event)} /> */}
                <Search className='searchInConversationList' />
                {/* <i className='fa fa-search' /> */}
              </div>
              <Fab color='primary' aria-label='add' className='addStyle' onClick={() => this.addConversationModal()} >
                <AddIcon />
              </Fab>
            </Toolbar>
          </AppBar>

          <Drawer
            variant='persistent'
            anchor='left'
            open={this.state.menuBar}
          >
            <div>
              <IconButton onClick={() => this.handleDrawerClose()}>
                {styles.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <div style={{ padding: '20px' }}>
              <img src={this.state.image} alt='profilePhoto' />
              <div className='profileBarMenu'>
                <div className='profileStyles'>
                  <strong>{window.localStorage.getItem('name')}</strong>
                  <span className='fontSize'>{window.localStorage.getItem('email')}</span>
                </div>
                <Edit className='editIcon' onClick={() => this.editProfileOpen()} />
              </div>

            </div>
            <Divider />
            <List >
              <ListItem button>
                <span className='itemIcon'> <AddPersonIcon /> </span>
                <ListItemText primary='Add contact' />
              </ListItem>
              <ListItem button>
                <span className='itemIcon'> <SeenMessage /> </span>
                <ListItemText primary='Seen all messages' />
              </ListItem>
              <ListItem button onClick={() => this.handleSetting()}>
                <span className='itemIcon'> <SettingIcon /> </span>
                <ListItemText primary='Setting' />
                {this.state.settingMode ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.settingMode} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <ListItem button onClick={() => this.security()}>
                    <span className='settingIcon'> <SecurityIcon /> </span>
                    <ListItemText primary='Security messages' />
                  </ListItem>
                  <ListItem button onClick={() => this.changeBackground()}>
                    <span className='settingIcon'> <PaletteIcon /> </span>
                    <ListItemText primary='Change Background' />
                  </ListItem>
                </List>
              </Collapse>

              <Link to='/' className='links' >
                <ListItem button >
                  <span className='itemIcon'> <LogOut /> </span>
                  <ListItemText primary='Log out' />
                </ListItem>
              </Link>

            </List>
          </Drawer>
          <Modals
            open={this.state.editMenu}
            closeModal={() => this.editProfileClose()}
            name={this.state.name}
            email={this.state.email}
          />

          <Modal
            className='modalStyle'
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            open={this.state.showConversationModal}
            onClose={() => this.addConversationModalClose()}
          >
            <div className='editModal'>
              <span><b> Add new contact </b> </span>
              <TextField
                name='email'
                // className='editTextField'
                label='Email'
                id='mui-theme-provider-standard-input'
                onChange={(event) => this.handleSearch(event)}
                // value={this.state.selectContact}
              />

              <div className='searchDiv'>
                {this.state.users.map((user, index) => {
                  return (
                    <p key={user.id}
                      onClick={(e) => this.selectContact(e, user)}
                      // onClick={(e) => this.addNewConversation(user)}
                    >
                      {user.email}
                    </p>
                  )
                })}
              </div>

              {/* { this.state.error.email != null &&
                <p className='addContactError'>{this.state.error.email}</p>
              } */}
              <button className='editButton'
                // onClick={() => this.addConversation()} >
                onClick={() => this.handleError()}
                // onClick={() => this.addNewConversation()}
              >
                  ADD
              </button>
            </div>
          </Modal>

          <SettingModalContainer
            open={this.state.settingModal}
            closeModal={() => this.settingModalClose()}
          />

        </div>
      </>

    )
  }
}
