import axios from "axios";
import * as storage from './storage'

const apiUrl = 'https://us-central1-bluefletch-learning-assignment.cloudfunctions.net'
// 'https://fakestoreapi.com'

export const postRequest = (endpoint, data = {}, token = false, file = false) => {
  let header = {}
  if (token === true) {
    header = storage.get(storage.AUTH_TOKEN) // if api request need a token set to true false if not needed
  }

  const res = axios.post(`${apiUrl}/${endpoint}`, data, {
    headers: {
      'Authorization': header,
      "Content-Type": `${file ? "multipart/form-data" : "application/json"}`,
    }
  })
    .then((res) => {
      return res.data
    }).catch((err) => {
      return err.response.data
    })
  return res
}

export const getRequest = (endpoint, token = false) => {
  let header = {}
  if (token === true) {
    header = storage.get(storage.AUTH_TOKEN) // if api request need a token set to true false if not needed
  }
  const res = axios.get(`${apiUrl}/${endpoint}`, { headers: { 'Authorization': header } })
    .then((res) => {
      return res.data
    }).catch((err) => {
      return err.response.data
    })
  return res
}