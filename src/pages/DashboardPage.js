import React, { useEffect, useState } from 'react';
import { useSmokesContext } from '../hooks/useSmokesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Bar, Pie } from 'react-chartjs-2';
import './DashboardPage.css';

const DashboardPage = () => {
  const { smokes, dispatch } = useSmokesContext();
  const { user } = useAuthContext();
  const [passedCount, setPassedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  useEffect(() => {
    const fetchSmokes = async () => {
      const response = await fetch('https://backend-ieyu.onrender.com/api/smokes', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_SMOKES', payload: json });
      }
    };

    if (user) {
      fetchSmokes();
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (smokes) {
      const passed = smokes.filter(smoke => smoke.smoke_result === 'Passed').length;
      const failed = smokes.filter(smoke => smoke.smoke_result === 'Failed').length;
      setPassedCount(passed);
      setFailedCount(failed);
    }
  }, [smokes]);

  const pieData = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        data: [passedCount, failedCount],
        backgroundColor: ['#4CAF50', '#FF5252']
      }
    ]
  };

  const barData = {
    labels: [...new Set(smokes.map(smoke => smoke.mvType))],
    datasets: [
      {
        label: 'MV Type Count',
        data: smokes.reduce((acc, smoke) => {
          const type = smoke.mvType;
          if (!acc[type]) acc[type] = 0;
          acc[type]++;
          return acc;
        }, {}),
        backgroundColor: '#29b6f6'
      }
    ]
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-summary">
        <div className="summary-card">
          <h2>Total No. Users</h2>
          <p>12</p>
        </div>
        <div className="summary-card">
          <h2>Total Passed</h2>
          <p>{passedCount}</p>
        </div>
        <div className="summary-card">
          <h2>Total Failed</h2>
          <p>{failedCount}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart">
          <h3>Pass/Fail Distribution</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart">
          <h3>MV Type Count</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
