import { useEffect, useState } from "react";
import { useSmokesContext } from "../hooks/useSmokesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import SmokeDetails from "../components/SmokeDetails";
import SmokeForm from "../components/SmokeForm";

const Home = () => {
  const { smokes, dispatch } = useSmokesContext();
  const { user } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSmokes = async () => {
      const response = await fetch('https://backend-ieyu.onrender.com/api/Smokes', {
        headers: { 'Authorization': `Bearer ${user.token}` },
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the data to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = smokes ? smokes.slice(indexOfFirstItem, indexOfLastItem) : [];

  const totalPages = Math.ceil(smokes ? smokes.length / itemsPerPage : 0);

  return (
    <div className="home">
      <div className="smokes">
        {currentItems && currentItems.map((smoke) => (
          <SmokeDetails key={smoke._id} smoke={smoke} />
        ))}
      </div>
      <SmokeForm />
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
