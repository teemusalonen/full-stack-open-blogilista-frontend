import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const update = async (id, newBlog) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, newBlog)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, config)

  return response.data
}

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
}
