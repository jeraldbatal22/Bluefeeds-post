import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authAsync, clearStateAuth, userInfoAsync } from '../../redux/Features/AuthSlice'
import styles from './Signin.module.css'
const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setisLoading] = useState(false)
  const [formInput] = useState({
    username: '',
    password: ''
  })

  const changeHandler = (e) => {
    const { name, value } = e.target
    formInput[name] = value
  }

  const { isAuth, message } = useSelector(({ auth }) => auth)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(authAsync(formInput))
    setisLoading(true)
    dispatch(clearStateAuth())
  }

  useEffect(() => {
    if (isAuth !== true) {
      setisLoading(false)
      return message
    } else {
      setisLoading(false)
      dispatch(userInfoAsync())
      navigate('/feeds')
      console.log("Successfully Login")
    }
  }, [message, isAuth, dispatch, navigate])

  return (
    <div className={styles.signinContainer}>
      <form className={styles.login_card} onSubmit={submitHandler}>
        <h1 style={{ marginBottom: '30px', fontWeight: 600 }}><strong><strong>Sign</strong><strong style={{ color: '4285F4' }}>in</strong></strong></h1>
        <p style={{ marginBottom: '30px', color: "gray" }}>Login with your email & password</p>
        <div>
          <p id="validation_message" style={{ color: 'red', marginBottom: '10px', fontWeight: 600 }}>{message}</p>
          <div className={styles.form_group}>
            <label>Username</label>
            <input type="text" placeholder="Username" name="username" onChange={changeHandler} />
          </div>
          <div className={styles.form_group}>
            <label>Password</label>
            <input type="password" placeholder="Password" name="password" onChange={changeHandler} />
          </div>
          <div className={styles.form_group}>
            <button type="submit" disabled={!isLoading ? false : true}>{!isLoading ? 'Login' : 'Loading plese waiit...'}</button>
          </div>
          <div className={styles.group_button}>
          </div>
          <hr>
          </hr>
          <div className={styles.footer} style={{ marginTop: '30px' }}>
            <span>Don't have any account?</span>
            <Link to="/signup" >Register</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signin
