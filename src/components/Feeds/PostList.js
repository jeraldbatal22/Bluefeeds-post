import React, { useState } from 'react'
import styles from './PostList.module.css'
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch, useSelector } from 'react-redux'
import { capitalizeLetter } from '../../helpers/capitalize';
import { convertToDate } from '../../helpers/convertToDate';
import { addCommentAsync, clearStateNewPost } from '../../redux/Features/PostSlice';

const PostList = () => {
  const { posts } = useSelector(({ post }) => post)
  const dispatch = useDispatch()
  const [isShowComments, setisShowComments] = useState(false)
  const [isShowAddComment, setisShowAddComment] = useState(false)
  const [inputComment, setinputComment] = useState("")
  const [commentValidation, setcommentValidation] = useState("")
  const [comment, setcomment] = useState({})
  const showCommentsHandler = (id) => {
    const sample = posts.find(post => post.id === id)
    setcomment(sample)
    setcommentValidation('')
    setisShowComments(!isShowComments)
  }

  const showAddCommentHandler = () => {
    setisShowAddComment(!isShowAddComment)
  }

  const inputCommentHandler = (e) => {
    setinputComment(e.target.value)
  }
  const submitInputCommentHandler = (e) => {
    e.preventDefault()
    if (inputComment === "") {
      return setcommentValidation('Text is reuired')
    }
    dispatch(addCommentAsync({ id: comment.id, data: { text: inputComment } }))
    setisShowComments(false)
    setcommentValidation('')
    alert("Successfully created post")
    dispatch(clearStateNewPost())
  }

  // useEffect(() => {
  //   if (newComment !== null) {
  //     alert("Successfully created post")
  //     // dispatch(getAllPostAsync(""))
  //     // dispatch(clearStateNewPost())
  //   }
  // }, [newComment])

  return (
    <>
      {posts.map((post, index) => (
        <div key={index}>
          <div className={styles.feed_body} >
            <div className={styles.feed_post}>
              <h2 className={styles.username}>{post.user ? capitalizeLetter(post.user.firstName) + " " + capitalizeLetter(post.user.lastName) : capitalizeLetter(post.username)}</h2>
              <p className={styles.description}>{post.text}</p>
              <strong className={styles.date_created}>{convertToDate(post.createdAt)}</strong>
            </div>
            <span className={styles.comments} onClick={() => showCommentsHandler(post.id)}>
              <CommentIcon />
              <strong>{post.comments && post.comments.length > 0 ? post.comments.length : '0'}</strong>
            </span>
          </div>

          <div>
            {
              isShowComments &&
                comment.id === post.id ?
                comment.comments &&
                  comment.comments.length > 0 ?
                  <div>
                    {
                      comment.comments.map((comment, index) => (
                        <div className={`show`} key={index}>
                          <div className={styles.comments_content} >
                            <div className="feed_obj">
                              <h2 className="username">{capitalizeLetter(comment.username)}</h2>
                              <p className="description">{comment.text}</p>
                              <strong className="date_created">{convertToDate(comment.createdAt)}</strong>
                            </div>
                          </div>
                        </div>
                      ))
                    }

                    {
                      isShowAddComment ?
                        <form className={styles.comments_content_input} onSubmit={submitInputCommentHandler}>
                          <p id="validation_message" style={{ color: 'red' }}>{commentValidation}</p>
                          <textarea type="text" id="text_input" placeholder="Type your comment here..." onChange={inputCommentHandler} />
                          <div className={styles.comment_form_button}>
                            <button onClick={showAddCommentHandler}>Cancel</button>
                            <button>Send</button>
                          </div>
                        </form>
                        :
                        <>
                          <button className={styles.addComment} onClick={showAddCommentHandler}>Add comment</button>
                        </>
                    }

                  </div>
                  :
                  isShowAddComment ?
                    <form className={styles.comments_content_input} onSubmit={submitInputCommentHandler}>
                      <p id="validation_message" style={{ color: 'red' }}>{commentValidation}</p>
                      <textarea type="text" id="text_input" placeholder="Type your comment here..." onChange={inputCommentHandler} />
                      <div className={styles.comment_form_button}>
                        <button onClick={showAddCommentHandler}>Cancel</button>
                        <button>Send</button>
                      </div>
                    </form>
                    :
                    <div className={styles.empty_comment}>
                      <h1>No one commented in this post.</h1>
                      <button className={styles.addComment} onClick={showAddCommentHandler}>Add comment</button>
                    </div>
                : ''
            }
          </div>

        </div>
      ))}
    </>
  )
}

export default PostList
