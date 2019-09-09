import React, { useState, useEffect } from 'react'
import PersonImg from '../../photos/personf.png'
import validate from '../../validation/ValidateFunction'

function Profile (props) {
  const [fields, setFields] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  function handleError () {
    setErrors({ email: validate('email', fields.email), password: validate('password', fields.password) })
  }

  useEffect(() => {
    console.log('salam')
  }, [])

  return (
    <div id='id01' className='signUpModal ' >

      <img className='img' src={PersonImg} alt='personImage' />

      <div className='spanStyle'>
        <span ><b>Profile</b></span>
      </div>

      <div className='Box'>
        <input onChange={(event) => setFields({ ...fields, email: event.target.value })}
          className='Input InputSign'
          type='text'
          name='email'
          placeholder='email'
        />
        { errors.email != null &&
          <span className='error'>{errors.email}</span>
        }
      </div>

      <div className='Box passBox'>
        <input onChange={(event) => setFields({ ...fields, password: event.target.value })}
          className='Input InputSign'
          type='password'
          name='password'
          placeholder='password'
        />
        { errors.password != null &&
          <span className='error'>{errors.password}</span>
        }
      </div>

      <div className='login'>
        <button type='submit' className='loginLink submitColor' onClick={() => handleError()}>Submit</button>
      </div>
    </div>
  )
}
export default Profile
