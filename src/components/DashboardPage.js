import { useEffect, useState } from 'react';
import { useSmokesContext } from '../hooks/useSmokesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import SmokeStatistics from '../components/SmokeStatistics';
import { Pie, Bar } from 'react-chartjs-2';
import './DashboardPage.css';

const DashboardPage = () => {
  const { smokes, dispatch } = useSmokesContext();
  const { user } = useAuthContext();
  const [passedCount, setPassedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [mvTypeCounts, setMvTypeCounts] = useState({});

  useEffect(() => {
    const fetchSmokes = async () => {
      const response = await fetch('https://backend-ieyu.onrender.com/api/smokes', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
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

      const mvTypeCount = smokes.reduce((acc, smoke) => {
        acc[smoke.mvType] = (acc[smoke.mvType] || 0) + 1;
        return acc;
      }, {});

      setMvTypeCounts(mvTypeCount);
    }
  }, [smokes]);

  const pieData = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        data: [passedCount, failedCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const barData = {
    labels: Object.keys(mvTypeCounts),
    datasets: [
      {
        label: 'MV Type Count',
        data: Object.values(mvTypeCounts),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="statistics-cards">
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
