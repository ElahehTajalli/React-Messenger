import React from 'react'
// import ContactImage from '../../photos/5337490ca1097befda8a3a81e0b77af4.jpg'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'

export default class ContactProfile extends React.Component {
  constructor () {
    super()
    this.state = {
      menu: null
    }
  }

  menuOpen (event) {
    this.setState({ menu: event.currentTarget })
  }

  menuClose () {
    this.setState({ menu: null })
  }

  searchLong () {
    var obj = document.getElementById('search')
    obj.style.width = '100%'
    obj.style.opacity = '1'
  }

  searchShort () {
    var obj = document.getElementById('search')
    obj.style.width = '0%'
    obj.style.opacity = '0'
    obj.style.transition = 'transition: width 0.4s ease-in-out'
  }

  searchChat () {
    var input, filter, i, contactList, contact, text, div
    input = document.getElementById('search')
    filter = input.value.toUpperCase()

    contactList = document.getElementById('chat-box')
    div = contactList.getElementsByTagName('div')

    for (i = 0; i < div.length; i++) {
      contact = div[i].getElementsByTagName('span')[0]
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

  openMenu () {
    document.getElementById('menu').style.display = 'flex'
  }

  render () {
    return (
      <>
        <div className='status'>
          {(this.props.image) ? <img src={this.props.image} alt='contactImage' /> : '' }
          {/* <img src={this.props.image} alt='contactImage' /> */}
          <div>
            <strong>{this.props.firstName} {this.props.lastName}</strong>
            <span className='fontSize'>{this.props.email}</span>

            {(this.props.email)
              ? <div className='searchInChat'>
                <input id='search' type='text' placeholder='search' onMouseOut={() => this.searchShort()} onKeyUp={() => this.searchChat()} />
                {/* <i className='fa fa-search' onMouseOver={() => this.searchLong()} /> */}
                <Search className='searchIcon' onMouseOver={() => this.searchLong()} />
              </div>
              : '' }
            {/* <div className='searchInChat'>
              <input id='search' type='text' placeholder='search' onMouseOut={() => this.searchShort()} onKeyUp={() => this.searchChat()} />
              <i className='fa fa-search' onMouseOver={() => this.searchLong()} />
            </div> */}

          </div>
          <MenuIcon className='profileBar' onClick={(event) => this.menuOpen(event)} />
          {/* <i className='material-icons profileBar' onClick={(event) => this.menuOpen(event)}>&#xe5d2;</i> */}
        </div>
        <Menu
          id='simple-menu'
          anchorEl={this.state.menu}
          keepMounted
          open={Boolean(this.state.menu)}
          onClose={() => this.menuClose()}
        >
          <MenuItem onClick={() => this.menuClose()}>Add to Contacts</MenuItem>
          <MenuItem onClick={() => this.menuClose()}>view profile</MenuItem>
          <MenuItem onClick={() => this.menuClose()}>block</MenuItem>
        </Menu>
      </>
    )
  }
}
