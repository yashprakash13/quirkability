import { useEffect } from "react"
import { useAuth } from "../context/auth"
import { useNavigate } from "react-router-dom"

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
      <div className="container flex flex-col mx-auto p-3">
        <div className="text-4xl font-bold font-serif mt-12">
          Hello, {user?.user_metadata?.username}
        </div>
        <div className="text-2xl my-5">Your notifications:</div>
      </div>
    )
  )
}

export default Dashboard
