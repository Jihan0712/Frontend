import React from 'react'
import SmokeStatistics from '../components/SmokeStatistics'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import './StatisticsPage.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const StatisticsPage = () => {
  const data = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        label: '# of Tests',
        data: [1500, 56], // Example data, you can replace this with dynamic data
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: ['#4CAF50', '#F44336'],
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
          <p>249</p>
        </div>
        <div className="card">
          <h2>Total No. Vehicles</h2>
          <p>25</p>
        </div>
        <div className="card">
          <h2>Total Passed</h2>
          <p>1500</p>
        </div>
        <div className="card">
          <h2>Total Failed</h2>
          <p>56</p>
        </div>
      </div>
      <div className="chart-container">
        <Pie data={data} />
      </div>
    </div>
  )
}

export default StatisticsPage
