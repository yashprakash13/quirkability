import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/auth"
import DashboardNav from "../components/dashboardNav"
import { useEffect } from "react"

const Protect = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      console.log("Called 5")
      navigate("/")
    }
  }, [user])

  return (
    <div>
      <Navbar />
      <div>
        {user && (
          <>
            <div className="flex justify-center mt-4">
              <DashboardNav />
            </div>{" "}
            <Outlet />
          </>
        )}
      </div>
    </div>
  )
}

export default Protect
