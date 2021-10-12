import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreationForm from './components/CreationForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('Tämä on user.token:', user.token)
    }
  }, [])

  blogs.sort((a, b) => b.likes - a.likes)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {      
      const user = await loginService.login({        
        username, password,      
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      console.log('USER`S TOKEN:', user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {      
      //setErrorMessage('wrong credentials')
      console.log(exception)   
      setTimeout(() => {        
        //setErrorMessage(null)      
        console.log("error")
      }, 5000)    
    }  
  }
  
  const handleUserNameChange = (event) => setUsername(event.target.value)

  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreate = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    await blogService.create(newBlog)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }

  const handleDelete = async ( id ) => {
    try{
      console.log('user.name:', user.username)
      console.log('blog.id:', id)
      await blogService.remove(id)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }catch(e){
      console.log(e)
    }  
  }

  if (user === null) {
    return (
      <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUserNameChange={handleUserNameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
      />
    )
  }
  return(
    <div>
      <h2>blogs</h2>
      <p> user {user.name} logged in </p>
      <button onClick={handleLogOut}>
        Logout
      </button>
      <Togglable buttonLabel='Create a new blog' ref={blogFormRef}>
        <CreationForm handleCreate={handleCreate} />
      </Togglable>  
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleDelete={handleDelete} />
      )}
      
    </div>
  )
}

export default App