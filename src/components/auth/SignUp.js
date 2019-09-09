import React from 'react'
import PersonImg from '../../photos/personf.png'
import validate from '../../validation/ValidateFunction'
import Lock from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import axios from 'axios'
import { withRouter } from 'react-router'

class SignUp extends React.Component {
  constructor () {
    super()

    this.state = {
      fields: {
        email: '',
        password: '',
        rePass: ''
      },
      errors: {
        email: '',
        password: '',
        rePass: ''
      },
      showPassword: false,
      showRepass: false,
      reqError: {
        email: '',
        password: []
      }
    }
  }

  handleChange (event) {
    const name = event.target.name
    // const changeFields = this.state.fields
    // changeFields[name] = event.target.value
    // this.setState({ fields: changeFields })
    this.setState({ ...this.state, fields: { ...this.state.fields, [name]: event.target.value } })
  }

  handleError () {
    let errors = ''
    if (this.state.fields.password !== this.state.fields.rePass) {
      errors = {
        email: validate('email', this.state.fields.email),
        password: validate('password', this.state.fields.password),
        rePass: validate('rePass', this.state.fields.rePass)
      }
    } else {
      errors = {
        email: validate('email', this.state.fields.email),
        password: validate('password', this.state.fields.password),
        rePass: null
      }
    }
    this.setState({ errors }, () => this.changeInputError())
  }

  changeInputError () {
    const email = document.getElementById('username')
    const password = document.getElementById('passF')
    const rePassword = document.getElementById('passwordF')
    if (this.state.errors.email !== null) {
      if (this.state.errors.email !== null) {
        this.errorInputs(email)
      } else {
        this.blurErrorInputs(email)
      }
    } else if (this.state.errors.rePass !== null) {
      if (this.state.errors.rePass !== null) {
        this.errorInputs(password)
        this.errorInputs(rePassword)
      } else {
        this.blurErrorInputs(password)
        this.blurErrorInputs(rePassword)
      }
    } else if (this.state.errors.password !== null) {
      if (this.state.errors.password !== null) {
        this.errorInputs(password)
      } else {
        this.blurErrorInputs(password)
      }
    }

    this.state.errors.email === null &&
    this.state.errors.password === null &&
    this.state.errors.rePass === null &&
    this.handleRequest()
  }

  errorAfterReq () {
    const email = document.getElementById('username')
    const password = document.getElementById('passF')
    const rePassword = document.getElementById('passwordF');
    (this.state.reqError.email !== undefined) ? this.errorInputs(email) : this.blurErrorInputs(email);
    (this.state.reqError.password !== undefined) ? this.errorInputs(password) : this.blurErrorInputs(password)
    this.blurErrorInputs(rePassword)
  }

  blurErrorInputs (input) {
    input.style.background = '#dffdeb'
    input.style.border = '2px solid #0a5337'
    input.style.boxShadow = '0px 0px 5px 4px #10664f'
  }

  errorInputs (input) {
    input.style.background = '#f4e5e5'
    input.style.border = '2px solid #bd1b1b'
    input.style.boxShadow = '0px 0px 5px 4px #a94e4e'
    var button = document.getElementById('submit')
    button.style.paddingTop = '20px'
  }

  focusInput (event) {
    var input = event.target
    input.style.background = '#f9eeff'
    input.style.border = '2px solid #8c12d2'
    input.style.boxShadow = '0px 0px 5px 4px #b980da'
  }

  blurInput (event) {
    var input = event.target
    input.style.background = 'white'
    input.style.border = '2px inset #02497cde'
    input.style.boxShadow = 'none'
  }

  pass () {
    this.setState({ showPassword: !this.state.showPassword })
  }

  rePass () {
    this.setState({ showRepass: !this.state.showRepass })
  }

  handleRequest () {
    axios.post('https://api.paywith.click/auth/signup/', {
      email: this.state.fields.email,
      password: this.state.fields.password
    })
      .then((response) => {
        window.localStorage.setItem('token', response.data.token)
        this.props.history.push('/messenger/')
      })
      .catch((error) => {
        let emailError
        let passError
        if (error.response.data.message !== undefined) {
          emailError = error.response.data.message
        } else {
          passError = error.response.data.error.password
        }
        const errors = {
          email: emailError,
          password: passError
        }
        this.setState({ reqError: errors })
        this.errorAfterReq()
      })
  }

  render () {
    return (
      <div id='id01' className='signUpModal ' >
        <div>
          <span onClick={() => this.props.check()} className='close'>&times;</span>
        </div>

        <img className='img' src={PersonImg} alt='personImage' />

        <div className='spanStyle'>
          <span ><b>SIGN UP</b></span>
        </div>

        <div className='Box'>
          <PersonIcon className='icon' />
          <input onChange={(event) => this.handleChange(event)}
            className='Input InputSign'
            type='text'
            name='email'
            placeholder='email'
            id='username'
            onClick={(event) => this.focusInput(event)}
            onBlur={(event) => this.blurInput(event)}
          />
          { this.state.errors.email != null &&
            <span className='error'>{this.state.errors.email}</span>
          }
          { this.state.reqError.email !== undefined &&
            <span className='error'>{this.state.reqError.email}</span>
          }
        </div>

        <div className='Box passBox'>
          <Lock className='passIcon' />
          <input onChange={(event) => this.handleChange(event)}
            className='Input InputSign'
            type={this.state.showPassword ? 'text' : 'password'}
            name='password'
            placeholder='password'
            id='passF'
            onClick={(event) => this.focusInput(event)}
            onBlur={(event) => this.blurInput(event)}
          />
          {this.state.showPassword
            ? <VisibilityOff className='eyeIcon'
              onClick={() => this.pass()} />
            : <Visibility className='eyeIcon'
              onClick={() => this.pass()} />
          }
          { this.state.errors.password != null &&
            <span className='error'>{this.state.errors.password}</span>
          }
          { this.state.reqError.password !== undefined &&
            Object.values(this.state.reqError.password).map((item, index) => {
              return (
                <span key={index} className='error'>{item}</span>
              )
            })
          }
        </div>

        <div className='Box passBox'>
          <Lock className='passIcon' />
          <input onChange={(event) => this.handleChange(event)}
            className='Input InputSign'
            type={this.state.showRepass ? 'text' : 'password'}
            name='rePass'
            placeholder='repeat password'
            id='passwordF'
            onClick={(event) => this.focusInput(event)}
            onBlur={(event) => this.blurInput(event)}
          />
          {this.state.showRepass
            ? <VisibilityOff className='eyeIcon'
              onClick={() => this.rePass()} />
            : <Visibility className='eyeIcon'
              onClick={() => this.rePass()} />
          }
          { this.state.errors.rePass != null &&
            <span className='error'>{this.state.errors.rePass}</span>
          }
        </div>

        <div className='login' id='submit'>
          <button type='submit' className='loginLink submitColor' onClick={() => this.handleError()}>Submit</button>
          {/* <button type='submit' className='loginLink submitColor' onClick={() => this.handleRequest()}>Submit</button> */}
        </div>
      </div>
    )
  }
}
export default withRouter(SignUp)
