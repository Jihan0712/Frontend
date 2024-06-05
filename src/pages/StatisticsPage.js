import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'  // Import useAuthContext hook
import SmokeStatistics from '../components/SmokeStatistics'

const DashboardPage = () => {
  const [statistics, setStatistics] = useState(null)
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await fetch('https://backend-ieyu.onrender.com/api/Smokes/statistics', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      
      if (response.ok) {
        setStatistics(json)
      }
    }

    if (user) {
      fetchStatistics()
    }
  }, [user])

  if (!statistics) return <div>Loading...</div>

  return (
    <div className="dashboard">
      <SmokeStatistics data={statistics} />
    </div>
  )
}

export default DashboardPage
