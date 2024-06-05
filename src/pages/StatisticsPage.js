import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import './StatisticsPage.css';

const StatisticsPage = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('https://backend-ieyu.onrender.com/api/statistics');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  if (!statistics) {
    return <div>Loading...</div>;
  }

  const pieData = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        data: [statistics.passedCount, statistics.failedCount],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  const barData = {
    labels: Object.keys(statistics.mvTypeCount),
    datasets: [
      {
        label: 'MV Type Count',
        data: Object.values(statistics.mvTypeCount),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="statistics-container">
      <h2>Dashboard</h2>
      <div className="statistics-cards">
        <div className="card">
          <h3>Total No. Users</h3>
          <p>{statistics.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Total Passed</h3>
          <p>{statistics.passedCount}</p>
        </div>
        <div className="card">
          <h3>Total Failed</h3>
          <p>{statistics.failedCount}</p>
        </div>
      </div>
      <div className="charts">
        <div className="chart-container">
          <h3>Pass/Fail Distribution</h3>
          <Pie data={pieData} width={200} height={200} />
        </div>
        <div className="chart-container">
          <h3>MV Type Count</h3>
          <Bar data={barData} width={400} height={200} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
