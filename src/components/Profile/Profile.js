import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { capitalizeLetter } from '../../helpers/capitalize'
import { changeProfileImgAsync, clearStateProfileImage } from '../../redux/Features/AuthSlice'
import styles from './Profile.module.css'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuth, profileImage } = useSelector(({ auth }) => auth)
  const changeImageHandler = (e) => {
    const files = e.target.files
    const formData = new FormData();
    formData.append('profile_picture', files[0]);
    dispatch(changeProfileImgAsync(formData))
  }

  useEffect(() => {
    if (profileImage !== null) {
      alert('Successfully Updated Profile Image')
      dispatch(clearStateProfileImage())
    }
  }, [profileImage, dispatch])

  useEffect(() => {
    if (isAuth !== true) {
      navigate('/signin')
    }
  }, [isAuth, navigate])

  return (
    <>
      {
        user &&
        <div className={styles.container}>
          <h1>User Profile</h1>
          <div className={styles.userprofile_card}>
            <form className={styles.user_top_body} encType="multipart/form-data">
              <div className={styles.img}>
                <img src={user.profilePic} id="image_profile" alt="" width="300" height="300" />
                <div className={styles.upload_image}>
                  <label htmlFor="upload_photo">+ Upload Profile Picture</label>
                  <input type="file" accept="image/*" name="upload_photo" className={styles.upload_photo} id="upload_photo" onChange={changeImageHandler} />
                </div>
              </div>
              <div className={styles.user}>
                <h2>Profile Information</h2>
                <div className={styles.form_group} >
                  <label>Username</label>
                  <input type="text" value={capitalizeLetter(user.username)} disabled />
                </div>
                <div className={styles.form_group}>
                  <label>Firstname</label>
                  <input type="text" value={capitalizeLetter(user.firstName)} disabled />
                </div>
                <div className={styles.form_group}>
                  <label>Lastname</label>
                  <input type="text" value={capitalizeLetter(user.lastName)} disabled />
                </div>
              </div>

            </form>
          </div>
        </div >
      }
    </>
  )
}

export default Profile
