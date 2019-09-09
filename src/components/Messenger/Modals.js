import React from 'react'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'

export default class Modals extends React.Component {
  constructor () {
    super()
    this.state = {
      name: window.localStorage.getItem('name'),
      phoneNumber: '',
      description: '',
      file: '',
      base64: '',
      image: window.localStorage.getItem('image')
    }
  }

  handleChange (event) {
    var name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  saveChanges () {
    this.props.closeModal()
  }

  onChangeHandler (e) {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      var image = document.createElement('img')
      image.src = reader.result
      if (image.height === image.width) {
        this.setState({
          file: file,
          base64: reader.result
        })
      } else {
        alert('The Height and width are not equal!! Please upload another image!')
      }
    }
  }

  saveProfile () {
    const fdata = new FormData()
    fdata.append('token', window.localStorage.getItem('token'))
    fdata.append('description', this.state.description)
    fdata.append('user_type', 'organization')
    fdata.append('phone_number', this.state.phoneNumber)
    fdata.append('avatar', this.state.file)
    fdata.append('location_lat', 43)
    fdata.append('location_long', -79)
    fdata.append('mobile_number', this.state.phoneNumber)
    fdata.append('name', this.state.name)
    fdata.append('website', 'https://trump.gov.ir')
    fdata.append('country_code', 'CA')
    fdata.append('address', '')

    axios.post('https://api.paywith.click/auth/profile/', fdata)
      .then((response) => {
        // this.props.dispatch((getMessageList(response.data.data.messages)))
        this.saveChanges()
        window.localStorage.setItem('name', this.state.name)
        window.localStorage.setItem('image', this.state.base64)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <Modal
        className='modalStyle'
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={this.props.open}
        onClose={() => this.props.closeModal()}
      >
        <div className='editModal'>
          <span><b> Edit Profile</b> </span>
          <TextField
            name='name'
            className='editTextField'
            label='Name'
            id='mui-theme-provider-standard-input'
            onChange={(event) => this.handleChange(event)}
            defaultValue={this.state.name}
          />
          <TextField
            name='phoneNumber'
            className='editTextField'
            label='phone Number'
            id='mui-theme-provider-standard-input'
            onChange={(event) => this.handleChange(event)}
          />
          <TextField
            name='description'
            className='editTextField'
            label='description'
            id='mui-theme-provider-standard-input'
            onChange={(event) => this.handleChange(event)}
          />
          <input type='file' className='addPhoto' onChange={(event) => this.onChangeHandler(event)} />
          {/* <button className='editButton' onClick={() => this.saveChanges()} > SAVE </button> */}
          <button className='editButton' > Select Photo </button>
          <button className='editButton' onClick={() => this.saveProfile()} > SAVE </button>
        </div>
      </Modal>
    )
  }
}
