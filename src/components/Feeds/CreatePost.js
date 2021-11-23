import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { clearStateNewPost, createPostAsync } from '../../redux/Features/PostSlice'
import styles from './CreatePost.module.css'

const CreatePost = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [textInput, settextInput] = useState("")
  const [validation, setvalidation] = useState('')
  const { newPost } = useSelector(({ post }) => post)
  const changeHandler = (e) => {
    settextInput(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (textInput === "") {
      return setvalidation('Text is required')
    }
    dispatch(createPostAsync({ text: textInput }))
    dispatch(clearStateNewPost())
  }

  useEffect(() => {
    if (newPost !== null) {
      navigate('/feeds')
      alert("Successfully created post")
      dispatch(clearStateNewPost())
    }
  }, [newPost, navigate, dispatch])

  return (
    <div className={styles.container_create}>
      <div className={styles.signInContainer}>
        <form className={styles.login_card} onSubmit={submitHandler}>
          <h1 style={{ marginBottom: '30px', fontWeight: 600 }}>Create Post</h1>
          <div>
            <p id="validation_message" style={{ color: 'red' }}>{validation}</p>
            <div className={styles.form_group}>
              <label>Text</label>
              <textarea type="text" placeholder="Type your post here..." id="text" name="text" onChange={changeHandler} />
            </div>
            <div className={styles.form_group}>
              <button type="submit">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
