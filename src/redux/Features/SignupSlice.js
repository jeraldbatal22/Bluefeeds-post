import * as axios from '../../helpers/axiosApi'
import * as storage from '../../helpers/storage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const signupAsync = createAsyncThunk( // using createAsyncThunk throwing data to redux to use globally
  'signup/signupAsync',
  async (payload) => {
    const data = await axios.postRequest('account/create', payload) // POST signup data from api axiosApi.js 
    return data
  }
)

const SignupSlice = createSlice({
  name: 'signup',
  initialState: {
    user: storage.get(storage.USER),
    isAuth: storage.get(storage.AUTH_TOKEN) ? true : false,
    message: null,
    token: storage.get(storage.AUTH_TOKEN),
  },
  reducers: {
    clearStateSignup(state, action) {
      state.isAuth = false
      state.message = null
    },
    clearStateAllSignup(state, { payload }) {
      state.isAuth = false
      state.message = null
      state.token = null
      state.user = null
    }
  },
  extraReducers: {
    [signupAsync.fulfilled]: (state, action) => {
      if (action.payload.hasOwnProperty('code')) {
        if (action.payload.code === 'INVALID_REQUEST') {
          state.isAuth = false
          state.message = action.payload.message
        }
        if (action.payload.code === 'NOT_AUTHORIZED') {
          state.isAuth = false
          state.message = action.payload.message
        }
      } else {
        state.isAuth = true
        state.message = null
        state.token = action.payload.token
        storage.save(storage.AUTH_TOKEN, action.payload.token)
      }
    },
  }
})

export const { clearStateSignup, clearStateAllSignup } = SignupSlice.actions

export default SignupSlice.reducer