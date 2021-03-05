import React, { useState, useCallback } from 'react'

export const AuthContext = React.createContext({
  user: null,
  changeUser: () => {},
})

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const changeUser = (user) => setUser(user)

  const contextValue = {
    user,
    changeUser: (user) => changeUser(user),
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
