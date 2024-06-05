import { useEffect, useState } from 'react';
import { useSmokesContext } from '../hooks/useSmokesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import SmokeDetails from '../components/SmokeDetails';
import SmokeForm from '../components/SmokeForm';

const Home = () => {
  const { smokes, dispatch } = useSmokesContext();
  const { user } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [smokesPerPage] = useState(5);

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

  const indexOfLastSmoke = currentPage * smokesPerPage;
  const indexOfFirstSmoke = indexOfLastSmoke - smokesPerPage;
  const currentSmokes = smokes.slice(indexOfFirstSmoke, indexOfLastSmoke);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home">
      <div className="smokes">
        {currentSmokes && currentSmokes.map((smoke) => (
          <SmokeDetails key={smoke._id} smoke={smoke} />
        ))}
      </div>
      <SmokeForm />
      <div className="pagination">
        {Array.from({ length: Math.ceil(smokes.length / smokesPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
