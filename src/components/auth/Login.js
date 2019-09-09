import React from 'react'
import SignUp from '../auth/SignUp.js'
import PersonImg from '../../photos/personLogin.png'
// import '../../../node_modules/font-awesome/css/font-awesome.min.css'
// import '../../../node_modules/material-design-icons/iconfont/material-icons.css'
import Lock from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import validate from '../../validation/ValidateFunction'
// import { Link } from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import axios from 'axios'
import { withRouter } from 'react-router'
// import Icon from '../.././node_modules/@material/react-material-icon/dist/material-icon.css'
// import '../../../node_modules/material-jsx-icons/'

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      fields: {
        email: '',
        password: ''
      },
      errors: {
        email: '',
        password: ''
      },
      signUp: false,
      cube: '',
      currentClass: '',
      showClass: 'show-front',
      showPassword: false,
      error: false
    }
  }

  changePage () {
    var cube
    var showClass
    if (!this.state.cube) {
      cube = document.querySelector('.cube')
    } else {
      cube = this.state.cube
    }
    if (this.state.showClass === 'show-left') {
      showClass = 'show-front'
    } else {
      showClass = 'show-left'
    }

    var currentClass = this.state.currentClass
    if (currentClass) {
      cube.classList.remove(currentClass)
    }
    cube.classList.add(showClass)
    currentClass = showClass
    this.setState({ cube, currentClass, showClass })
  }

  handleChange (event) {
    const name = event.target.name
    const changeFields = this.state.fields
    changeFields[name] = event.target.value
    this.setState({ fields: changeFields })
  }

  handleError () {
    const errors = {
      email: validate('email', this.state.fields.email),
      password: validate('password', this.state.fields.password)
    }
    this.setState({ errors }, () => this.errorsBeforeReq())
  }

  errorsBeforeReq () {
    // let valid = true
    const email = document.getElementById('email')
    const password = document.getElementById('password-field');
    (this.state.errors.email !== null) ? this.errorInputs(email) : this.blurErrorInputs(email);
    (this.state.errors.password !== null) ? this.errorInputs(password) : this.blurErrorInputs(password)
    // Object.values(this.state.errors).map((item) => {
    //   if (item !== null) {
    //     valid = false
    //   }
    // })
    // if (valid) {
    //   this.handleRequest()
    // }
    if (this.state.errors.email === null && this.state.errors.password === null) {
      this.handleRequest()
    }
  }

  changeInputError () {
    const email = document.getElementById('email')
    const password = document.getElementById('password-field');
    // (this.state.errors.email !== null) ? this.errorInputs(email) : this.blurErrorInputs(email);
    // (this.state.errors.password !== null) ? this.errorInputs(password) : this.blurErrorInputs(password)
    (this.state.error) ? this.errorInputs(email) : this.blurErrorInputs(email);
    (this.state.error) ? this.errorInputs(password) : this.blurErrorInputs(password)
  }

  errorInputs (input) {
    input.style.background = '#f4e5e5'
    input.style.border = '2px solid #bd1b1b'
    input.style.boxShadow = '0px 0px 5px 4px #a94e4e'
    var button = document.getElementById('login')
    button.style.paddingTop = '30px'
  }

  blurErrorInputs (input) {
    input.style.background = '#dffdeb'
    input.style.border = '2px solid #0a5337'
    input.style.boxShadow = '0px 0px 5px 4px #10664f'
    var button = document.getElementById('login')
    button.style.paddingTop = '40px'
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

  viewPassword () {
    this.setState({ showPassword: !this.state.showPassword })
  }

  handleRequest () {
    axios.post('https://api.paywith.click/auth/signin/', {
      email: this.state.fields.email,
      password: this.state.fields.password
    })
      .then((response) => {
        window.localStorage.setItem('token', response.data.data.token)
        window.localStorage.setItem('id', response.data.data.profile.id)
        window.localStorage.setItem('email', this.state.fields.email)
        window.localStorage.setItem('image', response.data.data.profile.avatar_url)
        window.localStorage.setItem('name', response.data.data.profile.name)
        // this.setState({ error: false }, this.changeInputError())
        // this.changeInputError()
        this.props.history.push('/messenger/')
      })
      .catch(() => {
        // console.log(error.response.data.message)
        this.setState({ error: true })
        this.changeInputError()
      })
  }

  // remember () {
  //   if (document.getElementById('checkbox').checked === true) {
  //     if (document.getElementById('email').value !== '') {
  //       var email = document.getElementById('email').value
  //       var password = document.getElementById('password-field').value
  //       document.getElementById('email').value = email
  //       document.getElementById('password-field').value = password
  //     } else {
  //       document.getElementById('email').value = email
  //       document.getElementById('password-field').value = password
  //     }
  //   }
  // }

  render () {
    return (
      <div className='bodyPage'>
        <div className='cube'>
          <div className='divBox cube__face cube__face--front'>

            <img className='img' alt='personImage' src={PersonImg} />

            <div className='spanStyle'>
              <span ><b>LOGIN</b></span>
            </div>

            <div className='Box'>
              <PersonIcon className='icon' />
              <input id='email'
                className='Input'
                type='text'
                name='email'
                placeholder='email'
                onChange={(event) => this.handleChange(event)}
                onClick={(event) => this.focusInput(event)}
                onBlur={(event) => this.blurInput(event)}
              />
              { this.state.errors.email != null &&
                <span className='error'>{this.state.errors.email}</span>
              }
            </div>

            <div className='Box passBox'>
              <Lock className='passIcon' />
              <input className='Input'
                type={this.state.showPassword ? 'text' : 'password'}
                name='password'
                placeholder='password'
                id='password-field'
                onChange={(event) => this.handleChange(event)}
                onClick={(event) => this.focusInput(event)}
                onBlur={(event) => this.blurInput(event)}
              />
              {this.state.showPassword
                ? <VisibilityOff className='eyeIcon'
                  onClick={() => this.viewPassword()} />
                : <Visibility className='eyeIcon'
                  onClick={() => this.viewPassword()} />
              }

              { this.state.errors.password != null &&
                <span className='error'>{this.state.errors.password}</span>
              }

              { this.state.error &&
                <span className='loginError'>Email or Password is invalid !</span>
              }
            </div>

            <div className='tools'>
              <div className='checkbox'>
                <input id='checkbox' type='checkbox' name='' />
              </div>

              <div>
                <span className='remember'>Remember me!</span>
              </div>

              <div className='forgot'>
                <a className='forgotLink' href='http://google.com' target='_blank' rel='noopener noreferrer'>Forgot password?</a>
              </div>
            </div>

            <div className='login' id='login'>
              {/* <Link to='/messenger/' className='loginLink' onClick={() => this.handleError()} >Login</Link> */}
              <button className='loginLink' onClick={() => this.handleError()}>Login</button>
            </div>
            <div className='signUp' >
              <button className='signUpLink' onClick={() => this.changePage()} >Sign Up</button>
            </div>
          </div>

          <div className='cube__face cube__face--left'>
            <SignUp check={() => this.changePage()} />
          </div>
        </div>
      </div>

    )
  }
}

export default withRouter(Login)
