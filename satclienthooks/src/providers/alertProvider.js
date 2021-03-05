import React, { useState, useCallback } from 'react'

export const AlertContext = React.createContext({
  message: null,
  addMessage: () => { },
  removeMessage: () => { }
})

export default function AlertProvider({ children }) {
  const [message, setMessage] = useState(null)

  const removeMessage = () => setMessage(null)

  const addMessage = (message, status) => setMessage({ message, status })

  const contextValue = {
    message,
    addMessage: useCallback((message, status) => addMessage(message, status), []),
    removeMessage: useCallback(() => removeMessage(), [])
  }

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  )
}
