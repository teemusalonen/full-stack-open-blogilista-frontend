import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  
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

  return (
    <div style={blogStyle}>     
      {visible ?
        <div> 
          <b>title: </b> {blog.title} <br /> 
          <b>author: </b>{blog.author} <br />
          <b>url: </b>{blog.url} <br />
          <b>likes: </b>{blog.likes} <button>like</button> <br />
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