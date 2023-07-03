import { useEffect, useState } from "react"
import { useAuth } from "../context/auth"
import { useNavigate } from "react-router-dom"
import { ClockIcon } from "@heroicons/react/24/outline"

const Dashboard = () => {
  let { user } = useAuth()
  const navigate = useNavigate()

  const [lastSignInTime, setLastSignInTime] = useState()

  useEffect(() => {
    if (user) {
      document.title = `Dashboard | ${user.user_metadata.username}`
      convertTimeToPastTense()
    }
  }, [user])
  function convertTimeToPastTense() {
    const timeString = user.last_sign_in_at
    const date = new Date(timeString)

    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const monthName = new Date(0, month).toLocaleString("en", { month: "long" })

    const humanReadableTime = `${monthName} ${day}, ${year} at ${hours}:${minutes}`
    setLastSignInTime(humanReadableTime)
  }
  return (
    user && (
      <div className="container flex flex-col mx-auto p-3">
        <div className="text-4xl font-bold font-serif mt-12 text-secondary-focus">
          Hi {user?.user_metadata?.username}, welcome!
        </div>
        <div className="mt-7 text-2xl my-5 font-serif flex-col md:flex-row inline-flex gap-3 justify-start md:items-center text-secondary-focus">
          <div className="inline-flex items-center gap-4 ">
            <ClockIcon className="w-7 h-7 text-secondary-focus" /> Your last
            sign in was on:{" "}
          </div>
          <span className="font-thin">{lastSignInTime}</span>
        </div>
      </div>
    )
  )
}

export default Dashboard
