import { useState } from 'react'
import { useSmokesContext } from "../hooks/useSmokesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const SmokeForm = () => {
  const { dispatch } = useSmokesContext()
  const { user } = useAuthContext()

  const [smoke_result, setSmoke_result] = useState('')
  const [opacity, setOpacity] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const smoke = {smoke_result, opacity}
    
    const response = await fetch('/api/smokes', {
      method: 'POST',
      body: JSON.stringify(smoke),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setSmoke_result('')
      setOpacity('')
      console.log('new data added:', json)
      dispatch({type: 'CREATE_SMOKE', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Data smoke</h3>

      <label>Opacity:</label>
      <input 
        type="number" 
        onChange={(e) => setOpacity(e.target.value)} 
        value={opacity}
      />

      <label>Result:</label>
      <input 
        type="text" 
        onChange={(e) => setSmoke_result(e.target.value)} 
        value={smoke_result}
      />

      <button>Add Data</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default SmokeForm