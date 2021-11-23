export const feed = 'feed_'

export const AUTH_TOKEN = feed + 'token' // feed_app_token title for login user data
export const USER = feed + 'user' // feed_app_token title for login user data

export const save = (key, data = null) => {
  return window.localStorage.setItem(key, JSON.stringify(data)) // SAVE login user data to local storage
}

export const get = (key) => {
  return JSON.parse(window.localStorage.getItem(key)) // GET login user data to local storage
}

export const remove = (key) => {
  return window.localStorage.removeItem(key) // REMOVE login user data and token to local storage when the user is logout
}

export const clear = () => {
  window.localStorage.clear() // for clearing the storage
}