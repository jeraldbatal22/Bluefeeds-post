import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { getAllPostAsync } from '../../redux/Features/PostSlice'
import styles from './Post.module.css'
import PostList from './PostList'

const PostsList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setisLoading] = useState(false)
  const { isAuth } = useSelector(({ auth }) => auth)
  const { posts } = useSelector(({ post }) => post)

  const handleSelectCount = (e) => {
    const countNumber = e.target.value
    dispatch(getAllPostAsync(countNumber))
  }

  useEffect(() => {
    if (posts.length > 0) {
      setisLoading(true)
    }
  }, [posts])

  useEffect(() => {
    dispatch(getAllPostAsync(""))
  }, [dispatch])

  useEffect(() => {
    if (isAuth !== true) {
      navigate('/signin')
    }
  }, [isAuth, navigate])


  return (
    <div className={styles.container}>
      <div className={styles.feed_header}>
        <div className={styles.left_header}>
          {/* <!-- <p style="margin-right: 10px;" id="image"></p> --> */}
          <span>Sort By:</span>
          <select onChange={handleSelectCount}>
            <option value="">All Post</option>
            <option value="5">5 Post</option>
            <option value="10">10 Post</option>
            <option value="15">15 Post</option>
            <option value="20">20 Post</option>
          </select>
        </div>
        <div className={styles.right_header}>
          <Link to="/post/create"><button>Create Post</button></Link>
        </div>
      </div>
      {isLoading ? <PostList /> : <h1 className={styles.loading}>Loading Data...</h1>}
    </div>
  )
}

export default PostsList
