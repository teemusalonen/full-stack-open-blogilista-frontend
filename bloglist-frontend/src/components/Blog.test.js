import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
      title: 'blogi :D :D',
      author: 'koira',
      url: 'sodlfksl.com/moi',
      likes: 1,
      user: null
    }
  
    const component = render(
      <Blog blog={blog} />
    )
  
    expect(component.container).toHaveTextContent(
      'blogi :D :D'
    )
    expect(component.container).toHaveTextContent(
        'koira'
    )
    
  })

  test('when button is pressed, everything is shown', () => {
    
    const blog = {
      title: 'blogi :D :D',
      author: 'koira',
      url: 'sodlfksl.com/moi',
      likes: 1,
      user: null
    }

    const component = render(
      <Blog blog={blog} />
    )
    
    //etsitään siitä divistä, joka näytetään, kun nappia on painettu
    const div = component.container.querySelector('.showAll')
    
    expect(div).toHaveStyle(
      'display: none'
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(div).not.toHaveStyle(
      'display: none'
    )

    expect(div).toHaveTextContent(
      'sodlfksl.com/moi'
    )
  })