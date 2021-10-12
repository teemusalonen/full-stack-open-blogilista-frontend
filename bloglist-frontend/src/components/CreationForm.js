import React, { useState } from 'react'

const CreateBlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = event => setTitle(event.target.value)
  const handleAuthorChange = event => setAuthor(event.target.value)
  const handleUrlChange = event => setUrl(event.target.value)

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

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={event => handleTitleChange(event)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={event => handleAuthorChange(event)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={event => handleUrlChange(event)}
          />
        </div>
        <button id='submit-blog' type="submit">create</button>
      </form>
    </div>
  )}

export default CreateBlogForm