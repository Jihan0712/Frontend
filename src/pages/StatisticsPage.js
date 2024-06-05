import React, { useEffect, useState } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useAuthContext } from '../hooks/useAuthContext'
import './StatisticsPage.css'

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const StatisticsPage = () => {
  const { user } = useAuthContext()
  const [statistics, setStatistics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('https://backend-ieyu.onrender.com/api/statistics', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setStatistics(data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch statistics:', error)
        setError(error.message)
        setLoading(false)
      }
    }

    if (user) {
      fetchStatistics()
    }
  }, [user])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!statistics) {
    return <div>No data available</div>
  }

  const pieData = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        label: '# of Tests',
        data: [statistics.totalPassed || 0, statistics.totalFailed || 0],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: ['#4CAF50', '#F44336'],
        borderWidth: 1,
      },
    ],
  }

  const barData = {
    labels: statistics.opacityData?.map((_, index) => `Test ${index + 1}`) || [],
    datasets: [
      {
        label: 'Opacity',
        data: statistics.opacityData?.map(data => parseFloat(data.opacity)) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="statistics-page">
      <h1>Dashboard</h1>
      <div className="statistics-cards">
        <div className="card">
          <h2>Total No. Users</h2>
          <p>{statistics.totalUsers}</p>
        </div>
        <div className="card">
          <h2>Total Passed</h2>
          <p>{statistics.totalPassed}</p>
        </div>
        <div className="card">
          <h2>Total Failed</h2>
          <p>{statistics.totalFailed}</p>
        </div>
      </div>
      <div className="chart-container">
        <h3>Pass/Fail Distribution</h3>
        <Pie data={pieData} />
      </div>
      <div className="chart-container">
        <h3>Opacity Levels</h3>
        <Bar data={barData} />
      </div>
    </div>
  )
}

export default StatisticsPage
