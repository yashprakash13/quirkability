import { useEffect } from "react"
import { useAuth } from "../context/auth"
import { useNavigate, Link } from "react-router-dom"
import DashboardNav from "../components/dashboardNav"

const Dashboard = () => {
  let { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      document.title = `Dashboard | ${user.user_metadata.username}`
    }
  }, [user])

  return (
    user && (
      <div className="container flex flex-col gap-5 mx-auto p-3">
        <div className="flex justify-center">
          <DashboardNav />
        </div>
        Hello, {user?.user_metadata?.username}, I am the Dashboard
      </div>
    )
  )
}

export default Dashboard
