import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/auth"
import { useEffect } from "react"

const Main = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div>{!user && <Outlet />}</div>
    </div>
  )
}

export default Main
