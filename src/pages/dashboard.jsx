import { useEffect } from "react"
import { useAuth } from "../context/auth"
import { useNavigate, Link } from "react-router-dom"

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
      <div className="container flex mx-auto p-3">
        Hello, {user?.user_metadata?.username}, I am the Dashboard
        <Link to="/dashboard/products">Products</Link> okay
      </div>
    )
  )
}

export default Dashboard
