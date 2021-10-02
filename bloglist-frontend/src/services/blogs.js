import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  //alempi console.log osoittaa että ylemmät toimivat
  console.log('TOKEN:', token)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { 
  getAll,
  setToken,
  create
}