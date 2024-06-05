import { useState } from 'react';
import { useSmokesContext } from '../hooks/useSmokesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const SmokeDetails = ({ smoke }) => {
  const { dispatch } = useSmokesContext();
  const { user } = useAuthContext();
  
  const [isEditing, setIsEditing] = useState(false);
  const [opacity, setOpacity] = useState(smoke.opacity);
  const [smokeResult, setSmokeResult] = useState(smoke.smoke_result);

  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Are you sure you want to delete this smoke?')) {
      return;
    }

    try {
      const response = await fetch('https://backend-ieyu.onrender.com/api/smokes/' + smoke._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_SMOKE', payload: json });
      } else {
        throw new Error('Failed to delete smoke');
      }
    } catch (error) {
      console.error(error);
      // Handle the error here, e.g. by showing an error message to the user
    }
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Are you sure you want to update this smoke?')) {
      return;
    }

    const updates = {
      opacity,
      smoke_result: smokeResult
    };

    try {
      const response = await fetch('https://backend-ieyu.onrender.com/api/smokes/' + smoke._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(updates)
      });

      // Debugging response status
      console.log('Response status:', response.status);

      const json = await response.json();
      
      // Debugging response content
      console.log('Response content:', json);

      if (response.ok) {
        dispatch({ type: 'UPDATE_SMOKE', payload: json });
        
        // Update local state to reflect the changes
        setOpacity(json.opacity);
        setSmokeResult(json.smoke_result);

        setIsEditing(false); // Hide the form after successful update

        // Reload the page to reflect changes
        window.location.reload();
      } else {
        throw new Error('Failed to update smoke');
      }
    } catch (error) {
      console.error(error);
      // Handle the error here, e.g. by showing an error message to the user
    }
  };

  const handleCancelClick = () => {
    // Reset the state to the original smoke values
    setOpacity(smoke.opacity);
    setSmokeResult(smoke.smoke_result);
    setIsEditing(false);
  };

  const handlePrintClick = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch('https://backend-ieyu.onrender.com/api/smokes/print/' + smoke._id, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        throw new Error('Failed to generate document');
      }
    } catch (error) {
      console.error(error);
      // Handle the error here, e.g. by showing an error message to the user
    }
  };

  return (
    <div className="smoke-details">
      <h4>{smoke.userEmail}</h4>
      <p><strong>Opacity: </strong>{opacity}</p> {/* Updated to use state */}
      <p><strong>Result: </strong>{smokeResult}</p> {/* Updated to use state */}
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <div className="buttons">
        <span onClick={handleDeleteClick} className='button delete-button'>Delete</span>
        <span onClick={handleUpdateClick} className='button update-button'>Update</span>
        <span onClick={handlePrintClick} className='button print-button'>Print</span>
      </div>

      {isEditing && (
        <form onSubmit={handleFormSubmit} className="edit-form">
          <label>
            Opacity:
            <input 
              type="text" 
              value={opacity} 
              onChange={(e) => setOpacity(e.target.value)} 
            />
          </label>
          <label>
            Result:
            <input 
              type="text" 
              value={smokeResult} 
              onChange={(e) => setSmokeResult(e.target.value)} 
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default SmokeDetails;
