import * as axios from '../../helpers/axiosApi'
import * as storage from '../../helpers/storage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const authAsync = createAsyncThunk( // using createAsyncThunk throwing data to redux to use globally
  'auth/authAsync',
  async (payload) => {
    const data = await axios.postRequest('account/login', payload) // POST auth data from api axiosApi.js 
    return data
  }
)

export const userInfoAsync = createAsyncThunk( // using createAsyncThunk throwing data to redux to use globally
  'auth/userInfoAsync',
  async () => {
    const data = await axios.getRequest('user', true) // POST auth data from api axiosApi.js 
    return data
  }
)

export const changeProfileImgAsync = createAsyncThunk( // using createAsyncThunk throwing data to redux to use globally
  'auth/changeProfileImgAsync',
  async (payload) => {
    const data = await axios.postRequest('user/picture', payload, true) // POST auth data from api axiosApi.js 
    console.log(data)
    console.log(payload)
    return data
  }
)

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storage.get(storage.USER),
    isAuth: storage.get(storage.AUTH_TOKEN) ? true : false,
    message: null,
    token: storage.get(storage.AUTH_TOKEN),
    profileImage: null,
  },
  reducers: {
    clearStateAuth(state, action) {
      state.isAuth = false
      state.message = null
    },
    clearStateAllAuth(state, { payload }) {
      state.isAuth = false
      state.message = null
      state.token = null
      state.user = null
    },
    clearStateProfileImage(state, action) {
      state.profileImage = null
    },
    signinWhenSignup(state, { payload }) {
      state.user = payload.user
      state.isAuth = payload.isAuth
      state.token = payload.token
    }
  },
  extraReducers: {
    [authAsync.pending]: (state, action) => {
      console.log('Loading') // Pending first then fullfilled if success
    },
    [authAsync.fulfilled]: (state, action) => {
      if (action.payload.hasOwnProperty('code')) {
        if (action.payload.code === 'INVALID_REQUEST') {
          state.isAuth = false
          state.message = action.payload.message
        }
        if (action.payload.code === 'NOT_AUTHORIZED') {
          state.isAuth = false
          state.message = action.payload.message
        }
      } else if (Object.keys(action.payload).length === 0) {
        state.isAuth = false
        state.message = "User is not exists"
      } else {
        state.isAuth = true
        state.message = null
        state.token = action.payload.token
        storage.save(storage.AUTH_TOKEN, action.payload.token)
      }
    },
    [userInfoAsync.fulfilled]: (state, action) => {
      state.user = action.payload
      storage.save(storage.USER, action.payload)
    },
    [changeProfileImgAsync.fulfilled]: (state, action) => {
      state.user.profilePic = action.payload.profilePic
      state.profileImage = action.payload
      storage.save(storage.USER, state.user)
    }
  }
})

export const { clearStateAuth, clearStateAllAuth, clearStateProfileImage, signinWhenSignup } = AuthSlice.actions

export default AuthSlice.reducer