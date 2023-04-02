import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/auth"
import DashboardNav from "../components/dashboardNav"

const Protect = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  function goToLandingPage() {
    navigate("/")
  }
  return (
    <div>
      <Navbar />
      <div>
        {user ? (
          <>
            <div className="flex justify-center mt-4">
              <DashboardNav />
            </div>{" "}
            <Outlet />
          </>
        ) : (
          goToLandingPage()
        )}
      </div>
    </div>
  )
}

export default Protect
