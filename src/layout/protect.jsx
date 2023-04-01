import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/auth"
import { useEffect } from "react"

const Protect = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  function goToLandingPage() {
    navigate("/")
  }
  return (
    <div>
      <Navbar />
      <div>{user ? <Outlet /> : goToLandingPage()}</div>
    </div>
  )
}

export default Protect
