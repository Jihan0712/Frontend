import { useSmokesContext } from '../hooks/useSmokesContext'
import { useAuthContext } from '../hooks/useAuthContext'



const SmokeDetails = ({ smoke }) => {
  const { dispatch } = useSmokesContext()
  const { user } = useAuthContext()

const handleClick = async () => {
  if (!user) {
    return
  }
  // eslint-disable-next-line no-restricted-globals
  if (!confirm('Are you sure you want to delete this smoke?')) {
    return;
  }

  try {
    const response = await fetch('/api/smokes/' + smoke._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_SMOKE', payload: json})
    } else {
      throw new Error('Failed to delete smoke')
    }
  } catch (error) {
    console.error(error)
    // Handle the error here, e.g. by showing an error message to the user
  }
}

  return (
      <div className="smoke-details">
        <h4>Help</h4>
        <p><strong>Opacity: </strong>{smoke.opacity}</p>
        <p><strong>Result: </strong>{smoke.smoke_result}</p>
        <p>{smoke.createdAt}</p>
        <span  onClick={handleClick}>Delete</span>
      </div>
    )
  }
  
  export default SmokeDetails