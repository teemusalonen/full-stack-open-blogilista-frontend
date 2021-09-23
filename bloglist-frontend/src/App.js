import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {      
      const currentUser = await loginService.login({        
        username, password,      
      })      
      setUser(currentUser)      
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
      user {user ? user.name : 'not'} logged in
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App