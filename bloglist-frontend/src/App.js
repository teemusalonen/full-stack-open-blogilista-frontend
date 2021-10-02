import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = { 
      title: title, 
      author: author, 
      url: url 
    }
    handleCreate(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleCreate = async (newBlog) => {
    await blogService.create(newBlog)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }

  const creationForm = () => {
    return(
      <form onSubmit={addBlog}>
        <div>
          <h2> Create new blog </h2>
          Title:
          <input
          type="text"            
          value={title}            
          name="Title"            
          onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
          type="text"            
          value={author}            
          name="Author"            
          onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
          type="text"            
          value={url}            
          name="Url"            
          onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Submit</button>    
      </form>
    )
  }

  const LoginForm = () => (  
    <form onSubmit={handleLogin}>
      <h1>Log in to the application</h1>
      <div>       
        username            
          <input            
          type="text"            
          value={username}            
          name="Username"            
          onChange={({ target }) => setUsername(target.value)}          
          />        
      </div>        
      <div>          
        password            
          <input            
          type="password"            
          value={password}            
          name="Password"            
          onChange={({ target }) => setPassword(target.value)}          
          />        
      </div>        
      <button type="submit">login</button>      
    </form>
  )  

  if (user === null) {
    return (
      LoginForm()
    )
  }

  return(
    <div>
      <h2>blogs</h2>
      user {user.name} logged in 
      <br />
      <button onClick={handleLogOut}>
        Logout
      </button>
      <div>
      {creationForm()}
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}

export default App