import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signinWhenSignup, userInfoAsync } from '../../redux/Features/AuthSlice'
import { clearStateSignup, signupAsync } from '../../redux/Features/SignupSlice'
import styles from './Signup.module.css'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setisLoading] = useState(false)
  const { isAuth, message, user, token } = useSelector(({ signup }) => signup)
  const [formInput] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    confirm_password: ''
  })

  const changeHandler = (e) => {
    const { name, value } = e.target
    formInput[name] = value
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (formInput.password !== formInput.confirm_password) {
      return alert('Password and Confirm Password is not match')
    }
    delete formInput.confirm_password
    dispatch(signupAsync(formInput))
    setisLoading(true)
    dispatch(clearStateSignup())
  }

  useEffect(() => {
    if (isAuth === false) {
      setisLoading(false)
    } else {
      setisLoading(false)
      navigate('/feeds')
      dispatch(userInfoAsync())
      console.log('Successfully Register, You signin automatically')
      dispatch(signinWhenSignup({
        isAuth, token, user
      }))
    }
  }, [message, isAuth, navigate, dispatch, user, token])

  return (
    <div className={styles.signupContainer}>
      <form className={styles.signup_card} onSubmit={submitHandler}>
        <h1 style={{ marginBottom: '30px', fontWeight: 600 }}><strong><strong>Sign</strong><strong style={{ color: '4285F4' }}>up</strong></strong></h1>
        <p style={{ marginBottom: '30px', color: 'gray' }}>By signing up, you agree to ourterms & policy</p>
        <div>
          <p id="validation_message" style={{ color: 'red', marginBottom: '10px', fontWeight: 600 }}>{message}</p>
          <div className={styles.form_group}>
            <label>Username</label>
            <input type="text" placeholder="Username" name="username" onChange={changeHandler} />
          </div>
          <div className={styles.form_group}>
            <label>Firstname</label>
            <input type="text" placeholder="Firstname" name="firstname" onChange={changeHandler} />
          </div>
          <div className={styles.form_group}>
            <label>Lastname</label>
            <input type="text" placeholder="Lastname" name="lastname" onChange={changeHandler} />
          </div>
          <div className={styles.form_group}>
            <label>Password</label>
            <input type="password" placeholder="Password" name="password" onChange={changeHandler} />
          </div>
          <div className={styles.form_group}>
            <label>Password</label>
            <input type="password" placeholder="Confirm Password" name="confirm_password" onChange={changeHandler} />
          </div>
          <div className={styles.form_group}>
            <button type="submit"> {!isLoading ? "Register" : "Loading please wait..."}</button>
          </div>
          <hr>
          </hr>
          <div className={styles.footer} style={{ marginTop: '30px' }}>
            <span>Already have an account?</span>
            <Link to="/signin" >Signin</Link>
          </div>
        </div>
      </form>
    </div >
  )
}

export default Signup
