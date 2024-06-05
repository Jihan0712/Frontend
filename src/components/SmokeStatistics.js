import { useEffect, useState } from 'react'
import { useSmokesContext } from '../hooks/useSmokesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const SmokeStatistics = () => {
  const { smokes, dispatch } = useSmokesContext()
  const { user } = useAuthContext()
  const [passedCount, setPassedCount] = useState(0)
  const [failedCount, setFailedCount] = useState(0)

  useEffect(() => {
    const fetchSmokes = async () => {
      const response = await fetch('https://backend-ieyu.onrender.com/api/smokes', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_SMOKES', payload: json })
      }
    }

    if (user) {
      fetchSmokes()
    }
  }, [dispatch, user])

  useEffect(() => {
    if (smokes) {
      const passed = smokes.filter(smoke => smoke.smoke_result === 'Passed').length
      const failed = smokes.filter(smoke => smoke.smoke_result === 'Failed').length
      setPassedCount(passed)
      setFailedCount(failed)
    }
  }, [smokes])

  return (
    <div className="smoke-statistics">
      <h2>Smoke Test Statistics</h2>
      <p><strong>Passed:</strong> {passedCount}</p>
      <p><strong>Failed:</strong> {failedCount}</p>
    </div>
  )
}

export default SmokeStatistics
