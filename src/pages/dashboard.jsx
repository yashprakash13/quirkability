import { useEffect } from "react"
import { useAuth } from "../context/auth"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
    document.title = `Dashboard | ${user.user_metadata.username}`
  }, [])

  return (
    user && (
      <div className="container flex mx-auto p-3">
        Hello, {user.user_metadata.username}, I am the Dashboard
      </div>
    )
  )
}

export default Dashboard
