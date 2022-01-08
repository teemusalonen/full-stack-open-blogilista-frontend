import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleDelete, handleLike }) => {
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

  const seeIfDeleteIsOkayAndDelete = () => {
    if (window.confirm(`Do you really want to remove ${blog.title}?`)) {
      try {
        handleDelete(blog.id)
      } catch (error) {
        console.log('Wrong user')
      }
    }
  }

  const handleLikeAndSetBlogs = () => {
    handleLike(blog)
    setLikes(blog.likes + 1)
    blog.likes++
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='showAll' style={{ display: visible ? '' : 'none' }}>
        <b>title: </b> {blog.title}{' '}
        <button onClick={toggleVisibility}>hide</button> <br />
        <b>author: </b>
        {blog.author} <br />
        <b>url: </b>
        {blog.url} <br />
        <b>likes: </b>
        {likes}{' '}
        <button id='like-button' className='likeButton' onClick={() => handleLikeAndSetBlogs()}>
          like
        </button>{' '}
        <br />
        <button id='remove-button' onClick={() => seeIfDeleteIsOkayAndDelete()}>remove</button>
      </div>
      {visible ? null : (
        <div className='showLess'>
          {' '}
          {blog.title} {blog.author}{' '}
          <button onClick={toggleVisibility}>view</button>{' '}
        </div>
      )}
    </div>
  )
}

export default Blog
