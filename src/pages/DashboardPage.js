import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './DashboardPage.css';  // Import the CSS file

const DashboardPage = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('https://backend-ieyu.onrender.com/api/Smokes');
        const data = await response.json();
        setStatistics(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const passedCount = statistics.filter(test => test.smoke_result === 'Passed').length;
  const failedCount = statistics.filter(test => test.smoke_result === 'Failed').length;

  const mvTypeCounts = statistics.reduce((acc, curr) => {
    acc[curr.mvType] = (acc[curr.mvType] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: ['Passed', 'Failed'],
    datasets: [{
      data: [passedCount, failedCount],
      backgroundColor: ['#4CAF50', '#FF5252'],
    }],
  };

  const barData = {
    labels: Object.keys(mvTypeCounts),
    datasets: [{
      label: 'MV Type Count',
      data: Object.values(mvTypeCounts),
      backgroundColor: '#4CAF50',
    }],
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="statistics-cards">
        <div className="card">
          <h3>Total No. Users</h3>
          <p>{statistics.length}</p>
        </div>
        <div className="card">
          <h3>Total Passed</h3>
          <p>{passedCount}</p>
        </div>
        <div className="card">
          <h3>Total Failed</h3>
          <p>{failedCount}</p>
        </div>
      </div>
      <div className="charts">
        <div className="chart-container">
          <h3>Pass/Fail Distribution</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart-container">
          <h3>MV Type Count</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
