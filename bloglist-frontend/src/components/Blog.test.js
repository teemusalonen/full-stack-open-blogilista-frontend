import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'
import CreationForm from './CreationForm'

test('renders content', () => {
  const blog = {
    title: 'blogi :D :D',
    author: 'koira',
    url: 'sodlfksl.com/moi',
    likes: 1,
    user: null,
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('blogi :D :D')
  expect(component.container).toHaveTextContent('koira')
})

test('when button is pressed, everything is shown', () => {
  const blog = {
    title: 'blogi :D :D',
    author: 'koira',
    url: 'sodlfksl.com/moi',
    likes: 1,
    user: null,
  }

  const component = render(<Blog blog={blog} />)

  //etsitään siitä divistä, joka näytetään, kun nappia on painettu
  const div = component.container.querySelector('.showAll')

  expect(div).toHaveStyle('display: none')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(div).not.toHaveStyle('display: none')

  expect(div).toHaveTextContent('sodlfksl.com/moi')
})

test('when like button is pressed twice, event handler is called twice as well', () => {
  const blog = {
    title: 'blogi :D :D',
    author: 'koira',
    url: 'sodlfksl.com/moi',
    likes: 1,
    user: null,
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} handleLike={mockHandler} />)

  const button = component.container.querySelector('.likeButton')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

// Tehtävä 5.16, aloitettu, ei tehty loppuun

/*test('new blog is created with the correct information', () => {

  const handleCreate = jest.fn()

  const component = render(
    <CreationForm handleCreate={handleCreate} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(input, {
    target: { value: 'blog :D :D :D' }
  })
  fireEvent.submit(form)

  fireEvent.change(input, {
    target: { value: 'koira' }
  })

  fireEvent.change(input, {
    target: { value: 'sodlfksl.com/moi' }
  })
  fireEvent.submit(form)

  expect(handleCreate.mock.calls).toHaveLength(1)
  expect(handleCreate.mock.calls[0][0].content).toBe('blog :D :D :D' )
  expect(handleCreate.mock.calls[0][1].content).toBe('koira' )
  expect(handleCreate.mock.calls[0][2].content).toBe('sodlfksl.com/moi' )
})*/
