import { useEffect, useState } from 'react';
import { useSmokesContext } from '../hooks/useSmokesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const DashboardPage = () => {
  const { smokes, dispatch } = useSmokesContext();
  const { user } = useAuthContext();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPassed, setTotalPassed] = useState(0);
  const [totalFailed, setTotalFailed] = useState(0);
  const [mvTypeData, setMvTypeData] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      if (!user) return;
      try {
        const response = await fetch('https://backend-ieyu.onrender.com/api/statistics', {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setTotalUsers(data.totalUsers);
          setTotalPassed(data.totalPassed);
          setTotalFailed(data.totalFailed);
          setMvTypeData(data.mvTypeData);
        } else {
          console.error('Failed to fetch statistics:', data.message);
        }
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      }
    };

    fetchStatistics();
  }, [user]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-summary">
        <div className="summary-card">
          <h2>Total No. Users</h2>
          <p>{totalUsers}</p>
        </div>
        <div className="summary-card">
          <h2>Total Passed</h2>
          <p>{totalPassed}</p>
        </div>
        <div className="summary-card">
          <h2>Total Failed</h2>
          <p>{totalFailed}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart">
          <h3>Pass/Fail Distribution</h3>
          <div className="pie-chart">
            <div className="pie-slice passed" style={{ '--value': totalPassed }}></div>
            <div className="pie-slice failed" style={{ '--value': totalFailed }}></div>
          </div>
        </div>
        <div className="chart">
          <h3>MV Type Count</h3>
          <div className="bar-chart">
            {mvTypeData.map((item) => (
              <div key={item._id} className="bar">
                <div className="bar-fill" style={{ height: `${item.count * 10}px` }}></div>
                <span>{item._id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
