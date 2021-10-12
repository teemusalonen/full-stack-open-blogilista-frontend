import React from 'react'

const LoginForm = ({
   handleLogin,
   handleUserNameChange,
   handlePasswordChange,
   username,
   password
  }) => {
  return (
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={event => handleUserNameChange(event)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={event => handlePasswordChange(event)}
          />
      </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm