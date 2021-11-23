import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import * as storage from '../../helpers/storage'
import { clearStateAllAuth } from '../../redux/Features/AuthSlice';
import { capitalizeLetter } from '../../helpers/capitalize';
import { clearStateAllSignup } from '../../redux/Features/SignupSlice';
const Header = () => {
  const [isShow, setIsShow] = useState(false)
  const dispatch = useDispatch()
  const { isAuth, user } = useSelector(({ auth }) => auth)

  const showMenu = () => {
    setIsShow(!isShow)
  }

  const logoutHandler = () => {
    storage.remove(storage.AUTH_TOKEN)
    storage.remove(storage.USER)
    dispatch(clearStateAllAuth())
    dispatch(clearStateAllSignup())
    console.log('Successfully Logout')
  }

  return (
    <div className={styles.navContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <strong>
            <strong className={styles.blue}>Blue</strong>
            <strong className={styles.feeds}>Feeds</strong>
          </strong>
        </div>
        {/* Menu desktop view*/}
        <ul className={styles.maxUl}>
          {
            isAuth ?
              <>
                <Link to="/feeds" ><li>Feeds</li></Link>
                <Link to="/profile" ><li>{user && capitalizeLetter(user.firstName) + " " + capitalizeLetter(user.lastName)}</li></Link>
                <li onClick={logoutHandler}>Logout</li>
              </>
              : <>
                <Link to="/signin" ><li>Signin</li></Link>
                <Link to="/signup" ><li>Signup</li></Link>
              </>
          }
          <div onClick={showMenu} className={styles.hamburger}>
            {isShow ? <CloseIcon /> : <MenuIcon />}
          </div>
        </ul>
        {/* Menu mobile view*/}
        {
          isShow &&
          <ul className={styles.minUl}>
            {
              isAuth ?
                <>
                  <Link to="/signin" ><li>Feeds</li></Link>
                  <Link to="/profile" ><li>User</li></Link>
                  <Link to="/signin" ><li>Logout</li></Link>
                </>
                : <>
                  <Link to="/signin" ><li>Signin</li></Link>
                  <Link to="/signup" ><li>Signup</li></Link>
                </>
            }
          </ul>
        }
      </div>
    </div>
  )
}

export default Header
