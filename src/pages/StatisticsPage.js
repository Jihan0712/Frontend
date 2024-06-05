import React, { useEffect, useState } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useAuthContext } from '../hooks/useAuthContext'
import './StatisticsPage.css'

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const StatisticsPage = () => {
  const { user } = useAuthContext()
  const [statistics, setStatistics] = useState(null)

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/statistics', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setStatistics(data)
      } catch (error) {
        console.error('Failed to fetch statistics:', error)
      }
    }

    if (user) {
      fetchStatistics()
    }
  }, [user])

  if (!statistics) {
    return <div>Loading...</div>
  }

  const pieData = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        label: '# of Tests',
        data: [statistics.totalPassed, statistics.totalFailed],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: ['#4CAF50', '#F44336'],
        borderWidth: 1,
      },
    ],
  }

  const barData = {
    labels: statistics.opacityData.map((data, index) => new Date(data.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Opacity',
        data: statistics.opacityData.map(data => parseFloat(data.opacity)),
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
