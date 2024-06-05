import { useEffect, useState } from 'react';
import { useSmokesContext } from '../hooks/useSmokesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Pie, Bar } from 'react-chartjs-2';

const DashboardPage = () => {
  const { smokes, dispatch } = useSmokesContext();
  const { user } = useAuthContext();
  const [passedCount, setPassedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [mvTypeCount, setMvTypeCount] = useState({});

  useEffect(() => {
    const fetchSmokes = async () => {
      if (!user) return;
      try {
        const response = await fetch('https://backend-ieyu.onrender.com/api/smokes', {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_SMOKES', payload: json });
        }
      } catch (error) {
        console.error('Failed to fetch smokes:', error);
      }
    };

    fetchSmokes();
  }, [dispatch, user]);

  useEffect(() => {
    if (smokes) {
      const passed = smokes.filter(smoke => smoke.smoke_result === 'Passed').length;
      const failed = smokes.filter(smoke => smoke.smoke_result === 'Failed').length;
      setPassedCount(passed);
      setFailedCount(failed);

      const mvTypeCount = smokes.reduce((acc, smoke) => {
        acc[smoke.mvType] = (acc[smoke.mvType] || 0) + 1;
        return acc;
      }, {});
      setMvTypeCount(mvTypeCount);
    }
  }, [smokes]);

  const pieData = {
    labels: ['Passed', 'Failed'],
    datasets: [{
      data: [passedCount, failedCount],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }],
  };

  const barData = {
    labels: Object.keys(mvTypeCount),
    datasets: [{
      label: 'MV Type Count',
      data: Object.values(mvTypeCount),
      backgroundColor: '#36A2EB',
    }],
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-summary">
        <div className="summary-card">
          <h2>Total No. Users</h2>
          <p>{/* Add the logic to display the total number of users */}</p>
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
