import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useSmokesContext } from '../hooks/useSmokesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import './DashboardPage.css'; // Ensure you import the CSS file

const DashboardPage = () => {
  const { smokes, dispatch } = useSmokesContext();
  const { user } = useAuthContext();
  const [statistics, setStatistics] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPassed, setTotalPassed] = useState(0);
  const [totalFailed, setTotalFailed] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await fetch('https://backend-ieyu.onrender.com/api/smokes/statistics', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        setStatistics(json);
        setTotalUsers(json.totalUsers);
        setTotalPassed(json.passed);
        setTotalFailed(json.failed);
      }
    };

    if (user) {
      fetchStatistics();
    }
  }, [dispatch, user]);

  const pieData = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        label: '# of Tests',
        data: statistics ? [statistics.passed, statistics.failed] : [0, 0],
        backgroundColor: ['#28a745', '#dc3545'],
        borderColor: ['#28a745', '#dc3545'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: statistics ? statistics.mvTypeLabels : [],
    datasets: [
      {
        label: 'MV Type Count',
        data: statistics ? statistics.mvTypeCounts : [],
        backgroundColor: '#17a2b8',
        borderColor: '#17a2b8',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="count-cards">
        <div className="count-card">
          <h3>Total No. Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="count-card">
          <h3>Total Passed</h3>
          <p>{totalPassed}</p>
        </div>
        <div className="count-card">
          <h3>Total Failed</h3>
          <p>{totalFailed}</p>
        </div>
      </div>
      <div className="statistics-container">
        <div className="chart-container">
          <h3>Pass/Fail Distribution</h3>
          <div className="pie-chart">
            <Pie data={pieData} />
          </div>
        </div>
        <div className="chart-container">
          <h3>MV Type Count</h3>
          <div className="bar-chart">
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
