import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const newLikes = blog.likes + 1
    const newBlog = { 
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
    }
    await blogService.update(blog.id, newBlog)
    console.log('liken lisääminen onnistui!')
    setLikes(blog.likes + 1)
    blog.likes++
  }

  return (
    <div style={blogStyle}>     
      {visible ?
        <div> 
          <b>title: </b> {blog.title} <br /> 
          <b>author: </b>{blog.author} <br />
          <b>url: </b>{blog.url} <br />
          <b>likes: </b>{likes} <button onClick={() => handleLike()}>like</button> <br />
          <button onClick={toggleVisibility}>hide</button>
        </div> 
        :
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
      }
    </div>
)}

export default Blog