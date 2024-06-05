import { SmokesContext } from "../context/SmokesContext"
import { useContext } from 'react'

export const useSmokesContext = () => {
  const context = useContext(SmokesContext)

  if(!context) {
    throw Error('useSmokesContext must be used inside an SmokesContextProvider')
  }

  return context
}