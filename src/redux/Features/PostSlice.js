import * as axios from '../../helpers/axiosApi'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAllPostAsync = createAsyncThunk( // using createAsyncThunk throwing data to redux to use globally
  'post/getAllPostAsync',
  async (payload) => {
    const data = await axios.getRequest(`${(payload === "") ? 'feed' : `feed?limit=${payload}`}`, true) // POST auth data from api axiosApi.js 
    console.log(data)
    return data
  }
)

export const createPostAsync = createAsyncThunk( // using createAsyncThunk throwing data to redux to use globally
  'post/createPostAsync',
  async (payload) => {
    const data = await axios.postRequest("feed/post", payload, true) // POST auth data from api axiosApi.js 
    return data
  }
)

export const addCommentAsync = createAsyncThunk( // using createAsyncThunk throwing data to redux to use globally
  'post/addCommentAsync',
  async (payload) => {
    console.log(payload)
    const data = await axios.postRequest(`feed/${payload.id}/comment`, payload.data, true) // POST auth data from api axiosApi.js 
    console.log(data)
    return data
  }
)


const PostSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    newPost: null,
    newComment: null
  },
  reducers: {
    clearStateAll(state) {
      state.posts = []
      state.newPost = null
    },
    clearStateNewPost(state) {
      state.newPost = null
      state.newComment = null
    }
  },
  extraReducers: {
    [getAllPostAsync.pending]: () => {
      // console.log('Loading') // Pending first then fullfilled if success
    },
    [getAllPostAsync.fulfilled]: (state, action) => {
      state.posts = action.payload
    },
    [createPostAsync.fulfilled]: (state, action) => {
      if (action.payload.hasOwnProperty('code')) {
        console.log(action.payload.code)
      } else {
        state.newPost = action.payload
        state.posts.push(action.payload)
      }

    },
    [addCommentAsync.fulfilled]: (state, action) => {
      if (action.payload.hasOwnProperty('code')) {
        console.log(action.payload.code)
      } else {
        const find_post = state.posts.find(post => post.id === action.meta.arg.id)
        if (find_post.comments) {
          console.log(action.payload)
          state.newComment = action.payload
          find_post.comments.push(state.newComment)
        } else {
          window.location.href = "/feeds"
        }
        // else {
        //   state.posts.map(post => {
        //     if (post.id === action.meta.arg.id) {
        //       return console.log({ ...post, comments: state.newComment })
        //     } else {
        //       return console.log('false')
        //     }
        //   })
        //   state.post = { ...find_post, comment: [] }
        // }
      }
    }
  }
})

export const { clearStateAll, clearStateNewPost } = PostSlice.actions

export default PostSlice.reducer