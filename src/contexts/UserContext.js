import React, {createContext, useReducer} from 'react'
import {initialState, UserReducer} from '../reducers/UserReducer'

export const UserContext = createContext() // Criar o contexto de informações do usuário

export default ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  )
}
