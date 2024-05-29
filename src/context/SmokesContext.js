import { createContext, useReducer } from 'react'

export const SmokesContext = createContext()

export const smokesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SMOKES':
      return { 
        smokes: action.payload 
      }
    case 'CREATE_SMOKE':
      return { 
        smokes: [action.payload, ...state.smokes] 
      }
    case 'DELETE_SMOKE':
      return { 
        smokes: state.smokes.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const SmokesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(smokesReducer, { 
    smokes: null
  })
  
  return (
    <SmokesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </SmokesContext.Provider>
  )
}