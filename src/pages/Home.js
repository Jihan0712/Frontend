import { useEffect } from "react"
import { useSmokesContext } from "../hooks/useSmokesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import SmokeDetails from "../components/SmokeDetails"
import SmokeForm from "../components/SmokeForm"

const Home = () => {
  const { smokes, dispatch } = useSmokesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchSmokes = async () => {
      const response = await fetch('https://backend-ieyu.onrender.com/api/Smokes', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_SMOKES', payload: json})
      }
    }

    if (user) {
      fetchSmokes()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="smokes">
        {smokes && smokes.map((smoke) => (
          <SmokeDetails key={smoke._id} smoke={smoke} />
        ))}
      </div>
      <SmokeForm />
    </div>
  )
}

export default Home